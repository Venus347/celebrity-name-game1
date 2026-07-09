import "dotenv/config";
import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';

//for teammates: use tanstack query to connect api calls to frontend 
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

//initializes express, prisma packages, and port
const app = express(); 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});
app.use(express.json());
const PORT = 3000;

//creates unique room code
function getRoomCode() {
  let roomID = "Room_";
  for (let i = 0; i < 7;i++){
    roomID += String(Math.floor(Math.random()*10));
  }
  return roomID;
}

//creates unique random playerID
function getPlayerID(){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let playerID = "";
  for (let i = 0; i<7; i++){
    playerID += chars[Math.floor(Math.random() * chars.length)];
  }
  return playerID;
}
function getCelebName() {
  return names[Math.floor(Math.random() * names.length)];
};

//Initializes game 
app.post('/games/create', async (req, res) => {
  try{
    const player_id = getPlayerID();
    const room_code = getRoomCode();
    const celeb_name = getCelebName();
    let players : string[] = [];
    players.push(player_id)

    const game = await prisma.game.create({
      data: {
        roomCode: room_code,
        currentName: celeb_name,
        players: players
      }
    })
    return res.json(game);
  } catch(error){
    if (error instanceof Error){
      console.log(error.message);
    }
    return res.status(500).json({
      message: "Error: failed to start game.",
    })
  }
});

//allows players to join existing game
app.get('/games/:room_id', async (req, res) => {
  const room = String(req.params.room_id);
  const find_room = await prisma.game.findUnique({where : {roomCode: room}});
  
  if (find_room == null){
    console.log("Room not found.")
    return res.send("Room not found");
  }else{
    const player_id = getPlayerID();
    const player = await prisma.player.create({
      data: {
        id: player_id,
        username: "", //waiting to connect this to frontend mechanism
        score: 0,
        roomCode: room
      }
    });
    const game = await prisma.game.findUnique({
      where: { roomCode: room},
    });
    if (!game) throw new Error("Game not found");
    await prisma.game.update({
      where: {roomCode: room},
      data: {
        players: [...game.players, `${player_id}`]
      }
    })
    
    
    return (res.json({game,player}))
  }
});

//guess answer method
app.get('/games/:room_id/:user_id/:answer', async (req, res) => {
  const room = String(req.params.room_id);
  const find_room = await prisma.game.findUnique({where : {roomCode: room}});
  const user_id = String(req.params.user_id);

  const ans = String(req.params.answer);
  const ans1 = String(req.params.answer).replace(/\s/g, "");
  const answer = ans1.toLowerCase();

  const game = await prisma.game.findUnique({
      where: { roomCode: room},
    });
  if (!game) throw new Error("Game not found");
  const current1= (game.currentName);

  const x = current1?.split(" ")[1];
  const current2 = x?.replace(/\s/g, "");
  const current_name = current2?.toLowerCase();
  


  const player = await prisma.player.findUnique({
     where: {id : user_id},
  });
  if (!player) throw new Error("Player not found");
  let score: number = player.score; 
  

  if (find_room == null){
    console.log("Room not found.")
    res.send(200)
  }else{
    if(answer.substring(0,1)== current_name?.substring(0,1) && names.includes(ans)){
      score += 5;
      await prisma.game.update({
        where: {roomCode: room},
        data:{
          currentName: ans,
        }
      });
      await prisma.player.update({
        where: {id: user_id},
        data:{
          score: score,
        }
      });

      return res.json(game);
    }else{
      return res.send("Not a valid answer, sorry !");
    }
  }
});


app.listen(PORT, () => {
  console.log('server has started');
})


