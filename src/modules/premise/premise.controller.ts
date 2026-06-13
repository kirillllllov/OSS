import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PremiseService } from './premise.service';
import { CreatePremiseDto } from './dto/premise-create.dto';
import { UpdatePremiseDto } from './dto/update-premise.dto';
import { PremiseResponseDto } from './dto/premise-response.dto';

@ApiTags('premises')
@ApiBearerAuth()
@Controller('premises')
export class PremiseController {
  constructor(private readonly svc: PremiseService) {}

  @Post()
  @ApiOperation({ summary: 'Создать помещение' })
  @ApiResponse({ status: 201, type: PremiseResponseDto })
  create(@Body() dto: CreatePremiseDto): Promise<PremiseResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список помещений' })
  @ApiResponse({ status: 200, type: [PremiseResponseDto] })
  @ApiQuery({ name: 'buildingId', required: false })
  findAll(@Query('buildingId') buildingId?: string): Promise<PremiseResponseDto[]> {
    return this.svc.findAll(buildingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить помещение по ID (с правами собственности)' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить помещение' })
  @ApiResponse({ status: 200, type: PremiseResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdatePremiseDto): Promise<PremiseResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить помещение' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
