import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EmployeeRepository } from '../../employee/employee.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly employeeRepo: EmployeeRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET', 'change_me_in_production'),
    });
  }

  async validate(payload: { sub: string; email: string; role: string; companyId: string }) {
    const employee = await this.employeeRepo.findById(payload.sub);
    if (!employee || !employee.active) {
      throw new UnauthorizedException('Сессия недействительна');
    }
    return { id: payload.sub, email: payload.email, role: payload.role, companyId: payload.companyId };
  }
}
