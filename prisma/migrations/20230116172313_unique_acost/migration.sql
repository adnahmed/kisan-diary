/*
  Warnings:

  - You are about to drop the column `activityId` on the `ActivityCost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[costId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - Made the column `costId` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_costId_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "costId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ActivityCost" DROP COLUMN "activityId";

-- CreateIndex
CREATE UNIQUE INDEX "Activity_costId_key" ON "Activity"("costId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_costId_fkey" FOREIGN KEY ("costId") REFERENCES "ActivityCost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
