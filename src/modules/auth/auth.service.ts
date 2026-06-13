import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EmployeeService } from '../employee/employee.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, ip: string): Promise<AuthResponseDto> {
    const employee = await this.employeeService.findByEmailRaw(dto.email);
    if (!employee || !employee.active) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, employee.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    await this.employeeService.recordLogin(employee.id, ip);
    const payload = {
      sub: employee.id,
      email: employee.email,
      role: employee.role,
      companyId: employee.companyId,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      employee: {
        id: employee.id, companyId: employee.companyId,
        email: employee.email, fullName: employee.fullName,
        role: employee.role, active: employee.active,
        lastLogin: employee.lastLogin ?? undefined,
        createdAt: employee.createdAt,
      },
    };
  }
}
