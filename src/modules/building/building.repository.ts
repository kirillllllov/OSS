import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(companyId?: string) {
    return this.prisma.building.findMany({
      where: companyId ? { companyId } : {},
      orderBy: { address: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.building.findUnique({
      where: { id },
      include: { premises: true },
    });
  }

  async findByCadastralNumber(cadastralNumber: string) {
    return this.prisma.building.findUnique({ where: { cadastralNumber } });
  }

  async create(data: CreateBuildingDto) {
    return this.prisma.building.create({
      data: {
        companyId: data.companyId, address: data.address,
        cadastralNumber: data.cadastralNumber, yearBuilt: data.yearBuilt,
        floors: data.floors, entrances: data.entrances,
        totalArea: data.totalArea, totalPremises: data.totalPremises,
      },
    });
  }

  async update(id: string, data: UpdateBuildingDto) {
    return this.prisma.building.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.building.delete({ where: { id } });
  }
}
