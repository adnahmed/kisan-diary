/*
  Warnings:

  - You are about to drop the column `costId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_costId_fkey";

-- DropIndex
DROP INDEX "Activity_costId_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "costId";

-- AlterTable
ALTER TABLE "ActivityCost" ADD COLUMN     "activityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityCost" ADD CONSTRAINT "ActivityCost_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
