/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `regionName` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `alertId` on the `Crop` table. All the data in the column will be lost.
  - You are about to drop the column `farmId` on the `Crop` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coveredLand` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_regionName_fkey";

-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_alertId_fkey";

-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_farmId_fkey";

-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "imagePath",
DROP COLUMN "regionName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "alertId",
DROP COLUMN "farmId",
ADD COLUMN     "coveredLand" INTEGER NOT NULL,
ALTER COLUMN "picture" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_AlertToCrop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlertToRegion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CropToFarm" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlertToCrop_AB_unique" ON "_AlertToCrop"("A", "B");

-- CreateIndex
CREATE INDEX "_AlertToCrop_B_index" ON "_AlertToCrop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlertToRegion_AB_unique" ON "_AlertToRegion"("A", "B");

-- CreateIndex
CREATE INDEX "_AlertToRegion_B_index" ON "_AlertToRegion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CropToFarm_AB_unique" ON "_CropToFarm"("A", "B");

-- CreateIndex
CREATE INDEX "_CropToFarm_B_index" ON "_CropToFarm"("B");

-- AddForeignKey
ALTER TABLE "_AlertToCrop" ADD CONSTRAINT "_AlertToCrop_A_fkey" FOREIGN KEY ("A") REFERENCES "Alert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlertToCrop" ADD CONSTRAINT "_AlertToCrop_B_fkey" FOREIGN KEY ("B") REFERENCES "Crop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlertToRegion" ADD CONSTRAINT "_AlertToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "Alert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlertToRegion" ADD CONSTRAINT "_AlertToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "Region"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CropToFarm" ADD CONSTRAINT "_CropToFarm_A_fkey" FOREIGN KEY ("A") REFERENCES "Crop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CropToFarm" ADD CONSTRAINT "_CropToFarm_B_fkey" FOREIGN KEY ("B") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
