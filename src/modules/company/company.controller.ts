import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@ApiTags('companies')
@ApiBearerAuth()
@Controller('companies')
export class CompanyController {
  constructor(private readonly svc: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Создать компанию (УК)' })
  @ApiResponse({ status: 201, type: CompanyResponseDto })
  create(@Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список компаний' })
  @ApiResponse({ status: 200, type: [CompanyResponseDto] })
  findAll(): Promise<CompanyResponseDto[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компанию по ID' })
  @ApiResponse({ status: 200, type: CompanyResponseDto })
  findOne(@Param('id') id: string): Promise<CompanyResponseDto> {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить компанию' })
  @ApiResponse({ status: 200, type: CompanyResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить компанию' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
