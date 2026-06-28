import {
  Controller, Post, Get, Body, Param, Res, HttpCode, HttpStatus, UseGuards, Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { DocumentsService } from './documents.service';
import { GenerateDocumentDto, DocumentType } from './dto/generate-document.dto';
import { SessionGuard } from '../auth/guards/session.guards';
import { RolesGuard } from '../auth/guards/roles.guard';


@ApiTags('documents')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(SessionGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly svc: DocumentsService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Сгенерировать документ .docx по шаблону' })
  @ApiResponse({ status: 200, description: 'Возвращает .docx файл' })
  async generate(@Body() dto: GenerateDocumentDto, @Request() req, @Res() res: Response): Promise<void> {
    const { buffer, filename } = await this.svc.generate(
      dto.type,
      dto.meetingId,
      dto.manualFields ?? {},
      req.user.id,
      req.user.companyId,
      dto.ownerId,
    );

    const encoded = encodeURIComponent(filename);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename*=UTF-8''${encoded}`,
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  }

  @Get('variables/:type')
  @ApiOperation({ summary: 'Получить список переменных для указанного типа документа' })
  getVariables(@Param('type') type: DocumentType) {
    return this.svc.getTemplateVariables(type);
  }

  @Get('ballots-zip/:meetingId')
  @ApiOperation({ summary: 'Сгенерировать ZIP-архив бюллетеней для всех собственников' })
  async generateBallotsZip(
    @Param('meetingId') meetingId: string,
    @Request() req,
    @Res() res: Response,
  ): Promise<void> {
    const { buffer, filename } = await this.svc.generateAllBallotsZip(
      meetingId,
      req.user.id,
      req.user.companyId,
    );

    const encoded = encodeURIComponent(filename);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename*=UTF-8''${encoded}`,
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  }
} 