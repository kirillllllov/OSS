import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistryImportResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() buildingId: string;
  @ApiProperty() filePath: string;
  @ApiProperty() status: string;
  @ApiPropertyOptional() importedByEmployeeId?: string;
  @ApiProperty() createdAt: Date;
}
