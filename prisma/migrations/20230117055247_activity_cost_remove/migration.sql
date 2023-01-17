/*
  Warnings:

  - The primary key for the `ActivityCost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `activityId` on the `ActivityCost` table. All the data in the column will be lost.
  - You are about to drop the column `costId` on the `ActivityCost` table. All the data in the column will be lost.
  - You are about to drop the `Cost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `ActivityCost` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `isTotal` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityCost" DROP CONSTRAINT "ActivityCost_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityCost" DROP CONSTRAINT "ActivityCost_costId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "activityCostId" TEXT;

-- AlterTable
ALTER TABLE "ActivityCost" DROP CONSTRAINT "ActivityCost_pkey",
DROP COLUMN "activityId",
DROP COLUMN "costId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isTotal" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "ActivityCost_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Cost";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_activityCostId_fkey" FOREIGN KEY ("activityCostId") REFERENCES "ActivityCost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
