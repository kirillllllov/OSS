import { Module } from '@nestjs/common';
import { GeneratedDocumentController } from './generated-document.controller';
import { GeneratedDocumentService } from './generated-document.service';

@Module({
  controllers: [GeneratedDocumentController],
  providers: [GeneratedDocumentService],
  exports: [GeneratedDocumentService],
})
export class GeneratedDocumentModule {}
