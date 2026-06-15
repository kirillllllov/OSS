-- CreateTable
CREATE TABLE "QuestionPool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "employeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPoolItem" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,

    CONSTRAINT "QuestionPoolItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionPool_employeeId_idx" ON "QuestionPool"("employeeId");

-- CreateIndex
CREATE INDEX "QuestionPoolItem_poolId_idx" ON "QuestionPoolItem"("poolId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionPoolItem_poolId_questionId_key" ON "QuestionPoolItem"("poolId", "questionId");

-- AddForeignKey
ALTER TABLE "QuestionPool" ADD CONSTRAINT "QuestionPool_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPoolItem" ADD CONSTRAINT "QuestionPoolItem_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "QuestionPool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPoolItem" ADD CONSTRAINT "QuestionPoolItem_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
