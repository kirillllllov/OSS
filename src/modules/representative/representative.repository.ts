import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRepresentativeDto } from './dto/create-representative.dto';

@Injectable()
export class RepresentativeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(ownerId?: string) {
    return this.prisma.representative.findMany({ where: ownerId ? { ownerId } : {} });
  }

  findById(id: string) {
    return this.prisma.representative.findUnique({ where: { id } });
  }

  create(dto: CreateRepresentativeDto) {
    return this.prisma.representative.create({
      data: {
        ownerId: dto.ownerId, fullName: dto.fullName,
        proxyNumber: dto.proxyNumber, scanPath: dto.scanPath,
        issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
    });
  }

  update(id: string, dto: Partial<CreateRepresentativeDto>) {
    return this.prisma.representative.update({
      where: { id },
      data: {
        fullName: dto.fullName, proxyNumber: dto.proxyNumber, scanPath: dto.scanPath,
        issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
    });
  }

  delete(id: string) {
    return this.prisma.representative.delete({ where: { id } });
  }
}
