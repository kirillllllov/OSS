import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingResponseDto } from './dto/building-response.dto';
import { SessionGuard } from '../auth/guards/session.guards';
import { BuildingAccessGuard } from './guards/building-access.guard';

@ApiTags('buildings')
@ApiBearerAuth()
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новое здание' })
  @ApiResponse({ status: 201, type: BuildingResponseDto })
  create(@Body() createBuildingDto: CreateBuildingDto): Promise<BuildingResponseDto> {
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список зданий' })
  @ApiResponse({ status: 200, type: [BuildingResponseDto] })
  @ApiQuery({ name: 'companyId', required: false })
  findAll(@Query('companyId') companyId?: string): Promise<BuildingResponseDto[]> {
    return this.buildingService.findAll(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить здание по ID (с помещениями)' })
  @ApiResponse({ status: 200, type: BuildingResponseDto })
  @UseGuards(SessionGuard, BuildingAccessGuard)
  findOne(@Param('id') id: string): Promise<BuildingResponseDto> {
    return this.buildingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные здания' })
  @ApiResponse({ status: 200, type: BuildingResponseDto })
  @UseGuards(SessionGuard, BuildingAccessGuard)
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto): Promise<BuildingResponseDto> {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить здание' })
  @UseGuards(SessionGuard, BuildingAccessGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.buildingService.delete(id);
  }
}