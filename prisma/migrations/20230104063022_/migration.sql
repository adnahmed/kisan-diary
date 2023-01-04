/*
  Warnings:

  - Added the required column `direction` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('pending', 'sent', 'delivered', 'seen');

-- CreateEnum
CREATE TYPE "MessageDirection" AS ENUM ('incoming', 'outgoing');

-- AlterTable
ALTER TABLE "FileUpload" ADD COLUMN     "conversationId" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "conversationId" TEXT,
ADD COLUMN     "direction" "MessageDirection" NOT NULL,
ADD COLUMN     "status" "MessageStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "conversationId" TEXT;

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
