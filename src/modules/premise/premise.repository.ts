import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PremiseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(buildingId?: string) {
    return this.prisma.premise.findMany({
      where: buildingId ? { buildingId } : {},
      include: { building: true },
    });
  }

  async findById(id: string) {
    return this.prisma.premise.findUnique({
      where: { id },
      include: { building: true, ownershipRights: { include: { owner: true } } },
    });
  }

  async findByCadastralNumber(cadastralNumber: string) {
    return this.prisma.premise.findFirst({ where: { cadastralNumber } });
  }

  async create(data: any) {
    return this.prisma.premise.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.premise.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.premise.delete({ where: { id } });
  }
}
