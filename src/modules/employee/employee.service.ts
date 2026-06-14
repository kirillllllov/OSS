import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto, currentUserRole: string) {
    if (currentUserRole !== 'COMPANY_ADMIN') {
      throw new ForbiddenException('Только главный админ может создавать сотрудников');
    }
    const { email, password, fullName, role = 'EMPLOYEE', buildingIds = [] } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await this.prisma.employee.create({
      data: {
        email,
        passwordHash: hashedPassword,
        fullName,
        role,
        isActive: 1,
      },
    });
    if (buildingIds.length) {
      await this.assignBuildingsToEmployee(employee.id, buildingIds);
    }
    return employee;
  }

  async assignBuildingsToEmployee(employeeId: string, buildingIds: string[]) {
    const data = buildingIds.map(buildingId => ({ employeeId, buildingId }));
    await this.prisma.employeeBuildingAccess.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async getEmployeeBuildings(employeeId: string) {
    const accesses = await this.prisma.employeeBuildingAccess.findMany({
      where: { employeeId },
      include: { building: true },
    });
    return accesses.map(acc => acc.building);
  }

  async findAll() {
    return this.prisma.employee.findMany({
      select: { id: true, email: true, fullName: true, role: true, isActive: true, createdAt: true },
    });
  }
}