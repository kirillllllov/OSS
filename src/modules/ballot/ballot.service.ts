import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BallotRepository } from './ballot.repository';
import { CreateBallotDto } from './dto/create-ballot.dto';
import { UpdateBallotDto } from './dto/update-ballot.dto';
import { BallotResponseDto } from './dto/ballot-response.dto';

@Injectable()
export class BallotService {
  constructor(private readonly repo: BallotRepository) {}

  async create(dto: CreateBallotDto): Promise<BallotResponseDto> {
    const existing = await this.repo.findByOwnershipAndMeeting(dto.ownershipId, dto.meetingId);
    if (existing && existing.status !== 'replaced') {
      throw new ConflictException('Бюллетень для этого права собственности уже выдан');
    }
    const ballot = await this.repo.create(dto);
    return this.toDto(ballot);
  }

  async findAll(meetingId?: string, status?: string): Promise<BallotResponseDto[]> {
    const list = await this.repo.findAll(meetingId, status);
    return list.map(b => this.toDto(b));
  }

  async findOne(id: string): Promise<any> {
    const ballot = await this.repo.findById(id);
    if (!ballot) throw new NotFoundException('Бюллетень не найден');
    return ballot;
  }

  async update(id: string, dto: UpdateBallotDto): Promise<BallotResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(b: any): BallotResponseDto {
    return {
      id: b.id, meetingId: b.meetingId, ownershipId: b.ownershipId,
      representativeId: b.representativeId, createdByEmployeeId: b.createdByEmployeeId,
      received: b.received, deliveryMethod: b.deliveryMethod, status: b.status,
      invalidReason: b.invalidReason, invalidNote: b.invalidNote,
      scanPath: b.scanPath, manualEntry: b.manualEntry, createdAt: b.createdAt,
    };
  }
}
