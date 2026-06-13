import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistryVersionResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() buildingId: string;
  @ApiProperty() versionNumber: number;
  @ApiProperty() formedAt: Date;
  @ApiProperty() source: string;
  @ApiPropertyOptional() comment?: string;
}
