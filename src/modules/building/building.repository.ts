import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/';
import { Prisma } from '@prisma/client';

@Injectable()
export class BuildingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.building.findMany();
  }

  async findById(id: string) {
    return this.prisma.building.findUnique({
      where: { id },
    });
  }

  async findByCadastralNumber(cadastralNumber: string) {
    return this.prisma.building.findUnique({
      where: { cadastralNumber },
    });
  }

  async create(data: Prisma.buildingCreateInput) {
    return this.prisma.building.create({ data });
  }

  async update(id: string, data: Prisma.buildingUpdateInput) {
    return this.prisma.building.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.building.delete({
      where: { id },
    });
  }
}
