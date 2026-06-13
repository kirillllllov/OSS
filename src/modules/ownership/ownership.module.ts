import { Module } from '@nestjs/common';
import { OwnershipController } from './ownership.controller';
import { OwnershipService } from './ownership.service';
import { OwnershipRepository } from './ownership.repository';

@Module({
  controllers: [OwnershipController],
  providers: [OwnershipService, OwnershipRepository],
  exports: [OwnershipService, OwnershipRepository],
})
export class OwnershipModule {}
