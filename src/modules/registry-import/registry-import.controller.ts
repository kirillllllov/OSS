import {
  Controller, Get, Post, Param, Query, UploadedFile,
  UseInterceptors, Body, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { RegistryImportService } from './registry-import.service';
import { CreateRegistryImportDto } from './dto/create-registry-import.dto';

@ApiTags('registry-import')
@ApiBearerAuth()
@Controller('registry-import')
export class RegistryImportController {
  constructor(private readonly svc: RegistryImportService) {}

  @Get()
  @ApiOperation({ summary: 'Список импортов реестра' })
  @ApiQuery({ name: 'buildingId', required: false })
  findAll(@Query('buildingId') buildingId?: string) {
    return this.svc.findAll(buildingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Статус импорта' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Загрузить файл реестра (CSV)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/registries',
        filename: (_req, file, cb) => {
          const name = `${Date.now()}_${file.originalname}`;
          cb(null, name);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateRegistryImportDto,
  ) {
    if (!file) throw new BadRequestException('Файл не загружен');
    const imp = await this.svc.createImport(dto.buildingId, file.path, dto.importedByEmployeeId);
    return { importId: imp.id, status: imp.status, filePath: file.path };
  }
}
