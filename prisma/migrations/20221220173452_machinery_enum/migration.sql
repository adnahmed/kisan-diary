/*
  Warnings:

  - You are about to drop the `Machinery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MachineryOnFarms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MachineryOnFarms" DROP CONSTRAINT "MachineryOnFarms_farmId_fkey";

-- DropForeignKey
ALTER TABLE "MachineryOnFarms" DROP CONSTRAINT "MachineryOnFarms_machId_fkey";

-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "machinery" "Machinery"[];

-- DropTable
DROP TABLE "Machinery" cascade;

-- DropTable
DROP TABLE "MachineryOnFarms" cascade;

-- CreateEnum
CREATE TYPE "Machinery" AS ENUM ('Tractor', 'Leveler');

