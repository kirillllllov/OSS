import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OwnershipService } from './ownership.service';
import { OwnershipCreateDto } from './dto/ownership-create.dto';
import { OwnershipResponseDto } from './dto/ownership-response.dto';

@ApiTags('ownerships')
@ApiBearerAuth()
@Controller('ownerships')
export class OwnershipController {
  constructor(private readonly svc: OwnershipService) {}

  @Post()
  @ApiOperation({ summary: 'Создать право собственности' })
  @ApiResponse({ status: 201, type: OwnershipResponseDto })
  create(@Body() dto: OwnershipCreateDto): Promise<OwnershipResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список прав собственности' })
  @ApiResponse({ status: 200, type: [OwnershipResponseDto] })
  @ApiQuery({ name: 'premiseId', required: false })
  @ApiQuery({ name: 'ownerId', required: false })
  findAll(
    @Query('premiseId') premiseId?: string,
    @Query('ownerId') ownerId?: string,
  ): Promise<OwnershipResponseDto[]> {
    return this.svc.findAll(premiseId, ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить право собственности по ID' })
  @ApiResponse({ status: 200, type: OwnershipResponseDto })
  findOne(@Param('id') id: string): Promise<OwnershipResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить право собственности' })
  @ApiResponse({ status: 200, type: OwnershipResponseDto })
  update(@Param('id') id: string, @Body() dto: Partial<OwnershipCreateDto>): Promise<OwnershipResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить право собственности' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
