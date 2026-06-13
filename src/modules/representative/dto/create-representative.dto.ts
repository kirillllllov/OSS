import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateRepresentativeDto {
  @ApiProperty() @IsString() ownerId: string;
  @ApiProperty() @IsString() fullName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() proxyNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() issuedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expiresAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() scanPath?: string;
}
