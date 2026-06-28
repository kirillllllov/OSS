import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto, currentUserCompanyId: string | null) {
    if (!currentUserCompanyId) {
      throw new ForbiddenException('Только сотрудник компании может создавать сотрудников');
    }
    const { email, password, fullName, buildingIds = [] } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await this.prisma.employee.create({
      data: {
        email,
        passwordHash: hashedPassword,
        fullName,
        companyId: currentUserCompanyId,
        isActive: 1,
      },
    });
    if (buildingIds.length) {
      await this.assignBuildingsToEmployee(employee.id, buildingIds);
    }
    return employee;
  }

  async assignBuildingsToEmployee(employeeId: string, buildingIds: string[]) {
    const operations = buildingIds.map((buildingId) =>
      this.prisma.employeeBuildingAccess.upsert({
        where: { employeeId_buildingId: { employeeId, buildingId } },
        update: {},
        create: { employeeId, buildingId },
      }),
    );
    await this.prisma.$transaction(operations);
  }

  async getEmployeeBuildings(employeeId: string) {
    const accesses = await this.prisma.employeeBuildingAccess.findMany({
      where: { employeeId },
      include: { building: true },
    });
    return accesses.map((acc) => acc.building);
  }

  async findAll() {
    return this.prisma.employee.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        companyId: true,
        isActive: true,
        createdAt: true,
        company: { select: { id: true, name: true } },
      },
    });
  }
}
