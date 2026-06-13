import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsIn } from 'class-validator';

export class CreateDocumentTemplateDto {
  @ApiProperty() @IsString() companyId: string;
  @ApiProperty({ enum: ['meeting_notice', 'placement_act', 'ballot', 'protocol', 'registry', 'invited_list'] })
  @IsIn(['meeting_notice', 'placement_act', 'ballot', 'protocol', 'registry', 'invited_list'])
  documentType: string;
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() filePath: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() version?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() active?: boolean;
}
