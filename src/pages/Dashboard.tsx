import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { DashboardStats } from "@/components/DashboardStats";
import { ExpenseChart } from "@/components/ExpenseChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [month] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const recentQuery = useQuery<{ id: string; description: string; category: string; amount: number; date: string }[]>({ queryKey: ['recent'], queryFn: () => Api.recentExpenses() });
  const categoriesQuery = useQuery<{ category: string; amount: number }[]>({ queryKey: ['categories', month], queryFn: () => Api.categoryStats(month) });
  const budgetQuery = useQuery<{ month: string; budget: number; spent: number; remaining: number }>({ queryKey: ['budget', month], queryFn: () => Api.budgetSummary(month) });
  const summaryQuery = useQuery<{ month: string; totalExpenses: number; percentChange: number }>({ queryKey: ['summary'], queryFn: () => Api.monthSummary() });

  const transactions = recentQuery.data || [];
  const totalExpenses = summaryQuery.data?.totalExpenses || 0;
  const percentChange = summaryQuery.data?.percentChange || 0;
  const budget = budgetQuery.data?.budget || 0;
  const savings = Math.max(0, (budgetQuery.data?.budget || 0) - (budgetQuery.data?.spent || 0));
  const categoryData = categoriesQuery.data || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Wallet Wise</h1>
                <p className="text-sm text-muted-foreground">Welcome, {user?.name || 'User'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <AddExpenseDialog />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
            <DashboardStats
              totalExpenses={totalExpenses}
              budget={budget}
              savings={savings}
              percentChange={percentChange}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Analytics</h2>
            <ExpenseChart data={categoryData} />
          </section>

          <section>
            <RecentTransactions transactions={transactions} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
