# Architecture Overview

## Stack
- Frontend: Vite + React + TypeScript + Tailwind + shadcn/ui
- State/Data Fetch: Native fetch + React Query (available) for caching
- Backend: Node.js + Express + TypeScript
- Database: MongoDB via Mongoose
- Auth: JWT (Bearer) with bcrypt hashed passwords
- Validation: zod schemas in route handlers

## High-Level Flow
1. User registers or logs in -> backend issues JWT.
2. Frontend stores JWT (recommended: httpOnly cookie via future enhancement or memory + refresh logic; current simple localStorage acceptable for MVP). 
3. Authenticated requests send `Authorization: Bearer <token>`.
4. Backend middleware (`auth.ts`) verifies token, attaches `user.id`.
5. Routes perform CRUD / aggregation on MongoDB models, return JSON.
6. Frontend renders data (charts, stats, lists) based on REST responses.

## Directory Structure (Key Parts)
```
server/
  src/
    config/        # env + db connection
    models/        # Mongoose schemas (User, Expense, Category, Budget, RecurringExpense)
    middleware/    # auth middleware
    routes/        # Express route modules
    app.ts         # server bootstrap

src/
  components/      # UI components
  pages/           # Top-level views
  hooks/           # Custom hooks
  lib/utils.ts     # Utility helpers
  (Removed supabase integration)
```

## Data Model Relationships
- User (1) -> Expenses (N)
- User (1) -> Categories (N)
- User (1) -> Budgets (N) keyed by month (unique per month)
- User (1) -> RecurringExpense (N) generates Expenses over time

## Aggregations
- Category totals: `$group` by `category`
- Budget usage: sum expenses in month -> compare to Budget.amount
- Stats summary: Compare current vs previous month total expenses

## Future Enhancements
- Move recurring runner to scheduled job (cron / serverless)
- Add refresh tokens + rotate JWTs
- Introduce layered service modules for testability (services/ layer)
- Add indexing & performance tuning (compound indexes for queries)

## Design Principles
- Keep route logic thin; push business logic into model methods/services gradually.
- Validate all external input via zod.
- Return consistent JSON shapes; minimal coupling to frontend.
