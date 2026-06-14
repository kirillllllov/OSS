import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAgendaItemDto {
  @ApiProperty() @IsString() meetingId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() questionId?: string;
  @ApiProperty() @IsInt() orderNumber: number;
  @ApiPropertyOptional() @IsOptional() @IsString() customProtocolText?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() customBulletinText?: string;
}
