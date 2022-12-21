/*
  Warnings:

  - Made the column `regionName` on table `Farm` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_regionName_fkey";

-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "regionName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
