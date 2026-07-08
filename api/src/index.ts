// api/src/index.ts
// Main server file — mounts all route handlers

import "dotenv/config";
import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import csvParser from 'csv-parser';

// Import route handlers
import gamesRouter from './routes/games.js';
import playersRouter from './routes/players.js';

// Array to store celebrity names (loaded from CSV)
const names: string[] = [];

const app = express();
const PORT = 3000;

// Load celebrity names from CSV
const filePath: string = 'src/celeb_names1.csv';
fs.createReadStream(filePath)
  .pipe(csvParser())
  .on('data', (row: { NAME: string }) => {
    names.push(row.NAME);
  })
  .on('end', () => {
    console.log(`✅ Loaded ${names.length} celebrity names`);
  });

// Database setup
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// Middleware
app.use(express.json());

// ============================================
// Mount route handlers
// ============================================

// All game routes (prefixed with /api)
app.use('/api', gamesRouter);

// All player routes (prefixed with /api)
app.use('/api', playersRouter);

// ============================================
// Root route
// ============================================
app.get('/', (req, res) => {
  res.json({ message: 'Celebrity Name Chain API is running' });
});

// ============================================
// Health check
// ============================================
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// ============================================
// Start server
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
