import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTemplateRepository } from './document-template.repository';
import { CreateDocumentTemplateDto } from './dto/create-document-template.dto';
import { DocumentTemplateResponseDto } from './dto/document-template-response.dto';

@Injectable()
export class DocumentTemplateService {
  constructor(private readonly repo: DocumentTemplateRepository) {}

  async create(dto: CreateDocumentTemplateDto): Promise<DocumentTemplateResponseDto> {
    const t = await this.repo.create(dto);
    return this.toDto(t);
  }

  async findAll(companyId?: string, documentType?: string): Promise<DocumentTemplateResponseDto[]> {
    const list = await this.repo.findAll(companyId, documentType);
    return list.map(t => this.toDto(t));
  }

  async findOne(id: string): Promise<DocumentTemplateResponseDto> {
    const t = await this.repo.findById(id);
    if (!t) throw new NotFoundException('Шаблон документа не найден');
    return this.toDto(t);
  }

  async update(id: string, dto: Partial<CreateDocumentTemplateDto>): Promise<DocumentTemplateResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(t: any): DocumentTemplateResponseDto {
    return { id: t.id, companyId: t.companyId, documentType: t.documentType,
      name: t.name, filePath: t.filePath, version: t.version, active: t.active };
  }
}
