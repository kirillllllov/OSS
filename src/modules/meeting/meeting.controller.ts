import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';
import { SessionGuard } from '../auth/guards/session.guards';
import { BallotScannerService } from './ballot-scanner.service';

@ApiTags('meetings')
@ApiBearerAuth()
@Controller('meetings')
export class MeetingController {
  constructor(
    private readonly svc: MeetingService,
    private readonly scanner: BallotScannerService,
  ) {}

  @Post()
  create(@Body() dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  findAll(
    @Query('buildingId') buildingId?: string,
    @Query('status') status?: string,
  ): Promise<MeetingResponseDto[]> {
    return this.svc.findAll(buildingId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMeetingDto,
  ): Promise<MeetingResponseDto> {
    return this.svc.update(id, dto);
  }

  @Post(':id/transition/:status')
  transition(
    @Param('id') id: string,
    @Param('status') status: string,
  ): Promise<MeetingResponseDto> {
    return this.svc.transition(id, status);
  }

  @Post(':id/owner-initiators/:ownerId')
  addOwnerInitiator(
    @Param('id') id: string,
    @Param('ownerId') ownerId: string,
  ): Promise<MeetingResponseDto> {
    return this.svc.addOwnerInitiator(id, ownerId);
  }

  @Delete(':id/owner-initiators/:ownerId')
  @HttpCode(HttpStatus.OK)
  removeOwnerInitiator(
    @Param('id') id: string,
    @Param('ownerId') ownerId: string,
  ): Promise<MeetingResponseDto> {
    return this.svc.removeOwnerInitiator(id, ownerId);
  }

  @Post(':id/agenda-items/from-pool/:poolId')
  @UseGuards(SessionGuard)
  async addAgendaItemsFromPool(
    @Param('id') id: string,
    @Param('poolId') poolId: string,
    @Request() req,
  ) {
    return this.svc.addAgendaItemsFromPool(id, poolId, req.user);
  }

  @Get(':id/registry')
  @ApiOperation({ summary: 'Получить реестр решений собрания' })
  getRegistry(@Param('id') id: string) {
    return this.svc.getRegistry(id);
  }

  @Post(':id/ballots-zip')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const dir = path.join(process.cwd(), 'uploads', 'ballots');
          fs.mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const meetingId = (req as any).params?.id ?? 'unknown';
          const ext = path.extname(file.originalname);
          cb(null, `meeting_${meetingId}_${Date.now()}${ext}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Разрешены только ZIP-файлы'), false);
        }
      },
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  @ApiOperation({ summary: 'Загрузить ZIP-архив с бюллетенями и запустить сканирование' })
  async uploadBallotsZip(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Файл не получен');
    const jobId = await this.scanner.startScan(id, file.path);
    return { meetingId: id, filename: file.filename, size: file.size, jobId };
  }

  @Get(':id/ballots-zip/status/:jobId')
  @ApiOperation({ summary: 'Получить статус задания сканирования бюллетеней' })
  getScanStatus(
    @Param('id') id: string,
    @Param('jobId') jobId: string,
  ) {
    const job = this.scanner.getJob(jobId);
    if (!job || job.meetingId !== id) throw new NotFoundException('Задание не найдено');
    return job;
  }

  @Patch(':id/ballots-zip/status/:jobId/results/:index')
  @ApiOperation({ summary: 'Скорректировать результат сканирования бюллетеня' })
  async correctScanResult(
    @Param('id') id: string,
    @Param('jobId') jobId: string,
    @Param('index', ParseIntPipe) index: number,
    @Body() dto: { ownerId: string; votes: { questionNumber: number; vote: string }[] },
  ) {
    if (!dto.ownerId) throw new BadRequestException('ownerId обязателен');
    return this.scanner.correctResult(jobId, id, index, dto.ownerId, dto.votes ?? []);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
