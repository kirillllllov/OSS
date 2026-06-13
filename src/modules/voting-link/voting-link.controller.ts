import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { VotingLinkService } from './voting-link.service';
import { CreateVotingLinkDto } from './dto/create-voting-link.dto';
import { VotingLinkResponseDto } from './dto/voting-link-response.dto';

@ApiTags('voting-links')
@ApiBearerAuth()
@Controller('voting-links')
export class VotingLinkController {
  constructor(private readonly svc: VotingLinkService) {}

  @Post()
  @ApiOperation({ summary: 'Создать ссылку для онлайн-голосования' })
  @ApiResponse({ status: 201, type: VotingLinkResponseDto })
  create(@Body() dto: CreateVotingLinkDto): Promise<VotingLinkResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список ссылок для голосования' })
  @ApiResponse({ status: 200, type: [VotingLinkResponseDto] })
  @ApiQuery({ name: 'meetingId', required: false })
  findAll(@Query('meetingId') meetingId?: string): Promise<VotingLinkResponseDto[]> {
    return this.svc.findAll(meetingId);
  }

  @Get('by-token/:token')
  @ApiOperation({ summary: 'Найти ссылку по токену' })
  findByToken(@Param('token') token: string) {
    return this.svc.findByToken(token);
  }
}
