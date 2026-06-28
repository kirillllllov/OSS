import { Injectable, NotFoundException } from '@nestjs/common';
import { OwnerRepository } from './owner.repository';
import { OwnerCreateDto } from './dto/owner-create.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerResponseDto } from './dto/owner-response.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly repo: OwnerRepository) {}

  async create(dto: OwnerCreateDto): Promise<OwnerResponseDto> {
    const owner = await this.repo.create(dto);
    return this.toDto(owner);
  }

  async findAll(): Promise<OwnerResponseDto[]> {
    const list = await this.repo.findAll();
    return list.map(o => this.toDto(o));
  }

  async findByBuilding(buildingId: string) {
    const list = await this.repo.findByBuilding(buildingId);
    return list.map(o => ({
      id: o.id,
      fullName: o.fullName,
      premises: (o.ownershipRights ?? []).map((r: any) => ({
        id: r.premise?.id,
        number: r.premise?.number,
      })).filter(p => p.id),
    }));
  }

  async findOne(id: string): Promise<any> {
    const owner = await this.repo.findById(id);
    if (!owner) throw new NotFoundException('Собственник не найден');
    return owner;
  }

  async update(id: string, dto: UpdateOwnerDto): Promise<OwnerResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(o: any): OwnerResponseDto {
    return { id: o.id, fullName: o.fullName, birthDate: o.birthDate, inn: o.inn, snils: o.snils };
  }
}
