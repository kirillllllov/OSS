import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePremiseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  buildingId: string;

  @ApiProperty({ example: '42' })
  @IsString()
  number: string;

  @ApiPropertyOptional({ example: '77:01:0001001:5678' })
  @IsOptional()
  @IsString()
  cadastralNumber?: string;

  @ApiProperty({ example: 45.5 })
  @IsNumber()
  @Min(0)
  area: number;

  @ApiProperty({ example: 'individual', enum: ['individual', 'shared', 'joint'] })
  @IsString()
  ownershipForm: string;

  @ApiPropertyOptional({ example: 'Квартира' })
  @IsOptional()
  @IsString()
  premiseType?: string;
  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  floor?: number;
}