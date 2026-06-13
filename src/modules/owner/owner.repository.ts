import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OwnerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.owner.findMany({ orderBy: { fullName: 'asc' } });
  }

  findById(id: string) {
    return this.prisma.owner.findUnique({
      where: { id },
      include: { ownerships: { include: { premise: true } }, contacts: true, representatives: true },
    });
  }

  create(data: { fullName: string; inn?: string; snils?: string }) {
    return this.prisma.owner.create({ data });
  }

  update(id: string, data: Partial<{ fullName: string; inn: string; snils: string }>) {
    return this.prisma.owner.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.owner.delete({ where: { id } });
  }
}
