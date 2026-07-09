// api/src/index.ts
// Main server file — mounts all route handlers

import "dotenv/config";
import express from "express";
import cors from 'cors';  // Add this at the top with other imports
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

// ============================================
// LOAD CELEBRITY NAMES FROM JSON FILE
// ============================================
// Jacob replaced the CSV with a JSON file, so we read the JSON instead.
// The JSON file is 'celeb_names.json' in the api/ folder.

// Step 1: Define the path to the JSON file
const jsonPath: string = 'celeb_names.json';

// Step 2: Read the file synchronously (blocking, but fine for startup)
const jsonData = fs.readFileSync(jsonPath, 'utf8');

// Step 3: Parse the JSON string into a JavaScript array
// The JSON structure is an array of objects, each with a "name" property
const jsonNames = JSON.parse(jsonData);

// Step 4: Loop through each item and push the name into the names array
// This matches the original CSV behavior where we had a list of names
jsonNames.forEach((item: { name: string }) => {
  names.push(item.name);
});

// Step 5: Log how many names were loaded (so you know it worked)
console.log(`✅ Loaded ${names.length} celebrity names from JSON`);

// Database setup
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// Middleware
app.use(express.json());
app.use(cors());

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
