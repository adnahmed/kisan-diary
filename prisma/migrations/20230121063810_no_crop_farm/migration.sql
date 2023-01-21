/*
  Warnings:

  - You are about to drop the `_CropToFarm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CropToFarm" DROP CONSTRAINT "_CropToFarm_A_fkey";

-- DropForeignKey
ALTER TABLE "_CropToFarm" DROP CONSTRAINT "_CropToFarm_B_fkey";

-- DropTable
DROP TABLE "_CropToFarm";
