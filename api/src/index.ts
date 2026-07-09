// ============================================
// index.ts — Main Server File
// ============================================
// This is the entry point for the Express server.
// It sets up middleware, loads celebrity names, and mounts all route handlers.

// ============================================
// 1. IMPORTS
// ============================================
import "dotenv/config";
import express from "express";
import cors from 'cors';
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';

import gamesRouter from './routes/games.js';
import playersRouter from './routes/players.js';

// ============================================
// 2. LOAD CELEBRITY NAMES FROM JSON
// ============================================
const names: string[] = [];

// Define the path to the JSON file (relative to the api/ folder)
const jsonPath: string = 'celeb_names.json';
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const jsonNames = JSON.parse(jsonData);

jsonNames.forEach((item: { name: string }) => {
  names.push(item.name);
});

console.log(`✅ Loaded ${names.length} celebrity names from JSON`);

// ============================================
// 3. EXPRESS APP SETUP
// ============================================
const app = express();
const PORT = 3000;

// ============================================
// 4. DATABASE SETUP (Prisma 7)
// ============================================
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// ============================================
// 5. MIDDLEWARE
// ============================================
app.use(express.json());
app.use(cors());

// ============================================
// 6. ROUTES
// ============================================
app.use('/api', gamesRouter);
app.use('/api', playersRouter);

// ============================================
// 7. ROOT & HEALTH ROUTES
// ============================================
app.get('/', (req, res) => {
  res.json({ message: 'Celebrity Name Chain API is running' });
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// ============================================
// 8. START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ============================================
// 9. EXPORTS
// ============================================
// Export prisma so other files can use the same database client instance.
export { prisma };

// Export names so other files (like routes) can use the celebrity names array.
export { names };