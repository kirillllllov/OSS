import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OwnerRepository } from '../owner/owner.repository';
import { PremiseRepository } from '../premise/premise.repository';
import { OwnershipRepository } from '../ownership/ownership.repository';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RegistryImportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownerRepo: OwnerRepository,
    private readonly premiseRepo: PremiseRepository,
    private readonly ownershipRepo: OwnershipRepository,
  ) {}

  async findAll(buildingId?: string) {
    return this.prisma.registryImport.findMany({
      where: buildingId ? { buildingId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const imp = await this.prisma.registryImport.findUnique({ where: { id } });
    if (!imp) throw new NotFoundException('Импорт не найден');
    return imp;
  }

  async createImport(buildingId: string, filePath: string, employeeId?: string) {
    return this.prisma.registryImport.create({
      data: { buildingId, filePath, status: 'pending', importedByEmployeeId: employeeId },
    });
  }

  async processImport(importId: string, rows: Array<{
    number: string; cadastralNumber?: string; area: number; ownershipForm: string;
    ownerFullName: string; ownerInn?: string; ownerSnils?: string;
    share: string; shareArea: number; titleDocument: string; regDate: string; basisDocument?: string;
  }>): Promise<void> {
    await this.prisma.registryImport.update({ where: { id: importId }, data: { status: 'processing' } });
    try {
      const imp = await this.findOne(importId);
      for (const row of rows) {
        let premise = row.cadastralNumber
          ? await this.premiseRepo.findByCadastralNumber(row.cadastralNumber)
          : null;
        if (!premise) {
          premise = await this.premiseRepo.create({
            building: { connect: { id: imp.buildingId } },
            number: row.number, cadastralNumber: row.cadastralNumber,
            area: row.area, ownershipForm: row.ownershipForm,
          });
        }
        const owner = await this.ownerRepo.create({
          fullName: row.ownerFullName, inn: row.ownerInn, snils: row.ownerSnils,
        });
        await this.ownershipRepo.create({
          premiseId: premise.id, ownerId: owner.id,
          share: row.share, shareArea: row.shareArea,
          titleDocument: row.titleDocument,
          regDate: new Date(row.regDate),
          basisDocument: row.basisDocument,
        });
      }
      await this.prisma.registryImport.update({ where: { id: importId }, data: { status: 'completed' } });
    } catch {
      await this.prisma.registryImport.update({ where: { id: importId }, data: { status: 'error' } });
      throw new Error('Ошибка при обработке импорта');
    }
  }
}
