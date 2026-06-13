import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class UpdateBallotDto {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() received?: boolean;
  @ApiPropertyOptional({ enum: ['hand', 'mail', 'electronic'] })
  @IsOptional() @IsIn(['hand', 'mail', 'electronic']) deliveryMethod?: string;
  @ApiPropertyOptional({ enum: ['pending', 'valid', 'invalid', 'replaced'] })
  @IsOptional() @IsIn(['pending', 'valid', 'invalid', 'replaced']) status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() invalidReason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() invalidNote?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() scanPath?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() manualEntry?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() representativeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() replacedByBallotId?: string;
}
