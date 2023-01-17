/*
  Warnings:

  - You are about to drop the column `land_type` on the `Farm` table. All the data in the column will be lost.
  - Added the required column `soil_type` to the `Farm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SoilType" AS ENUM ('Sandy', 'Silt', 'Clay', 'Loamy');

-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "land_type",
ADD COLUMN     "soil_type" "SoilType" NOT NULL;

-- DropEnum
DROP TYPE "LandType";
