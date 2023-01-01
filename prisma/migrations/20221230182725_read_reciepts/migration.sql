-- CreateTable
CREATE TABLE "ReadReciept" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "alertId" TEXT NOT NULL,

    CONSTRAINT "ReadReciept_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadReciept" ADD CONSTRAINT "ReadReciept_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadReciept" ADD CONSTRAINT "ReadReciept_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "Alert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
