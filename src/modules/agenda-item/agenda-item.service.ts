import { Injectable, NotFoundException } from '@nestjs/common';
import { AgendaItemRepository } from './agenda-item.repository';
import { CreateAgendaItemDto } from './dto/create-agenda-item.dto';
import { AgendaItemResponseDto } from './dto/agenda-item-response.dto';

@Injectable()
export class AgendaItemService {
  constructor(private readonly repo: AgendaItemRepository) {}

  async create(dto: CreateAgendaItemDto): Promise<AgendaItemResponseDto> {
    const item = await this.repo.create(dto);
    return this.toDto(item);
  }

  async findAll(meetingId?: string): Promise<AgendaItemResponseDto[]> {
    const list = await this.repo.findAll(meetingId);
    return list.map(i => this.toDto(i));
  }

  async findOne(id: string): Promise<any> {
    const item = await this.repo.findById(id);
    if (!item) throw new NotFoundException('Пункт повестки не найден');
    return item;
  }

  async update(id: string, dto: Partial<CreateAgendaItemDto>): Promise<AgendaItemResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(i: any): AgendaItemResponseDto {
    return {
      id: i.id,
      meetingId: i.meetingId,
      questionId: i.questionId,
      orderNumber: i.orderNumber,
      customProtocolText: i.customProtocolText,
      customBulletinText: i.customBulletinText,
    };
  }
}
