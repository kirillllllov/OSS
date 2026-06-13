import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PremiseRepository } from './premise.repository';
import { CreatePremiseDto } from './dto/premise-create.dto';
import { UpdatePremiseDto } from './dto/update-premise.dto';
import { PremiseResponseDto } from './dto/premise-response.dto';

@Injectable()
export class PremiseService {
  constructor(private readonly repo: PremiseRepository) {}

  async create(dto: CreatePremiseDto): Promise<PremiseResponseDto> {
    if (dto.cadastralNumber) {
      const existing = await this.repo.findByCadastralNumber(dto.cadastralNumber);
      if (existing) throw new ConflictException('Помещение с таким кадастровым номером уже существует');
    }
    const premise = await this.repo.create({
      building: { connect: { id: dto.buildingId } },
      number: dto.number,
      cadastralNumber: dto.cadastralNumber,
      area: dto.area,
      ownershipForm: dto.ownershipForm,
    });
    return this.toDto(premise);
  }

  async findAll(buildingId?: string): Promise<PremiseResponseDto[]> {
    const list = await this.repo.findAll(buildingId);
    return list.map(p => this.toDto(p));
  }

  async findOne(id: string): Promise<any> {
    const premise = await this.repo.findById(id);
    if (!premise) throw new NotFoundException('Помещение не найдено');
    return premise;
  }

  async update(id: string, dto: UpdatePremiseDto): Promise<PremiseResponseDto> {
    await this.findOne(id);
    if (dto.cadastralNumber) {
      const existing = await this.repo.findByCadastralNumber(dto.cadastralNumber);
      if (existing && existing.id !== id) throw new ConflictException('Кадастровый номер уже занят');
    }
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(p: any): PremiseResponseDto {
    return {
      id: p.id, buildingId: p.buildingId, number: p.number,
      cadastralNumber: p.cadastralNumber, area: p.area,
      ownershipForm: p.ownershipForm, createdAt: p.createdAt, updatedAt: p.updatedAt,
    };
  }
}
