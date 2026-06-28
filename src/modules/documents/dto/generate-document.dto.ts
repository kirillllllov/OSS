import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsIn } from 'class-validator';

export type DocumentType =
  | 'act'
  | 'registration_sheet'
  | 'protocol'
  | 'ballot'
  | 'meeting_message'
  | 'register_of_owners'
  | 'sheet_of_invited_persons'
  | 'sheet_of_the_persons_present'
  | 'voting_results_notice'
  | 'voting_results'
  | 'act_after_voting';
const ALL_DOC_TYPES: DocumentType[] = [
  'act',
  'registration_sheet',
  'protocol',
  'ballot',
  'meeting_message',
  'register_of_owners',
  'sheet_of_invited_persons',
  'sheet_of_the_persons_present',
  'voting_results_notice',
  'voting_results',
  'act_after_voting',
];

export class GenerateDocumentDto {
  @ApiProperty({
    description: 'Тип документа',
    enum: ALL_DOC_TYPES,
  })
  @IsIn(ALL_DOC_TYPES)
  type: DocumentType;

  @ApiProperty({ description: 'ID собрания' })
  @IsString()
  meetingId: string;

  @ApiPropertyOptional({ description: 'ID собственника (только для бюллетеня)' })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiPropertyOptional({ description: 'Поля для ручного заполнения (ключ — имя переменной)' })
  @IsOptional()
  @IsObject()
  manualFields?: Record<string, string>;
}
