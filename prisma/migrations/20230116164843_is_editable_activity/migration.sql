/*
  Warnings:

  - Added the required column `isEditable` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "isEditable" BOOLEAN NOT NULL;
