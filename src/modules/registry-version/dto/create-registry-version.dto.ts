import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateRegistryVersionDto {
  @ApiProperty() @IsString() buildingId: string;
  @ApiProperty() @IsInt() versionNumber: number;
  @ApiPropertyOptional() @IsOptional() @IsString() source?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
}
