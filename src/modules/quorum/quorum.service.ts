import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface QuorumCalculationResult {
  meetingId: string;
  totalArea: number;
  participatingArea: number;
  participationPercent: number;
  quorumReached: boolean;
  byAgendaItem: {
    agendaItemId: string;
    orderNumber: number;
    decisionType: string;
    acceptPercent: number;
    forArea: number;
    againstArea: number;
    abstainArea: number;
    forPercent: number;
    decision: 'accepted' | 'rejected' | 'no_quorum';
  }[];
}

@Injectable()
export class QuorumService {
  constructor(private readonly prisma: PrismaService) {}

  async calculate(meetingId: string): Promise<QuorumCalculationResult> {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        building: { select: { totalArea: true } },
        agendaItems: { orderBy: { orderNumber: 'asc' } },
        ballots: {
          where: { status: 'valid' },
          include: {
            ownership: { select: { shareArea: true } },
            answers: { include: { agendaItem: true } },
          },
        },
      },
    });
    if (!meeting) throw new NotFoundException('Собрание не найдено');

    const totalArea = meeting.building.totalArea;
    const participatingArea = meeting.ballots.reduce((sum, b) => sum + (b.ownership.shareArea || 0), 0);
    const participationPercent = totalArea > 0 ? (participatingArea / totalArea) * 100 : 0;
    const quorumReached = participationPercent >= 50;

    const byAgendaItem = meeting.agendaItems.map(item => {
      const votes = { for: 0, against: 0, abstain: 0 };
      for (const ballot of meeting.ballots) {
        const answer = ballot.answers.find(a => a.agendaItemId === item.id);
        if (answer) {
          const area = ballot.ownership.shareArea || 0;
          if (answer.vote === 'for') votes.for += area;
          else if (answer.vote === 'against') votes.against += area;
          else if (answer.vote === 'abstain') votes.abstain += area;
        }
      }

      const forPercent = totalArea > 0 ? (votes.for / totalArea) * 100 : 0;
      const forOfParticipating = participatingArea > 0 ? (votes.for / participatingArea) * 100 : 0;

      let decision: 'accepted' | 'rejected' | 'no_quorum' = 'rejected';
      if (!quorumReached) {
        decision = 'no_quorum';
      } else {
        switch (item.decisionType) {
          case 'simple_majority':
            decision = forOfParticipating > 50 ? 'accepted' : 'rejected';
            break;
          case 'absolute_majority':
            decision = forPercent > 50 ? 'accepted' : 'rejected';
            break;
          case 'qualified_majority':
            decision = forPercent >= (item.acceptPercent || 66.67) ? 'accepted' : 'rejected';
            break;
          case 'unanimity':
            decision = (votes.against === 0 && votes.abstain === 0 && votes.for > 0) ? 'accepted' : 'rejected';
            break;
          default:
            decision = forOfParticipating > 50 ? 'accepted' : 'rejected';
        }
      }

      return {
        agendaItemId: item.id,
        orderNumber: item.orderNumber,
        decisionType: item.decisionType,
        acceptPercent: item.acceptPercent,
        forArea: votes.for,
        againstArea: votes.against,
        abstainArea: votes.abstain,
        forPercent,
        decision,
      };
    });

    await this.prisma.quorumResult.create({
      data: { meetingId, totalArea, participatingArea, participationPercent, quorumReached },
    });

    await this.prisma.meeting.update({ where: { id: meetingId }, data: { quorumPercent: participationPercent } });

    return { meetingId, totalArea, participatingArea, participationPercent, quorumReached, byAgendaItem };
  }

  async getLatest(meetingId: string) {
    return this.prisma.quorumResult.findFirst({
      where: { meetingId },
      orderBy: { calculatedAt: 'desc' },
    });
  }

  async getHistory(meetingId: string) {
    return this.prisma.quorumResult.findMany({
      where: { meetingId },
      orderBy: { calculatedAt: 'desc' },
    });
  }
}
