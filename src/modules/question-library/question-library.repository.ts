import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionLibraryDto } from './dto/create-question-library.dto';

@Injectable()
export class QuestionLibraryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId?: string, category?: string) {
    return this.prisma.questionLibrary.findMany({
      where: {
        ...(companyId ? { companyId } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: { shortTitle: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.questionLibrary.findUnique({ where: { id } });
  }

  create(dto: CreateQuestionLibraryDto) {
    return this.prisma.questionLibrary.create({ data: dto });
  }

  update(id: string, dto: Partial<CreateQuestionLibraryDto>) {
    return this.prisma.questionLibrary.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.questionLibrary.delete({ where: { id } });
  }
}
