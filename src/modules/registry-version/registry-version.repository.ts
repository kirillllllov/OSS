import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegistryVersionDto } from './dto/create-registry-version.dto';

@Injectable()
export class RegistryVersionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(buildingId?: string) {
    return this.prisma.registryVersion.findMany({
      where: buildingId ? { buildingId } : {},
      orderBy: { versionNumber: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.registryVersion.findUnique({ where: { id } });
  }

  findLatestByBuilding(buildingId: string) {
    return this.prisma.registryVersion.findFirst({
      where: { buildingId },
      orderBy: { versionNumber: 'desc' },
    });
  }

  create(dto: CreateRegistryVersionDto) {
    return this.prisma.registryVersion.create({
      data: {
        buildingId: dto.buildingId,
        versionNumber: dto.versionNumber,
        source: dto.source ?? 'manual',
        comment: dto.comment,
      },
    });
  }

  delete(id: string) {
    return this.prisma.registryVersion.delete({ where: { id } });
  }
}
