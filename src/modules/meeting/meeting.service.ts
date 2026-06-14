import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MeetingRepository } from './meeting.repository';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';

const STATUS_TRANSITIONS: Record<string, string[]> = {
  draft:     ['active'],
  active:    ['voting', 'draft'],
  voting:    ['counting', 'active'],
  counting:  ['completed', 'voting'],
  completed: ['archived'],
  archived:  [],
};

const STATUS_TIMESTAMP: Record<string, string> = {
  active: 'activatedAt', completed: 'completedAt', archived: 'archivedAt',
};

@Injectable()
export class MeetingService {
  constructor(private readonly repo: MeetingRepository) {}

  async create(dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    const m = await this.repo.create(dto);
    return this.toDto(m);
  }

  async findAll(buildingId?: string, status?: string): Promise<MeetingResponseDto[]> {
    const list = await this.repo.findAll(buildingId, status);
    return list.map(m => this.toDto(m));
  }

  async findOne(id: string): Promise<any> {
    const m = await this.repo.findById(id);
    if (!m) throw new NotFoundException('Собрание не найдено');
    return m;
  }

  async update(id: string, dto: UpdateMeetingDto): Promise<MeetingResponseDto> {
    const m = await this.findOne(id);
    if (m.status !== 'draft') throw new BadRequestException('Редактирование доступно только для черновиков');
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async transition(id: string, targetStatus: string): Promise<MeetingResponseDto> {
    const m = await this.findOne(id);
    const allowed = STATUS_TRANSITIONS[m.status] || [];
    if (!allowed.includes(targetStatus)) {
      throw new BadRequestException(`Переход ${m.status} → ${targetStatus} недопустим`);
    }
    const updated = await this.repo.setStatus(id, targetStatus, STATUS_TIMESTAMP[targetStatus]);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    const m = await this.findOne(id);
    if (m.status !== 'draft') throw new BadRequestException('Удалить можно только черновик');
    await this.repo.delete(id);
  }

  private toDto(m: any): MeetingResponseDto {
    return {
      id: m.id,
      buildingId: m.buildingId,
      initiatorEmployeeId: m.initiatorEmployeeId,
      number: m.number,
      form: m.form,
      status: m.status,
      startDate: m.startDate,
      endDate: m.endDate,
      inPersonStartTime: m.inPersonStartTime,
      inPersonAddress: m.inPersonAddress,
      ballotAcceptanceAddress: m.ballotAcceptanceAddress,
      noticeAddress: m.noticeAddress,
      resultsDate: m.resultsDate,
      extensionReason: m.extensionReason,
      createdAt: m.createdAt,
      activatedAt: m.activatedAt,
      completedAt: m.completedAt,
      archivedAt: m.archivedAt,
    };
  }
}
