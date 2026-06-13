import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BallotResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() meetingId: string;
  @ApiProperty() ownershipId: string;
  @ApiPropertyOptional() representativeId?: string;
  @ApiPropertyOptional() createdByEmployeeId?: string;
  @ApiProperty() received: boolean;
  @ApiPropertyOptional() deliveryMethod?: string;
  @ApiProperty() status: string;
  @ApiPropertyOptional() invalidReason?: string;
  @ApiPropertyOptional() invalidNote?: string;
  @ApiPropertyOptional() scanPath?: string;
  @ApiProperty() manualEntry: boolean;
  @ApiProperty() createdAt: Date;
}
