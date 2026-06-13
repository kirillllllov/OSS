import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsIn, MinLength } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional() @IsOptional() @IsString() fullName?: string;
  @ApiPropertyOptional({ enum: ['admin', 'manager', 'lawyer', 'accountant'] })
  @IsOptional() @IsIn(['admin', 'manager', 'lawyer', 'accountant']) role?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() active?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(6) password?: string;
}
