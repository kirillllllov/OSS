// ownership/dto/ownership-create.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OwnershipCreateDto {
  @ApiProperty() @IsUUID() premiseId: string;
  @ApiProperty() @IsUUID() ownerId: string;
  @ApiProperty() @IsString() share: string;
  @ApiProperty() @IsNumber() shareArea: number;
  @ApiProperty() @IsString() titleDocument: string;
  @ApiProperty() @Type(() => Date) @IsDate() regDate: Date;
  @ApiPropertyOptional() @IsOptional() @IsString() basisDocument?: string;
}
