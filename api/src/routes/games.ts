// ============================================
// games.ts — Game Routes
// ============================================
// This file handles all routes related to game rooms.
// It uses the shared Prisma client and names array exported from index.ts.

import { Router } from 'express';
import { prisma, names } from '../index.js';  // Import shared Prisma instance AND names array

const router = Router();

// ============================================
// GET /api/test — Simple test route
// ============================================
// Purpose: Check if the router is working.
// Returns: { "message": "Router is working!" }
router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

// ============================================
// POST /api/games — Create a new game
// ============================================
// Purpose: Creates a new game room with a unique room code.
// Expects: { "roomCode": "TEST01" } in the request body
// Returns: The created game object from the database.
// Errors:
//   - 400: Missing roomCode
//   - 409: Room code already exists (duplicate)
//   - 500: Database or server error
router.post('/games', async (req, res) => {
  // Extract roomCode from the request body
  const { roomCode } = req.body;

  // Validate that roomCode is provided
  if (!roomCode) {
    return res.status(400).json({ error: 'roomCode is required' });
  }

  try {
    // Check if a game with this room code already exists in the database
    const existingGame = await prisma.game.findUnique({
      where: { roomCode }
    });

    // If it exists, return a 409 Conflict error
    if (existingGame) {
      return res.status(409).json({ error: 'Room code already in use' });
    }

    // Pick a random celebrity name from the loaded names array
    // This is now inside the route handler, so it runs when the request is made
    const randomCeleb = names[Math.floor(Math.random() * names.length)];

    // Create a new game in the database
    const game = await prisma.game.create({
      data: {
        roomCode,           // The room code provided by the frontend
        currentName: randomCeleb // The first celebrity name in the chain
      }
    });

    // Return the created game with a 201 Created status
    res.status(201).json(game);
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating game:', error);
    // Return a 500 Internal Server Error
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// ============================================
// GET /api/games — Get all games
// ============================================
// Purpose: Fetch all games from the database.
// Returns: Array of all games, each with its associated players.
// Errors:
//   - 500: Database or server error
router.get('/games', async (req, res) => {
  try {
    // Fetch all games and include their players (so we see who's in each game)
    const games = await prisma.game.findMany({
      include: { players: true }
    });

    // Return the list of games
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// ============================================
// GET /api/games/:roomCode — Get a specific game
// ============================================
// Purpose: Fetch a single game by its room code.
// Expects: roomCode as a URL parameter (e.g., /api/games/TEST01)
// Returns: The game object with its players.
// Errors:
//   - 404: Game not found
//   - 500: Database or server error
router.get('/games/:roomCode', async (req, res) => {
  // Extract roomCode from the URL parameters
  const { roomCode } = req.params;

  try {
    // Find the game by room code, including its players
    const game = await prisma.game.findUnique({
      where: { roomCode },
      include: { players: true }
    });

    // If no game is found, return a 404 Not Found error
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Return the game with its players
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

export default router;