/*
  Warnings:

  - Added the required column `unitCost` to the `ActivityCost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityCost" ADD COLUMN     "unitCost" INTEGER NOT NULL;
