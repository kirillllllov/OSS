import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BuildingRepository } from './building.repository';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingResponseDto } from './dto/building-response.dto';

@Injectable()
export class BuildingService {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  async create(data: CreateBuildingDto): Promise<BuildingResponseDto> {
    // Проверка уникальности кадастрового номера
    const existing = await this.buildingRepository.findByCadastralNumber(data.cadastralNumber);
    if (existing) {
      throw new ConflictException('Здание с таким кадастровым номером уже существует');
    }
    const building = await this.buildingRepository.create(data);
    return this.toResponseDto(building);
  }

  async findAll(): Promise<BuildingResponseDto[]> {
    const buildings = await this.buildingRepository.findAll();
    return buildings.map(b => this.toResponseDto(b));
  }

  async findOne(id: string): Promise<BuildingResponseDto> {
    const building = await this.buildingRepository.findById(id);
    if (!building) {
      throw new NotFoundException('Здание не найдено');
    }
    return this.toResponseDto(building);
  }

  async update(id: string, data: UpdateBuildingDto): Promise<BuildingResponseDto> {
    // Проверяем, существует ли здание
    await this.findOne(id); // выбросит NotFoundException если нет
    // Если меняется кадастровый номер – проверить уникальность
    if (data.cadastralNumber) {
      const existing = await this.buildingRepository.findByCadastralNumber(data.cadastralNumber);
      if (existing && existing.id !== id) {
        throw new ConflictException('Здание с таким кадастровым номером уже существует');
      }
    }
    const updated = await this.buildingRepository.update(id, data);
    return this.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    // Проверяем, существует ли
    await this.findOne(id);
    await this.buildingRepository.delete(id);
  }

  private toResponseDto(building: any): BuildingResponseDto {
    return {
      id: building.id,
      address: building.address,
      cadastralNumber: building.cadastralNumber,
      yearBuilt: building.yearBuilt,
      floors: building.floors,
      entrances: building.entrances,
      totalArea: building.totalArea,
      totalPremises: building.totalPremises,
      createdAt: building.createdAt,
      updatedAt: building.updatedAt,
    };
  }
}