import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuorumService } from './quorum.service';

@ApiTags('quorum')
@ApiBearerAuth()
@Controller('quorum')
export class QuorumController {
  constructor(private readonly svc: QuorumService) {}

  @Post('calculate/:meetingId')
  @ApiOperation({ summary: 'Рассчитать кворум и решения по всем вопросам' })
  calculate(@Param('meetingId') meetingId: string) {
    return this.svc.calculate(meetingId);
  }

  @Get('latest/:meetingId')
  @ApiOperation({ summary: 'Последний результат расчёта кворума' })
  getLatest(@Param('meetingId') meetingId: string) {
    return this.svc.getLatest(meetingId);
  }

  @Get('history/:meetingId')
  @ApiOperation({ summary: 'История расчётов кворума' })
  getHistory(@Param('meetingId') meetingId: string) {
    return this.svc.getHistory(meetingId);
  }
}
