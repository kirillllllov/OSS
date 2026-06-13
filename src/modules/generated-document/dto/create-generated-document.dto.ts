import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class CreateGeneratedDocumentDto {
  @ApiProperty() @IsString() meetingId: string;
  @ApiProperty({ enum: ['meeting_notice', 'placement_act', 'ballot', 'protocol', 'registry', 'invited_list', 'zip_package'] })
  @IsIn(['meeting_notice', 'placement_act', 'ballot', 'protocol', 'registry', 'invited_list', 'zip_package'])
  documentType: string;
  @ApiPropertyOptional() @IsOptional() @IsString() createdByEmployeeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isFinal?: boolean;
}
