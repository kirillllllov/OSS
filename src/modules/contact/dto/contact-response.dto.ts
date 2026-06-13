import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() ownerId: string;
  @ApiProperty() type: string;
  @ApiProperty() value: string;
  @ApiProperty() forNotify: boolean;
}
