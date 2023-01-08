-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "suitableSeasons" "Season"[],
ADD COLUMN     "suitableSoilTypes" "SoilType"[];

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "cropId" TEXT;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
