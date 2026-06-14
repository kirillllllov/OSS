import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeBuildingAccessModule } from './modules/employee-building-access/employee-building-access.module';
import { BuildingModule } from './modules/building/building.module';
import { PremiseModule } from './modules/premise/premise.module';
import { OwnerModule } from './modules/owner/owner.module';
import { OwnershipModule } from './modules/ownership/ownership.module';
import { QuestionLibraryModule } from './modules/question-library/question-library.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { AgendaItemModule } from './modules/agenda-item/agenda-item.module';
import { QuestionAnswerModule } from './modules/question-answer/question-answer.module';  
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmployeeModule,
    EmployeeBuildingAccessModule,
    BuildingModule,
    PremiseModule,
    OwnerModule,
    OwnershipModule,
    QuestionLibraryModule,
    MeetingModule,
    AgendaItemModule,
    QuestionAnswerModule,
    AuthModule,
  ],
})
export class AppModule {}
