import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RepresentativeService } from './representative.service';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { RepresentativeResponseDto } from './dto/representative-response.dto';

@ApiTags('representatives')
@ApiBearerAuth()
@Controller('representatives')
export class RepresentativeController {
  constructor(private readonly svc: RepresentativeService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить представителя (доверенность)' })
  @ApiResponse({ status: 201, type: RepresentativeResponseDto })
  create(@Body() dto: CreateRepresentativeDto): Promise<RepresentativeResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список представителей' })
  @ApiResponse({ status: 200, type: [RepresentativeResponseDto] })
  @ApiQuery({ name: 'ownerId', required: false })
  findAll(@Query('ownerId') ownerId?: string): Promise<RepresentativeResponseDto[]> {
    return this.svc.findAll(ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить представителя по ID' })
  @ApiResponse({ status: 200, type: RepresentativeResponseDto })
  findOne(@Param('id') id: string): Promise<RepresentativeResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить представителя' })
  @ApiResponse({ status: 200, type: RepresentativeResponseDto })
  update(@Param('id') id: string, @Body() dto: Partial<CreateRepresentativeDto>): Promise<RepresentativeResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить представителя' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
