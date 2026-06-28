import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {
    this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = 'admin@uk.ru';

    let company = await this.prisma.company.findFirst({ where: { name: 'УК по умолчанию' } });
    if (!company) {
      company = await this.prisma.company.create({ data: { name: 'УК по умолчанию' } });
    }

    const existing = await this.prisma.employee.findUnique({ where: { email: adminEmail } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.prisma.employee.create({
        data: {
          email: adminEmail,
          passwordHash: hashedPassword,
          fullName: 'Главный Администратор',
          companyId: company.id,
          isActive: 1,
        },
      });
      console.log('Администратор создан: admin@uk.ru / admin123');
    } else if (!existing.companyId) {
      await this.prisma.employee.update({
        where: { id: existing.id },
        data: { companyId: company.id },
      });
    }
  }

  async validateEmployee(email: string, password: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        fullName: true,
        companyId: true,
        isActive: true,
        company: { select: { id: true, name: true } },
      },
    });
    if (!employee || employee.isActive !== 1) return null;
    const isValid = await bcrypt.compare(password, employee.passwordHash);
    if (!isValid) return null;
    const { passwordHash, ...result } = employee;
    return result;
  }
}
