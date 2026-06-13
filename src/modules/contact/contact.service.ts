import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactResponseDto } from './dto/contact-response.dto';

@Injectable()
export class ContactService {
  constructor(private readonly repo: ContactRepository) {}

  async create(dto: CreateContactDto): Promise<ContactResponseDto> {
    const contact = await this.repo.create(dto);
    return this.toDto(contact);
  }

  async findAll(ownerId?: string): Promise<ContactResponseDto[]> {
    const list = await this.repo.findAll(ownerId);
    return list.map(c => this.toDto(c));
  }

  async findOne(id: string): Promise<ContactResponseDto> {
    const contact = await this.repo.findById(id);
    if (!contact) throw new NotFoundException('Контакт не найден');
    return this.toDto(contact);
  }

  async update(id: string, dto: Partial<CreateContactDto>): Promise<ContactResponseDto> {
    await this.findOne(id);
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  private toDto(c: any): ContactResponseDto {
    return { id: c.id, ownerId: c.ownerId, type: c.type, value: c.value, forNotify: c.forNotify };
  }
}
