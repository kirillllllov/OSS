import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingResponseDto } from './dto/building-response.dto';

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
  findOne(@Param('id') id: string): Promise<BuildingResponseDto> {
    return this.buildingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные здания' })
  @ApiResponse({ status: 200, type: BuildingResponseDto })
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto): Promise<BuildingResponseDto> {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить здание' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.buildingService.delete(id);
  }
}
