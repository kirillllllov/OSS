import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BuildingResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() companyId: string;
  @ApiProperty() address: string;
  @ApiProperty() cadastralNumber: string;
  @ApiPropertyOptional() yearBuilt?: number;
  @ApiPropertyOptional() floors?: number;
  @ApiPropertyOptional() entrances?: number;
  @ApiProperty() totalArea: number;
  @ApiProperty() totalPremises: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
