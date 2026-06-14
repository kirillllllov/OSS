import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
