import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GeneratedDocumentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() meetingId: string;
  @ApiProperty() documentType: string;
  @ApiProperty() version: number;
  @ApiProperty() generatedAt: Date;
  @ApiPropertyOptional() createdByEmployeeId?: string;
  @ApiPropertyOptional() filePath?: string;
  @ApiProperty() isFinal: boolean;
}
