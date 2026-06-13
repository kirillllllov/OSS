import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAccessDto {
  @ApiProperty() @IsString() employeeId: string;
  @ApiProperty() @IsString() buildingId: string;
}
