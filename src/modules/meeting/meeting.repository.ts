import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(buildingId?: string, companyId?: string, status?: string) {
    return this.prisma.meeting.findMany({
      where: {
        ...(buildingId ? { buildingId } : {}),
        ...(companyId ? { companyId } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { building: { select: { address: true } } },
    });
  }

  findById(id: string) {
    return this.prisma.meeting.findUnique({
      where: { id },
      include: {
        building: { select: { address: true, totalArea: true } },
        agendaItems: { orderBy: { orderNumber: 'asc' }, include: { question: true } },
      },
    });
  }

  create(dto: CreateMeetingDto) {
    return this.prisma.meeting.create({
      data: {
        companyId: dto.companyId, buildingId: dto.buildingId,
        registryVersionId: dto.registryVersionId,
        initiatorEmployeeId: dto.initiatorEmployeeId,
        number: dto.number, form: dto.form, status: 'draft',
        dateStart: new Date(dto.dateStart), dateEnd: new Date(dto.dateEnd),
        inPersonAddress: dto.inPersonAddress, ballotAcceptAddress: dto.ballotAcceptAddress,
        noticeAddress: dto.noticeAddress,
        resultDate: dto.resultDate ? new Date(dto.resultDate) : undefined,
        reason: dto.reason, requiresGis: dto.requiresGis ?? false,
      },
    });
  }

  update(id: string, data: any) {
    return this.prisma.meeting.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.meeting.delete({ where: { id } });
  }

  setStatus(id: string, status: string, timestampField?: string) {
    const data: any = { status };
    if (timestampField) data[timestampField] = new Date();
    return this.prisma.meeting.update({ where: { id }, data });
  }
}
