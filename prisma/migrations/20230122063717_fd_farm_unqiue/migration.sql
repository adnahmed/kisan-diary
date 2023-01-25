/*
  Warnings:

  - A unique constraint covering the columns `[cropId,year_start,year_end,farmId]` on the table `FinancialData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `FinancialData` table without a default value. This is not possible if the table is not empty.
  - Made the column `farmId` on table `FinancialData` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FinancialData" DROP CONSTRAINT "FinancialData_farmId_fkey";

-- AlterTable
ALTER TABLE "FinancialData" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "farmId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FinancialData_cropId_year_start_year_end_farmId_key" ON "FinancialData"("cropId", "year_start", "year_end", "farmId");

-- AddForeignKey
ALTER TABLE "FinancialData" ADD CONSTRAINT "FinancialData_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
