import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';

@Injectable()
export class AgendaItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(meetingId?: string) {
    return this.prisma.agendaItem.findMany({
      where: meetingId ? { meetingId } : {},
      orderBy: { orderNumber: 'asc' },
      include: { question: true },
    });
  }

  findById(id: string) {
    return this.prisma.agendaItem.findUnique({
      where: { id },
      include: { question: true, answers: true },
    });
  }

  create(dto: CreateAgendaItemDto) {
    return this.prisma.agendaItem.create({
      data: {
        meetingId: dto.meetingId,
        questionId: dto.questionId,
        orderNumber: dto.orderNumber,
        customProtocolText: dto.customProtocolText,
        customBulletinText: dto.customBulletinText,
      },
    });
  }

  update(id: string, data: Partial<CreateAgendaItemDto>) {
    return this.prisma.agendaItem.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.agendaItem.delete({ where: { id } });
  }
}
