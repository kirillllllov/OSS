// ballot-scanner.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as AdmZip from 'adm-zip';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// ─── Python scanner ───────────────────────────────────────────────────────────
// Всю логику детекции QR и замера пикселей выполняет scripts/ballot_scanner.py
// Геометрия бюллетеня описана в самом скрипте (синхронизирована с генератором).
const PYTHON_SCANNER = path.join(process.cwd(), 'scripts/ballot_scanner.py');

// ─── Интерфейсы ──────────────────────────────────────────────────────────────

export interface ConflictVote {
  questionNumber: number;
  marks: { vote: string; darkRatio: number }[];
}

export interface ScanResult {
  filename: string;
  ownerId?: string;
  ownerName?: string;
  meetingId?: string;
  votes: { questionNumber: number; vote: string; confidence: number }[];
  conflicts: ConflictVote[];
  saved: boolean;
  error?: string;
}

export interface ScanJob {
  jobId: string;
  meetingId: string;
  status: 'processing' | 'completed' | 'failed';
  total: number;
  processed: number;
  results: ScanResult[];
  errors: string[];
  createdAt: Date;
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

// ─── Сервис ───────────────────────────────────────────────────────────────────

@Injectable()
export class BallotScannerService {
  private readonly logger = new Logger(BallotScannerService.name);
  private readonly jobs = new Map<string, ScanJob>();

  constructor(private readonly prisma: PrismaService) {}

  getJob(jobId: string): ScanJob | undefined {
    return this.jobs.get(jobId);
  }

  async correctResult(
    jobId: string,
    meetingId: string,
    resultIndex: number,
    newOwnerId: string,
    votes: { questionNumber: number; vote: string }[],
  ): Promise<ScanJob> {
    const job = this.jobs.get(jobId);
    if (!job || job.meetingId !== meetingId)
      throw new Error('Задание не найдено');
    if (resultIndex < 0 || resultIndex >= job.results.length)
      throw new Error('Результат не найден');

    const result = job.results[resultIndex];

    const agendaItems = await this.prisma.agendaItem.findMany({
      where: { meetingId },
      orderBy: { orderNumber: 'asc' },
    });
    const agendaItemIds = agendaItems.map((a: any) => a.id);

    if (result.saved && result.ownerId && result.ownerId !== newOwnerId) {
      await this.prisma.questionAnswer.deleteMany({
        where: { ownerId: result.ownerId, agendaItemId: { in: agendaItemIds } },
      });
    }

    await this.saveVotes(newOwnerId, agendaItems, votes);

    const owner = await this.prisma.owner.findUnique({
      where: { id: newOwnerId },
    });
    result.ownerId = newOwnerId;
    result.ownerName = owner?.fullName ?? newOwnerId;
    result.votes = votes.map((v) => ({ ...v, confidence: 1.0 }));
    result.conflicts = [];
    result.saved = true;
    result.error = undefined;

    return job;
  }

  async startScan(meetingId: string, zipFilePath: string): Promise<string> {
    const jobId = `scan_${meetingId}_${Date.now()}`;
    const job: ScanJob = {
      jobId,
      meetingId,
      status: 'processing',
      total: 0,
      processed: 0,
      results: [],
      errors: [],
      createdAt: new Date(),
    };
    this.jobs.set(jobId, job);

    this.processScan(job, zipFilePath).catch((err) => {
      this.logger.error(`Scan job ${jobId} failed: ${err.message}`);
      job.status = 'failed';
      job.errors.push(err.message);
    });

    return jobId;
  }

  // ─── Обработка архива ──────────────────────────────────────────────────────

