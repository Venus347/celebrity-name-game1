/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Game_roomCode_key";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("roomCode");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");
