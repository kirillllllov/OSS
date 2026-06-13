import { Module } from '@nestjs/common';
import { RepresentativeController } from './representative.controller';
import { RepresentativeService } from './representative.service';
import { RepresentativeRepository } from './representative.repository';

@Module({
  controllers: [RepresentativeController],
  providers: [RepresentativeService, RepresentativeRepository],
  exports: [RepresentativeService, RepresentativeRepository],
})
export class RepresentativeModule {}
