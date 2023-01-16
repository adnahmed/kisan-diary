/*
  Warnings:

  - You are about to drop the column `regionName` on the `User` table. All the data in the column will be lost.
  - Added the required column `fromRegion` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('landPreparation', 'sowing', 'inputs_seed', 'inputs_irrigation', 'inputs_laborManagement', 'inputs_integratedPestManagement', 'inputs_integratedDiseaseManagement', 'inputs_integratedWeedManagement', 'inputs_nutrientManagement', 'harvesting', 'postHarvestingAndStorage', 'marketing', 'all');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_regionName_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "regionName",
ADD COLUMN     "fromRegion" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "name" TEXT NOT NULL,
    "isOperation" BOOLEAN NOT NULL,
    "quanity" INTEGER NOT NULL,
    "costId" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityCost" (
    "id" TEXT NOT NULL,
    "isTotal" BOOLEAN NOT NULL,
    "cost" INTEGER NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "ActivityCost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fromRegion_fkey" FOREIGN KEY ("fromRegion") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_costId_fkey" FOREIGN KEY ("costId") REFERENCES "ActivityCost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
