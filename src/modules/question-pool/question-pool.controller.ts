import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QuestionPoolService } from './question-pool.service';
import { CreateQuestionPoolDto } from './dto/create-question-pool.dto';
import { UpdateQuestionPoolDto } from './dto/update-question-pool.dto';
import { SessionGuard } from '../auth/guards/session.guards';

@ApiTags('question-pools')
@ApiBearerAuth()
@Controller('question-pools')
@UseGuards(SessionGuard)
export class QuestionPoolController {
  constructor(private readonly poolService: QuestionPoolService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый пул вопросов' })
  create(@Body() dto: CreateQuestionPoolDto, @Request() req) {
    return this.poolService.create(dto, req.user.id, req.user.companyId);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список пулов вопросов' })
  findAll(@Request() req) {
    return this.poolService.findAll(req.user.id, req.user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пул по ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.poolService.findOne(id, req.user.id, req.user.companyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пул' })
  update(@Param('id') id: string, @Body() dto: UpdateQuestionPoolDto, @Request() req) {
    return this.poolService.update(id, dto, req.user.id, req.user.companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пул' })
  remove(@Param('id') id: string, @Request() req) {
    return this.poolService.remove(id, req.user.id, req.user.companyId);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Создать дубликат пула' })
  duplicate(@Param('id') id: string, @Request() req) {
    return this.poolService.duplicate(id, req.user.id, req.user.companyId);
  }
}
