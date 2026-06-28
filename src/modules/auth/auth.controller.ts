import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SessionGuard } from '../auth/guards/session.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    const employee = await this.authService.validateEmployee(
      loginDto.email,
      loginDto.password,
    );
    if (!employee) throw new UnauthorizedException('Неверный email или пароль');
    req.session.employeeId = employee.id;
    req.session.companyId = employee.companyId;
    return {
      message: 'Успешный вход',
      employee: {
        id: employee.id,
        email: employee.email,
        fullName: employee.fullName,
        companyId: employee.companyId,
        company: employee.company,
      },
    };
  }

  @Post('logout')
  async logout(@Request() req) {
    req.session.destroy((err) => {
      if (err) throw new Error('Ошибка выхода');
    });
    return { message: 'Выход выполнен' };
  }

  @Get('me')
  @UseGuards(SessionGuard)
  async getMe(@Request() req: any) {
    return req.user;
  }
}
