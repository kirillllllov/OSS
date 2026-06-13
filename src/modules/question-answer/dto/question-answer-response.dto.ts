import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionAnswerResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() ballotId: string;
  @ApiProperty() agendaItemId: string;
  @ApiProperty() vote: string;
  @ApiProperty() source: string;
}
