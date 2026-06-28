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
    const user = request.user;
    const buildingId =
      request.params.id || request.query.buildingId || request.body.buildingId;

    if (!user || !buildingId) {
      throw new ForbiddenException('Недостаточно данных для проверки доступа');
    }
    // Users with a company have access to all buildings
    if (user.companyId) return true;

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
