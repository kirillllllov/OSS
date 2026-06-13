import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateVotingLinkDto } from './dto/create-voting-link.dto';
import { VotingLinkResponseDto } from './dto/voting-link-response.dto';

@Injectable()
export class VotingLinkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateVotingLinkDto): Promise<VotingLinkResponseDto> {
    const token = this.jwtService.sign(
      { meetingId: dto.meetingId, ownershipId: dto.ownershipId, type: 'voting' },
      { expiresIn: '30d' },
    );
    const link = await this.prisma.votingLink.create({
      data: {
        meetingId: dto.meetingId, ownershipId: dto.ownershipId,
        token, validUntil: new Date(dto.validUntil), used: false,
      },
    });
    return this.toDto(link);
  }

  async findAll(meetingId?: string): Promise<VotingLinkResponseDto[]> {
    const list = await this.prisma.votingLink.findMany({
      where: meetingId ? { meetingId } : {},
    });
    return list.map(l => this.toDto(l));
  }

  async findByToken(token: string) {
    const link = await this.prisma.votingLink.findUnique({ where: { token } });
    if (!link) throw new NotFoundException('Ссылка не найдена');
    return link;
  }

  async markUsed(id: string): Promise<void> {
    await this.prisma.votingLink.update({ where: { id }, data: { used: true } });
  }

  private toDto(l: any): VotingLinkResponseDto {
    return { id: l.id, meetingId: l.meetingId, ownershipId: l.ownershipId,
      token: l.token, validUntil: l.validUntil, used: l.used };
  }
}
