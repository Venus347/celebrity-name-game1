// api/src/routes/players.ts
// This file handles routes for players joining and interacting with games

import { Router } from 'express';

const router = Router();

// ============================================
// POST /api/players — Join a game
// ============================================
// Expects: { "roomCode": "TEST01", "username": "sam" }
// Returns: { "id": "player-id", "username": "sam", "gameId": "game-id" }
router.post('/players', (req, res) => {
  const { roomCode, username } = req.body;

  if (!roomCode || !username) {
    return res.status(400).json({ error: 'roomCode and username are required' });
  }

  // TODO: Replace with real database logic using Prisma
  res.status(201).json({
    id: 'mock-player-id',
    username: username,
    gameId: roomCode,
    message: 'Player joined (mock)'
  });
});

// ============================================
// GET /api/players/:playerId — Get player details
// ============================================
// Returns: Player details
router.get('/players/:playerId', (req, res) => {
  const { playerId } = req.params;

  res.json({
    id: playerId,
    username: 'sam',
    score: 0
  });
});

export default router;