import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BallotService } from './ballot.service';
import { CreateBallotDto } from './dto/create-ballot.dto';
import { UpdateBallotDto } from './dto/update-ballot.dto';
import { BallotResponseDto } from './dto/ballot-response.dto';

@ApiTags('ballots')
@ApiBearerAuth()
@Controller('ballots')
export class BallotController {
  constructor(private readonly svc: BallotService) {}

  @Post()
  @ApiOperation({ summary: 'Создать бюллетень' })
  @ApiResponse({ status: 201, type: BallotResponseDto })
  create(@Body() dto: CreateBallotDto): Promise<BallotResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список бюллетеней' })
  @ApiResponse({ status: 200, type: [BallotResponseDto] })
  @ApiQuery({ name: 'meetingId', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'valid', 'invalid', 'replaced'] })
  findAll(@Query('meetingId') meetingId?: string, @Query('status') status?: string): Promise<BallotResponseDto[]> {
    return this.svc.findAll(meetingId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить бюллетень по ID (с ответами)' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить бюллетень (статус, скан, ручной ввод)' })
  @ApiResponse({ status: 200, type: BallotResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateBallotDto): Promise<BallotResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить бюллетень' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
