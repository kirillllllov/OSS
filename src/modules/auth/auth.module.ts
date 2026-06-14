import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SessionGuard } from '../auth/guards/session.guards';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, SessionGuard, RolesGuard],
  exports: [SessionGuard, RolesGuard],
})
export class AuthModule {}
