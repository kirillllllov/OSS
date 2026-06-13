import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DocumentTemplateResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() companyId: string;
  @ApiProperty() documentType: string;
  @ApiProperty() name: string;
  @ApiProperty() filePath: string;
  @ApiProperty() version: number;
  @ApiProperty() active: boolean;
}
