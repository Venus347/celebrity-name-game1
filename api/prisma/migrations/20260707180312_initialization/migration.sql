-- CreateTable
CREATE TABLE "Game" (
    "roomCode" TEXT NOT NULL,
    "currentName" TEXT,
    "players" TEXT[],
    "celebrities" TEXT[],

    CONSTRAINT "Game_pkey" PRIMARY KEY ("roomCode")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "roomCode" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
