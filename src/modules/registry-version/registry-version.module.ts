import { Module } from '@nestjs/common';
import { RegistryVersionController } from './registry-version.controller';
import { RegistryVersionService } from './registry-version.service';
import { RegistryVersionRepository } from './registry-version.repository';

@Module({
  controllers: [RegistryVersionController],
  providers: [RegistryVersionService, RegistryVersionRepository],
  exports: [RegistryVersionService, RegistryVersionRepository],
})
export class RegistryVersionModule {}
