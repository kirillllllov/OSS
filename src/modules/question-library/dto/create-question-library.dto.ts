import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateQuestionLibraryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() companyId?: string;
  @ApiProperty() @IsString() shortTitle: string;
  @ApiPropertyOptional() @IsOptional() @IsString() protocolText?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bulletinText?: string;
  @ApiPropertyOptional({ enum: ['simple_majority', 'absolute_majority', 'qualified_majority', 'unanimity'] })
  @IsOptional()
  @IsIn(['simple_majority', 'absolute_majority', 'qualified_majority', 'unanimity'])
  quorumType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() category?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() tags?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() createdByEmployeeId?: string;
}
