import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBallotDto } from './dto/create-ballot.dto';
import { UpdateBallotDto } from './dto/update-ballot.dto';

@Injectable()
export class BallotRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(meetingId?: string, status?: string) {
    return this.prisma.ballot.findMany({
      where: {
        ...(meetingId ? { meetingId } : {}),
        ...(status ? { status } : {}),
      },
      include: {
        ownership: { include: { owner: true, premise: true } },
        answers: { include: { agendaItem: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.ballot.findUnique({
      where: { id },
      include: {
        ownership: { include: { owner: true, premise: true } },
        answers: { include: { agendaItem: true } },
        representative: true,
      },
    });
  }

  findByOwnershipAndMeeting(ownershipId: string, meetingId: string) {
    return this.prisma.ballot.findFirst({ where: { ownershipId, meetingId } });
  }

  create(dto: CreateBallotDto) {
    return this.prisma.ballot.create({
      data: {
        meetingId: dto.meetingId, ownershipId: dto.ownershipId,
        representativeId: dto.representativeId, createdByEmployeeId: dto.createdByEmployeeId,
        received: dto.received ?? false, deliveryMethod: dto.deliveryMethod,
        status: 'pending', manualEntry: dto.manualEntry ?? false,
      },
    });
  }

  update(id: string, data: UpdateBallotDto) {
    return this.prisma.ballot.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.ballot.delete({ where: { id } });
  }
}
