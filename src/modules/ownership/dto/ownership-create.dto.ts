import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsOptional } from 'class-validator';

export class OwnershipCreateDto {
  @ApiProperty() @IsUUID() premiseId: string;
  @ApiProperty() @IsUUID() ownerId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() share?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() shareArea?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() titleDocument?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() registrationDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() basisDocument?: string;
}
