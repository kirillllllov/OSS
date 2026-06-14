import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(buildingId?: string, status?: string) {
    return this.prisma.meeting.findMany({
      where: {
        ...(buildingId ? { buildingId } : {}),
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
        buildingId: dto.buildingId,
        initiatorEmployeeId: dto.initiatorEmployeeId,
        number: dto.number,
        form: dto.form,
        status: 'draft',
        startDate: dto.startDate,
        endDate: dto.endDate,
        inPersonStartTime: dto.inPersonStartTime,
        inPersonAddress: dto.inPersonAddress,
        ballotAcceptanceAddress: dto.ballotAcceptanceAddress,
        noticeAddress: dto.noticeAddress,
        resultsDate: dto.resultsDate,
        extensionReason: dto.extensionReason,
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
    if (timestampField) data[timestampField] = new Date().toISOString();
    return this.prisma.meeting.update({ where: { id }, data });
  }
}
