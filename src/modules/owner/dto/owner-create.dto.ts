// owner/dto/owner-create.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class OwnerCreateDto {
  @ApiPropertyOptional() @IsString() fullName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inn?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() snils?: string;
}