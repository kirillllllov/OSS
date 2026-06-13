import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';

@Injectable()
export class QuestionAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(ballotId?: string, agendaItemId?: string) {
    return this.prisma.questionAnswer.findMany({
      where: {
        ...(ballotId ? { ballotId } : {}),
        ...(agendaItemId ? { agendaItemId } : {}),
      },
      include: { agendaItem: true },
    });
  }

  findById(id: string) {
    return this.prisma.questionAnswer.findUnique({ where: { id } });
  }

  findByBallotAndAgendaItem(ballotId: string, agendaItemId: string) {
    return this.prisma.questionAnswer.findUnique({ where: { ballotId_agendaItemId: { ballotId, agendaItemId } } });
  }

  create(dto: CreateQuestionAnswerDto) {
    return this.prisma.questionAnswer.create({
      data: { ballotId: dto.ballotId, agendaItemId: dto.agendaItemId,
        vote: dto.vote, source: dto.source ?? 'manual' },
    });
  }

  upsert(dto: CreateQuestionAnswerDto) {
    return this.prisma.questionAnswer.upsert({
      where: { ballotId_agendaItemId: { ballotId: dto.ballotId, agendaItemId: dto.agendaItemId } },
      create: { ballotId: dto.ballotId, agendaItemId: dto.agendaItemId, vote: dto.vote, source: dto.source ?? 'manual' },
      update: { vote: dto.vote, source: dto.source ?? 'manual' },
    });
  }

  delete(id: string) {
    return this.prisma.questionAnswer.delete({ where: { id } });
  }

  getAnswersByMeeting(meetingId: string) {
    return this.prisma.questionAnswer.findMany({
      where: { ballot: { meetingId, status: 'valid' } },
      include: {
        ballot: { include: { ownership: { select: { shareArea: true } } } },
        agendaItem: true,
      },
    });
  }
}
