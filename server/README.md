# Student Wallet Wise - Server

Backend API for Student Wallet Wise expense tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.example` to `.env` and update with your values:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

3. Run in development:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Run production build:
```bash
npm run serve
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expenses
- `GET /api/expenses` - Get all expenses (with optional month filter)
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/recent` - Get recent expenses
- `GET /api/expenses/stats/categories` - Get category statistics
- `DELETE /api/expenses/:id` - Delete expense

### Budgets
- `GET /api/budgets/:month` - Get budget for specific month
- `POST /api/budgets` - Create or update budget

### Categories
- `GET /api/categories` - Get all categories

### Stats
- `GET /api/stats/summary` - Get expense summary

## Deployment

This server is designed to be deployed separately from the frontend.

### Environment Variables for Production
Make sure to set the following in your hosting platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV=production`

### Deployment Platforms
- **Heroku**: Use the Procfile or set start command to `npm start`
- **Railway**: Automatically detects and deploys Node.js apps
- **Render**: Set build command to `npm install && npm run build` and start command to `npm run serve`
- **DigitalOcean App Platform**: Configure using the App Spec

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- TypeScript
