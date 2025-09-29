# NexusBank Backend (Sequelize)

Quick start:
1. Copy `.env.example` to `.env` and set your Postgres credentials.
2. Install deps: `npm install`
3. Run dev server: `npm run dev`

This backend uses Sequelize and will automatically create tables on startup (using `sequelize.sync()`).
Endpoints included (basic):
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/accounts
- GET  /api/transactions
- GET  /api/savings

NOTE: This is a starter. Expand controllers and add validation, rate-limiting, logging, and production-ready configs.
