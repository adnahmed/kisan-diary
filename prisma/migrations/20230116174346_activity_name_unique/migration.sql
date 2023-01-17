/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");
