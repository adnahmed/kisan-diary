/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Crop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `regionName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('alert', 'recommendation');

-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "alertId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "country",
ADD COLUMN     "regionName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Region" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "regionName" TEXT NOT NULL,
    "alertType" "AlertType" NOT NULL,
    "details" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Crop_name_key" ON "Crop"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "Alert"("id") ON DELETE SET NULL ON UPDATE CASCADE;
