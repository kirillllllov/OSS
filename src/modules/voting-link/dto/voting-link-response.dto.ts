import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VotingLinkResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() meetingId: string;
  @ApiProperty() ownershipId: string;
  @ApiProperty() token: string;
  @ApiProperty() validUntil: Date;
  @ApiProperty() used: boolean;
}
