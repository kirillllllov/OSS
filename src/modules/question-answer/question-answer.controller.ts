import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { QuestionAnswerService } from './question-answer.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { QuestionAnswerResponseDto } from './dto/question-answer-response.dto';

@ApiTags('question-answers')
@ApiBearerAuth()
@Controller('question-answers')
export class QuestionAnswerController {
  constructor(private readonly svc: QuestionAnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Записать/обновить ответ по вопросу' })
  @ApiResponse({ status: 201, type: QuestionAnswerResponseDto })
  upsert(@Body() dto: CreateQuestionAnswerDto): Promise<QuestionAnswerResponseDto> {
    return this.svc.upsert(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список ответов' })
  @ApiResponse({ status: 200, type: [QuestionAnswerResponseDto] })
  @ApiQuery({ name: 'ownerId', required: false })
  @ApiQuery({ name: 'agendaItemId', required: false })
  findAll(
    @Query('ownerId') ownerId?: string,
    @Query('agendaItemId') agendaItemId?: string,
  ): Promise<QuestionAnswerResponseDto[]> {
    return this.svc.findAll(ownerId, agendaItemId);
  }

  @Get(':ownerId/:agendaItemId')
  @ApiOperation({ summary: 'Получить ответ по ownerId и agendaItemId' })
  @ApiResponse({ status: 200, type: QuestionAnswerResponseDto })
  findOne(
    @Param('ownerId') ownerId: string,
    @Param('agendaItemId') agendaItemId: string,
  ): Promise<QuestionAnswerResponseDto> {
    return this.svc.findOne(ownerId, agendaItemId);
  }

  @Delete(':ownerId/:agendaItemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить ответ' })
  async remove(
    @Param('ownerId') ownerId: string,
    @Param('agendaItemId') agendaItemId: string,
  ): Promise<void> {
    await this.svc.delete(ownerId, agendaItemId);
  }
}
