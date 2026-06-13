import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client'; 

@Injectable()
export class PremiseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(buildingId?: string) {
    const where = buildingId ? { buildingId } : {};
    return this.prisma.premise.findMany({
      where,
      include: { building: true },
    });
  }

  async findById(id: string) {
    return this.prisma.premise.findUnique({
      where: { id },
      include: { building: true, ownerships: true },
    });
  }

  async findByCadastralNumber(cadastralNumber: string) {
    return this.prisma.premise.findUnique({
      where: { cadastralNumber },
    });
  }

  async create(data: Prisma.premiseCreateInput) { 
    return this.prisma.premise.create({ data });
  }

  async update(id: string, data: Prisma.premiseUpdateInput) { // 👈 Prisma.тип
    return this.prisma.premise.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.premise.delete({ where: { id } });
  }
}