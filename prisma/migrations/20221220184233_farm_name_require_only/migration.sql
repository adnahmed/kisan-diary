-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_regionName_fkey";

-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "total_land" DROP NOT NULL,
ALTER COLUMN "land_type" DROP NOT NULL,
ALTER COLUMN "regionName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE SET NULL ON UPDATE CASCADE;
