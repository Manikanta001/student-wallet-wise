# API Reference
Base URL (dev): `http://localhost:4000`
All protected endpoints require header: `Authorization: Bearer <JWT>`

## Auth
### POST /api/auth/register
Body:
```
{ "email": string, "password": string (>=6), "name": string }
```
201 Response:
```
{ token: string, user: { id, email, name } }
```
Errors: 400 validation, 409 duplicate email

### POST /api/auth/login
Body:
```
{ "email": string, "password": string }
```
200 Response: same shape as register
Errors: 400 validation, 401 invalid credentials

## Health
### GET /api/health
200: `{ status: "ok" }`

## Expenses
### POST /api/expenses
Body:
```
{ description: string, category: string, amount: number, date: ISO/date-string }
```
201: Expense document
Errors: 400 validation

### GET /api/expenses?month=YYYY-MM (optional)
Returns array of expenses (sorted desc by date)

### GET /api/expenses/recent
Returns last 10 mapped transactions:
```
[{ id, description, category, amount, date: YYYY-MM-DD }]
```

### GET /api/expenses/stats/categories?month=YYYY-MM
Response:
```
[{ category: string, amount: number }]
```

### DELETE /api/expenses/:id
204 on success

## Categories
### POST /api/categories
Body: `{ name: string }`
201: Category
Errors: 409 duplicate, 400 validation

### GET /api/categories
Array of categories

### DELETE /api/categories/:id
204 on success

## Budgets
### PUT /api/budgets
Body: `{ month: YYYY-MM, amount: number }`
Upserts budget, returns budget doc

### GET /api/budgets/:month
```
{ month, budget: number, spent: number, remaining: number }
```

## Recurring Expenses
### POST /api/recurring
Body:
```
{ description, category, amount, interval: 'daily'|'weekly'|'monthly', startDate: ISO }
```
Calculates nextRun.

### GET /api/recurring
Array of recurring expense documents

### PUT /api/recurring/:id/toggle
Toggles `active`

### POST /api/recurring/run
Materializes due recurring items into expenses. Returns summary.

## Stats
### GET /api/stats/summary
```
{ month: YYYY-MM, totalExpenses: number, percentChange: number }
```

## Error Format
Generic errors:
```
{ message: string }
```
Validation (zod):
```
{ errors: { fieldErrors: { ... } } }
```

## Rate Limiting (Future)
Add middleware for IP/user request throttling.
