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
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('question-pools')
@ApiBearerAuth()
@Controller('question-pools')
@UseGuards(SessionGuard, RolesGuard)
export class QuestionPoolController {
  constructor(private readonly poolService: QuestionPoolService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый пул вопросов' })
  @ApiResponse({ status: 201, description: 'Пул успешно создан.' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав (для глобального пула нужен администратор).' })
  create(@Body() dto: CreateQuestionPoolDto, @Request() req) {
    return this.poolService.create(dto, req.user.id, req.user.role);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список пулов вопросов. Админ видит все, сотрудник – глобальные + свои персональные.' })
  @ApiResponse({ status: 200, description: 'Список пулов.' })
  findAll(@Request() req) {
    return this.poolService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пул по ID (с вопросами).' })
  @ApiResponse({ status: 200, description: 'Пул найден.' })
  @ApiResponse({ status: 403, description: 'Нет доступа к этому пулу.' })
  @ApiResponse({ status: 404, description: 'Пул не найден.' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.poolService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пул (название, тип, список вопросов).' })
  @ApiResponse({ status: 200, description: 'Пул обновлён.' })
  @ApiResponse({ status: 403, description: 'Нет прав на редактирование.' })
  @ApiResponse({ status: 404, description: 'Пул не найден.' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionPoolDto,
    @Request() req,
  ) {
    return this.poolService.update(id, dto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пул.' })
  @ApiResponse({ status: 200, description: 'Пул удалён.' })
  @ApiResponse({ status: 403, description: 'Нет прав на удаление.' })
  @ApiResponse({ status: 404, description: 'Пул не найден.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.poolService.remove(id, req.user.id, req.user.role);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Создать дубликат пула.' })
  @ApiResponse({ status: 201, description: 'Копия пула создана.' })
  @ApiResponse({ status: 403, description: 'Нет доступа к оригинальному пулу.' })
  @ApiResponse({ status: 404, description: 'Пул не найден.' })
  duplicate(@Param('id') id: string, @Request() req) {
    return this.poolService.duplicate(id, req.user.id, req.user.role);
  }
}