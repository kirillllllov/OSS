import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { OwnerRepository } from './owner.repository';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, OwnerRepository],
  exports: [OwnerService, OwnerRepository],
})
export class OwnerModule {}
