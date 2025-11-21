# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0abda645-d3ba-4154-842b-e68a8ac52a7b

## Environment Setup

This project has separate environment files for frontend and backend:

**Frontend (root directory)**
- `.env` - Frontend environment variables (Vite)
- `.env.example` - Template for frontend env vars

**Backend (server directory)**
- `server/.env` - Backend environment variables
- `server/.env.example` - Template for backend env vars

### Quick Setup
```bash
# 1. Copy example files and set your values
cp .env.example .env
cp server/.env.example server/.env

# 2. Edit server/.env and add your MongoDB connection string
# MONGODB_URI=mongodb+srv://your-connection-string

# 3. Install dependencies
npm install

# 4. Run backend and frontend
npm run dev:full
```

## Documentation
Additional detailed docs are in the `docs/` directory:

| File | Purpose |
|------|---------|
| `docs/architecture.md` | Overall system & data model relationships |
| `docs/api-reference.md` | Complete REST endpoint list & responses |
| `docs/environment.md` | Environment variable usage & patterns |
| `docs/frontend-integration.md` | How the frontend calls the backend & auth handling |
| `docs/recurring-expenses.md` | Recurring expense generation logic & future cron notes |
| `docs/security.md` | Current security profile & hardening roadmap |

Use these to onboard new contributors or plan next features.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0abda645-d3ba-4154-842b-e68a8ac52a7b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0abda645-d3ba-4154-842b-e68a8ac52a7b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Backend (Express + MongoDB)

The project now includes a Node.js/Express backend under `server/` providing authentication, expenses, categories, budgets, recurring expenses, and stats.

### Environment Variables
Create a `.env` at the repository root:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_change_me
PORT=4000
```

### Install & Run
```bash
npm install
npm run server   # backend (http://localhost:4000)
npm run dev      # frontend (http://localhost:5173 by default)
# or both
npm run dev:full
```

### API Endpoints (Summary)
| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/health | Health check |
| POST | /api/auth/register | Create user (email, password, name) |
| POST | /api/auth/login | Login returns `{ token, user }` |
| POST | /api/expenses | Create expense |
| GET | /api/expenses | List expenses (`?month=YYYY-MM` optional) |
| GET | /api/expenses/recent | Last 10 expenses for dashboard |
| GET | /api/expenses/stats/categories | Category totals (`?month=`) |
| DELETE | /api/expenses/:id | Delete expense |
| POST | /api/categories | Create category |
| GET | /api/categories | List categories |
| DELETE | /api/categories/:id | Delete category |
| PUT | /api/budgets | Upsert monthly budget `{ month, amount }` |
| GET | /api/budgets/:month | Get budget summary `{ budget, spent, remaining }` |
| POST | /api/recurring | Create recurring expense |
| GET | /api/recurring | List recurring expenses |
| PUT | /api/recurring/:id/toggle | Toggle active state |
| POST | /api/recurring/run | Manually run due recurring items |
| GET | /api/stats/summary | Current month total + percent change |

Protected endpoints require `Authorization: Bearer <token>` header.

### Model Shapes (Simplified)
```
User: { email, passwordHash, name }
Expense: { userId, description, category, amount, date }
Category: { userId, name }
Budget: { userId, month, amount }
RecurringExpense: { userId, description, category, amount, interval, startDate, nextRun, active }
```

### Frontend Integration
Fetch recent expenses for `RecentTransactions`:
```ts
const res = await fetch('/api/expenses/recent', { headers: { Authorization: `Bearer ${token}` }});
const transactions = await res.json();
```
Chart data from `/api/expenses/stats/categories?month=YYYY-MM` already matches `{ category, amount }`.

Budget panel from `/api/budgets/2025-11` response.

### Recurring Runner
Call `/api/recurring/run` to generate due expenses (later replace with scheduled job/cron).

### Next Improvements
- Pagination & filtering
- Password reset / email verification
- Better validation & error envelopes
- Automated recurring job (cron, serverless)
- Role-based access if needed

