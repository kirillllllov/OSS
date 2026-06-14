import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OwnershipCreateDto } from './dto/ownership-create.dto';

@Injectable()
export class OwnershipRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(premiseId?: string, ownerId?: string) {
    return this.prisma.ownershipRight.findMany({
      where: {
        ...(premiseId ? { premiseId } : {}),
        ...(ownerId ? { ownerId } : {}),
      },
      include: { premise: true, owner: true },
    });
  }

  findById(id: string) {
    return this.prisma.ownershipRight.findUnique({
      where: { id },
      include: { premise: true, owner: true },
    });
  }

  create(data: OwnershipCreateDto) {
    return this.prisma.ownershipRight.create({
      data: {
        premiseId: data.premiseId,
        ownerId: data.ownerId,
        share: data.share,
        shareArea: data.shareArea,
        titleDocument: data.titleDocument,
        registrationDate: data.registrationDate,
        basisDocument: data.basisDocument,
      },
      include: { premise: true, owner: true },
    });
  }

  update(id: string, data: Partial<OwnershipCreateDto>) {
    return this.prisma.ownershipRight.update({
      where: { id },
      data: {
        share: data.share,
        shareArea: data.shareArea,
        titleDocument: data.titleDocument,
        registrationDate: data.registrationDate,
        basisDocument: data.basisDocument,
      },
      include: { premise: true, owner: true },
    });
  }

  delete(id: string) {
    return this.prisma.ownershipRight.delete({ where: { id } });
  }
}
