import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly repo: EmployeeRepository) {}

  async create(dto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) throw new ConflictException('Сотрудник с таким email уже существует');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const emp = await this.repo.create({
      companyId: dto.companyId, email: dto.email,
      passwordHash, fullName: dto.fullName,
      role: dto.role ?? 'manager', active: dto.active ?? true,
    });
    return this.toDto(emp);
  }

  async findAll(companyId?: string): Promise<EmployeeResponseDto[]> {
    const list = await this.repo.findAll(companyId);
    return list.map(e => this.toDto(e));
  }

  async findOne(id: string): Promise<EmployeeResponseDto> {
    const emp = await this.repo.findById(id);
    if (!emp) throw new NotFoundException('Сотрудник не найден');
    return this.toDto(emp);
  }

  async findByEmailRaw(email: string) {
    return this.repo.findByEmail(email);
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<EmployeeResponseDto> {
    await this.findOne(id);
    const data: any = {};
    if (dto.fullName) data.fullName = dto.fullName;
    if (dto.role) data.role = dto.role;
    if (dto.active !== undefined) data.active = dto.active;
    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);
    const updated = await this.repo.update(id, data);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  async recordLogin(id: string, ip: string): Promise<void> {
    await this.repo.update(id, { lastLogin: new Date(), lastIp: ip });
  }

  private toDto(e: any): EmployeeResponseDto {
    return {
      id: e.id, companyId: e.companyId, email: e.email,
      fullName: e.fullName, role: e.role, active: e.active,
      lastLogin: e.lastLogin, createdAt: e.createdAt,
    };
  }
}
