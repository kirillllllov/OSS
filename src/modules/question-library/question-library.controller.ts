import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { QuestionLibraryService } from './question-library.service';
import { CreateQuestionLibraryDto } from './dto/create-question-library.dto';
import { QuestionLibraryResponseDto } from './dto/question-library-response.dto';

@ApiTags('question-library')
@ApiBearerAuth()
@Controller('question-library')
export class QuestionLibraryController {
  constructor(private readonly svc: QuestionLibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Создать вопрос в библиотеке' })
  @ApiResponse({ status: 201, type: QuestionLibraryResponseDto })
  create(@Body() dto: CreateQuestionLibraryDto): Promise<QuestionLibraryResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список вопросов библиотеки' })
  @ApiResponse({ status: 200, type: [QuestionLibraryResponseDto] })
  @ApiQuery({ name: 'companyId', required: false })
  @ApiQuery({ name: 'category', required: false })
  findAll(@Query('companyId') companyId?: string, @Query('category') category?: string): Promise<QuestionLibraryResponseDto[]> {
    return this.svc.findAll(companyId, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить вопрос по ID' })
  @ApiResponse({ status: 200, type: QuestionLibraryResponseDto })
  findOne(@Param('id') id: string): Promise<QuestionLibraryResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить вопрос' })
  @ApiResponse({ status: 200, type: QuestionLibraryResponseDto })
  update(@Param('id') id: string, @Body() dto: Partial<CreateQuestionLibraryDto>): Promise<QuestionLibraryResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить вопрос' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
