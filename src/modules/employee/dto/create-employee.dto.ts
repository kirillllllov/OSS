import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiPropertyOptional({ default: 'EMPLOYEE' })
  role?: string; // 'COMPANY_ADMIN' или 'EMPLOYEE'

  @ApiPropertyOptional({ type: [String] })
  buildingIds?: string[]; // ID домов, к которым дать доступ
}