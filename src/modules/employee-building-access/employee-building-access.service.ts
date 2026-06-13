import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccessDto } from './dto/create-access.dto';

@Injectable()
export class EmployeeBuildingAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async grant(dto: CreateAccessDto) {
    const existing = await this.prisma.employeeBuildingAccess.findFirst({
      where: { employeeId: dto.employeeId, buildingId: dto.buildingId },
    });
    if (existing) throw new ConflictException('Доступ уже предоставлен');
    return this.prisma.employeeBuildingAccess.create({ data: dto });
  }

  async revoke(id: string): Promise<void> {
    const rec = await this.prisma.employeeBuildingAccess.findUnique({ where: { id } });
    if (!rec) throw new NotFoundException('Запись доступа не найдена');
    await this.prisma.employeeBuildingAccess.delete({ where: { id } });
  }

  async findByEmployee(employeeId: string) {
    return this.prisma.employeeBuildingAccess.findMany({
      where: { employeeId },
      include: { building: { select: { address: true, cadastralNumber: true } } },
    });
  }

  async findByBuilding(buildingId: string) {
    return this.prisma.employeeBuildingAccess.findMany({
      where: { buildingId },
      include: { employee: { select: { fullName: true, email: true, role: true } } },
    });
  }
}
