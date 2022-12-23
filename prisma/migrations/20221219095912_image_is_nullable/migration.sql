-- AlterTable
ALTER TABLE "Alert" ALTER COLUMN "imagePath" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Region" ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("name");
