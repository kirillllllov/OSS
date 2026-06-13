import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsIn } from 'class-validator';

export class CreateContactDto {
  @ApiProperty() @IsString() ownerId: string;
  @ApiProperty({ enum: ['phone', 'email', 'telegram', 'other'] })
  @IsIn(['phone', 'email', 'telegram', 'other']) type: string;
  @ApiProperty() @IsString() value: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() forNotify?: boolean;
}
