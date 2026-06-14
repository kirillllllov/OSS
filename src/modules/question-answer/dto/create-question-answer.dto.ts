import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class CreateQuestionAnswerDto {
  @ApiProperty() @IsString() ownerId: string;
  @ApiProperty() @IsString() agendaItemId: string;
  @ApiProperty({ enum: ['for', 'against', 'abstain'] })
  @IsIn(['for', 'against', 'abstain'])
  vote: string;
}
