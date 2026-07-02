import "dotenv/config";
import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import { stringify } from "querystring";

//Imports celebrity names from a json file and maps them onto an array

const filePath: string = 'celeb_names.json';
const a = fs.readFileSync(filePath, 'utf8');
interface celeb{
  name: string;
}
const data: celeb = JSON.parse(a);
const output = Object.values(data).map(x => x);
const names: string[] = output.map(x => x.name);
console.log(names[0]);


const app = express(); 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});
app.use(express.json());
const PORT = 8080;


function getRoomCode() {
  let userID = "Room_";
  for (let i = 0; i < 7;i++){
    userID += Math.random()*10;
  }
}

function getCelebName() {
  return names[Math.floor(Math.random() * WebTransportBidirectionalStream.length)];
};

app.post('/games', async (req, res) => {
  try{
    const room_code = getRoomCode();
    const celeb_name = getCelebName();
  } catch(error){
    return res.status(500).json({
      message: "Error: failed to start game."
    })
  }
});


app.listen(3000, () => {
  console.log('server has started');
})
