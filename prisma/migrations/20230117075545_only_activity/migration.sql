/*
  Warnings:

  - You are about to drop the column `isEditable` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `ActivityCost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivityCost" DROP CONSTRAINT "ActivityCost_activityId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "isEditable",
ADD COLUMN     "totalCost" INTEGER,
ADD COLUMN     "unitCost" INTEGER;

-- DropTable
DROP TABLE "ActivityCost";
