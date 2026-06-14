import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateQuestionAnswerDto {
  @ApiProperty() @IsString() ownerId: string;
  @ApiProperty() @IsString() agendaItemId: string;
  @ApiProperty({ enum: ['for', 'against', 'abstain'] })
  @IsIn(['for', 'against', 'abstain'])
  vote: string;
  @ApiPropertyOptional({ enum: ['manual', 'ocr', 'online'], default: 'manual' })
  @IsOptional()
  @IsIn(['manual', 'ocr', 'online'])
  source?: string;
}
