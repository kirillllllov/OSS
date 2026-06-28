import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty() @IsString() buildingId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() initiatorEmployeeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() ownerInitiatorIds?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() number?: string;
  @ApiProperty() @IsString() form: string;
  @ApiPropertyOptional() @IsOptional() @IsString() startDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() endDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inPersonStartTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inPersonAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() ballotAcceptanceAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() noticeAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() resultsDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() extensionReason?: string;
}
