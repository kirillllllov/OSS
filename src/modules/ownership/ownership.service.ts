import { Injectable, NotFoundException } from '@nestjs/common';
import { OwnershipRepository } from './ownership.repository';
import { OwnershipCreateDto } from './dto/ownership-create.dto';
import { OwnershipResponseDto } from './dto/ownership-response.dto';

@Injectable()
export class OwnershipService {
  constructor(private readonly repo: OwnershipRepository) {}

  async create(dto: OwnershipCreateDto): Promise<OwnershipResponseDto> {
    const ownership = await this.repo.create(dto);
    return this.toDto(ownership);
  }

  async findAll(premiseId?: string, ownerId?: string): Promise<OwnershipResponseDto[]> {
    const list = await this.repo.findAll(premiseId, ownerId);
    return list.map(o => this.toDto(o));
  }

  async findOne(id: string): Promise<OwnershipResponseDto> {
    const ownership = await this.repo.findById(id);
    if (!ownership) throw new NotFoundException('Право собственности не найдено');
    return this.toDto(ownership);
  }

  async update(id: string, dto: Partial<OwnershipCreateDto>): Promise<OwnershipResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(o: any): OwnershipResponseDto {
    return {
      id: o.id,
      premiseId: o.premiseId,
      ownerId: o.ownerId,
      share: o.share,
      shareArea: o.shareArea,
      titleDocument: o.titleDocument,
      registrationDate: o.registrationDate,
      basisDocument: o.basisDocument,
    };
  }
}
