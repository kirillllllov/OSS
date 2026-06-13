import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GeneratedDocumentService } from './generated-document.service';
import { CreateGeneratedDocumentDto } from './dto/create-generated-document.dto';
import { GeneratedDocumentResponseDto } from './dto/generated-document-response.dto';

@ApiTags('generated-documents')
@ApiBearerAuth()
@Controller('generated-documents')
export class GeneratedDocumentController {
  constructor(private readonly svc: GeneratedDocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Зарегистрировать сгенерированный документ' })
  @ApiResponse({ status: 201, type: GeneratedDocumentResponseDto })
  create(@Body() dto: CreateGeneratedDocumentDto): Promise<GeneratedDocumentResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список документов по собранию' })
  @ApiResponse({ status: 200, type: [GeneratedDocumentResponseDto] })
  @ApiQuery({ name: 'meetingId', required: false })
  @ApiQuery({ name: 'documentType', required: false })
  findAll(@Query('meetingId') meetingId?: string, @Query('documentType') documentType?: string): Promise<GeneratedDocumentResponseDto[]> {
    return this.svc.findAll(meetingId, documentType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить документ по ID' })
  @ApiResponse({ status: 200, type: GeneratedDocumentResponseDto })
  findOne(@Param('id') id: string): Promise<GeneratedDocumentResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id/mark-final')
  @ApiOperation({ summary: 'Пометить документ как финальный' })
  @ApiResponse({ status: 200, type: GeneratedDocumentResponseDto })
  markFinal(@Param('id') id: string): Promise<GeneratedDocumentResponseDto> {
    return this.svc.markFinal(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить запись о документе' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
