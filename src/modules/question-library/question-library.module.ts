import { Module } from '@nestjs/common';
import { QuestionLibraryController } from './question-library.controller';
import { QuestionLibraryService } from './question-library.service';
import { QuestionLibraryRepository } from './question-library.repository';

@Module({
  controllers: [QuestionLibraryController],
  providers: [QuestionLibraryService, QuestionLibraryRepository],
  exports: [QuestionLibraryService, QuestionLibraryRepository],
})
export class QuestionLibraryModule {}
