import { ApiProperty } from '@nestjs/swagger';

export class PremiseResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() buildingId: string;
  @ApiProperty() number: string;
  @ApiProperty({ required: false }) cadastralNumber?: string;
  @ApiProperty() area: number;
  @ApiProperty() ownershipForm: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}