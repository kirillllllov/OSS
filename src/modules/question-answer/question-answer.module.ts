import { Module } from '@nestjs/common';
import { QuestionAnswerController } from './question-answer.controller';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerRepository } from './question-answer.repository';

@Module({
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService, QuestionAnswerRepository],
  exports: [QuestionAnswerService, QuestionAnswerRepository],
})
export class QuestionAnswerModule {}
