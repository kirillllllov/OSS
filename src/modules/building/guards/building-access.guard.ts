import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BuildingAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // устанавливается SessionGuard
    const buildingId =
      request.params.id || request.query.buildingId || request.body.buildingId;

    if (!user || !buildingId) {
      throw new ForbiddenException('Недостаточно данных для проверки доступа');
    }
    // Главный админ имеет доступ ко всем домам
    if (user.role === 'COMPANY_ADMIN') return true;

    const access = await this.prisma.employeeBuildingAccess.findUnique({
      where: {
        employeeId_buildingId: {
          employeeId: user.id,
          buildingId: buildingId,
        },
      },
    });
    if (!access) {
      throw new ForbiddenException('У вас нет доступа к этому дому');
    }
    return true;
  }
}
