import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';

@ApiTags('meetings')
@ApiBearerAuth()
@Controller('meetings')
export class MeetingController {
  constructor(private readonly svc: MeetingService) {}

  @Post()
  @ApiOperation({ summary: 'Создать собрание (черновик)' })
  @ApiResponse({ status: 201, type: MeetingResponseDto })
  create(@Body() dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список собраний' })
  @ApiResponse({ status: 200, type: [MeetingResponseDto] })
  @ApiQuery({ name: 'buildingId', required: false })
  @ApiQuery({ name: 'companyId', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['draft', 'active', 'voting', 'counting', 'completed', 'archived'] })
  findAll(
    @Query('buildingId') buildingId?: string,
    @Query('companyId') companyId?: string,
    @Query('status') status?: string,
  ): Promise<MeetingResponseDto[]> {
    return this.svc.findAll(buildingId, companyId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить собрание по ID (с повесткой)' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить черновик собрания' })
  @ApiResponse({ status: 200, type: MeetingResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateMeetingDto): Promise<MeetingResponseDto> {
    return this.svc.update(id, dto);
  }

  @Post(':id/transition/:status')
  @ApiOperation({ summary: 'Сменить статус собрания (draft→active→voting→counting→completed→archived)' })
  @ApiResponse({ status: 200, type: MeetingResponseDto })
  transition(@Param('id') id: string, @Param('status') status: string): Promise<MeetingResponseDto> {
    return this.svc.transition(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить черновик собрания' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
