/*
  Warnings:

  - You are about to drop the column `conversationId` on the `User` table. All the data in the column will be lost.
  - Made the column `total_land` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `land_type` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `conversationId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_conversationId_fkey";

-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "total_land" SET NOT NULL,
ALTER COLUMN "land_type" SET NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "conversationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "conversationId";

-- CreateTable
CREATE TABLE "_ConversationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToUser_AB_unique" ON "_ConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToUser_B_index" ON "_ConversationToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
