import { Module } from '@nestjs/common';
import { QuestionPoolService } from './question-pool.service';
import { QuestionPoolController } from './question-pool.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [QuestionPoolController],
  providers: [QuestionPoolService, PrismaService],
  exports: [QuestionPoolService],
})
export class QuestionPoolModule {}