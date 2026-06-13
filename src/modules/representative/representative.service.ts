import { Injectable, NotFoundException } from '@nestjs/common';
import { RepresentativeRepository } from './representative.repository';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { RepresentativeResponseDto } from './dto/representative-response.dto';

@Injectable()
export class RepresentativeService {
  constructor(private readonly repo: RepresentativeRepository) {}

  async create(dto: CreateRepresentativeDto): Promise<RepresentativeResponseDto> {
    const r = await this.repo.create(dto);
    return this.toDto(r);
  }

  async findAll(ownerId?: string): Promise<RepresentativeResponseDto[]> {
    const list = await this.repo.findAll(ownerId);
    return list.map(r => this.toDto(r));
  }

  async findOne(id: string): Promise<RepresentativeResponseDto> {
    const r = await this.repo.findById(id);
    if (!r) throw new NotFoundException('Представитель не найден');
    return this.toDto(r);
  }

  async update(id: string, dto: Partial<CreateRepresentativeDto>): Promise<RepresentativeResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(r: any): RepresentativeResponseDto {
    return { id: r.id, ownerId: r.ownerId, fullName: r.fullName,
      proxyNumber: r.proxyNumber, issuedAt: r.issuedAt, expiresAt: r.expiresAt, scanPath: r.scanPath };
  }
}
