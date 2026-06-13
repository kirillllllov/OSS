import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AgendaItemService } from './agenda-item.service';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';
import { AgendaItemResponseDto } from './dto/agenda-item-response.dto';

@ApiTags('agenda-items')
@ApiBearerAuth()
@Controller('agenda-items')
export class AgendaItemController {
  constructor(private readonly svc: AgendaItemService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить пункт повестки' })
  @ApiResponse({ status: 201, type: AgendaItemResponseDto })
  create(@Body() dto: CreateAgendaItemDto): Promise<AgendaItemResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список пунктов повестки' })
  @ApiResponse({ status: 200, type: [AgendaItemResponseDto] })
  @ApiQuery({ name: 'meetingId', required: false })
  findAll(@Query('meetingId') meetingId?: string): Promise<AgendaItemResponseDto[]> {
    return this.svc.findAll(meetingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пункт повестки по ID' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пункт повестки' })
  @ApiResponse({ status: 200, type: AgendaItemResponseDto })
  update(@Param('id') id: string, @Body() dto: Partial<CreateAgendaItemDto>): Promise<AgendaItemResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить пункт повестки' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
