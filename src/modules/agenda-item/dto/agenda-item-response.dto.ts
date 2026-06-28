import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgendaItemResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() meetingId: string;
  @ApiPropertyOptional() questionId?: string;
  @ApiProperty() orderNumber: number;
  @ApiPropertyOptional() customProtocolText?: string;
  @ApiPropertyOptional() customBulletinText?: string;
  @ApiPropertyOptional() question?: {
    id: string;
    shortTitle?: string;
    protocolText?: string;
    bulletinText?: string;
    quorumType?: string;
    category?: string;
  };
}
