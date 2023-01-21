-- CreateTable

CREATE TABLE "FinancialData" ("id" TEXT NOT NULL,
                                        "path" TEXT NOT NULL,
                                                    "year_start" INTEGER NOT NULL,
                                                                         "year_end" INTEGER NOT NULL,
                                                                                            "farmId" TEXT, "cropId" TEXT NOT NULL,
                                                                                                                         CONSTRAINT "FinancialData_pkey" PRIMARY KEY ("id"), CONSTRAINT "year_range" CHECK (year_start > 1990
                                                                                                                                                                                                            AND year_start < 2999
                                                                                                                                                                                                            AND year_end >1991
                                                                                                                                                                                                            AND year_end < 3000
                                                                                                                                                                                                            AND (year_end - year_start = 1)));

-- AddForeignKey

ALTER TABLE "FinancialData" ADD CONSTRAINT "FinancialData_cropId_fkey"
FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON
DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "FinancialData" ADD CONSTRAINT "FinancialData_farmId_fkey"
FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON
DELETE
SET NULL ON
UPDATE CASCADE;

