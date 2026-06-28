/*
  Warnings:

  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Premise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Meeting_buildingId_number_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
ADD COLUMN     "companyId" TEXT;

-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Premise" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "floor" INTEGER,
ADD COLUMN     "premiseType" TEXT NOT NULL DEFAULT 'Квартира',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingOwnerInitiator" (
    "meetingId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "MeetingOwnerInitiator_pkey" PRIMARY KEY ("meetingId","ownerId")
);

-- AddForeignKey
ALTER TABLE "MeetingOwnerInitiator" ADD CONSTRAINT "MeetingOwnerInitiator_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingOwnerInitiator" ADD CONSTRAINT "MeetingOwnerInitiator_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
