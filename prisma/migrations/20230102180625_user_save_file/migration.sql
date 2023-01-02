-- CreateTable
CREATE TABLE "ExpertFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExpertFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpertFile" ADD CONSTRAINT "ExpertFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
