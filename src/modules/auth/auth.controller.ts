import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentEmployee } from './decorators/current-employee.decorator';
import { EmployeeResponseDto } from '../employee/dto/employee-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  login(@Body() dto: LoginDto, @Req() req: Request): Promise<AuthResponseDto> {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    return this.authService.login(dto, ip);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Текущий сотрудник' })
  @ApiResponse({ status: 200, type: EmployeeResponseDto })
  me(@CurrentEmployee() user: any): any {
    return user;
  }
}
