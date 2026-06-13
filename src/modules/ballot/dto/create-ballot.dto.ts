import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class CreateBallotDto {
  @ApiProperty() @IsString() meetingId: string;
  @ApiProperty() @IsString() ownershipId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() representativeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() createdByEmployeeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() received?: boolean;
  @ApiPropertyOptional({ enum: ['hand', 'mail', 'electronic'] })
  @IsOptional() @IsIn(['hand', 'mail', 'electronic']) deliveryMethod?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() manualEntry?: boolean;
}
