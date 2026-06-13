import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.company.findMany({ orderBy: { name: 'asc' } });
  }

  findById(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  findByInn(inn: string) {
    return this.prisma.company.findFirst({ where: { inn } });
  }

  create(data: CreateCompanyDto) {
    return this.prisma.company.create({ data });
  }

  update(id: string, data: UpdateCompanyDto) {
    return this.prisma.company.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
