import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsIn } from 'class-validator';

export class CreateQuestionPoolDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ['GLOBAL', 'PRIVATE'], default: 'PRIVATE' })
  @IsString()
  @IsIn(['GLOBAL', 'PRIVATE'])
  type: string = 'PRIVATE';

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  questionIds: string[];
}