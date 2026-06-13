import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RepresentativeResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() ownerId: string;
  @ApiProperty() fullName: string;
  @ApiPropertyOptional() proxyNumber?: string;
  @ApiPropertyOptional() issuedAt?: Date;
  @ApiPropertyOptional() expiresAt?: Date;
  @ApiPropertyOptional() scanPath?: string;
}
