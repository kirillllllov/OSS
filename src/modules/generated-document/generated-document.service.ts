import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneratedDocumentDto } from './dto/create-generated-document.dto';
import { GeneratedDocumentResponseDto } from './dto/generated-document-response.dto';

@Injectable()
export class GeneratedDocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGeneratedDocumentDto, filePath?: string): Promise<GeneratedDocumentResponseDto> {
    const lastVersion = await this.prisma.generatedDocument.findFirst({
      where: { meetingId: dto.meetingId, documentType: dto.documentType },
      orderBy: { version: 'desc' },
    });
    const version = (lastVersion?.version ?? 0) + 1;
    const doc = await this.prisma.generatedDocument.create({
      data: {
        meetingId: dto.meetingId, documentType: dto.documentType,
        version, filePath: filePath ?? null,
        createdByEmployeeId: dto.createdByEmployeeId,
        isFinal: dto.isFinal ?? false,
      },
    });
    return this.toDto(doc);
  }

  async findAll(meetingId?: string, documentType?: string): Promise<GeneratedDocumentResponseDto[]> {
    const list = await this.prisma.generatedDocument.findMany({
      where: {
        ...(meetingId ? { meetingId } : {}),
        ...(documentType ? { documentType } : {}),
      },
      orderBy: { generatedAt: 'desc' },
    });
    return list.map(d => this.toDto(d));
  }

  async findOne(id: string): Promise<GeneratedDocumentResponseDto> {
    const doc = await this.prisma.generatedDocument.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Документ не найден');
    return this.toDto(doc);
  }

  async markFinal(id: string): Promise<GeneratedDocumentResponseDto> {
    const doc = await this.prisma.generatedDocument.update({ where: { id }, data: { isFinal: true } });
    return this.toDto(doc);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.generatedDocument.delete({ where: { id } });
  }

  private toDto(d: any): GeneratedDocumentResponseDto {
    return { id: d.id, meetingId: d.meetingId, documentType: d.documentType,
      version: d.version, generatedAt: d.generatedAt, createdByEmployeeId: d.createdByEmployeeId,
      filePath: d.filePath, isFinal: d.isFinal };
  }
}
