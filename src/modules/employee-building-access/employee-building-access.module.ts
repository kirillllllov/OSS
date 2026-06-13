import { Module } from '@nestjs/common';
import { EmployeeBuildingAccessController } from './employee-building-access.controller';
import { EmployeeBuildingAccessService } from './employee-building-access.service';

@Module({
  controllers: [EmployeeBuildingAccessController],
  providers: [EmployeeBuildingAccessService],
  exports: [EmployeeBuildingAccessService],
})
export class EmployeeBuildingAccessModule {}
