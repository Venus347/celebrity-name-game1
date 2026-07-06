# Classmate README — Celebrity Name Chain

**Purpose:** This document is a log of everything that happened on **July 6, 2026** — what the professor did, what we fixed, and what you need to do to get back up to speed.

---

## 📅 Today's Timeline

### Morning (Before Class)

- Branches existed: `jacob_branch`, `justice_branch`, `JulioAAlvarez/express-testing`
- `merge/backend-frontend` was created as a staging branch
- A `prod` folder was created locally to test merges safely

### During Class (Professor's Involvement)

- The professor took over one of the laptops to **clean up branches**
- He attempted to merge `jacob_branch` into `main` but encountered issues
- Some branches were deleted or became out of sync
- The remote `merge/backend-frontend` branch was temporarily removed

### After Class (What We Fixed)

We restored order by:

1. **Recreating the `merge/backend-frontend` branch** from the `prod` folder
2. **Pushing it back to GitHub**
3. **Pulling it into the original repo**
4. **Fixing the folder structure** (removed nested `api/` folders)
5. **Adding missing files**:
   - `api/src/routes/games.ts` (route handler)
   - `api/src/celeb_names1.csv` (celebrity dataset)
6. **Regenerating the Prisma client**
7. **Testing the backend** — `POST /api/games` now returns a mock response
8. **Testing the frontend** — `yarn dev` runs without errors

---

## 🛠️ What We Fixed / Cleaned Up

| Issue | Fix |
|-------|-----|
| Nested `api/` folder | Moved `routes/` and `celeb_names1.csv` to the correct location |
| Missing `routes/` folder | Recreated `routes/` and added `games.ts` |
| Missing CSV file | Created `celeb_names1.csv` with sample celebrity names |
| Prisma client missing | Ran `yarn prisma:generate` |
| Port conflicts | Killed processes using `sudo lsof -i :3000` |
| Branch confusion | Re-established `merge/backend-frontend` as the staging branch |

---

## 🧭 What You Need to Do

### Step 1: Pull the Latest Changes

```bash
cd ~/Documents/code/TTRP2026/celebrity-name-game1
git checkout merge/backend-frontend
git pull origin merge/backend-frontend
```

### Step 2: Set Up the Backend

```bash
cd api
cp .env.example .env
# Edit .env and set your DATABASE_URL
yarn install
yarn prisma:generate
yarn prisma db push
yarn dev
```

### Step 3: Set Up the Frontend

```bash
cd ../client
yarn install
yarn dev
```

### Step 4: Test the Connection

- Backend: `http://localhost:3000/api/test` → `{"message":"Router is working!"}`
- Frontend: `http://localhost:5173` → should load the Ionic app

---

## ✅ Current Working State

| Component | Status |
|-----------|--------|
| Backend server | ✅ Running on `http://localhost:3000` |
| `POST /api/games` | ✅ Returns mock response |
| Frontend server | ✅ Running on `http://localhost:5173` |
| Prisma client | ✅ Generated |
| CSV loading | ✅ Works (celebrity names loaded) |

---

## 📌 Next Steps for the Team

1. **Test the frontend and backend together**
2. **Connect the frontend to the backend** using `axios` or `fetch`
3. **Add remaining routes** (`GET /games`, `POST /players`)
4. **Merge `merge/backend-frontend` to `main`**
5. **Deploy or present the final product**

---

## 🙏 Acknowledgment

This cleanup was possible because we kept a **safe copy (`prod` folder)** and worked through each issue step by step. Going forward, always:
- Keep a local backup of working code
- Test merges in a separate branch before pushing to `main`
- Communicate with teammates before deleting branches

---

**Made with 💻 and ☕ by the Celebrity Name Chain team.**

*Document generated on July 6, 2026.*