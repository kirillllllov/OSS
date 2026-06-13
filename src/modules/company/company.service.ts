import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly repo: CompanyRepository) {}

  async create(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    if (dto.inn) {
      const existing = await this.repo.findByInn(dto.inn);
      if (existing) throw new ConflictException('Компания с таким ИНН уже существует');
    }
    const company = await this.repo.create(dto);
    return this.toDto(company);
  }

  async findAll(): Promise<CompanyResponseDto[]> {
    const list = await this.repo.findAll();
    return list.map(c => this.toDto(c));
  }

  async findOne(id: string): Promise<CompanyResponseDto> {
    const company = await this.repo.findById(id);
    if (!company) throw new NotFoundException('Компания не найдена');
    return this.toDto(company);
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(c: any): CompanyResponseDto {
    return {
      id: c.id, name: c.name, inn: c.inn, ogrn: c.ogrn,
      email: c.email, phone: c.phone, tariff: c.tariff,
      active: c.active, createdAt: c.createdAt,
    };
  }
}
