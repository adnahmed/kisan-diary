/*
  Warnings:

  - You are about to drop the column `quanity` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "quanity",
ADD COLUMN     "quantity" INTEGER;
