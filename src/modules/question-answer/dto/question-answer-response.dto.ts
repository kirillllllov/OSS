import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionAnswerResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() ownerId: string;
  @ApiProperty() agendaItemId: string;
  @ApiProperty() vote: string;
  @ApiProperty() source: string;
}
