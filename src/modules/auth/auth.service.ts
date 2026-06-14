import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {
    // Создаём администратора при старте, если его нет
    this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = 'admin@uk.ru';
    const existing = await this.prisma.employee.findUnique({
      where: { email: adminEmail },
    });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.prisma.employee.create({
        data: {
          email: adminEmail,
          passwordHash: hashedPassword,
          fullName: 'Главный Администратор',
          role: 'COMPANY_ADMIN',
          isActive: 1,
        },
      });
      console.log('Администратор создан: admin@uk.ru / admin123');
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
        role: true,
        isActive: true,
      },
    });
    if (!employee || employee.isActive !== 1) return null;
    const isValid = await bcrypt.compare(password, employee.passwordHash);
    if (!isValid) return null;
    const { passwordHash, ...result } = employee;
    return result;
  }
}