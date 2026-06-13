import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OwnerResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() fullName: string;
  @ApiPropertyOptional() inn?: string;
  @ApiPropertyOptional() snils?: string;
  @ApiProperty() updatedAt: Date;
}
