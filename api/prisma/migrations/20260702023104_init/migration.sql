/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `letter` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `room_code` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomCode]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomCode` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "fk_answer_id";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "letter",
DROP COLUMN "room_code",
DROP COLUMN "topic",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentName" TEXT,
ADD COLUMN     "roomCode" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Answers";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Celebrity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Celebrity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Celebrity_gameId_name_key" ON "Celebrity"("gameId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_roomCode_key" ON "Game"("roomCode");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Celebrity" ADD CONSTRAINT "Celebrity_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
