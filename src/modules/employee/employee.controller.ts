import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@ApiTags('employees')
@ApiBearerAuth()
@Controller('employees')
export class EmployeeController {
  constructor(private readonly svc: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Создать сотрудника' })
  @ApiResponse({ status: 201, type: EmployeeResponseDto })
  create(@Body() dto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список сотрудников' })
  @ApiResponse({ status: 200, type: [EmployeeResponseDto] })
  @ApiQuery({ name: 'companyId', required: false })
  findAll(@Query('companyId') companyId?: string): Promise<EmployeeResponseDto[]> {
    return this.svc.findAll(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить сотрудника по ID' })
  @ApiResponse({ status: 200, type: EmployeeResponseDto })
  findOne(@Param('id') id: string): Promise<EmployeeResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить сотрудника' })
  @ApiResponse({ status: 200, type: EmployeeResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить сотрудника' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
