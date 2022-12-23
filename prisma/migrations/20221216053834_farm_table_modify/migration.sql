/*
  Warnings:

  - You are about to drop the column `irrigation_sources` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `machineryId` on the `Farm` table. All the data in the column will be lost.
  - The `irrigation_source` column on the `Farm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner]` on the table `Farm` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Farm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_machineryId_fkey";

-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "irrigation_sources",
DROP COLUMN "machineryId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
DROP COLUMN "irrigation_source",
ADD COLUMN     "irrigation_source" "IrrigationSource"[];

-- CreateIndex
CREATE UNIQUE INDEX "Farm_name_key" ON "Farm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_owner_key" ON "Farm"("owner");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
