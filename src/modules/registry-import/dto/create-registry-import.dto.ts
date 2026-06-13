import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateRegistryImportDto {
  @ApiProperty() @IsString() buildingId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() importedByEmployeeId?: string;
}
