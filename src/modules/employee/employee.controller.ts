import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { SessionGuard } from '../auth/guards/session.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@ApiBearerAuth()
@Controller('employees')
@UseGuards(SessionGuard)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  async create(@Body() dto: CreateEmployeeDto, @Request() req) {
    return this.employeeService.create(dto, req.user.companyId);
  }

  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }

  @Get('me/buildings')
  async getMyBuildings(@Request() req) {
    return this.employeeService.getEmployeeBuildings(req.user.id);
  }

  @Post(':employeeId/buildings/:buildingId')
  async assignBuilding(@Param('employeeId') employeeId: string, @Param('buildingId') buildingId: string) {
    await this.employeeService.assignBuildingsToEmployee(employeeId, [buildingId]);
    return { message: 'Доступ добавлен' };
  }
}
