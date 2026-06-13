import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactResponseDto } from './dto/contact-response.dto';

@ApiTags('contacts')
@ApiBearerAuth()
@Controller('contacts')
export class ContactController {
  constructor(private readonly svc: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить контакт собственника' })
  @ApiResponse({ status: 201, type: ContactResponseDto })
  create(@Body() dto: CreateContactDto): Promise<ContactResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список контактов' })
  @ApiResponse({ status: 200, type: [ContactResponseDto] })
  @ApiQuery({ name: 'ownerId', required: false })
  findAll(@Query('ownerId') ownerId?: string): Promise<ContactResponseDto[]> {
    return this.svc.findAll(ownerId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить контакт' })
  @ApiResponse({ status: 200, type: ContactResponseDto })
  update(@Param('id') id: string, @Body() dto: Partial<CreateContactDto>): Promise<ContactResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить контакт' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.delete(id);
  }
}
