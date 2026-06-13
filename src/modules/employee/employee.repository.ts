import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId?: string) {
    return this.prisma.employee.findMany({
      where: companyId ? { companyId } : {},
      orderBy: { fullName: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.employee.findUnique({ where: { email } });
  }

  create(data: {
    companyId: string; email: string; passwordHash: string;
    fullName: string; role?: string; active?: boolean;
  }) {
    return this.prisma.employee.create({ data });
  }

  update(id: string, data: Partial<{
    fullName: string; role: string; active: boolean; passwordHash: string;
    lastLogin: Date; lastIp: string;
  }>) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
