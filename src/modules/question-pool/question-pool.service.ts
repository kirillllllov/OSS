import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionPoolDto } from './dto/create-question-pool.dto';
import { UpdateQuestionPoolDto } from './dto/update-question-pool.dto';


@Injectable()
export class QuestionPoolService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuestionPoolDto, userId: string, userRole: string) {
    // Проверка прав: глобальный пул может создавать только админ
    if (dto.type === 'GLOBAL' && userRole !== 'COMPANY_ADMIN') {
      throw new ForbiddenException('Только администратор может создавать глобальные пулы');
    }
    const pool = await this.prisma.questionPool.create({
      data: {
        name: dto.name,
        type: dto.type,
        employeeId: dto.type === 'GLOBAL' ? null : userId,
      },
    });
    // Добавляем вопросы с порядком
    const items = dto.questionIds.map((qid, idx) => ({
      poolId: pool.id,
      questionId: qid,
      orderNumber: idx,
    }));
    await this.prisma.questionPoolItem.createMany({ data: items });
    return this.findOne(pool.id, userId, userRole);
  }

  async findAll(userId: string, userRole: string) {
    // Админ видит все пулы, сотрудник – глобальные + свои персональные
    const where = userRole === 'COMPANY_ADMIN'
      ? {}
      : {
          OR: [
            { type: 'GLOBAL' },
            { employeeId: userId },
          ],
        };
    const pools = await this.prisma.questionPool.findMany({
      where,
      include: {
        items: {
          orderBy: { orderNumber: 'asc' },
          include: { question: true },
        },
        employee: { select: { id: true, fullName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return pools;
  }

  async findOne(id: string, userId: string, userRole: string) {
    const pool = await this.prisma.questionPool.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { orderNumber: 'asc' },
          include: { question: true },
        },
        employee: { select: { id: true, fullName: true, email: true } },
      },
    });
    if (!pool) throw new NotFoundException('Пул не найден');
    // Проверка доступа
    const canAccess = userRole === 'COMPANY_ADMIN' ||
      pool.type === 'GLOBAL' ||
      pool.employeeId === userId;
    if (!canAccess) throw new ForbiddenException('Нет доступа к этому пулу');
    return pool;
  }

  async update(
    id: string,
    dto: UpdateQuestionPoolDto,
    userId: string,
    userRole: string,
  ) {
    const pool = await this.prisma.questionPool.findUnique({ where: { id } });
    if (!pool) throw new NotFoundException('Пул не найден');
    // Проверка прав на редактирование
    const canEdit = userRole === 'COMPANY_ADMIN' || pool.employeeId === userId;
    if (!canEdit) throw new ForbiddenException('Нельзя редактировать этот пул');
    // Если меняется тип на GLOBAL, только админ
    if (dto.type === 'GLOBAL' && userRole !== 'COMPANY_ADMIN') {
      throw new ForbiddenException('Только администратор может делать пул глобальным');
    }
    // Обновляем сам пул
    await this.prisma.questionPool.update({
      where: { id },
      data: {
        name: dto.name,
        type: dto.type,
        employeeId: dto.type === 'GLOBAL' ? null : (pool.employeeId ?? userId),
      },
    });
    // Обновляем список вопросов, если передан
    if (dto.questionIds) {
      // Удаляем старые связи
      await this.prisma.questionPoolItem.deleteMany({ where: { poolId: id } });
      // Создаём новые с порядком
      const items = dto.questionIds.map((qid, idx) => ({
        poolId: id,
        questionId: qid,
        orderNumber: idx,
      }));
      await this.prisma.questionPoolItem.createMany({ data: items });
    }
    return this.findOne(id, userId, userRole);
  }

  async remove(id: string, userId: string, userRole: string) {
    const pool = await this.prisma.questionPool.findUnique({ where: { id } });
    if (!pool) throw new NotFoundException('Пул не найден');
    const canDelete = userRole === 'COMPANY_ADMIN' || pool.employeeId === userId;
    if (!canDelete) throw new ForbiddenException('Нельзя удалить этот пул');
    await this.prisma.questionPool.delete({ where: { id } });
    return { message: 'Пул удалён' };
  }

  async duplicate(id: string, userId: string, userRole: string) {
    const original = await this.findOne(id, userId, userRole);
    const newPool = await this.prisma.questionPool.create({
      data: {
        name: `Копия ${original.name}`,
        type: original.type,
        employeeId: original.type === 'GLOBAL' ? null : userId,
      },
    });
    const items = original.items.map((item, idx) => ({
      poolId: newPool.id,
      questionId: item.questionId,
      orderNumber: idx,
    }));
    await this.prisma.questionPoolItem.createMany({ data: items });
    return this.findOne(newPool.id, userId, userRole);
  }
}