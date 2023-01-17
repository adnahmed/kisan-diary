/*
  Warnings:

  - You are about to drop the column `activityCostId` on the `Activity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activityId]` on the table `ActivityCost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityId` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_activityCostId_fkey";

-- DropIndex
DROP INDEX "Activity_activityCostId_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "activityCostId";

-- AlterTable
ALTER TABLE "ActivityCost" ADD COLUMN     "activityId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ActivityCost_activityId_key" ON "ActivityCost"("activityId");

-- AddForeignKey
ALTER TABLE "ActivityCost" ADD CONSTRAINT "ActivityCost_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
