import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { MeetingRepository } from './meeting.repository';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';
import { PrismaService } from '../prisma/prisma.service';

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
  constructor(
    private readonly repo: MeetingRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    const year = new Date().getFullYear();
    const count = await this.prisma.meeting.count({ where: { buildingId: dto.buildingId } });
    const number = dto.number || `${count + 1}/${year}`;
    const ownerInitiatorIds = dto.ownerInitiatorIds ?? [];
    const m = await this.repo.createWithOwnerInitiators({ ...dto, number }, ownerInitiatorIds);
    return this.toDto(m);
  }

  async findAll(buildingId?: string, status?: string): Promise<MeetingResponseDto[]> {
    const list = await this.repo.findAll(buildingId, status);
    return list.map(m => this.toDto(m));
  }

  async findOne(id: string): Promise<MeetingResponseDto> {
    const m = await this.repo.findById(id);
    if (!m) throw new NotFoundException('Собрание не найдено');
    return this.toDto(m);
  }

  async update(id: string, dto: UpdateMeetingDto): Promise<MeetingResponseDto> {
    const m = await this.findOne(id);
    if (m.status !== 'draft') throw new BadRequestException('Редактирование доступно только для черновиков');
    const { ownerInitiatorIds, ...rest } = dto as any;
    const updated = await this.repo.update(id, rest);
    const full = await this.repo.findById(updated.id);
    return this.toDto(full);
  }

  async transition(id: string, targetStatus: string): Promise<MeetingResponseDto> {
    const m = await this.findOne(id);
    const allowed = STATUS_TRANSITIONS[m.status] || [];
    if (!allowed.includes(targetStatus)) {
      throw new BadRequestException(`Переход ${m.status} → ${targetStatus} недопустим`);
    }
    const updated = await this.repo.setStatus(id, targetStatus, STATUS_TIMESTAMP[targetStatus]);
    const full = await this.repo.findById(updated.id);
    return this.toDto(full);
  }

  async delete(id: string): Promise<void> {
    const m = await this.findOne(id);
    if (m.status !== 'draft') throw new BadRequestException('Удалить можно только черновик');
    await this.repo.delete(id);
  }

  async addOwnerInitiator(meetingId: string, ownerId: string): Promise<MeetingResponseDto> {
    const raw = await this.repo.findById(meetingId);
    if (!raw) throw new NotFoundException('Собрание не найдено');
    if (raw.status !== 'draft') throw new BadRequestException('Редактирование доступно только для черновиков');
    const already = raw.ownerInitiators?.some((oi: any) => oi.ownerId === ownerId);
    if (already) throw new BadRequestException('Этот собственник уже является инициатором');
    await this.repo.addOwnerInitiator(meetingId, ownerId);
    const full = await this.repo.findById(meetingId);
    return this.toDto(full);
  }

  async removeOwnerInitiator(meetingId: string, ownerId: string): Promise<MeetingResponseDto> {
    const raw = await this.repo.findById(meetingId);
    if (!raw) throw new NotFoundException('Собрание не найдено');
    if (raw.status !== 'draft') throw new BadRequestException('Редактирование доступно только для черновиков');
    await this.repo.removeOwnerInitiator(meetingId, ownerId);
    const full = await this.repo.findById(meetingId);
    return this.toDto(full);
  }

  async addAgendaItemsFromPool(meetingId: string, poolId: string, user: any) {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: { building: true },
    });
    if (!meeting) throw new NotFoundException('Собрание не найдено');
    if (meeting.status !== 'draft') {
      throw new BadRequestException('Можно добавлять вопросы только в черновик');
    }
    const access = await this.prisma.employeeBuildingAccess.findUnique({
      where: {
        employeeId_buildingId: {
          employeeId: user.id,
          buildingId: meeting.buildingId,
        },
      },
    });
    if (!user.companyId && !access) {
      throw new ForbiddenException('Нет доступа к этому дому');
    }
    const pool = await this.prisma.questionPool.findUnique({
      where: { id: poolId },
      include: {
        items: {
          orderBy: { orderNumber: 'asc' },
          include: { question: true },
        },
      },
    });
    if (!pool) throw new NotFoundException('Пул не найден');
    const canUse = !!user.companyId ||
      pool.type === 'GLOBAL' ||
      pool.employeeId === user.id;
    if (!canUse) throw new ForbiddenException('Нет доступа к этому пулу');
    const lastItem = await this.prisma.agendaItem.findFirst({
      where: { meetingId },
      orderBy: { orderNumber: 'desc' },
    });
    let nextOrder = lastItem ? lastItem.orderNumber + 1 : 1;
    const created: any[] = [];
    for (const item of pool.items) {
      const agendaItem = await this.prisma.agendaItem.create({
        data: {
          meetingId,
          questionId: item.questionId,
          orderNumber: nextOrder++,
        },
      });
      created.push(agendaItem);
    }
    return {
      message: `Добавлено ${created.length} вопрос(ов) из пула "${pool.name}"`,
      items: created,
    };
  }

  async getRegistry(meetingId: string): Promise<any> {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: { building: true },
    });
    if (!meeting) throw new NotFoundException('Собрание не найдено');

    const totalArea = meeting.building.totalArea ?? 0;

    const agendaItems = await this.prisma.agendaItem.findMany({
      where: { meetingId },
    });
    const agendaItemIds = agendaItems.map((a: any) => a.id);

    const premises = await this.prisma.premise.findMany({
      where: { buildingId: meeting.buildingId },
      orderBy: { number: 'asc' },
      include: {
        ownershipRights: {
          include: { owner: true },
        },
      },
    });

    let decisionCounter = 1;
    const rows: any[] = [];
    let totalVotedArea = 0;

    for (const premise of premises as any[]) {
      for (const right of premise.ownershipRights) {
        const shareArea = right.shareArea ?? premise.area;
        const sharePercent = totalArea > 0 ? (shareArea / totalArea) * 100 : 0;

        const hasAnswers =
          agendaItemIds.length > 0
            ? (await this.prisma.questionAnswer.count({
                where: {
                  ownerId: right.ownerId,
                  agendaItemId: { in: agendaItemIds },
                },
              })) > 0
            : false;

        if (hasAnswers) totalVotedArea += shareArea;

        rows.push({
          premiseId: premise.id,
          premiseNumber: premise.number,
          premiseType: premise.premiseType ?? 'Квартира',
          ownerId: right.owner.id,
          ownerName: right.owner.fullName,
          shareArea,
          sharePercent,
          decisionNumber: decisionCounter++,
          status: hasAnswers ? 'filled' : 'empty',
        });
      }
    }

    return { totalArea, totalVotedArea, rows };
  }

  private toDto(m: any): MeetingResponseDto {
    return {
      id: m.id,
      buildingId: m.buildingId,
      initiatorEmployeeId: m.initiatorEmployeeId,
      initiatorOwners: (m.ownerInitiators ?? []).map((oi: any) => ({
        id: oi.owner.id,
        fullName: oi.owner.fullName,
        premises: (oi.owner.ownershipRights ?? [])
          .map((r: any) => r.premise?.number)
          .filter(Boolean),
      })),
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
