import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RegistryVersionService } from './registry-version.service';
import { CreateRegistryVersionDto } from './dto/create-registry-version.dto';
import { RegistryVersionResponseDto } from './dto/registry-version-response.dto';

@ApiTags('registry-versions')
@ApiBearerAuth()
@Controller('registry-versions')
export class RegistryVersionController {
  constructor(private readonly svc: RegistryVersionService) {}

  @Post()
  @ApiOperation({ summary: 'Создать версию реестра' })
  @ApiResponse({ status: 201, type: RegistryVersionResponseDto })
  create(@Body() dto: CreateRegistryVersionDto): Promise<RegistryVersionResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список версий реестра' })
  @ApiResponse({ status: 200, type: [RegistryVersionResponseDto] })
  @ApiQuery({ name: 'buildingId', required: false })
  findAll(@Query('buildingId') buildingId?: string): Promise<RegistryVersionResponseDto[]> {
    return this.svc.findAll(buildingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить версию реестра по ID' })
  @ApiResponse({ status: 200, type: RegistryVersionResponseDto })
  findOne(@Param('id') id: string): Promise<RegistryVersionResponseDto> {
    return this.svc.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить версию реестра' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
