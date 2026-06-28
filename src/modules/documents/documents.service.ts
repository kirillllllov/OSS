import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentType } from './dto/generate-document.dto';
import { generateBallotBuffer } from './ballot-generator';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const [last, first, middle] = parts;
  return `${last} ${first ? first[0] + '.' : ''}${middle ? middle[0] + '.' : ''}`;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  try {
    const d = new Date(value)
    if (isNaN(d.getTime())) return value
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}.${month}.${year}`
  } catch {
    return value
  }
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return ''
  try {
    const d = new Date(value)
    if (isNaN(d.getTime())) return value
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  } catch {
    return value
  }
}

function parseShare(share: string | null): { numerator: string; denominator: string } {
  if (!share) return { numerator: '1', denominator: '1' };
  const parts = share.split('/');
  return {
    numerator: parts[0]?.trim() || '1',
    denominator: parts[1]?.trim() || '1',
  };
}

// Путь к папке с шаблонами
const TEMPLATES_DIR = path.join(process.cwd(), 'templates');

// ─────────────────────────────────────────────────────────────
// XML helpers for table-row cloning
// ─────────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function replaceAllInXml(xml: string, key: string, value: string): string {
  return xml.split(`{${key}}`).join(escapeXml(value));
}

/**
 * Клонирует строку таблицы шаблона для каждого элемента rowDataList,
 * подставляет переменные в клон, а headerAndTotals — во весь документ.
 * markerVar — имя переменной, по которой ищем строку-шаблон (без {}).
 */
function cloneTableRow(
  templateBuf: Buffer,
  markerVar: string,
  rowDataList: Record<string, string>[],
  headerAndTotals: Record<string, string>,
): Buffer {
  const zip = new PizZip(templateBuf);
  let xml = zip.files['word/document.xml'].asText();

  // Ищем строку таблицы <w:tr ...>...</w:tr> содержащую markerVar
  const marker = `{${markerVar}}`;
  const trOpen = '<w:tr ';
  const trClose = '</w:tr>';
  let templateRow: string | null = null;
  let templateStart = -1;
  let templateEnd = -1;
  let pos = 0;

  while (pos < xml.length) {
    const start = xml.indexOf(trOpen, pos);
    if (start === -1) break;
    const end = xml.indexOf(trClose, start);
    if (end === -1) break;
    const end2 = end + trClose.length;
    const candidate = xml.substring(start, end2);
    if (candidate.includes(marker)) {
      templateRow = candidate;
      templateStart = start;
      templateEnd = end2;
      break;
    }
    pos = end2;
  }

  if (!templateRow) {
    // Шаблонная строка не найдена — fallback: простая подстановка первого элемента
    const allData = { ...headerAndTotals, ...(rowDataList[0] ?? {}) };
    return renderTemplate(templateBuf, allData);
  }

  // Клонируем строку для каждого элемента rowDataList
  const cloned = rowDataList.map(rowData => {
    let row = templateRow as string;
    for (const [k, v] of Object.entries(rowData)) {
      row = replaceAllInXml(row, k, v);
    }
    // Очищаем незаполненные переменные в строке
    row = row.replace(/\{[^{}]+\}/g, '');
    return row;
  });

  // Заменяем шаблонную строку на клоны
  xml = xml.substring(0, templateStart) + cloned.join('') + xml.substring(templateEnd);

  // Подставляем заголовочные и итоговые переменные
  for (const [k, v] of Object.entries(headerAndTotals)) {
    xml = replaceAllInXml(xml, k, v);
  }
  // Очищаем незаполненные переменные
  xml = xml.replace(/\{[^{}]+\}/g, '');

  zip.file('word/document.xml', xml);
  return Buffer.from(zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' }));
}


function loadTemplate(name: string): Buffer {
  const filePath = path.join(TEMPLATES_DIR, name);
  if (!fs.existsSync(filePath)) {
    throw new NotFoundException(
      `Шаблон "${name}" не найден. Убедитесь, что папка templates существует и содержит ${name}`,
    );
  }
  return fs.readFileSync(filePath);
}

function renderTemplate(templateBuf: Buffer, data: Record<string, any>): Buffer {
  const zip = new PizZip(templateBuf);
  const doc = new Docxtemplater(zip, {
    delimiters: { start: '{', end: '}' },
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => '',
  });
  doc.render(data);
  return doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
}

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Проверка доступа к собранию ────────────────────────────
  private async checkMeetingAccess(meetingId: string, userId: string, userCompanyId: string | null): Promise<void> {
    if (userCompanyId) return;
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: { building: true },
    });
    if (!meeting) throw new NotFoundException('Собрание не найдено');
    const access = await this.prisma.employeeBuildingAccess.findUnique({
      where: {
        employeeId_buildingId: {
          employeeId: userId,
          buildingId: meeting.buildingId,
        },
      },
    });
    if (!access) throw new ForbiddenException('Нет доступа к этому собранию');
  }

  // ── Проверка статуса собрания для типа документа ──────────
  private checkDocumentAllowedForStatus(type: DocumentType, status: string): void {
    const REQUIRES_COMPLETED: DocumentType[] = [
      'protocol', 'sheet_of_the_persons_present',
      'voting_results_notice', 'voting_results',
    ];
    const REQUIRES_ACTIVE: DocumentType[] = [
      'act', 'registration_sheet', 'ballot',
      'meeting_message', 'register_of_owners', 'sheet_of_invited_persons',
      'act_after_voting',
    ];

    const completedOrArchived = ['completed', 'archived'];
    const activeOrLater = ['active', 'voting', 'counting', 'completed', 'archived'];

    if (REQUIRES_COMPLETED.includes(type) && !completedOrArchived.includes(status)) {
      throw new BadRequestException(
        `Документ "${type}" доступен только для завершённых собраний (текущий статус: ${status})`,
      );
    }

    if (REQUIRES_ACTIVE.includes(type) && !activeOrLater.includes(status)) {
      throw new BadRequestException(
        `Документ "${type}" недоступен для черновика собрания`,
      );
    }
  }

  // ── Генерация документа ─────────────────────────────────────
  async generate(
    type: DocumentType,
    meetingId: string,
    manualFields: Record<string, string> = {},
    userId: string,
    userRole: string,
    ownerId?: string,
  ): Promise<{ buffer: Buffer; filename: string }> {
    // 1. Проверка доступа
    await this.checkMeetingAccess(meetingId, userId, userRole);

    // 2. Получение данных собрания из БД
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        building: true,
        agendaItems: {
          orderBy: { orderNumber: 'asc' },
          include: { question: true },
        },
      },
    });
    if (!meeting) throw new NotFoundException('Собрание не найдено');

    // 3. Проверка допустимости типа документа для текущего статуса
    this.checkDocumentAllowedForStatus(type, meeting.status);

    const meetingNum = meeting.number ?? '1';

    switch (type) {
      case 'act':
        return {
          buffer: await this.generateAct(meeting, manualFields),
          filename: `Акт_${meetingNum}.docx`,
        };
      case 'registration_sheet':
        return {
          buffer: await this.generateRegistrationSheet(meeting, manualFields),
          filename: `Лист_регистрации_${meetingNum}.docx`,
        };
      case 'protocol':
        return {
          buffer: await this.generateProtocol(meeting, manualFields),
          filename: `Протокол_${meetingNum}.docx`,
        };
      case 'ballot':
        if (!ownerId) throw new BadRequestException('Для бюллетеня необходимо указать ownerId');
        return {
          buffer: await this.generateBallot(meeting, ownerId, manualFields),
          filename: `Бюллетень_${meetingNum}_${ownerId}.docx`,
        };
      case 'meeting_message':
        return {
          buffer: await this.generateMeetingMessage(meeting, manualFields),
          filename: `Сообщение_об_ОСС_${meetingNum}.docx`,
        };
      case 'register_of_owners':
        return {
          buffer: await this.generateRegisterOfOwners(meeting, manualFields),
          filename: `Реестр_собственников_${meetingNum}.docx`,
        };
      case 'sheet_of_invited_persons':
        return {
          buffer: await this.generateSheetOfInvitedPersons(meeting, manualFields),
          filename: `Лист_приглашённых_${meetingNum}.docx`,
        };
      case 'sheet_of_the_persons_present':
        return {
          buffer: await this.generateSheetOfPersonsPresent(meeting, manualFields),
          filename: `Лист_присутствующих_${meetingNum}.docx`,
        };
      case 'voting_results_notice':
        return {
          buffer: await this.generateVotingResultsNotice(meeting, manualFields),
          filename: `Сообщение_об_итогах_голосования_${meetingNum}.docx`,
        };
      case 'voting_results':
        return {
          buffer: await this.generateVotingResults(meeting, manualFields),
          filename: `Результаты_голосования_${meetingNum}.docx`,
        };
      case 'act_after_voting':
        return {
          buffer: await this.generateActAfterVoting(meeting, manualFields),
          filename: `Акт_о_размещении_итогов_${meetingNum}.docx`,
        };
      default:
        throw new BadRequestException('Неизвестный тип документа');
    }
  }

  // ── Генерация архива бюллетеней для всех собственников ──────
  async generateAllBallotsZip(
    meetingId: string,
    userId: string,
    userRole: string,
  ): Promise<{ buffer: Buffer; filename: string }> {
    await this.checkMeetingAccess(meetingId, userId, userRole);

    const meeting = await this.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        building: true,
        agendaItems: {
          orderBy: { orderNumber: 'asc' },
          include: { question: true },
        },
      },
    });
    if (!meeting) throw new NotFoundException('Собрание не найдено');

    const owners = await this.prisma.owner.findMany({
      where: {
        ownershipRights: {
          some: { premise: { buildingId: meeting.buildingId } },
        },
      },
      include: {
        ownershipRights: {
          where: { premise: { buildingId: meeting.buildingId } },
          include: { premise: true },
          take: 1,
        },
      },
    });

    if (owners.length === 0) {
      throw new BadRequestException('В доме не найдено ни одного собственника');
    }

    const zip = new PizZip();

    for (let i = 0; i < owners.length; i++) {
      const owner = owners[i];
      const buffer = await this.generateBallot(meeting, owner.id, {});
      const right = owner.ownershipRights[0];
      const premise = right?.premise;
      const safeOwnerName = owner.fullName.replace(/[^\wа-яёА-ЯЁ\s]/gi, '').replace(/\s+/g, '_').substring(0, 50);
      const premiseNum = premise?.number ?? String(i + 1);
      const filename = `Бюллетень_кв${premiseNum}_${safeOwnerName}.docx`;
      zip.file(filename, buffer);
    }

    const zipBuffer = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });
    const meetingNum = meeting.number ?? meetingId.substring(0, 8);

    return {
      buffer: zipBuffer,
      filename: `Бюллетени_${meetingNum}.zip`,
    };
  }

  // ── 1. Акт о размещении сообщения ──────────────────────────
  private async generateAct(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА: manual.РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА ?? '',
      ...manual,
    };
    return renderTemplate(loadTemplate('act.docx'), data);
  }

  // ── 2. Лист регистрации ─────────────────────────────────────
  private async generateRegistrationSheet(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      НОМЕР_ПРОТОКОЛА: manual.НОМЕР_ПРОТОКОЛА ?? meeting.number ?? '',
      НОМЕР_ПРИЛОЖЕНИЯ: manual.НОМЕР_ПРИЛОЖЕНИЯ ?? '',
      ГОД: new Date().getFullYear().toString(),
      ...manual,
    };
    return renderTemplate(loadTemplate('registration_sheet.docx'), data);
  }

  // ── 3. Протокол собрания ────────────────────────────────────
  private async generateProtocol(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    // Получаем ответы на вопросы по данному собранию
    const answers = await this.prisma.questionAnswer.findMany({
      where: { agendaItem: { meetingId: meeting.id } },
    });

    const totalArea: number = meeting.building.totalArea ?? 0;
    const sum = (vote: string) =>
      answers.filter((a: any) => a.vote === vote).reduce((s: number, a: any) => s + (a.weight ?? 0), 0);

    const forArea = sum('for');
    const againstArea = sum('against');
    const abstainArea = sum('abstain');
    const votedArea = forArea + againstArea + abstainArea;
    const notVotedArea = Math.max(0, totalArea - votedArea);

    const pct = (val: number): string =>
      totalArea > 0 ? ((val / totalArea) * 100).toFixed(2) + '%' : '0%';

    // Вопросы повестки
    const agendaData: Record<string, string> = {};
    for (const [idx, item] of (meeting.agendaItems ?? []).entries()) {
      const n = idx + 1;
      const text: string =
        item.customProtocolText ?? item.question?.protocolText ?? item.question?.shortTitle ?? '';
      agendaData[`Содержимое_вопроса_${n}`] = text;
      agendaData[`Содержимое вопроса_${n}`] = text;
      agendaData[`ПРЕДЛОЖЕННОЕ_РЕШЕНИЕ_ВОПРОСА_${n}`] =
        manual[`ПРЕДЛОЖЕННОЕ_РЕШЕНИЕ_ВОПРОСА_${n}`] ?? '';
    }

    // ФИО_ЛИЦА_1..N из ручного поля СПИСОК_ФИО_ЛИЦ (по одной строке)
    const personLines = (manual.СПИСОК_ФИО_ЛИЦ ?? '').split('\n').filter(Boolean);
    const personData: Record<string, string> = {};
    personLines.forEach((fio, idx) => {
      personData[`ФИО_ЛИЦА_${idx + 1}`] = fio.trim();
    });

    const ownersCount = await this.prisma.owner.count();
    const participantOwners = new Set(answers.map((a: any) => a.ownerId)).size;

    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      НОМЕР_ПРОТОКОЛА: manual.НОМЕР_ПРОТОКОЛА ?? meeting.number ?? '',
      ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ_ОБЩЕГО_СОБРАНИЯ: formatDate(meeting.resultsDate ?? meeting.endDate),
      РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА: manual.РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА ?? '',
      ФИО_ПРЕДСЕДАТЕЛЯ: manual.ФИО_ПРЕДСЕДАТЕЛЯ ?? '',
      ФИО_председателя_общего_собрания: manual.ФИО_ПРЕДСЕДАТЕЛЯ ?? '',
      ФИО_СЕКРЕТАРЯ: manual.ФИО_СЕКРЕТАРЯ ?? '',
      ФИО_секретаря_общего_собрания: manual.ФИО_СЕКРЕТАРЯ ?? '',
      Дата_и_время_начала_проведения_голосования: formatDateTime(meeting.startDate),
      'Дата_и_время__окончания_проведения_голосования': formatDateTime(meeting.endDate),
      Общее_количество_собственников_помещений_в_многоквартирном_доме: ownersCount.toString(),
      сумма_площадей_жилых_и_нежилых_помещений_собственников_помещений_в_многоквартирном_доме:
        totalArea.toFixed(2),
      Площадь_жилых_и_нежилых_помещений_собственников_помещений_в_многоквартирном_доме_принявших_участие_в_голосовании_на_общем_собрании:
        votedArea.toFixed(2),
      Количество_собственников_жилых_и_нежилых_помещений_в_многоквартирном_доме_принявших_участие_в_голосовании_на_общем_собрании:
        participantOwners.toString(),
      процент_от_общей_площади_жилых_и_нежилых_помещений_многоквартирного_дома: pct(votedArea),
      количество_процентов: pct(votedArea),
      вид_кворума: manual.вид_кворума ?? 'заочное',
      сумма_весов_участников_голосования_проголосовавших_за: forArea.toFixed(2),
      сумма_весов_участников_голосования_проголосовавших_против: againstArea.toFixed(2),
      сумма_весов_участников_голосования_проголосовавших_воздерживаясь: abstainArea.toFixed(2),
      сумма_весов_участников_голосования_не_проголосовавших: notVotedArea.toFixed(2),
      процент_проголосовавших_за_от_общего_числа_голосов: pct(forArea),
      процент_проголосовавших_против_от_общего_числа_голосов: pct(againstArea),
      процент_проголосовавших_воздерживаясь_от_общего_числа_голосов: pct(abstainArea),
      процент_не_проголосовавших_против_от_общего_числа_голосов: pct(notVotedArea),
      'принято/не_принято': manual['принято/не_принято'] ?? '',
      ...agendaData,
      ...personData,
      ...manual,
    };
    return renderTemplate(loadTemplate('protocol.docx'), data);
  }

  // ── 4. Бюллетень (Решение собственника) ────────────────────
  private async generateBallot(meeting: any, ownerId: string, _manual: Record<string, string>): Promise<Buffer> {
    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId },
      include: {
        ownershipRights: {
          include: { premise: true },
          take: 1,
        },
      },
    });
    if (!owner) throw new NotFoundException('Собственник не найден');

    return generateBallotBuffer(meeting, owner);
  }

  // ── 5. Сообщение о проведении ОСС ──────────────────────────
  private async generateMeetingMessage(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const agendaData: Record<string, string> = {};
    for (const [idx, item] of (meeting.agendaItems ?? []).entries()) {
      const n = idx + 1;
      agendaData[`ВОПРОС_${n}`] =
        item.customBulletinText ??
        item.customProtocolText ??
        item.question?.bulletinText ??
        item.question?.shortTitle ??
        '';
    }

    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      ДАТА_ФОРМИРОВАНИЯ_СООБЩЕНИЯ: formatDate(new Date().toISOString()),
      ВРЕМЯ_НАЧАЛА: manual.ВРЕМЯ_НАЧАЛА ?? '',
      ВРЕМЯ_КОНЦА: manual.ВРЕМЯ_КОНЦА ?? '',
      ФОРМА_СОБРАНИЯ: manual.ФОРМА_СОБРАНИЯ ?? 'заочное',
      РЕКВИЗИТЫ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ: manual.РЕКВИЗИТЫ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ ?? '',
      НАИМЕНОВАНИЕ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ: manual.НАИМЕНОВАНИЕ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ ?? '',
      АДРЕС_ПРИЕМА_РЕШЕНИЙ: manual.АДРЕС_ПРИЕМА_РЕШЕНИЙ ?? '',
      МЕСТО_ОЗНАКОМЛЕНИЯ: manual.МЕСТО_ОЗНАКОМЛЕНИЯ ?? '',
      ...agendaData,
      ...manual,
    };
    return renderTemplate(loadTemplate('meeting_message.docx'), data);
  }

  // ── 6. Реестр собственников МКД ────────────────────────────
  private async generateRegisterOfOwners(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const premises = await this.prisma.premise.findMany({
      where: { buildingId: meeting.buildingId },
      orderBy: { number: 'asc' },
      include: {
        ownershipRights: { include: { owner: true } },
      },
    });

    const totalArea: number = meeting.building.totalArea ?? 0;
    let totalShareArea = 0;

    const rows: Record<string, string>[] = [];
    for (const premise of premises as any[]) {
      for (const right of premise.ownershipRights) {
        const shareArea: number = right.shareArea ?? premise.area ?? 0;
        const pct = totalArea > 0 ? ((shareArea / totalArea) * 100).toFixed(4) : '0';
        totalShareArea += shareArea;
        rows.push({
          НОМЕР_ПОМЕЩЕНИЯ: premise.number ?? '',
          ФОРМА_СОБСТВЕННОСТИ: right.ownershipType ?? 'Частная',
          РЕКВИЗИТЫ_ПРАВА: right.titleDocument ?? '',
          ФИО_НАИМЕНОВАНИЕ: right.owner?.fullName ?? '',
          ПЛОЩАДЬ: (premise.area ?? 0).toFixed(2),
          ДОЛЯ: right.share ?? '1/1',
          S_ДОЛИ: shareArea.toFixed(2),
          ПРОЦЕНТ_ГОЛОСОВ: pct,
        });
      }
    }

    const totalPct = totalArea > 0 ? ((totalShareArea / totalArea) * 100).toFixed(4) : '0';

    const header: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      КАДАСТРОВЫЙ_НОМЕР_ДОМА: meeting.building.cadastralNumber ?? '',
      НОМЕР_ПРИЛОЖЕНИЯ: manual.НОМЕР_ПРИЛОЖЕНИЯ ?? '',
      НОМЕР_ПРОТОКОЛА: manual.НОМЕР_ПРОТОКОЛА ?? meeting.number ?? '',
      ДАТА_ПРОТОКОЛА: manual.ДАТА_ПРОТОКОЛА ?? formatDate(meeting.endDate ?? new Date().toISOString()),
      ИТОГО_S_ДОЛИ: totalShareArea.toFixed(2),
      ИТОГО_ПРОЦЕНТ: totalPct,
      ...manual,
    };

    if (rows.length === 0) {
      return renderTemplate(loadTemplate('register_of_owners.docx'), { ...header, НОМЕР_ПОМЕЩЕНИЯ: '', ФОРМА_СОБСТВЕННОСТИ: '', РЕКВИЗИТЫ_ПРАВА: '', ФИО_НАИМЕНОВАНИЕ: '', ПЛОЩАДЬ: '', ДОЛЯ: '', S_ДОЛИ: '', ПРОЦЕНТ_ГОЛОСОВ: '' });
    }
    return cloneTableRow(loadTemplate('register_of_owners.docx'), 'НОМЕР_ПОМЕЩЕНИЯ', rows, header);
  }

  // ── 7. Лист приглашённых лиц ────────────────────────────────
  private async generateSheetOfInvitedPersons(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    // СПИСОК_ПРИГЛАШЕННЫХ — JSON-массив объектов:
    // [{ "ФИО": "...", "ПРЕДСТАВИТЕЛЬ": "...", "ЦЕЛЬ": "..." }, ...]
    let persons: { ФИО: string; ПРЕДСТАВИТЕЛЬ: string; ЦЕЛЬ: string }[] = [];
    try {
      persons = JSON.parse(manual.СПИСОК_ПРИГЛАШЕННЫХ ?? '[]');
    } catch {
      persons = [];
    }

    const rows: Record<string, string>[] = persons.length > 0
      ? persons.map((p, i) => ({
          НОМЕР_СТРОКИ: String(i + 1),
          ФИО_ПРИГЛАШЕННОГО_ИЛИ_НАИМЕНОВАНИЕ_И_ОГРН: p.ФИО ?? '',
          ФИО_ПРЕДСТАВИТЕЛЯ: p.ПРЕДСТАВИТЕЛЬ ?? '',
          ЦЕЛЬ_УЧАСТИЯ: p.ЦЕЛЬ ?? '',
        }))
      : [{ НОМЕР_СТРОКИ: '', ФИО_ПРИГЛАШЕННОГО_ИЛИ_НАИМЕНОВАНИЕ_И_ОГРН: '', ФИО_ПРЕДСТАВИТЕЛЯ: '', ЦЕЛЬ_УЧАСТИЯ: '' }];

    const header: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      ФОРМА_СОБРАНИЯ: manual.ФОРМА_СОБРАНИЯ ?? 'заочное',
      НОМЕР_ПРИЛОЖЕНИЯ: manual.НОМЕР_ПРИЛОЖЕНИЯ ?? '',
      НОМЕР_ПРОТОКОЛА: manual.НОМЕР_ПРОТОКОЛА ?? meeting.number ?? '',
      ДАТА_ПРОТОКОЛА: manual.ДАТА_ПРОТОКОЛА ?? formatDate(meeting.endDate ?? new Date().toISOString()),
      ...manual,
    };

    return cloneTableRow(loadTemplate('sheet_of_invited_persons.docx'), 'НОМЕР_СТРОКИ', rows, header);
  }

  // ── 8. Лист лиц, присутствовавших на собрании ──────────────
  private async generateSheetOfPersonsPresent(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    // Берём собственников, у которых есть хотя бы один ответ на вопросы данного собрания
    const agendaItems = await this.prisma.agendaItem.findMany({ where: { meetingId: meeting.id } });
    const agendaIds = agendaItems.map((a: any) => a.id);

    const answers = await this.prisma.questionAnswer.findMany({
      where: { agendaItemId: { in: agendaIds } },
      include: {
        owner: {
          include: {
            ownershipRights: {
              include: { premise: true },
              take: 1,
            },
          },
        },
      },
    });

    // Группируем по собственнику
    const ownerMap = new Map<string, { owner: any; weight: number }>();
    for (const ans of answers as any[]) {
      const existing = ownerMap.get(ans.ownerId);
      if (existing) {
        existing.weight += ans.weight ?? 0;
      } else {
        ownerMap.set(ans.ownerId, { owner: ans.owner, weight: ans.weight ?? 0 });
      }
    }

    const totalArea: number = meeting.building.totalArea ?? 0;
    let totalVotedArea = 0;
    const rows: Record<string, string>[] = [];

    for (const { owner, weight } of ownerMap.values()) {
      const right = owner?.ownershipRights?.[0];
      const premise = right?.premise;
      const pct = totalArea > 0 ? ((weight / totalArea) * 100).toFixed(4) : '0';
      totalVotedArea += weight;
      rows.push({
        НОМЕР_ПОМЕЩЕНИЯ: premise?.number ?? '',
        ФИО_СОБСТВЕННИКА: owner?.fullName ?? '',
        ГОЛОСА_М2: weight.toFixed(2),
        ГОЛОСА_ПРОЦЕНТ: pct,
      });
    }

    const totalPct = totalArea > 0 ? ((totalVotedArea / totalArea) * 100).toFixed(4) : '0';

    const header: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      НОМЕР_ПРИЛОЖЕНИЯ: manual.НОМЕР_ПРИЛОЖЕНИЯ ?? '',
      НОМЕР_ПРОТОКОЛА: manual.НОМЕР_ПРОТОКОЛА ?? meeting.number ?? '',
      ДАТА_ПРОТОКОЛА: manual.ДАТА_ПРОТОКОЛА ?? formatDate(meeting.endDate ?? new Date().toISOString()),
      ИТОГО_ГОЛОСА_М2: totalVotedArea.toFixed(2),
      ИТОГО_ГОЛОСА_ПРОЦЕНТ: totalPct,
      ...manual,
    };

    if (rows.length === 0) {
      rows.push({ НОМЕР_ПОМЕЩЕНИЯ: '', ФИО_СОБСТВЕННИКА: '', ГОЛОСА_М2: '0', ГОЛОСА_ПРОЦЕНТ: '0' });
    }

    return cloneTableRow(loadTemplate('sheet_of_the_persons_present.docx'), 'НОМЕР_ПОМЕЩЕНИЯ', rows, header);
  }

  // ── 9. Сообщение об итогах голосования ─────────────────────
  private async generateVotingResultsNotice(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const agendaData: Record<string, string> = {};
    for (const [idx, item] of (meeting.agendaItems ?? []).entries()) {
      const n = idx + 1;
      agendaData[`ВОПРОС_${n}`] =
        item.customBulletinText ??
        item.customProtocolText ??
        item.question?.bulletinText ??
        item.question?.shortTitle ??
        '';
    }

    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      ДАТА_ФОРМИРОВАНИЯ_СООБЩЕНИЯ: formatDate(new Date().toISOString()),
      ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ: formatDate(meeting.resultsDate ?? meeting.endDate),
      ФОРМА_СОБРАНИЯ: manual.ФОРМА_СОБРАНИЯ ?? 'заочное',
      РЕКВИЗИТЫ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ: manual.РЕКВИЗИТЫ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ ?? '',
      НАИМЕНОВАНИЕ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ: manual.НАИМЕНОВАНИЕ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ ?? '',
      МЕСТО_ОЗНАКОМЛЕНИЯ: manual.МЕСТО_ОЗНАКОМЛЕНИЯ ?? '',
      ...agendaData,
      ...manual,
    };
    return renderTemplate(loadTemplate('meeting_message.docx'), data);
  }

  // ── 10. Результаты голосования на Общем собрании ───────────
  private async generateVotingResults(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const answers = await this.prisma.questionAnswer.findMany({
      where: { agendaItem: { meetingId: meeting.id } },
    });

    const totalArea: number = meeting.building.totalArea ?? 0;
    const sum = (vote: string) =>
      answers.filter((a: any) => a.vote === vote).reduce((s: number, a: any) => s + (a.weight ?? 0), 0);

    const forArea = sum('for');
    const againstArea = sum('against');
    const abstainArea = sum('abstain');
    const votedArea = forArea + againstArea + abstainArea;
    const notVotedArea = Math.max(0, totalArea - votedArea);

    const pct = (val: number): string =>
      totalArea > 0 ? ((val / totalArea) * 100).toFixed(2) + '%' : '0%';

    const agendaData: Record<string, string> = {};
    for (const [idx, item] of (meeting.agendaItems ?? []).entries()) {
      const n = idx + 1;
      const text: string =
        item.customProtocolText ?? item.question?.protocolText ?? item.question?.shortTitle ?? '';
      agendaData[`Содержимое_вопроса_${n}`] = text;
      agendaData[`Содержимое вопроса_${n}`] = text;
      agendaData[`ПРЕДЛОЖЕННОЕ_РЕШЕНИЕ_ВОПРОСА_${n}`] =
        manual[`ПРЕДЛОЖЕННОЕ_РЕШЕНИЕ_ВОПРОСА_${n}`] ?? '';
    }

    const ownersCount = await this.prisma.owner.count();
    const participantOwners = new Set(answers.map((a: any) => a.ownerId)).size;

    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      НОМЕР_ПРОТОКОЛА: manual.НОМЕР_ПРОТОКОЛА ?? meeting.number ?? '',
      ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ_ОБЩЕГО_СОБРАНИЯ: formatDate(meeting.resultsDate ?? meeting.endDate),
      РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА: manual.РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА ?? '',
      ФИО_ПРЕДСЕДАТЕЛЯ: manual.ФИО_ПРЕДСЕДАТЕЛЯ ?? '',
      ФИО_СЕКРЕТАРЯ: manual.ФИО_СЕКРЕТАРЯ ?? '',
      Дата_и_время_начала_проведения_голосования: formatDateTime(meeting.startDate),
      'Дата_и_время__окончания_проведения_голосования': formatDateTime(meeting.endDate),
      Общее_количество_собственников_помещений_в_многоквартирном_доме: ownersCount.toString(),
      сумма_площадей_жилых_и_нежилых_помещений_собственников_помещений_в_многоквартирном_доме:
        totalArea.toFixed(2),
      Площадь_жилых_и_нежилых_помещений_собственников_помещений_в_многоквартирном_доме_принявших_участие_в_голосовании_на_общем_собрании:
        votedArea.toFixed(2),
      Количество_собственников_жилых_и_нежилых_помещений_в_многоквартирном_доме_принявших_участие_в_голосовании_на_общем_собрании:
        participantOwners.toString(),
      процент_от_общей_площади_жилых_и_нежилых_помещений_многоквартирного_дома: pct(votedArea),
      количество_процентов: pct(votedArea),
      вид_кворума: manual.вид_кворума ?? 'заочное',
      сумма_весов_участников_голосования_проголосовавших_за: forArea.toFixed(2),
      сумма_весов_участников_голосования_проголосовавших_против: againstArea.toFixed(2),
      сумма_весов_участников_голосования_проголосовавших_воздерживаясь: abstainArea.toFixed(2),
      сумма_весов_участников_голосования_не_проголосовавших: notVotedArea.toFixed(2),
      процент_проголосовавших_за_от_общего_числа_голосов: pct(forArea),
      процент_проголосовавших_против_от_общего_числа_голосов: pct(againstArea),
      процент_проголосовавших_воздерживаясь_от_общего_числа_голосов: pct(abstainArea),
      процент_не_проголосовавших_против_от_общего_числа_голосов: pct(notVotedArea),
      'принято/не_принято': manual['принято/не_принято'] ?? '',
      ...agendaData,
      ...manual,
    };
    return renderTemplate(loadTemplate('protocol.docx'), data);
  }

  // ── 11. Акт о размещении сообщения об итогах голосования ───
  private async generateActAfterVoting(meeting: any, manual: Record<string, string>): Promise<Buffer> {
    const data: Record<string, string> = {
      ПОЛНЫЙ_АДРЕС_ДОМА: meeting.building.address,
      ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ: formatDate(meeting.startDate),
      ДАТА_КОНЦА_ГОЛОСОВАНИЯ: formatDate(meeting.endDate),
      ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ: formatDate(meeting.resultsDate ?? meeting.endDate),
      РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА: manual.РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА ?? '',
      ...manual,
    };
    return renderTemplate(loadTemplate('act.docx'), data);
  }

  // ── Meta: список переменных для фронтенда ──────────────────
  async getTemplateVariables(type: DocumentType): Promise<{ auto: string[]; manual: string[] }> {
    const autoMap: Record<DocumentType, string[]> = {
      act: ['ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ'],
      registration_sheet: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ', 'ГОД',
      ],
      protocol: [
        'ПОЛНЫЙ_АДРЕС_ДОМА',
        'Дата_и_время_начала_проведения_голосования',
        'Дата_и_время__окончания_проведения_голосования',
        'Общее_количество_собственников_помещений_в_многоквартирном_доме',
        'сумма_площадей_жилых_и_нежилых_помещений_собственников_помещений_в_многоквартирном_доме',
        'количество_процентов',
        'процент_проголосовавших_за_от_общего_числа_голосов',
        'процент_проголосовавших_против_от_общего_числа_голосов',
        'процент_проголосовавших_воздерживаясь_от_общего_числа_голосов',
        'процент_не_проголосовавших_против_от_общего_числа_голосов',
        'Содержимое_вопроса_1..N',
      ],
      ballot: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'НОМЕР_КВАРТИРЫ', 'ПЛОЩАДЬ_КВАРТИРЫ', 'ФИО_СОБСТВЕННИКА',
        'ИНИЦИАЛЫ_СОБСТВЕННИКА', 'кадастровый_номер', 'числитель', 'знаменатель',
        'год_регистрации', 'номер_регистрации_права',
        'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ', 'СОДЕРЖАНИЕ_ВОПРОСА_1..N',
      ],
      meeting_message: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ',
        'ДАТА_ФОРМИРОВАНИЯ_СООБЩЕНИЯ', 'ВОПРОС_1..N (из повестки)',
      ],
      register_of_owners: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'КАДАСТРОВЫЙ_НОМЕР_ДОМА',
        'Строки таблицы: НОМЕР_ПОМЕЩЕНИЯ, ФОРМА_СОБСТВЕННОСТИ, РЕКВИЗИТЫ_ПРАВА, ФИО_НАИМЕНОВАНИЕ, ПЛОЩАДЬ, ДОЛЯ, S_ДОЛИ, ПРОЦЕНТ_ГОЛОСОВ',
        'ИТОГО_S_ДОЛИ, ИТОГО_ПРОЦЕНТ',
      ],
      sheet_of_invited_persons: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ',
        'Строки таблицы (из СПИСОК_ПРИГЛАШЕННЫХ): НОМЕР_СТРОКИ, ФИО_ПРИГЛАШЕННОГО_ИЛИ_НАИМЕНОВАНИЕ_И_ОГРН, ФИО_ПРЕДСТАВИТЕЛЯ, ЦЕЛЬ_УЧАСТИЯ',
      ],
      sheet_of_the_persons_present: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ',
        'Строки таблицы (проголосовавшие): НОМЕР_ПОМЕЩЕНИЯ, ФИО_СОБСТВЕННИКА, ГОЛОСА_М2, ГОЛОСА_ПРОЦЕНТ',
        'ИТОГО_ГОЛОСА_М2, ИТОГО_ГОЛОСА_ПРОЦЕНТ',
      ],
      voting_results_notice: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ',
        'ДАТА_ФОРМИРОВАНИЯ_СООБЩЕНИЯ', 'ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ', 'ВОПРОС_1..N (из повестки)',
      ],
      voting_results: [
        'ПОЛНЫЙ_АДРЕС_ДОМА',
        'Дата_и_время_начала_проведения_голосования',
        'Дата_и_время__окончания_проведения_голосования',
        'ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ_ОБЩЕГО_СОБРАНИЯ',
        'количество_процентов',
        'процент_проголосовавших_за_от_общего_числа_голосов',
        'процент_проголосовавших_против_от_общего_числа_голосов',
        'процент_проголосовавших_воздерживаясь_от_общего_числа_голосов',
        'процент_не_проголосовавших_против_от_общего_числа_голосов',
      ],
      act_after_voting: [
        'ПОЛНЫЙ_АДРЕС_ДОМА', 'ДАТА_НАЧАЛА_ГОЛОСОВАНИЯ', 'ДАТА_КОНЦА_ГОЛОСОВАНИЯ', 'ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ',
      ],
    };
    const manualMap: Record<DocumentType, string[]> = {
      act: ['РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА'],
      registration_sheet: ['НОМЕР_ПРОТОКОЛА', 'НОМЕР_ПРИЛОЖЕНИЯ'],
      protocol: [
        'НОМЕР_ПРОТОКОЛА', 'РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА',
        'ФИО_ПРЕДСЕДАТЕЛЯ', 'ФИО_СЕКРЕТАРЯ',
        'СПИСОК_ФИО_ЛИЦ (по одному на строку)',
        'вид_кворума', 'принято/не_принято',
        'ПРЕДЛОЖЕННОЕ_РЕШЕНИЕ_ВОПРОСА_1..N',
        'ДАТА_ПОДВЕДЕНИЯ_ИТОГОВ_ОБЩЕГО_СОБРАНИЯ',
      ],
      ballot: [
        'НОМЕР_БЮЛЛЕТЕНИ', 'дата', 'порядковый_номер_записи',
        'год_регистрации (если не заполнен в системе)',
      ],
      meeting_message: [
        'ВРЕМЯ_НАЧАЛА', 'ВРЕМЯ_КОНЦА',
        'ФОРМА_СОБРАНИЯ (по умолчанию: заочное)',
        'РЕКВИЗИТЫ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ',
        'НАИМЕНОВАНИЕ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ',
        'АДРЕС_ПРИЕМА_РЕШЕНИЙ',
        'МЕСТО_ОЗНАКОМЛЕНИЯ',
      ],
      register_of_owners: [
        'НОМЕР_ПРОТОКОЛА', 'НОМЕР_ПРИЛОЖЕНИЯ', 'ДАТА_ПРОТОКОЛА',
      ],
      sheet_of_invited_persons: [
        'НОМЕР_ПРОТОКОЛА', 'НОМЕР_ПРИЛОЖЕНИЯ', 'ДАТА_ПРОТОКОЛА',
        'ФОРМА_СОБРАНИЯ (по умолчанию: заочное)',
        'СПИСОК_ПРИГЛАШЕННЫХ (JSON-массив: [{"ФИО":"...","ПРЕДСТАВИТЕЛЬ":"...","ЦЕЛЬ":"..."}])',
      ],
      sheet_of_the_persons_present: [
        'НОМЕР_ПРОТОКОЛА', 'НОМЕР_ПРИЛОЖЕНИЯ', 'ДАТА_ПРОТОКОЛА',
      ],
      voting_results_notice: [
        'ФОРМА_СОБРАНИЯ',
        'РЕКВИЗИТЫ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ',
        'НАИМЕНОВАНИЕ_УПРАВЛЯЮЩЕЙ_КОМПАНИИ',
        'МЕСТО_ОЗНАКОМЛЕНИЯ',
      ],
      voting_results: [
        'НОМЕР_ПРОТОКОЛА', 'РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА',
        'ФИО_ПРЕДСЕДАТЕЛЯ', 'ФИО_СЕКРЕТАРЯ',
        'вид_кворума', 'принято/не_принято',
        'ПРЕДЛОЖЕННОЕ_РЕШЕНИЕ_ВОПРОСА_1..N',
      ],
      act_after_voting: ['РЕКВИЗИТЫ_ОРГАНИЗАЦИИ_ИНИЦИАТОРА'],
    };
    return { auto: autoMap[type] ?? [], manual: manualMap[type] ?? [] };
  }
}