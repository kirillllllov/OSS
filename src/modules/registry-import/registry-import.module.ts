import { Module } from '@nestjs/common';
import { RegistryImportController } from './registry-import.controller';
import { RegistryImportService } from './registry-import.service';
import { OwnerModule } from '../owner/owner.module';
import { PremiseModule } from '../premise/premise.module';
import { OwnershipModule } from '../ownership/ownership.module';

@Module({
  imports: [OwnerModule, PremiseModule, OwnershipModule],
  controllers: [RegistryImportController],
  providers: [RegistryImportService],
  exports: [RegistryImportService],
})
export class RegistryImportModule {}
