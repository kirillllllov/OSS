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

  async create(dto: CreateQuestionPoolDto, userId: string, userCompanyId: string | null) {
    if (dto.type === 'GLOBAL' && !userCompanyId) {
      throw new ForbiddenException('Только сотрудник компании может создавать глобальные пулы');
    }
    const pool = await this.prisma.questionPool.create({
      data: {
        name: dto.name,
        type: dto.type,
        employeeId: dto.type === 'GLOBAL' ? null : userId,
      },
    });
    const items = dto.questionIds.map((qid, idx) => ({
      poolId: pool.id,
      questionId: qid,
      orderNumber: idx,
    }));
    await this.prisma.questionPoolItem.createMany({ data: items });
    return this.findOne(pool.id, userId, userCompanyId);
  }

  async findAll(userId: string, userCompanyId: string | null) {
    const where = userCompanyId
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

  async findOne(id: string, userId: string, userCompanyId: string | null) {
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
    const canAccess = !!userCompanyId ||
      pool.type === 'GLOBAL' ||
      pool.employeeId === userId;
    if (!canAccess) throw new ForbiddenException('Нет доступа к этому пулу');
    return pool;
  }

  async update(
    id: string,
    dto: UpdateQuestionPoolDto,
    userId: string,
    userCompanyId: string | null,
  ) {
    const pool = await this.prisma.questionPool.findUnique({ where: { id } });
    if (!pool) throw new NotFoundException('Пул не найден');
    const canEdit = !!userCompanyId || pool.employeeId === userId;
    if (!canEdit) throw new ForbiddenException('Нельзя редактировать этот пул');
    if (dto.type === 'GLOBAL' && !userCompanyId) {
      throw new ForbiddenException('Только сотрудник компании может делать пул глобальным');
    }
    await this.prisma.questionPool.update({
      where: { id },
      data: {
        name: dto.name,
        type: dto.type,
        employeeId: dto.type === 'GLOBAL' ? null : (pool.employeeId ?? userId),
      },
    });
    if (dto.questionIds) {
      await this.prisma.questionPoolItem.deleteMany({ where: { poolId: id } });
      const items = dto.questionIds.map((qid, idx) => ({
        poolId: id,
        questionId: qid,
        orderNumber: idx,
      }));
      await this.prisma.questionPoolItem.createMany({ data: items });
    }
    return this.findOne(id, userId, userCompanyId);
  }

  async remove(id: string, userId: string, userCompanyId: string | null) {
    const pool = await this.prisma.questionPool.findUnique({ where: { id } });
    if (!pool) throw new NotFoundException('Пул не найден');
    const canDelete = !!userCompanyId || pool.employeeId === userId;
    if (!canDelete) throw new ForbiddenException('Нельзя удалить этот пул');
    await this.prisma.questionPool.delete({ where: { id } });
    return { message: 'Пул удалён' };
  }

  async duplicate(id: string, userId: string, userCompanyId: string | null) {
    const original = await this.findOne(id, userId, userCompanyId);
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
    return this.findOne(newPool.id, userId, userCompanyId);
  }
}
