import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentTemplateDto } from './dto/create-document-template.dto';

@Injectable()
export class DocumentTemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId?: string, documentType?: string) {
    return this.prisma.documentTemplate.findMany({
      where: {
        ...(companyId ? { companyId } : {}),
        ...(documentType ? { documentType } : {}),
      },
    });
  }

  findById(id: string) {
    return this.prisma.documentTemplate.findUnique({ where: { id } });
  }

  create(dto: CreateDocumentTemplateDto) {
    return this.prisma.documentTemplate.create({
      data: { ...dto, version: dto.version ?? 1, active: dto.active ?? true },
    });
  }

  update(id: string, dto: Partial<CreateDocumentTemplateDto>) {
    return this.prisma.documentTemplate.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.documentTemplate.delete({ where: { id } });
  }
}
