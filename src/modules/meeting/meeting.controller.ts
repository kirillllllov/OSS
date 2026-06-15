import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';
import { SessionGuard } from '../auth/guards/session.guards';

@ApiTags('meetings')
@ApiBearerAuth()
@Controller('meetings')
export class MeetingController {
  constructor(private readonly svc: MeetingService) {}

  @Post()
  create(@Body() dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  findAll(
    @Query('buildingId') buildingId?: string,
    @Query('status') status?: string,
  ): Promise<MeetingResponseDto[]> {
    return this.svc.findAll(buildingId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMeetingDto,
  ): Promise<MeetingResponseDto> {
    return this.svc.update(id, dto);
  }

  @Post(':id/transition/:status')
  transition(
    @Param('id') id: string,
    @Param('status') status: string,
  ): Promise<MeetingResponseDto> {
    return this.svc.transition(id, status);
  }

  @Post(':id/agenda-items/from-pool/:poolId')
  @UseGuards(SessionGuard)
  async addAgendaItemsFromPool(
    @Param('id') id: string,
    @Param('poolId') poolId: string,
    @Request() req,
  ) {
    return this.svc.addAgendaItemsFromPool(id, poolId, req.user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}