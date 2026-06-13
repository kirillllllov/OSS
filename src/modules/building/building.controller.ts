import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingResponseDto } from './dto/building-response.dto';

@ApiTags('buildings')
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
  @ApiOperation({ summary: 'Получить список всех зданий' })
  @ApiResponse({ status: 200, type: [BuildingResponseDto] })
  findAll(): Promise<BuildingResponseDto[]> {
    return this.buildingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить здание по ID' })
  @ApiResponse({ status: 200, type: BuildingResponseDto })
  @ApiResponse({ status: 404, description: 'Здание не найдено' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<BuildingResponseDto> {
    return this.buildingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные здания' })
  @ApiResponse({ status: 200, type: BuildingResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ): Promise<BuildingResponseDto> {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить здание' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.buildingService.delete(id);
  }
}