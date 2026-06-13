import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeBuildingAccessModule } from './modules/employee-building-access/employee-building-access.module';
import { BuildingModule } from './modules/building/building.module';
import { PremiseModule } from './modules/premise/premise.module';
import { OwnerModule } from './modules/owner/owner.module';
import { OwnershipModule } from './modules/ownership/ownership.module';
import { ContactModule } from './modules/contact/contact.module';
import { RepresentativeModule } from './modules/representative/representative.module';
import { RegistryVersionModule } from './modules/registry-version/registry-version.module';
import { RegistryImportModule } from './modules/registry-import/registry-import.module';
import { QuestionLibraryModule } from './modules/question-library/question-library.module';
import { DocumentTemplateModule } from './modules/document-template/document-template.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { AgendaItemModule } from './modules/agenda-item/agenda-item.module';
import { BallotModule } from './modules/ballot/ballot.module';
import { VotingLinkModule } from './modules/voting-link/voting-link.module';
import { QuestionAnswerModule } from './modules/question-answer/question-answer.module';
import { QuorumModule } from './modules/quorum/quorum.module';
import { GeneratedDocumentModule } from './modules/generated-document/generated-document.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CompanyModule,
    EmployeeModule,
    EmployeeBuildingAccessModule,
    BuildingModule,
    PremiseModule,
    OwnerModule,
    OwnershipModule,
    ContactModule,
    RepresentativeModule,
    RegistryVersionModule,
    RegistryImportModule,
    QuestionLibraryModule,
    DocumentTemplateModule,
    MeetingModule,
    AgendaItemModule,
    BallotModule,
    VotingLinkModule,
    QuestionAnswerModule,
    QuorumModule,
    GeneratedDocumentModule,
  ],
})
export class AppModule {}
