import { ApiProperty } from '@nestjs/swagger';

export class BuildingResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() address: string;
  @ApiProperty() cadastralNumber: string;
  @ApiProperty({ required: false }) yearBuilt?: number;
  @ApiProperty({ required: false }) floors?: number;
  @ApiProperty({ required: false }) entrances?: number;
  @ApiProperty() totalArea: number;
  @ApiProperty() totalPremises: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}