import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OwnershipResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() premiseId: string;
  @ApiProperty() ownerId: string;
  @ApiPropertyOptional() share?: string;
  @ApiPropertyOptional() shareArea?: number;
  @ApiPropertyOptional() titleDocument?: string;
  @ApiPropertyOptional() registrationDate?: string;
  @ApiPropertyOptional() basisDocument?: string;
}
