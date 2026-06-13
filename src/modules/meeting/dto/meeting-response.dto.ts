import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MeetingResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() companyId: string;
  @ApiProperty() buildingId: string;
  @ApiPropertyOptional() registryVersionId?: string;
  @ApiPropertyOptional() initiatorEmployeeId?: string;
  @ApiProperty() number: string;
  @ApiProperty() form: string;
  @ApiProperty() status: string;
  @ApiProperty() dateStart: Date;
  @ApiProperty() dateEnd: Date;
  @ApiPropertyOptional() inPersonAddress?: string;
  @ApiPropertyOptional() ballotAcceptAddress?: string;
  @ApiPropertyOptional() noticeAddress?: string;
  @ApiPropertyOptional() resultDate?: Date;
  @ApiPropertyOptional() reason?: string;
  @ApiProperty() requiresGis: boolean;
  @ApiProperty() createdAt: Date;
  @ApiPropertyOptional() activatedAt?: Date;
  @ApiPropertyOptional() completedAt?: Date;
  @ApiPropertyOptional() archivedAt?: Date;
  @ApiPropertyOptional() quorumPercent?: number;
}
