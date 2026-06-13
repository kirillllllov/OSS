import { ApiProperty } from '@nestjs/swagger';

export class OwnerResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() fullName: string;
  @ApiProperty({ required: false }) inn?: string;
  @ApiProperty({ required: false }) snils?: string;
}