import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BuildingModule } from './modules/building/building.module';
import { PremiseModule } from './modules/premise/premise.module';
import { OwnerModule } from './modules/owner/owner.module';
import { OwnershipModule } from './modules/ownership/ownership.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BuildingModule,
    PremiseModule,
    OwnerModule,
    OwnershipModule,
  ],
})
export class AppModule {}
