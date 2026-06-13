import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DocumentTemplateService } from './document-template.service';
import { CreateDocumentTemplateDto } from './dto/create-document-template.dto';
import { DocumentTemplateResponseDto } from './dto/document-template-response.dto';

@ApiTags('document-templates')
@ApiBearerAuth()
@Controller('document-templates')
export class DocumentTemplateController {
  constructor(private readonly svc: DocumentTemplateService) {}

  @Post()
  @ApiOperation({ summary: 'Создать шаблон документа' })
  @ApiResponse({ status: 201, type: DocumentTemplateResponseDto })
  create(@Body() dto: CreateDocumentTemplateDto): Promise<DocumentTemplateResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список шаблонов документов' })
  @ApiResponse({ status: 200, type: [DocumentTemplateResponseDto] })
  @ApiQuery({ name: 'companyId', required: false })
  @ApiQuery({ name: 'documentType', required: false })
  findAll(@Query('companyId') companyId?: string, @Query('documentType') documentType?: string): Promise<DocumentTemplateResponseDto[]> {
    return this.svc.findAll(companyId, documentType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить шаблон по ID' })
  @ApiResponse({ status: 200, type: DocumentTemplateResponseDto })
  findOne(@Param('id') id: string): Promise<DocumentTemplateResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить шаблон' })
  @ApiResponse({ status: 200, type: DocumentTemplateResponseDto })
  update(@Param('id') id: string, @Body() dto: Partial<CreateDocumentTemplateDto>): Promise<DocumentTemplateResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить шаблон' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
