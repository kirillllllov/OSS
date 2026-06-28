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

// ─── Геометрия бюллетеня (8 колонок) ──────────────────────────────────────
//
// Макет строки вопроса (8 колонок):
//   col0: QR вопроса (x=20мм) | col1: текст (96мм) | col2: gap(2мм) |
//   col3: ЗА(20мм)            | col4: gap(2мм)     | col5: ПРОТИВ(20мм) |
//   col6: gap(2мм)            | col7: ВОЗДЕРЖАЛСЯ(20мм)
//
// Два калибровочных QR (B|m8|o8) находятся в col0 и col7 строки-заголовка
// Они используются для выравнивания всего документа

const QR_SIZE_MM = 20; // Размер QR-кода и каждой ячейки голосования
const GAP_MM = 2; // Зазор 10% от QR_SIZE_MM
const TEXT_COL_MM = 96; // Ширина колонки с текстом вопроса

// Смещения от ЦЕНТРА левого QR (col0) до центров ячеек голосования
// Все смещения считаются строго вправо по оси X
const ZA_CENTER_MM = QR_SIZE_MM / 2 + TEXT_COL_MM + GAP_MM + QR_SIZE_MM / 2;
const PROTIV_CENTER_MM = ZA_CENTER_MM + QR_SIZE_MM / 2 + GAP_MM + QR_SIZE_MM / 2;
const VOZDERZH_CENTER_MM = PROTIV_CENTER_MM + QR_SIZE_MM / 2 + GAP_MM + QR_SIZE_MM / 2;

// Детектируемый размер QR (без quiet-zone, который добавляет ZXing)
const QR_DETECT_SIZE_MM = 17;

const ROW_HEIGHT_MM = QR_SIZE_MM;
const MARK_THRESHOLD = 0.05;
const ZONE_RATIO = 0.7;

type Vote = 'За' | 'Против' | 'Воздержался';

interface VoteCell {
  vote: Vote;
  rightOffsetMm: number; // Смещение от центра левого QR до центра ячейки
  widthMm: number;
}

const VOTE_CELLS: VoteCell[] = [
  { vote: 'За', rightOffsetMm: ZA_CENTER_MM, widthMm: QR_SIZE_MM },
  { vote: 'Против', rightOffsetMm: PROTIV_CENTER_MM, widthMm: QR_SIZE_MM },
  { vote: 'Воздержался', rightOffsetMm: VOZDERZH_CENTER_MM, widthMm: QR_SIZE_MM },
];

// ─── Интерфейсы ──────────────────────────────────────────────────────────────

interface QRLocation {
  topLeftCorner: { x: number; y: number };
  topRightCorner: { x: number; y: number };
  bottomLeftCorner: { x: number; y: number };
  bottomRightCorner: { x: number; y: number };
}

interface QRCode {
  text: string;
  location: QRLocation;
}

