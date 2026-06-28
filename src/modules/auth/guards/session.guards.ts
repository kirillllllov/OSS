import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session || !session.employeeId) {
      throw new UnauthorizedException('Не авторизован');
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: session.employeeId },
      select: {
        id: true,
        email: true,
        fullName: true,
        companyId: true,
        isActive: true,
        company: { select: { id: true, name: true } },
      },
    });

    if (!employee || employee.isActive !== 1) {
      throw new UnauthorizedException('Аккаунт заблокирован или не существует');
    }

    request.user = employee;
    return true;
  }
}
