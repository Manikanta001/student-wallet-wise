# Environment Setup

## Frontend (.env in project root)
```
VITE_API_BASE_URL=http://localhost:4000
```
Use: `import.meta.env.VITE_API_BASE_URL`

## Backend (server/.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/student-wallet-wise?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret
PORT=4000
```

### Generating a Strong JWT Secret
Use Node:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Multiple Environments
Production example:
```
MONGODB_URI=mongodb+srv://prodUser:prodPass@cluster.mongodb.net/wallet-prod
JWT_SECRET=<generated>
PORT=8080
```
Frontend prod:
```
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Loading Logic
Backend loads `server/.env` via `dotenv.config({ path: path.join(__dirname, '../../.env') })` inside `env.ts`.
Frontend uses Vite's `import.meta.env` injection at build time.

### Do Not Commit
`.env` files are gitignored; only `.env.example` tracked.

### Adding New Variables
1. Add to `.env.example` & `.env`.
2. Reference via `process.env.<VAR>` (backend) or `import.meta.env.<VITE_VAR>` (frontend). Remember prefix `VITE_` for frontend.
