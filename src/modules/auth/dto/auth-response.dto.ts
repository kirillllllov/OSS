import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '../../employee/dto/employee-response.dto';

export class AuthResponseDto {
  @ApiProperty() accessToken: string;
  @ApiProperty({ type: () => EmployeeResponseDto }) employee: EmployeeResponseDto;
}
