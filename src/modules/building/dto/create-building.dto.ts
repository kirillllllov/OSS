import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  cadastralNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  yearBuilt?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  floors?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  entrances?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalPremises: number;
}
