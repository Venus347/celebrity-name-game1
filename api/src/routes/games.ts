import { Router } from 'express';

const router = Router();

// GET /api/test — test route
router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

// POST /api/games — create a new game
router.post('/games', (req, res) => {
  const { roomCode } = req.body;

  if (!roomCode) {
    return res.status(400).json({ error: 'roomCode is required' });
  }

  res.status(201).json({
    id: 'mock-id',
    roomCode: roomCode,
    message: 'Game created (mock)'
  });
});

export default router;
