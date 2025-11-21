import { QueryClient } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('token');
}

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    let body: any = {};
    try { body = await res.json(); } catch {}
    throw new Error(body.message || 'Request failed');
  }
  return res.json();
}

export const Api = {
  register: (email: string, password: string, name: string) => authFetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
  login: (email: string, password: string) => authFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  createExpense: (payload: { description: string; category: string; amount: number; date: string }) => authFetch('/api/expenses', { method: 'POST', body: JSON.stringify(payload) }),
  recentExpenses: () => authFetch('/api/expenses/recent'),
  expensesByCategory: (category?: string) => authFetch(`/api/expenses${category ? `?category=${category}` : ''}`),
  categoryStats: (month: string) => authFetch(`/api/expenses/stats/categories?month=${month}`),
  budgetSummary: (month: string) => authFetch(`/api/budgets/${month}`),
  setBudget: (month: string, amount: number) => authFetch('/api/budgets', { method: 'PUT', body: JSON.stringify({ month, amount }) }),
  monthSummary: () => authFetch('/api/stats/summary'),
  categories: () => authFetch('/api/categories'),
};

export function invalidateDashboard(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ['recent'] });
  queryClient.invalidateQueries({ queryKey: ['categories'] });
  queryClient.invalidateQueries({ queryKey: ['budget'] });
  queryClient.invalidateQueries({ queryKey: ['summary'] });
}
