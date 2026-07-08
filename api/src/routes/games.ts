// api/src/routes/games.ts
// This file handles all routes related to game rooms

import { Router } from 'express';

const router = Router();

// ============================================
// GET /api/test — Simple test route
// ============================================
router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

// ============================================
// POST /api/games — Create a new game
// ============================================
// Expects: { "roomCode": "TEST01" }
// Returns: { "id": "mock-id", "roomCode": "TEST01", "message": "Game created (mock)" }
router.post('/games', (req, res) => {
  const { roomCode } = req.body;

  if (!roomCode) {
    return res.status(400).json({ error: 'roomCode is required' });
  }

  // TODO: Replace with real database logic using Prisma
  res.status(201).json({
    id: 'mock-id',
    roomCode: roomCode,
    message: 'Game created (mock)'
  });
});

// ============================================
// GET /api/games — Get all games
// ============================================
// Returns: Array of all games
// TODO: Replace with Prisma query
router.get('/games', (req, res) => {
  // For now, return a mock list
  res.json([
    { id: 'game1', roomCode: 'TEST01', status: 'waiting' },
    { id: 'game2', roomCode: 'TEST02', status: 'active' }
  ]);
});

// ============================================
// GET /api/games/:roomCode — Get a specific game
// ============================================
// Returns: Game details
// TODO: Replace with Prisma query
router.get('/games/:roomCode', (req, res) => {
  const { roomCode } = req.params;

  res.json({
    roomCode: roomCode,
    status: 'active',
    players: ['player1', 'player2'],
    currentName: 'Naruto'
  });
});

export default router;