import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionLibraryRepository } from './question-library.repository';
import { CreateQuestionLibraryDto } from './dto/create-question-library.dto';
import { QuestionLibraryResponseDto } from './dto/question-library-response.dto';

@Injectable()
export class QuestionLibraryService {
  constructor(private readonly repo: QuestionLibraryRepository) {}

  async create(dto: CreateQuestionLibraryDto): Promise<QuestionLibraryResponseDto> {
    const q = await this.repo.create(dto);
    return this.toDto(q);
  }

  async findAll(companyId?: string, category?: string): Promise<QuestionLibraryResponseDto[]> {
    const list = await this.repo.findAll(companyId, category);
    return list.map(q => this.toDto(q));
  }

  async findOne(id: string): Promise<QuestionLibraryResponseDto> {
    const q = await this.repo.findById(id);
    if (!q) throw new NotFoundException('Вопрос библиотеки не найден');
    return this.toDto(q);
  }

  async update(id: string, dto: Partial<CreateQuestionLibraryDto>): Promise<QuestionLibraryResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(q: any): QuestionLibraryResponseDto {
    return { id: q.id, companyId: q.companyId, shortTitle: q.shortTitle, protocolText: q.protocolText,
      bulletinText: q.bulletinText, quorumType: q.quorumType, category: q.category,
      tags: q.tags, createdAt: q.createdAt };
  }
}
