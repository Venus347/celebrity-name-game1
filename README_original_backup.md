# 📄 Celebrity Name Chain — README (Draft)

> **Note:** This is a working draft. The final `README.md` will be reviewed and approved by the full team before merging.

---

## 🧩 Project Overview

**Celebrity Name Chain** is a full-stack multiplayer party game where players take turns naming celebrities. Each new name must start with the last letter of the previous name (e.g., "Albert Einstein" → "Elvis Presley" → "Elon Musk" → ...). The game is built with:

- **Backend:** Express + Prisma 7 + PostgreSQL (TypeScript)
- **Frontend:** Ionic React (React Hook Form + TanStack Query)
- **Infrastructure:** Yarn 4 workspaces, ngrok for sharing

---

## 🗂️ Repository Structure

```
celebrity-name-game1/
├── api/                # Express + Prisma + PostgreSQL game server
│   ├── src/            # TypeScript source code
│   ├── prisma/         # Prisma schema and migrations
│   ├── .env.example    # Environment variables template
│   └── README.md       # API-specific documentation
├── client/             # Ionic React frontend
│   ├── src/            # React components and pages
│   ├── .env.example    # Environment variables template
│   └── README.md       # Client-specific documentation
├── data/               # Database dumps (for sharing schema)
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 22+ | Use `nvm install 22` if needed |
| **Yarn** | 4 (via Corepack) | Run `corepack enable` |
| **PostgreSQL** | 14+ | Running locally |
| **ngrok** | Latest | Only needed for multiplayer testing |

---

### 1. Clone the Repository

```bash
git clone git@github.com:Venus347/celebrity-name-game1.git
cd celebrity-name-game1
```

---

### 2. Set Up the Backend (`api/`)

```bash
cd api
yarn install
cp .env.example .env
```

**Edit `.env`** and set `DATABASE_URL` to your PostgreSQL connection string:

```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/celebrity_db"
```

**Run database migrations:**

```bash
yarn prisma:migrate
```

**Start the development server:**

```bash
yarn dev
```

The API will be available at `http://localhost:3000`.  
Test it: `GET /health` → `{ "ok": true }`

---

### 3. Set Up the Frontend (`client/`)

```bash
cd ../client
yarn install
cp .env.example .env
```

**Edit `.env`** and set `VITE_API_URL`:

```
VITE_API_URL=http://localhost:3000
```

**Start the Ionic development server:**

```bash
yarn dev
```

The app will be available at `http://localhost:8100`.

---

### 4. Play Together (Using ngrok)

To share your local API with teammates:

```bash
ngrok http 3000
```

Copy the `https://...ngrok.io` URL and share it with your team.  
Each player should set their `VITE_API_URL` to the ngrok URL.

> ⚠️ **Never expose your database directly.** Only share the API via ngrok.

---

## 📊 Database Schema (Prisma)

The current schema defines the core game tables:

| Model | Description |
|-------|-------------|
| **Game** | A game room with a unique `roomCode`, tracking the current name in the chain |
| **Player** | Participants in a game, with a `username` and `score` |
| **Celebrity** | A celebrity name used in the game, with a `used` flag to prevent repeats |

> See `api/prisma/schema.prisma` for the full schema definition.

---

## 🛠️ Key Commands

| Command | Where | What It Does |
|---------|-------|--------------|
| `yarn install` | `api/` or `client/` | Installs dependencies |
| `yarn dev` | `api/` | Starts the Express server with hot reload |
| `yarn dev` | `client/` | Starts the Ionic dev server |
| `yarn prisma:migrate` | `api/` | Applies schema changes to the database |
| `yarn prisma:generate` | `api/` | Generates the Prisma Client |
| `ngrok http 3000` | Anywhere | Exposes the API to the internet |

---

## 🤖 AI Disclosure

**This project was developed with assistance from AI tools.**

| Tool               | Role                                                                                             | Used By:         |
| ------------------ | ------------------------------------------------------------------------------------------------ | ---------------- |
| **DeepSeek (Des)** | Planning, code structure, debugging support, and documentation for the Prisma schema and README. | Julio A. Alvarez |

All final decisions, code implementation, and testing were completed by the project team. AI was used as a learning and productivity aid, not as a replacement for understanding.

---

## 📝 Team Members

| Name              | GitHub          | Role                              |
| ----------------- | --------------- | --------------------------------- |
| Jake              | `Venus347`      | Team Lead / Backend / Express API |
| Justice Kirton    | `Justicekirton` | Frontend / Ionic                  |
| Julio A. Alvarez  | `JulioAAlvarez` | Database / Prisma Schema          |


---

## 📚 Resources

- [Professor's Sample Repo](https://github.com/jonathan-chin/citytech-ttpr-2026-summer-celebrity-name-chain)
- [Prisma 7 Docs](https://www.prisma.io/docs/orm)
- [Ionic React Docs](https://ionicframework.com/docs/react)
- [TanStack Query Docs](https://tanstack.com/query/latest)

---

## ✅ Next Steps (For the Team)

- [ ] Finalize and merge the Prisma schema
- [ ] Implement API routes (`POST /games`, `POST /players`, `POST /moves`)
- [ ] Connect frontend to API
- [ ] Test with ngrok
- [ ] Deploy or present final product

---

**This README is a draft. Final version will be reviewed and approved by the full team before merging into `main`.**

---

> **Made with 💻 and ☕ by the Celebrity Name Chain team.**
