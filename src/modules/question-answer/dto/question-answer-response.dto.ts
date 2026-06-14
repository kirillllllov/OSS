import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionAnswerResponseDto {
  @ApiProperty() ownerId: string;
  @ApiProperty() agendaItemId: string;
  @ApiProperty() vote: string;
  @ApiPropertyOptional() weight?: number;
}
