// ballot-generator.ts
import {
  AlignmentType,
  BorderStyle,
  convertMillimetersToTwip,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import * as QRCode from 'qrcode';

const FONT = 'Times New Roman';
const MARGIN_MM = 15;
const PAGE_W_MM = 210;
const USABLE_W_MM = PAGE_W_MM - 2 * MARGIN_MM; // 180 мм

// Колонки таблицы вопросов (мм): QR | текст | ЗА | ПРОТИВ | ВОЗДЕРЖАЛСЯ
// 15 + 107 + 18 + 18 + 22 = 180 мм
const Q_COL = [15, 107, 18, 18, 22] as const;

const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 18,
  nm: 20,
  lg: 24,
  xl: 28,
};

// Родительный падеж месяцев для дат формата «ДД» месяц ГГГГ года
const MONTHS_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

// ── Утилиты ────────────────────────────────────────────────────────────────

function mm(v: number): number {
  return convertMillimetersToTwip(v);
}

function px(v: number): number {
  return Math.round((v * 96) / 25.4);
}

function sanitize(s: string | null | undefined): string {
  if (!s) return '';
  return String(s)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function tr(
  text: string | null | undefined,
  opts: {
    bold?: boolean;
    size?: number;
    italic?: boolean;
    underline?: boolean;
  } = {},
): TextRun {
  return new TextRun({
    text: sanitize(text) || ' ',
    font: FONT,
    size: opts.size ?? FONT_SIZES.nm,
    bold: opts.bold,
    italics: opts.italic,
    underline: opts.underline ? {} : undefined,
  });
}

function para(
  children: TextRun[],
  align: string = AlignmentType.LEFT,
  before = 0,
  after = 0,
): Paragraph {
  return new Paragraph({
    alignment: align as any,
    spacing: { before, after },
    children: children.length > 0 ? children : [tr(' ')],
  });
}

function emptyPara(size = FONT_SIZES.sm): Paragraph {
  return new Paragraph({ children: [tr(' ', { size })] });
}

const B_NONE = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const B_MED = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const B_THIN = { style: BorderStyle.SINGLE, size: 2, color: '888888' };

const BORDERS_NONE = {
  top: B_NONE,
  bottom: B_NONE,
  left: B_NONE,
  right: B_NONE,
};
const BORDERS_ALL = { top: B_MED, bottom: B_MED, left: B_MED, right: B_MED };
const BORDERS_THICK = {
  top: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
  bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
  left: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
  right: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
};
const BORDERS_BOTTOM = {
  top: B_NONE,
  bottom: B_THIN,
  left: B_NONE,
  right: B_NONE,
};

function tc(
  children: (Paragraph | Table)[],
  opts: {
    span?: number;
    widthMm?: number;
    borders?: object;
    valign?: string;
    fill?: string;
    mT?: number;
    mB?: number;
    mL?: number;
    mR?: number;
  } = {},
): TableCell {
  return new TableCell({
    children: children.length > 0 ? children : [emptyPara()],
    columnSpan: opts.span ?? 1,
    width:
      opts.widthMm !== undefined
        ? { size: mm(opts.widthMm), type: WidthType.DXA }
        : undefined,
    borders: opts.borders ?? BORDERS_ALL,
    verticalAlign: (opts.valign ?? VerticalAlign.CENTER) as any,
    shading: opts.fill
      ? { fill: opts.fill, type: ShadingType.CLEAR, color: opts.fill }
      : undefined,
    margins: {
      top: opts.mT ?? 40,
      bottom: opts.mB ?? 40,
      left: opts.mL ?? 80,
      right: opts.mR ?? 80,
    },
  });
}

// ── QR ─────────────────────────────────────────────────────────────────────

async function makeQR(data: string, sizePx = 120): Promise<Buffer> {
  try {
    return await QRCode.toBuffer(data, {
      width: sizePx,
      margin: 1,
      errorCorrectionLevel: 'H',
      color: { dark: '#000000', light: '#ffffff' },
    });
  } catch {
    return Buffer.from('');
  }
}

// ── Форматирование ─────────────────────────────────────────────────────────

function formatDate(v: string | Date | null | undefined): string {
  if (!v) return '';
  try {
    const d = new Date(v);
    if (isNaN(d.getTime())) return sanitize(String(v));
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  } catch {
    return sanitize(String(v));
  }
}

function formatDateRu(
  v: string | Date | null | undefined,
): { day: string; month: string; year: string } | null {
  if (!v) return null;
  try {
    const d = new Date(v);
    if (isNaN(d.getTime())) return null;
    return {
      day: String(d.getDate()).padStart(2, '0'),
      month: MONTHS_RU[d.getMonth()],
      year: String(d.getFullYear()),
    };
  } catch {
    return null;
  }
}

function formatSnils(v: string | null | undefined): string {
  if (!v) return '';
  const d = v.replace(/\D/g, '');
  if (d.length === 11)
    return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 9)} ${d.slice(9, 11)}`;
  return sanitize(v);
}

function initials(name: string): string {
  const p = (name || '').trim().split(/\s+/);
  if (p.length < 2) return name || '';
  const [last, first, mid] = p;
  return `${last} ${first ? first[0] + '.' : ''}${mid ? mid[0] + '.' : ''}`;
}

// ── Основная функция генерации ─────────────────────────────────────────────

export async function generateBallotBuffer(
  meeting: {
    id: string;
    number: string | null;
    form?: string | null;
    building: { address: string };
    startDate: string | Date | null;
    endDate: string | Date | null;
    agendaItems: Array<{
      id: string;
      orderNumber: number;
      customBulletinText?: string | null;
      customProtocolText?: string | null;
      question?: {
        bulletinText?: string | null;
        shortTitle?: string | null;
      } | null;
    }>;
  },
  owner: {
    id: string;
    fullName: string;
    birthDate?: string | null;
    snils?: string | null;
    contacts?: string | null;
    ownershipRights: Array<{
      share?: string | null;
      registrationDate?: string | null;
      titleDocument?: string | null;
      premise?: {
        number?: string | null;
        area?: number | null;
        cadastralNumber?: string | null;
      } | null;
    }>;
  },
): Promise<Buffer> {
  // ── Безопасные дефолты ───────────────────────────────────────────────────
  // Перевод кода формы собрания в русский текст
  const FORM_RU: Record<string, string> = {
    in_person: 'очного голосования',
    absentee: 'заочного голосования',
    mixed: 'очно-заочного голосования',
  };
  const rawForm = meeting?.form || 'mixed';
  const formRu = FORM_RU[rawForm] || rawForm;

  const sm = {
    id: meeting?.id || 'unknown',
    number: meeting?.number || '1',
    form: formRu,
    address: meeting?.building?.address || 'Адрес не указан',
    startDate: meeting?.startDate ?? null,
    endDate: meeting?.endDate ?? null,
    agendaItems: meeting?.agendaItems || [],
  };
  const so = {
    id: owner?.id || 'unknown',
    fullName: owner?.fullName || 'Собственник',
    birthDate: owner?.birthDate ?? null,
    snils: owner?.snils ?? null,
    contacts: owner?.contacts ?? null,
    rights: owner?.ownershipRights || [],
  };

  const rights = so.rights[0] || ({} as any);
  const premise = (rights as any)?.premise || {};

  // ── QR-данные ────────────────────────────────────────────────────────────
  const m8 = sm.id.split('-')[0];
  const o8 = so.id.split('-')[0];

  const [headerQrSmall, headerQrLarge, ...questionQRs] = await Promise.all([
    makeQR(`B|${m8}|${o8}`, px(8)),
    makeQR(`B|${m8}|${o8}`, px(Q_COL[0] - 2)),
    ...sm.agendaItems.map((item) =>
      makeQR(`V|${m8}|${o8}|${item.orderNumber}`, px(Q_COL[0] - 2)),
    ),
  ]);

  // ── Реквизиты собственника ────────────────────────────────────────────────
  const shareParts = ((rights as any)?.share ?? '1/1').split('/');
  const shareNum = Number(shareParts[0]?.trim()) || 1;
  const shareDen = Number(shareParts[1]?.trim()) || 1;
  const shareStr = `${shareNum}/${shareDen}`;

  // Общая площадь помещения
  const premiseArea = (() => {
    if (premise?.area == null) return '';
    return Number.isInteger(premise.area)
      ? String(premise.area)
      : premise.area.toFixed(1);
  })();

  // Площадь голосования = общая площадь × доля собственника
  const votingArea = (() => {
    if (premise?.area == null) return premiseArea;
    const v = premise.area * (shareNum / shareDen);
    return Number.isInteger(v)
      ? String(v)
      : parseFloat(v.toFixed(2)).toString();
  })();
  const premiseNum = premise?.number || '';
  const titleDoc = (rights as any)?.titleDocument || '';
  const regDate = formatDate((rights as any)?.registrationDate);
  const cadastral = premise?.cadastralNumber || '';
  const snilsFmt = formatSnils(so.snils);

  // ── Даты ─────────────────────────────────────────────────────────────────
  const startRu = formatDateRu(sm.startDate);
  const endRu = formatDateRu(sm.endDate);

  // ── Placeholder-значения для незаполненных полей ─────────────────────────
  const dash = (v: string, len = 20) => v || '_'.repeat(len);

  // ── Дети секции документа ─────────────────────────────────────────────────
  const children: (Paragraph | Table)[] = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. ШАПКА — правое выравнивание (Приложение №1 / реквизиты протокола)
  // ═══════════════════════════════════════════════════════════════════════════
  children.push(
    para(
      [tr('Приложение №1', { bold: true, size: FONT_SIZES.sm })],
      AlignmentType.RIGHT,
    ),
    para(
      [
        tr(
          'к Протоколу общего собрания собственников помещений в многоквартирном доме,',
          { size: FONT_SIZES.sm },
        ),
      ],
      AlignmentType.RIGHT,
    ),
    para(
      [tr(`расположенном по адресу: ${sm.address},`, { size: FONT_SIZES.sm })],
      AlignmentType.RIGHT,
    ),
  );

  if (endRu) {
    children.push(
      para(
        [
          tr(`от «${endRu.day}» ${endRu.month} ${endRu.year}г.`, {
            size: FONT_SIZES.sm,
          }),
        ],
        AlignmentType.RIGHT,
      ),
    );
  }

  children.push(
    para(
      [tr('Регистрационный номер', { size: FONT_SIZES.sm })],
      AlignmentType.RIGHT,
    ),
    para(
      [tr(`протокола: ${sm.number}.`, { size: FONT_SIZES.sm })],
      AlignmentType.RIGHT,
    ),
    emptyPara(),
    emptyPara(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. ЗАГОЛОВОК — по центру
  // ═══════════════════════════════════════════════════════════════════════════
  children.push(
    para(
      [tr('РЕШЕНИЕ СОБСТВЕННИКА', { bold: true, size: FONT_SIZES.xl })],
      AlignmentType.CENTER,
    ),
    para(
      [
        tr('по вопросам голосования на общем собрании', {
          size: FONT_SIZES.sm,
        }),
      ],
      AlignmentType.CENTER,
    ),
    para(
      [
        tr('собственников помещений многоквартирного дома,', {
          size: FONT_SIZES.sm,
        }),
      ],
      AlignmentType.CENTER,
    ),
    para(
      [tr(`расположенного по адресу: ${sm.address},`, { size: FONT_SIZES.sm })],
      AlignmentType.CENTER,
    ),
    para(
      [tr(`проводимого в форме ${sm.form}`, { size: FONT_SIZES.sm })],
      AlignmentType.CENTER,
    ),
  );

  if (startRu) {
    children.push(
      para(
        [
          tr(
            `очное голосование: «${startRu.day}» ${startRu.month} ${startRu.year} года`,
            { size: FONT_SIZES.sm },
          ),
        ],
        AlignmentType.CENTER,
      ),
    );
  }
  if (startRu && endRu) {
    children.push(
      para(
        [
          tr(
            `заочное голосование: с «${startRu.day}» ${startRu.month} ${startRu.year} года`,
            { size: FONT_SIZES.sm },
          ),
          tr(` по «${endRu.day}» ${endRu.month} ${endRu.year} года`, {
            size: FONT_SIZES.sm,
          }),
        ],
        AlignmentType.CENTER,
      ),
    );
  }

  children.push(emptyPara(), emptyPara());

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. БЛОК СОБСТВЕННИКА — текст с подчёркнутыми полями
  // ═══════════════════════════════════════════════════════════════════════════

  // «Я, [ФИО] дата рождения [дата],»
  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { before: 0, after: 80 },
      children: [
        tr('Я, ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),

        tr(dash(so.fullName, 50), { size: FONT_SIZES.sm, bold: !!so.fullName }),
        tr(',', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(' дата рождения ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(so.birthDate ? formatDate(so.birthDate) : '', 15), {
          size: FONT_SIZES.sm,
          bold: !!so.birthDate,
        }),
        tr(',', { size: FONT_SIZES.sm }),
      ],
    }),
  );

  // «являющийся (-аяся) собственником ... жилого помещения №... »
  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { before: 0, after: 0 },
      children: [
        tr('являющийся (-аяся) собственником (указать долю: ', {
          size: FONT_SIZES.sm,
        }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(shareStr, { size: FONT_SIZES.sm, bold: true }),
        tr(' ) жилого (нежилого) помещения № ', { size: FONT_SIZES.sm }),
        tr(dash(premiseNum, 5), { size: FONT_SIZES.sm, bold: !!premiseNum }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(' дома по адресу: ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(sm.address, { size: FONT_SIZES.sm }),
        tr(', общей площадью ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(premiseArea, 6), { size: FONT_SIZES.sm, bold: !!premiseArea }),
        tr(' м², обладающий(-ая) количеством голосов ', {
          size: FONT_SIZES.sm,
        }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(votingArea, 7), { size: FONT_SIZES.sm, bold: !!votingArea }),
        tr(' м², правоустанавливающий документ: ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(titleDoc, 30), { size: FONT_SIZES.sm, bold: !!titleDoc }),
      ],
    }),
  );

  // «№[кадастр/документ] от [дата] СНИЛС [снилс] (на основании...)» — один абзац
  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { before: 0, after: 0 },
      children: [
        tr('№ ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(cadastral || titleDoc, 40), { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(' от ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(regDate, 20), { size: FONT_SIZES.sm, bold: !!regDate }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(' СНИЛС ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(dash(snilsFmt, 20), { size: FONT_SIZES.sm, bold: !!so.snils }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(' (на основании ч. 10 ст. 47.1 Жилищного кодекса РФ)', {
          size: FONT_SIZES.sm,
        }),
      ],
    }),
  );

  // «Контактный телефон [значение или прочерк] с согласия (в лице)...»
  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { before: 0, after: 0 },
      children: [
        tr('Контактный телефон ', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),
        so.contacts
          ? tr(so.contacts, { size: FONT_SIZES.sm, bold: true })
          : tr('_'.repeat(45), { size: FONT_SIZES.sm }),
      ],
    }),
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { before: 0, after: 0 },
      children: [
        tr('с согласия (в лице) моего законного представителя', {
          size: FONT_SIZES.sm,
        }),
        tr('_'.repeat(60), { size: FONT_SIZES.sm }),
        tr(', действующего на основании (указать документ)', {
          size: FONT_SIZES.sm,
        }),
        tr('_'.repeat(70), { size: FONT_SIZES.sm }),
      ],
    }),
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { before: 0, after: 0 },
      children: [tr('_'.repeat(70), { size: FONT_SIZES.sm })],
    }),
  );

  children.push(emptyPara());

  // «По вопросам повестки дня выражаю свою волю следующим образом:»
  children.push(
    para(
      [
        tr('По вопросам повестки дня выражаю свою волю следующим образом:', {
          size: FONT_SIZES.sm,
        }),
      ],
      AlignmentType.LEFT,
      0,
      80,
    ),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. ТАБЛИЦА ВОПРОСОВ
  //    Колонки: [QR(15) | текст(107) | ЗА(18) | ПРОТИВ(18) | ВОЗДЕРЖАЛСЯ(22)]
  //
  //  Шапка (1 строка):
  //    [QR small(15) | «Содержание вопроса…» colspan=4 (165мм)]
  //
  //  На каждый вопрос (2 строки):
  //    Строка 1 — текст вопроса: [colspan=5, полная ширина]
  //    Строка 2 — голосование:   [QR(15) | пусто(107) | ЗА(18) | ПРОТИВ(18) | ВОЗДЕРЖАЛСЯ(22)]
  // ═══════════════════════════════════════════════════════════════════════════

  const TOTAL_W = USABLE_W_MM; // 180 мм
  const HDR_TEXT = Q_COL[1] + Q_COL[2] + Q_COL[3] + Q_COL[4]; // 165 мм (colspan=4)

  // Вспомогательная функция: ячейка с меткой ЗА/ПРОТИВ/ВОЗДЕРЖАЛСЯ + пустым полем
  const voteCell = (label: string, colIdx: number): TableCell =>
    new TableCell({
      children: [
        para(
          [tr(label, { bold: true, size: FONT_SIZES.xs })],
          AlignmentType.CENTER,
        ),
        emptyPara(FONT_SIZES.xs),
      ],
      width: { size: mm(Q_COL[colIdx]), type: WidthType.DXA },
      borders: BORDERS_ALL,
      verticalAlign: VerticalAlign.TOP,
      margins: { top: 40, bottom: 40, left: 20, right: 20 },
    });

  const questionRows: TableRow[] = [];

  // ── Шапка: [QR small | «Содержание вопроса…» colspan=4] ──────────────────
  const qrHdrSizePx = px(Q_COL[0] - 3);
  const qrHdrCell =
    !headerQrSmall || headerQrSmall.length === 0
      ? tc([emptyPara()], {
          widthMm: Q_COL[0],
          borders: BORDERS_ALL,
          fill: 'EEEEEE',
        })
      : new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new ImageRun({
                  data: headerQrSmall,
                  type: 'png',
                  transformation: { width: qrHdrSizePx, height: qrHdrSizePx },
                } as any),
              ],
            }),
          ],
          width: { size: mm(Q_COL[0]), type: WidthType.DXA },
          borders: BORDERS_ALL,
          verticalAlign: VerticalAlign.CENTER,
          shading: { fill: 'EEEEEE', type: ShadingType.CLEAR, color: 'EEEEEE' },
          margins: { top: 10, bottom: 10, left: 10, right: 10 },
        });

  const hdrTextCell = new TableCell({
    children: [
      para(
        [
          tr('Содержание вопроса повестки дня', {
            bold: true,
            size: FONT_SIZES.sm,
          }),
        ],
        AlignmentType.CENTER,
      ),
    ],
    columnSpan: 4,
    width: { size: mm(HDR_TEXT), type: WidthType.DXA },
    borders: BORDERS_ALL,
    verticalAlign: VerticalAlign.CENTER,
    shading: { fill: 'EEEEEE', type: ShadingType.CLEAR, color: 'EEEEEE' },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
  });

  questionRows.push(
    new TableRow({
      tableHeader: true,
      children: [qrHdrCell, hdrTextCell],
    }),
  );

  // ── Строки вопросов ────────────────────────────────────────────────────────
  for (let i = 0; i < sm.agendaItems.length; i++) {
    const item = sm.agendaItems[i];
    const qText = sanitize(
      item.customBulletinText ||
        item.question?.bulletinText ||
        item.question?.shortTitle ||
        '',
    );
    const qrBuf = questionQRs[i];
    const qrImgPx = px(Q_COL[0] - 2);

    // ── Строка 1: текст вопроса на всю ширину ─────────────────────────────
    const textRow = new TableRow({
      children: [
        new TableCell({
          children: [
            para([tr(qText, { size: FONT_SIZES.sm })], AlignmentType.BOTH),
          ],
          columnSpan: 5,
          width: { size: mm(TOTAL_W), type: WidthType.DXA },
          borders: BORDERS_ALL,
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        }),
      ],
    });

    // ── Строка 2: QR | пусто | ЗА | ПРОТИВ | ВОЗДЕРЖАЛСЯ ─────────────────
    const qrCell = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children:
            qrBuf && qrBuf.length > 0
              ? [
                  new ImageRun({
                    data: qrBuf,
                    type: 'png',
                    transformation: { width: qrImgPx, height: qrImgPx },
                  } as any),
                ]
              : [tr(String(item.orderNumber), { size: FONT_SIZES.xs })],
        }),
      ],
      width: { size: mm(Q_COL[0]), type: WidthType.DXA },
      borders: BORDERS_ALL,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 20, bottom: 20, left: 10, right: 10 },
    });

    const emptyMiddle = tc([emptyPara()], {
      widthMm: Q_COL[1],
      borders: BORDERS_ALL,
    });

    const voteRow = new TableRow({
      height: { value: mm(18), rule: 'atLeast' },
      children: [
        qrCell,
        emptyMiddle,
        voteCell('За', 2),
        voteCell('Против', 3),
        voteCell('Воздержался', 4),
      ],
    });

    questionRows.push(textRow, voteRow);
  }

  const questionsTable = new Table({
    width: { size: mm(USABLE_W_MM), type: WidthType.DXA },
    columnWidths: Q_COL.map(mm),
    borders: BORDERS_NONE,
    rows: questionRows,
  });

  children.push(questionsTable);
  children.push(emptyPara());

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. СТРОКА ПОДПИСИ
  // ═══════════════════════════════════════════════════════════════════════════

  children.push(
    new Paragraph({
      spacing: { before: 200, after: 0 },

      children: [
        tr('Подпись ', { size: FONT_SIZES.sm }),
        tr('________________', { size: FONT_SIZES.sm }),
        tr(' ', { size: FONT_SIZES.sm }),

        tr(initials(so.fullName) || '_'.repeat(40), {
          size: FONT_SIZES.sm,
          bold: !!so.fullName,
        }),
        tr(' ', { size: FONT_SIZES.sm }),
        tr(' дата ', { size: FONT_SIZES.sm }),
        tr('________', { size: FONT_SIZES.sm }),
        tr('/________/', { size: FONT_SIZES.sm }),
        tr(endRu ? endRu.year : '____', { size: FONT_SIZES.sm }),
        tr('г.', { size: FONT_SIZES.sm }),
      ],
    }),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
  // ═══════════════════════════════════════════════════════════════════════════
  children.push(
    new Paragraph({
      spacing: { before: 120, after: 0 },
      children: [
        tr(
          'Подписывая настоящее решение, я выражаю согласие на обработку моих персональных данных ' +
            'в целях проведения общего собрания собственников помещений в соответствии с ч. 10 ст. 47.1 ЖК РФ.',
          { size: FONT_SIZES.xs, italic: true },
        ),
      ],
    }),
  );

  // ── Сборка документа ──────────────────────────────────────────────────────
  const document = new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: FONT_SIZES.nm, color: '000000' } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: mm(PAGE_W_MM), height: mm(297) },
            margin: {
              top: mm(MARGIN_MM),
              bottom: mm(MARGIN_MM),
              left: mm(MARGIN_MM),
              right: mm(MARGIN_MM),
            },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);
  if (!buffer || buffer.length < 100) {
    throw new Error('Generated document is too small or empty');
  }
  return Buffer.from(buffer);
}
