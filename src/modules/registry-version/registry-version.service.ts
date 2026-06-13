import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { RegistryVersionRepository } from './registry-version.repository';
import { CreateRegistryVersionDto } from './dto/create-registry-version.dto';
import { RegistryVersionResponseDto } from './dto/registry-version-response.dto';

@Injectable()
export class RegistryVersionService {
  constructor(private readonly repo: RegistryVersionRepository) {}

  async create(dto: CreateRegistryVersionDto): Promise<RegistryVersionResponseDto> {
    const v = await this.repo.create(dto);
    return this.toDto(v);
  }

  async findAll(buildingId?: string): Promise<RegistryVersionResponseDto[]> {
    const list = await this.repo.findAll(buildingId);
    return list.map(v => this.toDto(v));
  }

  async findOne(id: string): Promise<RegistryVersionResponseDto> {
    const v = await this.repo.findById(id);
    if (!v) throw new NotFoundException('Версия реестра не найдена');
    return this.toDto(v);
  }

  async getLatest(buildingId: string): Promise<RegistryVersionResponseDto | null> {
    const v = await this.repo.findLatestByBuilding(buildingId);
    return v ? this.toDto(v) : null;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(v: any): RegistryVersionResponseDto {
    return { id: v.id, buildingId: v.buildingId, versionNumber: v.versionNumber,
      formedAt: v.formedAt, source: v.source, comment: v.comment };
  }
}
