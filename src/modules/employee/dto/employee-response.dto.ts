import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() email: string;
  @ApiProperty() fullName: string;
  @ApiProperty() role: string;
  @ApiProperty() isActive: number;
  @ApiPropertyOptional() lastLogin?: string;
  @ApiProperty() createdAt: Date;
}
