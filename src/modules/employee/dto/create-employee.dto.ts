import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiPropertyOptional({ type: [String] })
  buildingIds?: string[];
}
