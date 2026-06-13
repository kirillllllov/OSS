import { ApiProperty } from '@nestjs/swagger';

export class OwnershipResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() premiseId: string;
  @ApiProperty() ownerId: string;
  @ApiProperty() share: string;      // например "1/3"
  @ApiProperty() shareArea: number;   // площадь доли (вычисляемое)
  @ApiProperty() titleDocument: string;
  @ApiProperty() regDate: Date;
  @ApiProperty({ required: false }) basisDocument?: string;
}