-- CreateEnum
CREATE TYPE "IrrigationSource" AS ENUM ('TubeWell', 'Canal');

-- CreateEnum
CREATE TYPE "LandType" AS ENUM ('Nehri', 'Behri');

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "total_land" INTEGER NOT NULL,
    "land_type" "LandType" NOT NULL,
    "irrigation_source" TEXT NOT NULL,
    "machineryId" TEXT NOT NULL,
    "irrigation_sources" "IrrigationSource"[],

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "from" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineryOnFarms" (
    "machId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineryOnFarms_pkey" PRIMARY KEY ("machId","farmId")
);

-- CreateTable
CREATE TABLE "Machinery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Machinery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_machineryId_fkey" FOREIGN KEY ("machineryId") REFERENCES "Machinery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_from_fkey" FOREIGN KEY ("from") REFERENCES "Country"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineryOnFarms" ADD CONSTRAINT "MachineryOnFarms_machId_fkey" FOREIGN KEY ("machId") REFERENCES "Machinery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineryOnFarms" ADD CONSTRAINT "MachineryOnFarms_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
