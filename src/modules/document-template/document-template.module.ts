import { Module } from '@nestjs/common';
import { DocumentTemplateController } from './document-template.controller';
import { DocumentTemplateService } from './document-template.service';
import { DocumentTemplateRepository } from './document-template.repository';

@Module({
  controllers: [DocumentTemplateController],
  providers: [DocumentTemplateService, DocumentTemplateRepository],
  exports: [DocumentTemplateService, DocumentTemplateRepository],
})
export class DocumentTemplateModule {}
