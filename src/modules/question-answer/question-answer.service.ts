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

  async findAll(ballotId?: string, agendaItemId?: string): Promise<QuestionAnswerResponseDto[]> {
    const list = await this.repo.findAll(ballotId, agendaItemId);
    return list.map(a => this.toDto(a));
  }

  async findOne(id: string): Promise<QuestionAnswerResponseDto> {
    const a = await this.repo.findById(id);
    if (!a) throw new NotFoundException('Ответ не найден');
    return this.toDto(a);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(a: any): QuestionAnswerResponseDto {
    return { id: a.id, ballotId: a.ballotId, agendaItemId: a.agendaItemId,
      vote: a.vote, source: a.source };
  }
}
