# Frontend Integration Guide

## Auth Flow
1. User submits email/password to `/api/auth/login` or `/api/auth/register`.
2. Store returned `token` (initial MVP: `localStorage.setItem('token', token)`).
3. On each request include header: `Authorization: Bearer ${token}`.
4. On logout: remove token.

Future improvement: httpOnly cookie + refresh token rotation.

## Fetch Helper Example
```ts
const API = import.meta.env.VITE_API_BASE_URL;
const authFetch = (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
};
```

## Loading Dashboard Data
```ts
// Recent transactions
const transactions = await authFetch('/api/expenses/recent').then(r => r.json());
// Category chart
const categories = await authFetch(`/api/expenses/stats/categories?month=${month}`).then(r => r.json());
// Budget summary
const budget = await authFetch(`/api/budgets/${month}`).then(r => r.json());
// Monthly summary
const summary = await authFetch('/api/stats/summary').then(r => r.json());
```

## Add Expense
```ts
await authFetch('/api/expenses', {
  method: 'POST',
  body: JSON.stringify({ description, category, amount, date })
}).then(r => r.json());
```

## Replace Supabase References
Remove any previous imports of `supabase`. Use `authFetch` for CRUD operations.

## React Query (Optional)
Wrap calls using `useQuery` for caching:
```ts
import { useQuery } from '@tanstack/react-query';
const { data, isLoading } = useQuery({
  queryKey: ['categories', month],
  queryFn: () => authFetch(`/api/expenses/stats/categories?month=${month}`).then(r => r.json())
});
```

## Error Handling
```ts
const res = await authFetch('/api/expenses');
if (!res.ok) {
  const err = await res.json();
  // Show toast: err.message or zod error details
}
```

## Token Expiration
Currently 7d expiration. If a 401 occurs, prompt re-login.

## UI Updates
- `AddExpenseDialog`: replace `onAddExpense` local state update with refetch of expenses queries.
- Dashboard components: feed data from queries rather than manual local arrays.
