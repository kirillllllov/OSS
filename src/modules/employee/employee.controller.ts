import { Controller, Post, Body, UseGuards, Request, Get, Param, Delete, ForbiddenException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { SessionGuard } from '../auth/guards/session.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@ApiBearerAuth()
@Controller('employees')
@UseGuards(SessionGuard, RolesGuard)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  @Roles('COMPANY_ADMIN')
  async create(@Body() dto: CreateEmployeeDto, @Request() req) {
    return this.employeeService.create(dto, req.user.role);
  }

  @Get()
  @Roles('COMPANY_ADMIN')
  async findAll() {
    return this.employeeService.findAll();
  }

  @Get('me/buildings')
  async getMyBuildings(@Request() req) {
    // Любой авторизованный сотрудник может посмотреть свои дома
    return this.employeeService.getEmployeeBuildings(req.user.id);
  }

  @Post(':employeeId/buildings/:buildingId')
  @Roles('COMPANY_ADMIN')
  async assignBuilding(@Param('employeeId') employeeId: string, @Param('buildingId') buildingId: string) {
    await this.employeeService.assignBuildingsToEmployee(employeeId, [buildingId]);
    return { message: 'Доступ добавлен' };
  }
}