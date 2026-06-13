import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNumber, IsIn, Min, Max } from 'class-validator';

export class CreateAgendaItemDto {
  @ApiProperty() @IsString() meetingId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() questionId?: string;
  @ApiProperty() @IsInt() orderNumber: number;
  @ApiPropertyOptional() @IsOptional() @IsString() customProtocolText?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() customBulletinText?: string;
  @ApiProperty({ enum: ['simple_majority', 'absolute_majority', 'qualified_majority', 'unanimity'] })
  @IsIn(['simple_majority', 'absolute_majority', 'qualified_majority', 'unanimity'])
  decisionType: string;
  @ApiPropertyOptional({ default: 50 }) @IsOptional() @IsNumber() @Min(0) @Max(100) acceptPercent?: number;
}
