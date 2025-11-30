
# RankPost Frontend (Full Starter)

This is a full starter scaffold for the RankPost frontend: landing page + dashboard (Auth, Sites, Articles, History).
It uses Next.js (App Router), TailwindCSS and Axios to communicate with the RankPost FastAPI backend.

## Quick start (local dev)

1. Install Node 18+ and npm/yarn.
2. From this folder, install deps:
   ```bash
   npm install
   # or
   yarn
   ```
3. Create a .env.local from .env.example and set NEXT_PUBLIC_API_URL.
4. Run dev server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open http://localhost:3000

## Notes
- This is a scaffold. Connect it to the backend by setting NEXT_PUBLIC_API_URL in .env.local.
- Auth uses localStorage for JWT (simple approach for MVP). Improve for production.
