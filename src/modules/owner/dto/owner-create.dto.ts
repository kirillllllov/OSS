import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class OwnerCreateDto {
  @ApiProperty() @IsString() fullName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inn?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() snils?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactInfo?: string;
}
