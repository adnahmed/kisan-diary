/*
  Warnings:

  - You are about to drop the column `pictures` on the `Farm` table. All the data in the column will be lost.
  - Added the required column `regionName` to the `Farm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "pictures",
ADD COLUMN     "regionName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
