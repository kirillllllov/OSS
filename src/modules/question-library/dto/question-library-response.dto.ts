import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionLibraryResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() companyId: string;
  @ApiProperty() shortTitle: string;
  @ApiProperty() protocolText: string;
  @ApiProperty() bulletinText: string;
  @ApiProperty() quorumType: string;
  @ApiPropertyOptional() category?: string;
  @ApiPropertyOptional() tags?: string;
  @ApiProperty() createdAt: Date;
}
