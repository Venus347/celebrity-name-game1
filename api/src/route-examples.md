
# Celebrity Name Chain — Route Examples

These are reference examples for the Express routes we'll build. They're based on the professor's sample and the game rules.

---

## 1. Create a Game

**Endpoint:** `POST /games`

**Purpose:** Start a new game with a unique room code.

**Request Body:**
```json
{
  "roomCode": "STAR42"
}
```

**Response (201 Created):**
```json
{
  "roomCode": "STAR42",
  "currentName": null,
  "players": [],
  "celebrities": []
}
```

**Error (409 Conflict):**
```json
{
  "error": "Room code already in use"
}
```

---

## 2. Join a Game

**Endpoint:** `POST /games/:roomCode/players`

**Purpose:** Add a player to an existing game.

**Request Body:**
```json
{
  "username": "sam"
}
```

**Response (201 Created):**
```json
{
  "id": "player_id",
  "username": "sam",
  "score": 0,
  "gameId": "game_id"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Game not found"
}
```

---

## 3. Submit a Celebrity Name

**Endpoint:** `POST /games/:roomCode/celebrities`

**Purpose:** Submit a celebrity name for the current turn.

**Request Body:**
```json
{
  "username": "sam",
  "name": "Albert Einstein"
}
```

**Response (201 Created):**
```json
{
  "accepted": true,
  "currentName": "Albert Einstein",
  "nextPlayer": "kai"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Name must start with the last letter of the previous name"
}
```

**Error (409 Conflict):**
```json
{
  "error": "Celebrity name already used in this game"
}
```

---

## 4. Get Game State

**Endpoint:** `GET /games/:roomCode`

**Purpose:** Get the current state of a game (players, current name, scores).

**Response (200 OK):**
```json
{
  "roomCode": "STAR42",
  "currentName": "Albert Einstein",
  "players": [
    { "username": "sam", "score": 3 },
    { "username": "kai", "score": 2 }
  ],
  "celebrities": [
    { "name": "Albert Einstein", "used": true },
    { "name": "Elvis Presley", "used": true }
  ]
}
```

**Error (404 Not Found):**
```json
{
  "error": "Game not found"
}
```

---

## 5. Health Check

**Endpoint:** `GET /health`

**Purpose:** Verify the API is running.

**Response (200 OK):**
```json
{
  "ok": true
}
```

---

## Next Steps

1. Choose one route to implement first (e.g., `POST /games`)
2. Write the route handler in `api/src/routes/`
3. Test locally with Insomnia or `curl`
4. Once it works, create a PR for that route
5. Repeat for the remaining routes

---

**These examples are for planning and reference. Do not commit this file to `main` without team review.**

