import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(ownerId?: string) {
    return this.prisma.contact.findMany({ where: ownerId ? { ownerId } : {} });
  }

  findById(id: string) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  create(data: CreateContactDto) {
    return this.prisma.contact.create({ data: {
      ownerId: data.ownerId, type: data.type,
      value: data.value, forNotify: data.forNotify ?? false,
    }});
  }

  update(id: string, data: Partial<CreateContactDto>) {
    return this.prisma.contact.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
