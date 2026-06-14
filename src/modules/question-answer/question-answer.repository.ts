import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';

@Injectable()
export class QuestionAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(ownerId?: string, agendaItemId?: string) {
    return this.prisma.questionAnswer.findMany({
      where: {
        ...(ownerId ? { ownerId } : {}),
        ...(agendaItemId ? { agendaItemId } : {}),
      },
      include: { agendaItem: true },
    });
  }

  findByCompositeKey(ownerId: string, agendaItemId: string) {
    return this.prisma.questionAnswer.findUnique({
      where: { ownerId_agendaItemId: { ownerId, agendaItemId } },
    });
  }

  create(dto: CreateQuestionAnswerDto) {
    return this.prisma.questionAnswer.create({
      data: { ownerId: dto.ownerId, agendaItemId: dto.agendaItemId, vote: dto.vote },
    });
  }

  upsert(dto: CreateQuestionAnswerDto) {
    return this.prisma.questionAnswer.upsert({
      where: { ownerId_agendaItemId: { ownerId: dto.ownerId, agendaItemId: dto.agendaItemId } },
      create: { ownerId: dto.ownerId, agendaItemId: dto.agendaItemId, vote: dto.vote },
      update: { vote: dto.vote },
    });
  }

  delete(ownerId: string, agendaItemId: string) {
    return this.prisma.questionAnswer.delete({
      where: { ownerId_agendaItemId: { ownerId, agendaItemId } },
    });
  }
}
