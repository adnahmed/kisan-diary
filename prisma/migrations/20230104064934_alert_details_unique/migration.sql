/*
  Warnings:

  - A unique constraint covering the columns `[details]` on the table `Alert` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Alert_details_key" ON "Alert"("details");
