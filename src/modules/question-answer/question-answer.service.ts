import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionAnswerRepository } from './question-answer.repository';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { QuestionAnswerResponseDto } from './dto/question-answer-response.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(private readonly repo: QuestionAnswerRepository) {}

  async upsert(dto: CreateQuestionAnswerDto): Promise<QuestionAnswerResponseDto> {
    const answer = await this.repo.upsert(dto);
    return this.toDto(answer);
  }

  async findAll(ownerId?: string, agendaItemId?: string): Promise<QuestionAnswerResponseDto[]> {
    const list = await this.repo.findAll(ownerId, agendaItemId);
    return list.map(a => this.toDto(a));
  }

  async findOne(ownerId: string, agendaItemId: string): Promise<QuestionAnswerResponseDto> {
    const a = await this.repo.findByCompositeKey(ownerId, agendaItemId);
    if (!a) throw new NotFoundException('Ответ не найден');
    return this.toDto(a);
  }

  async delete(ownerId: string, agendaItemId: string): Promise<void> {
    await this.findOne(ownerId, agendaItemId);
    await this.repo.delete(ownerId, agendaItemId);
  }

  private toDto(a: any): QuestionAnswerResponseDto {
    return {
      ownerId: a.ownerId,
      agendaItemId: a.agendaItemId,
      vote: a.vote,
      weight: a.weight,
    };
  }
}
