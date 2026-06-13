import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OwnerService } from './owner.service';
import { OwnerCreateDto } from './dto/owner-create.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerResponseDto } from './dto/owner-response.dto';

@ApiTags('owners')
@ApiBearerAuth()
@Controller('owners')
export class OwnerController {
  constructor(private readonly svc: OwnerService) {}

  @Post()
  @ApiOperation({ summary: 'Создать собственника' })
  @ApiResponse({ status: 201, type: OwnerResponseDto })
  create(@Body() dto: OwnerCreateDto): Promise<OwnerResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список собственников' })
  @ApiResponse({ status: 200, type: [OwnerResponseDto] })
  findAll(): Promise<OwnerResponseDto[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить собственника по ID (с помещениями и контактами)' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить собственника' })
  @ApiResponse({ status: 200, type: OwnerResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateOwnerDto): Promise<OwnerResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить собственника' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
