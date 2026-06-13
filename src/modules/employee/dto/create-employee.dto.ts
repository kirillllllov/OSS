import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, MinLength, IsIn } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty() @IsString() companyId: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() @MinLength(6) password: string;
  @ApiProperty() @IsString() fullName: string;
  @ApiPropertyOptional({ enum: ['admin', 'manager', 'lawyer', 'accountant'] })
  @IsOptional()
  @IsIn(['admin', 'manager', 'lawyer', 'accountant'])
  role?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() active?: boolean;
}
