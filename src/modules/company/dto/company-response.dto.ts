import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() inn?: string;
  @ApiPropertyOptional() ogrn?: string;
  @ApiPropertyOptional() email?: string;
  @ApiPropertyOptional() phone?: string;
  @ApiProperty() tariff: string;
  @ApiProperty() active: boolean;
  @ApiProperty() createdAt: Date;
}
