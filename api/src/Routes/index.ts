import "dotenv/config";
import express from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express(); 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});
app.use(express.json());
const PORT = 5432;


function getRoomCode() {
  let userID = "Room_";
  for (let i = 0; i < 7;i++){
    userID += Math.random()*10;
  }
}
function getCelebNames() {
}
