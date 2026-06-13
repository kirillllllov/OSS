import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString, IsIn } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty() @IsString() companyId: string;
  @ApiProperty() @IsString() buildingId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() registryVersionId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() initiatorEmployeeId?: string;
  @ApiProperty() @IsString() number: string;
  @ApiProperty({ enum: ['in_person', 'absentee', 'mixed'] })
  @IsIn(['in_person', 'absentee', 'mixed']) form: string;
  @ApiProperty() @IsDateString() dateStart: string;
  @ApiProperty() @IsDateString() dateEnd: string;
  @ApiPropertyOptional() @IsOptional() @IsString() inPersonAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() ballotAcceptAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() noticeAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() resultDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() requiresGis?: boolean;
}
