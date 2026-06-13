import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { BuildingRepository } from './building.repository';

@Module({
  controllers: [BuildingController],
  providers: [BuildingService, BuildingRepository],
  exports: [BuildingService, BuildingRepository],
})
export class BuildingModule {}