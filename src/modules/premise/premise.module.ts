import { Module } from '@nestjs/common';
import { PremiseController } from './premise.controller';
import { PremiseService } from './premise.service';
import { PremiseRepository } from './premise.repository';

@Module({
  controllers: [PremiseController],
  providers: [PremiseService, PremiseRepository],
  exports: [PremiseService, PremiseRepository],
})
export class PremiseModule {}
