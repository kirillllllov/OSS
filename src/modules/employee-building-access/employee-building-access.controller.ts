import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeeBuildingAccessService } from './employee-building-access.service';
import { CreateAccessDto } from './dto/create-access.dto';

@ApiTags('employee-building-access')
@ApiBearerAuth()
@Controller('employee-building-access')
export class EmployeeBuildingAccessController {
  constructor(private readonly svc: EmployeeBuildingAccessService) {}

  @Post()
  @ApiOperation({ summary: 'Выдать сотруднику доступ к дому' })
  grant(@Body() dto: CreateAccessDto) {
    return this.svc.grant(dto);
  }

  @Delete(':employeeId/:buildingId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Отозвать доступ' })
  async revoke(
    @Param('employeeId') employeeId: string,
    @Param('buildingId') buildingId: string,
  ): Promise<void> {
    await this.svc.revoke(employeeId, buildingId);
  }

  @Get('by-employee/:employeeId')
  @ApiOperation({ summary: 'Дома сотрудника' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.svc.findByEmployee(employeeId);
  }

  @Get('by-building/:buildingId')
  @ApiOperation({ summary: 'Сотрудники с доступом к дому' })
  findByBuilding(@Param('buildingId') buildingId: string) {
    return this.svc.findByBuilding(buildingId);
  }
}