interface CalibrationQRs {
  left: QRCode;   // B|m8|o8 в col0
  right: QRCode;  // B|m8|o8 в col7
}

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
        const scanned = await this.processImageByQR(
          buffer,
          filename,
          job.meetingId,
        );

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

  // ─── Декодирование изображения → RGBA пиксели ─────────────────────────────

  private decodeImageToRGBA(
    buffer: Buffer,
    filename: string,
  ): {
    data: Uint8ClampedArray;
    width: number;
    height: number;
  } {
    const ext = path.extname(filename.replace(/#.*$/, '')).toLowerCase();

    if (ext === '.png') {
      const { PNG } = require('pngjs');
      const png = PNG.sync.read(buffer);
      return {
        data: new Uint8ClampedArray(
          png.data.buffer,
          png.data.byteOffset,
          png.data.byteLength,
        ),
        width: png.width,
        height: png.height,
      };
    } else {
      const jpegJs = require('jpeg-js');
      const decoded = jpegJs.decode(buffer, {
        useTArray: true,
        maxMemoryUsageInMB: 512,
      });
      return {
        data: new Uint8ClampedArray(
          decoded.data.buffer,
          decoded.data.byteOffset,
          decoded.data.byteLength,
        ),
        width: decoded.width,
        height: decoded.height,
      };
    }
  }

  // ─── Поиск всех QR-кодов через ZXing ──────────────────────────────────────

  private async findAllQRCodes(
    data: Uint8ClampedArray,
    width: number,
    height: number,
  ): Promise<QRCode[]> {
    const { readBarcodesFromImageData } = await import('zxing-wasm/reader');

    const plainBuffer = new ArrayBuffer(data.byteLength);
    const plainView = new Uint8ClampedArray(plainBuffer);
    plainView.set(data);
    const imageData = {
      data: plainView,
      width,
      height,
      colorSpace: 'srgb' as PredefinedColorSpace,
    };

    const results = await readBarcodesFromImageData(imageData, {
      formats: ['QRCode'],
      tryHarder: true,
      tryRotate: true,
      tryInvert: true,
      tryDownscale: true,
      maxNumberOfSymbols: 255,
    });

    const seen = new Set<string>();
    const unique = results.filter((r) => {
      if (seen.has(r.text)) return false;
      seen.add(r.text);
      return true;
    });

    return unique.map((r) => ({
      text: r.text,
      location: {
        topLeftCorner: { x: r.position.topLeft.x, y: r.position.topLeft.y },
        topRightCorner: { x: r.position.topRight.x, y: r.position.topRight.y },
        bottomLeftCorner: {
          x: r.position.bottomLeft.x,
          y: r.position.bottomLeft.y,
        },
        bottomRightCorner: {
          x: r.position.bottomRight.x,
          y: r.position.bottomRight.y,
        },
      },
    }));
  }

  // ─── Нахождение калибровочных QR-кодов ────────────────────────────────────

  private findCalibrationQRs(
    qrCodes: QRCode[],
    jobMeetingPrefix: string,
  ): CalibrationQRs | null {
    // Ищем два калибровочных QR: B|{m8}|{o8}
    const ballotQRs = qrCodes.filter((qr) => {
      const parts = qr.text.split('|');
      return parts[0] === 'B' && parts.length >= 3 && parts[1] === jobMeetingPrefix;
    });

    if (ballotQRs.length < 2) {
      return null;
    }

    // Сортируем по X координате центра: левый и правый
    const sorted = [...ballotQRs].sort(
      (a, b) => this.qrCenterX(a.location) - this.qrCenterX(b.location),
    );

    return {
      left: sorted[0],
      right: sorted[sorted.length - 1],
    };
  }

  // ─── Основная логика: анализ изображения по QR-кодам ─────────────────────

  private async processImageByQR(
    buffer: Buffer,
    filename: string,
    jobMeetingId: string,
  ): Promise<{
    ownerId?: string;
    meetingId?: string;
    votes: { questionNumber: number; vote: string; confidence: number }[];
    conflicts: ConflictVote[];
  }> {
    const { data, width, height } = this.decodeImageToRGBA(buffer, filename);
    const qrCodes = await this.findAllQRCodes(data, width, height);

    this.logger.debug(
      `[${filename}] ZXing found ${qrCodes.length} QR codes: ${qrCodes.map((q) => q.text).join(' | ')}`,
    );

    const jobMeetingPrefix = jobMeetingId.split('-')[0];

    // ─── 1. Находим калибровочные QR для выравнивания ──────────────────────
    const calibration = this.findCalibrationQRs(qrCodes, jobMeetingPrefix);

    if (!calibration) {
      this.logger.warn(`[${filename}] No calibration QR codes found`);
      return { ownerId: undefined, meetingId: undefined, votes: [], conflicts: [] };
    }

    // ─── 2. По калибровочным QR определяем ownerId ──────────────────────────
    const leftParts = calibration.left.text.split('|');
    const ownerPrefix = leftParts[2];

    let ownerId: string | undefined;
    if (ownerPrefix) {
      const owner = await this.prisma.owner.findFirst({
        where: { id: { startsWith: ownerPrefix } },
      });
      ownerId = owner?.id;
      this.logger.debug(
        `[${filename}] Owner lookup by prefix "${ownerPrefix}": ${ownerId ?? 'not found'}`,
      );
    }

    // ─── 3. Вычисляем геометрию документа по двум калибровочным QR ──────────
    const leftLoc = calibration.left.location;
    const rightLoc = calibration.right.location;

    // Ширина QR в пикселях (по левому QR)
    const qrWidthPx = Math.hypot(
      leftLoc.topRightCorner.x - leftLoc.topLeftCorner.x,
      leftLoc.topRightCorner.y - leftLoc.topLeftCorner.y,
    );

    if (qrWidthPx < 5) {
      return { ownerId, meetingId: jobMeetingId, votes: [], conflicts: [] };
    }

    // Пикселей на мм
    const pxPerMm = qrWidthPx / QR_DETECT_SIZE_MM;

    // Вектор вправо (по горизонтали документа)
    const rightVec = {
      x: (leftLoc.topRightCorner.x - leftLoc.topLeftCorner.x) / qrWidthPx,
      y: (leftLoc.topRightCorner.y - leftLoc.topLeftCorner.y) / qrWidthPx,
    };

    // Вектор вниз (по вертикали документа)
    const qrHeightPx = Math.hypot(
      leftLoc.bottomLeftCorner.x - leftLoc.topLeftCorner.x,
      leftLoc.bottomLeftCorner.y - leftLoc.topLeftCorner.y,
    );
    const downVec =
      qrHeightPx > 0
        ? {
            x: (leftLoc.bottomLeftCorner.x - leftLoc.topLeftCorner.x) / qrHeightPx,
            y: (leftLoc.bottomLeftCorner.y - leftLoc.topLeftCorner.y) / qrHeightPx,
          }
        : { x: -rightVec.y, y: rightVec.x };

    // Центр левого калибровочного QR
    const leftCx = this.qrCenterX(leftLoc);
    const leftCy = this.qrCenterY(leftLoc);

    // ─── 4. Находим все V-QR и определяем их номера вопросов ────────────────
    const voteQRMap = new Map<number, QRCode[]>();

    for (const qr of qrCodes) {
      const parts = qr.text.split('|');

      if (parts[0] === 'V' && parts.length >= 4) {
        const m8 = parts[1];
        const o8 = parts[2];
        const qNum = parseInt(parts[3], 10);

        if (!isNaN(qNum) && qNum > 0 && m8 === jobMeetingPrefix) {
          if (!voteQRMap.has(qNum)) voteQRMap.set(qNum, []);
          voteQRMap.get(qNum)!.push(qr);
        }
      } else if (parts[0] === 'VOTE' && parts.length >= 4) {
        // Старый формат (обратная совместимость)
        const qNum = parseInt(parts[3], 10);
        if (!isNaN(qNum) && qNum > 0) {
          if (!voteQRMap.has(qNum)) voteQRMap.set(qNum, []);
          voteQRMap.get(qNum)!.push(qr);
        }
      }
    }

    if (!ownerId || voteQRMap.size === 0) {
      return { ownerId, meetingId: jobMeetingId, votes: [], conflicts: [] };
    }

    // ─── 5. Анализируем каждую строку вопроса ───────────────────────────────
    const votes: {
      questionNumber: number;
      vote: string;
      confidence: number;
    }[] = [];
    const conflicts: ConflictVote[] = [];

    for (const [qNum, qrs] of voteQRMap) {
      // Находим QR вопроса. Он должен быть в col0 (слева от текста).
      // Берем QR с наименьшим X (самый левый)
      const questionQR = qrs.reduce((best, cur) =>
        this.qrCenterX(cur.location) < this.qrCenterX(best.location)
          ? cur
          : best,
      );

      // Проверяем, что QR вопроса находится на той же горизонтальной линии,
      // что и левый калибровочный QR (по Y координате)
      const qrCy = this.qrCenterY(questionQR.location);
      const yDiff = Math.abs(qrCy - leftCy);
      if (yDiff > qrHeightPx * 1.5) {
        // Слишком далеко по Y - возможно, это другой бюллетень
        continue;
      }

      // Центр QR вопроса
      const qrCx = this.qrCenterX(questionQR.location);

      // Вычисляем смещение по X от центра левого калибровочного QR
      const offsetX = qrCx - leftCx;

      // Проверяем, что QR вопроса находится в col0 (смещение ≈ 0)
      // Допускаем погрешность в половину ширины QR
      if (Math.abs(offsetX) > qrWidthPx * 0.8) {
        // Это не col0 - пропускаем
        continue;
      }

      // ─── 6. Сканируем ячейки голосования ──────────────────────────────────
      const detections: { vote: Vote; darkRatio: number }[] = [];

      for (const cell of VOTE_CELLS) {
        // Смещение от центра QR вопроса до центра ячейки
        const cellCx = qrCx + rightVec.x * cell.rightOffsetMm * pxPerMm;
        const cellCy = qrCy + rightVec.y * cell.rightOffsetMm * pxPerMm;

        const halfW = ((cell.widthMm * ZONE_RATIO) / 2) * pxPerMm;
        const halfH = ((ROW_HEIGHT_MM * ZONE_RATIO) / 2) * pxPerMm;

        const darkRatio = this.sampleZone(
          data,
          width,
          height,
          cellCx,
          cellCy,
          halfW,
          halfH,
          rightVec,
          downVec,
        );

        detections.push({ vote: cell.vote, darkRatio });
      }

      const marked = detections.filter((d) => d.darkRatio >= MARK_THRESHOLD);

      this.logger.debug(
        `  Q${qNum}: ${detections.map((d) => `${d.vote}=${(d.darkRatio * 100).toFixed(1)}%`).join(' ')} → ${marked.length === 0 ? 'пусто' : marked.map((d) => d.vote).join(', ')}`,
      );

      if (marked.length === 1) {
        votes.push({
          questionNumber: qNum,
          vote: marked[0].vote,
          confidence: marked[0].darkRatio,
        });
      } else if (marked.length > 1) {
        conflicts.push({
          questionNumber: qNum,
          marks: marked.map((m) => ({ vote: m.vote, darkRatio: m.darkRatio })),
        });
      }
    }

    votes.sort((a, b) => a.questionNumber - b.questionNumber);
    conflicts.sort((a, b) => a.questionNumber - b.questionNumber);

    return { ownerId, meetingId: jobMeetingId, votes, conflicts };
  }

  // ─── Вспомогательные методы ───────────────────────────────────────────────

  private qrCenterX(location: QRLocation): number {
    return (
      (location.topLeftCorner.x +
        location.topRightCorner.x +
        location.bottomLeftCorner.x +
        location.bottomRightCorner.x) /
      4
    );
  }

  private qrCenterY(location: QRLocation): number {
    return (
      (location.topLeftCorner.y +
        location.topRightCorner.y +
        location.bottomLeftCorner.y +
        location.bottomRightCorner.y) /
      4
    );
  }

  private sampleZone(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    cx: number,
    cy: number,
    halfW: number,
    halfH: number,
    rightVec: { x: number; y: number },
    downVec: { x: number; y: number },
  ): number {
    const corners = [
      {
        x: cx - rightVec.x * halfW - downVec.x * halfH,
        y: cy - rightVec.y * halfW - downVec.y * halfH,
      },
      {
        x: cx + rightVec.x * halfW - downVec.x * halfH,
        y: cy + rightVec.y * halfW - downVec.y * halfH,
      },
      {
        x: cx - rightVec.x * halfW + downVec.x * halfH,
        y: cy - rightVec.y * halfW + downVec.y * halfH,
      },
      {
        x: cx + rightVec.x * halfW + downVec.x * halfH,
        y: cy + rightVec.y * halfW + downVec.y * halfH,
      },
    ];

    const x0 = Math.max(0, Math.floor(Math.min(...corners.map((c) => c.x))));
    const x1 = Math.min(
      width - 1,
      Math.ceil(Math.max(...corners.map((c) => c.x))),
    );
    const y0 = Math.max(0, Math.floor(Math.min(...corners.map((c) => c.y))));
    const y1 = Math.min(
      height - 1,
      Math.ceil(Math.max(...corners.map((c) => c.y))),
    );

    if (x1 <= x0 || y1 <= y0) return 0;

    let dark = 0;
    let total = 0;

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const projR = dx * rightVec.x + dy * rightVec.y;
        const projD = dx * downVec.x + dy * downVec.y;
        if (Math.abs(projR) > halfW || Math.abs(projD) > halfH) continue;

        total++;
        const idx = (y * width + x) * 4;
        if (data[idx] < 180 || data[idx + 1] < 180 || data[idx + 2] < 180)
          dark++;
      }
    }

    return total > 0 ? dark / total : 0;
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