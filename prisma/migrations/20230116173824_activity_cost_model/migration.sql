/*
  Warnings:

  - The primary key for the `ActivityCost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cost` on the `ActivityCost` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ActivityCost` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ActivityCost` table. All the data in the column will be lost.
  - You are about to drop the column `isTotal` on the `ActivityCost` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ActivityCost` table. All the data in the column will be lost.
  - Added the required column `costId` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityCost" DROP CONSTRAINT "ActivityCost_pkey",
DROP COLUMN "cost",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isTotal",
DROP COLUMN "updatedAt",
ADD COLUMN     "costId" TEXT NOT NULL,
ADD CONSTRAINT "ActivityCost_pkey" PRIMARY KEY ("activityId", "costId");

-- CreateTable
CREATE TABLE "Cost" (
    "id" TEXT NOT NULL,
    "isTotal" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityCost" ADD CONSTRAINT "ActivityCost_costId_fkey" FOREIGN KEY ("costId") REFERENCES "Cost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
