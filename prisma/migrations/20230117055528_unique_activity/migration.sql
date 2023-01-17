/*
  Warnings:

  - A unique constraint covering the columns `[activityCostId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activity_activityCostId_key" ON "Activity"("activityCostId");
