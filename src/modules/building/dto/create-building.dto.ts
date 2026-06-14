import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty() @IsString() address: string;
  @ApiProperty() @IsString() cadastralNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() yearBuilt?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() floors?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() entrances?: number;
  @ApiProperty() @IsNumber() @Min(0) totalArea: number;
  @ApiProperty() @IsNumber() @Min(0) totalPremises: number;
}
