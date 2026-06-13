import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateQuestionLibraryDto {
  @ApiProperty() @IsString() companyId: string;
  @ApiProperty() @IsString() shortTitle: string;
  @ApiProperty() @IsString() protocolText: string;
  @ApiProperty() @IsString() bulletinText: string;
  @ApiProperty({ enum: ['simple_majority', 'absolute_majority', 'qualified_majority', 'unanimity'] })
  @IsIn(['simple_majority', 'absolute_majority', 'qualified_majority', 'unanimity'])
  quorumType: string;
  @ApiPropertyOptional() @IsOptional() @IsString() category?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() tags?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() createdByEmployeeId?: string;
}
