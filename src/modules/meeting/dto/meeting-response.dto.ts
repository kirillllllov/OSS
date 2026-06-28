import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MeetingResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() buildingId: string;
  @ApiPropertyOptional() initiatorEmployeeId?: string;
  @ApiPropertyOptional() initiatorOwners?: { id: string; fullName: string; premises?: string[] }[];
  @ApiPropertyOptional() number?: string;
  @ApiProperty() form: string;
  @ApiProperty() status: string;
  @ApiProperty() startDate: string;
  @ApiPropertyOptional() endDate?: string;
  @ApiPropertyOptional() inPersonStartTime?: string;
  @ApiPropertyOptional() inPersonAddress?: string;
  @ApiPropertyOptional() ballotAcceptanceAddress?: string;
  @ApiPropertyOptional() noticeAddress?: string;
  @ApiPropertyOptional() resultsDate?: string;
  @ApiPropertyOptional() extensionReason?: string;
  @ApiProperty() createdAt: Date;
  @ApiPropertyOptional() activatedAt?: string;
  @ApiPropertyOptional() completedAt?: string;
  @ApiPropertyOptional() archivedAt?: string;
}
