-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cadastralNumber" TEXT NOT NULL,
    "yearBuilt" INTEGER,
    "floors" INTEGER,
    "entrances" INTEGER,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "totalPremises" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Premise" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cadastralNumber" TEXT,
    "area" DOUBLE PRECISION NOT NULL,
    "ownershipForm" TEXT NOT NULL,

    CONSTRAINT "Premise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "inn" TEXT,
    "snils" TEXT,
    "contacts" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnershipRight" (
    "id" TEXT NOT NULL,
    "premiseId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "share" TEXT,
    "shareArea" DOUBLE PRECISION,
    "titleDocument" TEXT,
    "registrationDate" TEXT,
    "basisDocument" TEXT,

    CONSTRAINT "OwnershipRight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isActive" INTEGER NOT NULL DEFAULT 1,
    "lastLogin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeBuildingAccess" (
    "employeeId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,

    CONSTRAINT "EmployeeBuildingAccess_pkey" PRIMARY KEY ("employeeId","buildingId")
);

-- CreateTable
CREATE TABLE "QuestionLibrary" (
    "id" TEXT NOT NULL,
    "shortTitle" TEXT NOT NULL,
    "protocolText" TEXT,
    "bulletinText" TEXT,
    "quorumType" TEXT,
    "category" TEXT,
    "tags" TEXT,
    "createdByEmployeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "form" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "inPersonStartTime" TEXT,
    "inPersonAddress" TEXT,
    "ballotAcceptanceAddress" TEXT,
    "noticeAddress" TEXT,
    "resultsDate" TEXT,
    "initiatorEmployeeId" TEXT,
    "extensionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TEXT,
    "completedAt" TEXT,
    "archivedAt" TEXT,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgendaItem" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "questionId" TEXT,
    "orderNumber" INTEGER NOT NULL,
    "customProtocolText" TEXT,
    "customBulletinText" TEXT,

    CONSTRAINT "AgendaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAnswer" (
    "ownerId" TEXT NOT NULL,
    "agendaItemId" TEXT NOT NULL,
    "vote" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "QuestionAnswer_pkey" PRIMARY KEY ("ownerId","agendaItemId")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT,
    "actionType" TEXT NOT NULL,
    "objectId" TEXT,
    "oldValue" TEXT,
    "newValue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_inn_key" ON "Owner"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_snils_key" ON "Owner"("snils");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_contacts_key" ON "Owner"("contacts");

-- CreateIndex
CREATE UNIQUE INDEX "OwnershipRight_premiseId_ownerId_key" ON "OwnershipRight"("premiseId", "ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_buildingId_number_key" ON "Meeting"("buildingId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaItem_meetingId_orderNumber_key" ON "AgendaItem"("meetingId", "orderNumber");

-- AddForeignKey
ALTER TABLE "Premise" ADD CONSTRAINT "Premise_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnershipRight" ADD CONSTRAINT "OwnershipRight_premiseId_fkey" FOREIGN KEY ("premiseId") REFERENCES "Premise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnershipRight" ADD CONSTRAINT "OwnershipRight_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeBuildingAccess" ADD CONSTRAINT "EmployeeBuildingAccess_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeBuildingAccess" ADD CONSTRAINT "EmployeeBuildingAccess_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionLibrary" ADD CONSTRAINT "QuestionLibrary_createdByEmployeeId_fkey" FOREIGN KEY ("createdByEmployeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_initiatorEmployeeId_fkey" FOREIGN KEY ("initiatorEmployeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaItem" ADD CONSTRAINT "AgendaItem_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaItem" ADD CONSTRAINT "AgendaItem_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionLibrary"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_agendaItemId_fkey" FOREIGN KEY ("agendaItemId") REFERENCES "AgendaItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
