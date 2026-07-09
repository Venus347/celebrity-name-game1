// ============================================
// players.ts — Player Routes
// ============================================
// This file handles routes for players joining and interacting with games.
// It uses the shared Prisma client exported from index.ts.

import { Router } from 'express';
import { prisma } from '../index.js';  // Shared Prisma instance

const router = Router();

// ============================================
// POST /api/players — Join a game
// ============================================
// Purpose: Adds a player to an existing game.
// Expects: { "roomCode": "TEST01", "username": "sam" } in the request body
// Returns: The created player object from the database.
// Errors:
//   - 400: Missing roomCode or username
//   - 404: Game not found (invalid room code)
//   - 500: Database or server error
router.post('/players', async (req, res) => {
  // Extract roomCode and username from the request body
  const { roomCode, username } = req.body;

  // Validate that both fields are provided
  if (!roomCode || !username) {
    return res.status(400).json({ error: 'roomCode and username are required' });
  }

  try {
    // Find the game by room code
    const game = await prisma.game.findUnique({
      where: { roomCode }
    });

    // If game doesn't exist, return a 404 Not Found error
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Create the player and link them to the game
    const player = await prisma.player.create({
      data: {
        username,     // The player's chosen name
        gameId: game.id  // Link to the game via its ID
      }
    });

    // Return the created player with a 201 Created status
    res.status(201).json(player);
  } catch (error) {
    console.error('Error joining game:', error);
    res.status(500).json({ error: 'Failed to join game' });
  }
});

// ============================================
// GET /api/players/:playerId — Get player details
// ============================================
// Purpose: Fetch a single player by their ID.
// Expects: playerId as a URL parameter (e.g., /api/players/123)
// Returns: The player object.
// Errors:
//   - 404: Player not found
//   - 500: Database or server error
router.get('/players/:playerId', async (req, res) => {
  // Extract playerId from the URL parameters
  const { playerId } = req.params;

  try {
    // Find the player by their unique ID
    const player = await prisma.player.findUnique({
      where: { id: playerId }
    });

    // If no player is found, return a 404 Not Found error
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Return the player object
    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

export default router;