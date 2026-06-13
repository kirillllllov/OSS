import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateVotingLinkDto {
  @ApiProperty() @IsString() meetingId: string;
  @ApiProperty() @IsString() ownershipId: string;
  @ApiProperty() @IsDateString() validUntil: string;
}
