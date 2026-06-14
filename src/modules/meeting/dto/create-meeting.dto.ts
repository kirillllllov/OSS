import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty() @IsString() buildingId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() initiatorEmployeeId?: string;
  @ApiProperty() @IsString() number: string;
  @ApiProperty({ enum: ['in_person', 'absentee', 'mixed'] })
  @IsIn(['in_person', 'absentee', 'mixed']) form: string;
  @ApiProperty() @IsString() startDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() endDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inPersonStartTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inPersonAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() ballotAcceptanceAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() noticeAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() resultsDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() extensionReason?: string;
}