  private async processScan(job: ScanJob, zipFilePath: string): Promise<void> {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: job.meetingId },
    });
    if (!meeting) {
      job.status = 'failed';
      job.errors.push('Собрание не найдено');
      return;
    }

    const agendaItems = await this.prisma.agendaItem.findMany({
      where: { meetingId: job.meetingId },
      orderBy: { orderNumber: 'asc' },
    });

    const images = await this.extractImages(zipFilePath, job);
    job.total = images.length;

    if (images.length === 0) {
      job.status = 'failed';
      job.errors.push('В архиве не найдены изображения (PNG, JPG) и PDF-файлы');
      return;
    }

    for (const { filename, buffer } of images) {
      const result: ScanResult = {
        filename,
        votes: [],
        conflicts: [],
        saved: false,
      };

      try {
        const scanned = await this.processImageWithPython(buffer, filename, job.meetingId);

        result.ownerId = scanned.ownerId;
        result.meetingId = scanned.meetingId;
        result.votes = scanned.votes;
        result.conflicts = scanned.conflicts;

        if (!scanned.ownerId) {
          result.error =
            'QR-код бюллетеня не обнаружен (BALLOT QR отсутствует или нечитаем)';
        } else if (scanned.meetingId && scanned.meetingId !== job.meetingId) {
          result.error = `Бюллетень принадлежит другому собранию (${scanned.meetingId})`;
        } else {
          const owner = await this.prisma.owner.findUnique({
            where: { id: scanned.ownerId },
          });
          result.ownerName = owner?.fullName ?? scanned.ownerId;

          if (scanned.conflicts.length > 0) {
            result.error = `Конфликт в ${scanned.conflicts.length} вопр. — требуется ручная проверка`;
          } else if (scanned.votes.length === 0) {
            result.error = 'Не найдено ни одной отметки в бюллетене';
          } else {
            await this.saveVotes(scanned.ownerId, agendaItems, scanned.votes);
            result.saved = true;
          }
        }
      } catch (err) {
        result.error = (err as Error).message;
        this.logger.warn(
          `Error processing ${filename}: ${(err as Error).message}`,
        );
      }

      job.results.push(result);
      job.processed++;
    }

    job.status = 'completed';
  }

  private async extractImages(
    zipFilePath: string,
    job: ScanJob,
  ): Promise<{ filename: string; buffer: Buffer }[]> {
    const zip = new AdmZip(zipFilePath);
    const entries = zip.getEntries();
    const images: { filename: string; buffer: Buffer }[] = [];
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ballot-'));

    try {
      for (const entry of entries) {
        if (entry.isDirectory) continue;
        const ext = path.extname(entry.entryName).toLowerCase();

        if (IMAGE_EXTENSIONS.has(ext)) {
          images.push({ filename: entry.entryName, buffer: entry.getData() });
        } else if (ext === '.pdf') {
          const pages = await this.convertPdfToImages(
            entry.getData(),
            entry.entryName,
            tmpDir,
          );
          images.push(...pages);
        }
      }
    } finally {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {
        /* ignore */
      }
    }

    return images;
  }

  private async convertPdfToImages(
    pdfBuffer: Buffer,
    originalName: string,
    tmpDir: string,
  ): Promise<{ filename: string; buffer: Buffer }[]> {
    const stamp = Date.now();
    const pdfPath = path.join(tmpDir, `in_${stamp}.pdf`);
    const outPrefix = path.join(tmpDir, `pg_${stamp}`);
    fs.writeFileSync(pdfPath, pdfBuffer);

    try {
      await execFileAsync('pdftoppm', [
        '-png',
        '-r',
        '200',
        pdfPath,
        outPrefix,
      ]);
    } catch (err) {
      this.logger.warn(
        `pdftoppm failed for ${originalName}: ${(err as Error).message}`,
      );
      return [];
    }

    const results: { filename: string; buffer: Buffer }[] = [];
    const pageFiles = fs
      .readdirSync(tmpDir)
      .filter(
        (f) => f.startsWith(path.basename(outPrefix)) && f.endsWith('.png'),
      )
      .sort();

    for (const f of pageFiles) {
      const pageNum = f.match(/-(\d+)\.png$/)?.[1] ?? '1';
      results.push({
        filename: `${originalName}#page${pageNum}`,
        buffer: fs.readFileSync(path.join(tmpDir, f)),
      });
    }

    return results;
  }

  // ─── Сканирование через Python-скрипт ────────────────────────────────────
  //
  // Все операции (декодирование, поиск QR через zxing-cpp, замер пикселей
  // в ячейках голосования) выполняет scripts/ballot_scanner.py.
  // NestJS только запускает скрипт и разбирает JSON из stdout.

  private async processImageWithPython(
    buffer: Buffer,
    filename: string,
    jobMeetingId: string,
  ): Promise<{
    ownerId?: string;
    meetingId?: string;
    votes: { questionNumber: number; vote: string; confidence: number }[];
    conflicts: ConflictVote[];
  }> {
    const ext =
      path.extname(filename.replace(/#.*$/, '')).toLowerCase() || '.png';
    const tmpFile = path.join(
      os.tmpdir(),
      `ballot_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`,
    );
    await fs.promises.writeFile(tmpFile, buffer);

    let rawOutput = '';
    try {
      const { stdout } = await execFileAsync(
        'python3',
        [PYTHON_SCANNER, tmpFile],
        { timeout: 30_000 },
      );
      rawOutput = stdout;
    } finally {
      await fs.promises.unlink(tmpFile).catch(() => {});
    }

    this.logger.debug(
      `[${filename}] Python scanner: ${rawOutput.slice(0, 300)}`,
    );

    let parsed: any;
    try {
      parsed = JSON.parse(rawOutput);
    } catch {
      throw new Error(
        `Python scanner вернул не JSON: ${rawOutput.slice(0, 200)}`,
      );
    }

    if (parsed.error) {
      throw new Error(`Python scanner error: ${parsed.error}`);
    }

    this.logger.debug(
      `[${filename}] QR codes: ${parsed.qr_count} — ${(parsed.qr_texts as string[]).join(' | ')}`,
    );

    const jobMeetingPrefix = jobMeetingId.split('-')[0];
    let ownerId: string | undefined;
    let meetingId: string | undefined;

    if (parsed.meeting_prefix) {
      meetingId =
        (parsed.meeting_prefix as string) === jobMeetingPrefix
          ? jobMeetingId
          : (parsed.meeting_prefix as string);
    }

    if (parsed.owner_prefix) {
      const owner = await this.prisma.owner.findFirst({
        where: { id: { startsWith: parsed.owner_prefix as string } },
      });
      ownerId = owner?.id;
      this.logger.debug(
        `[${filename}] Owner prefix "${parsed.owner_prefix}" → ${ownerId ?? 'not found'}`,
      );
    }

    const votes: { questionNumber: number; vote: string; confidence: number }[] =
      ((parsed.votes as any[]) || []).map((v: any) => ({
        questionNumber: Number(v.question_number),
        vote: String(v.vote),
        confidence: Number(v.confidence ?? 0),
      }));

    const conflicts: ConflictVote[] = ((parsed.conflicts as any[]) || []).map(
      (c: any) => ({
        questionNumber: Number(c.question_number),
        marks: (c.marks as any[]).map((m: any) => ({
          vote: String(m.vote),
          darkRatio: Number(m.dark_ratio ?? 0),
        })),
      }),
    );

    votes.sort((a, b) => a.questionNumber - b.questionNumber);
    conflicts.sort((a, b) => a.questionNumber - b.questionNumber);

    return { ownerId, meetingId, votes, conflicts };
  }


  private async saveVotes(
    ownerId: string,
    agendaItems: any[],
    votes: { questionNumber: number; vote: string }[],
  ): Promise<void> {
    for (const vote of votes) {
      const item = agendaItems.find(
        (a) => a.orderNumber === vote.questionNumber,
      );
      if (!item) continue;
      await this.prisma.questionAnswer.upsert({
        where: { ownerId_agendaItemId: { ownerId, agendaItemId: item.id } },
        update: { vote: vote.vote },
        create: { ownerId, agendaItemId: item.id, vote: vote.vote },
      });
    }
  }
}
