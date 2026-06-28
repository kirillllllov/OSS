generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Company {
  id        String     @id @default(uuid())
  name      String
  createdAt DateTime   @default(now())
  employees Employee[]
}

model Building {
  id               String    @id @default(uuid())
  address          String
  cadastralNumber  String
  yearBuilt        Int?
  floors           Int?
  entrances        Int?
  totalArea        Float
  totalPremises    Int
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  premises         Premise[]
  employeeAccess   EmployeeBuildingAccess[]
  meetings         Meeting[]
}

model Premise {
  id                String   @id @default(uuid())
  buildingId        String
  number            String
  cadastralNumber   String?
  area              Float
  ownershipForm     String
  premiseType       String   @default("Квартира")
  floor             Int?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  building          Building @relation(fields: [buildingId], references: [id], onDelete: Cascade)
  ownershipRights   OwnershipRight[]
}

model Owner {
  id                String   @id @default(uuid())
  fullName          String
  birthDate         String?
  inn               String?  @unique
  snils             String?  @unique
  contacts          String?  @unique

  ownershipRights       OwnershipRight[]
  answers               QuestionAnswer[]
  meetingInitiatorLinks MeetingOwnerInitiator[]
}

model MeetingOwnerInitiator {
  meetingId String
  ownerId   String

  meeting Meeting @relation(fields: [meetingId], references: [id], onDelete: Cascade)
  owner   Owner   @relation(fields: [ownerId], references: [id], onDelete: Cascade)

  @@id([meetingId, ownerId])
}

model OwnershipRight {
  id                    String   @id @default(uuid())
  premiseId             String
  ownerId               String
  share                 String?
  shareArea             Float?
  titleDocument         String?
  registrationDate      String?
  basisDocument         String?

  premise               Premise  @relation(fields: [premiseId], references: [id], onDelete: Cascade)
  owner                 Owner    @relation(fields: [ownerId], references: [id], onDelete: Cascade)

  @@unique([premiseId, ownerId])
}

model Employee {
  id                    String    @id @default(uuid())
  email                 String    @unique
  passwordHash          String
  fullName              String
  companyId             String?
  isActive              Int       @default(1)
  lastLogin             String?
  createdAt             DateTime  @default(now())

  company               Company?  @relation(fields: [companyId], references: [id], onDelete: SetNull)
  buildingAccess        EmployeeBuildingAccess[]
  createdQuestions      QuestionLibrary[]    @relation("CreatedBy")
  initiatedMeetings     Meeting[]            @relation("Initiator")
  questionPools         QuestionPool[]
  auditLogs             AuditLog[]
}

model EmployeeBuildingAccess {
  employeeId   String
  buildingId   String

  employee     Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  building     Building  @relation(fields: [buildingId], references: [id], onDelete: Cascade)

  @@id([employeeId, buildingId])
}

model QuestionLibrary {
  id                  String    @id @default(uuid())
  shortTitle          String
  protocolText        String?
  bulletinText        String?
  quorumType          String?
  category            String?
  tags                String?
  createdByEmployeeId String?
  createdAt           DateTime  @default(now())

  poolItems           QuestionPoolItem[]
  createdBy           Employee?    @relation("CreatedBy", fields: [createdByEmployeeId], references: [id], onDelete: SetNull)
  agendaItems         AgendaItem[]
}

model Meeting {
  id                      String    @id @default(uuid())
  buildingId              String
  number                  String?
  status                  String    @default("draft")
  form                    String
  startDate               String?
  endDate                 String?
  inPersonStartTime       String?
  inPersonAddress         String?
  ballotAcceptanceAddress String?
  noticeAddress           String?
  resultsDate             String?
  initiatorEmployeeId     String?
  extensionReason         String?
  createdAt               DateTime  @default(now())
  activatedAt             String?
  completedAt             String?
  archivedAt              String?

  building                Building   @relation(fields: [buildingId], references: [id], onDelete: Cascade)
  initiator               Employee?  @relation("Initiator", fields: [initiatorEmployeeId], references: [id], onDelete: SetNull)
  ownerInitiators         MeetingOwnerInitiator[]
  agendaItems             AgendaItem[]
}

model AgendaItem {
  id                    String   @id @default(uuid())
  meetingId             String
  questionId            String?
  orderNumber           Int
  customProtocolText    String?
  customBulletinText    String?

  meeting   Meeting          @relation(fields: [meetingId], references: [id], onDelete: Cascade)
  question  QuestionLibrary? @relation(fields: [questionId], references: [id], onDelete: NoAction)
  answers   QuestionAnswer[]

  @@unique([meetingId, orderNumber])
}

model QuestionAnswer {
  ownerId         String
  agendaItemId    String
  vote            String
  weight          Float?

  owner           Owner       @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  agendaItem      AgendaItem  @relation(fields: [agendaItemId], references: [id], onDelete: Cascade)

  @@id([ownerId, agendaItemId])
}

model AuditLog {
  id              String    @id @default(uuid())
  employeeId      String?
  actionType      String
  objectId        String?
  oldValue        String?
  newValue        String?
  createdAt       DateTime  @default(now())

  employee        Employee? @relation(fields: [employeeId], references: [id], onDelete: SetNull)
}

model QuestionPool {
  id          String   @id @default(uuid())
  name        String
  type        String
  employeeId  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  employee    Employee?            @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  items       QuestionPoolItem[]

  @@index([employeeId])
}

model QuestionPoolItem {
  id          String   @id @default(uuid())
  poolId      String
  questionId  String
  orderNumber Int

  pool     QuestionPool    @relation(fields: [poolId], references: [id], onDelete: Cascade)
  question QuestionLibrary @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([poolId, questionId])
  @@index([poolId])
}
