import { useState } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { ExpenseChart } from "@/components/ExpenseChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { Wallet } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Lunch at Campus Cafe",
      category: "Food",
      amount: 250,
      date: "2025-01-15",
    },
    {
      id: "2",
      description: "Bus Pass",
      category: "Transport",
      amount: 400,
      date: "2025-01-14",
    },
    {
      id: "3",
      description: "Engineering Books",
      category: "Books",
      amount: 850,
      date: "2025-01-13",
    },
    {
      id: "4",
      description: "Movie Tickets",
      category: "Entertainment",
      amount: 300,
      date: "2025-01-12",
    },
    {
      id: "5",
      description: "Groceries",
      category: "Shopping",
      amount: 600,
      date: "2025-01-11",
    },
  ]);

  const budget = 5000;
  const savings = 1200;

  const handleAddExpense = (expense: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...expense,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const percentChange = 8.5;

  const categoryData = transactions.reduce((acc, transaction) => {
    const existing = acc.find(item => item.category === transaction.category);
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({ category: transaction.category, amount: transaction.amount });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);

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
                <h1 className="text-2xl font-bold text-foreground">Smart Expense Tracker</h1>
                <p className="text-sm text-muted-foreground">Manage your finances wisely</p>
              </div>
            </div>
            <AddExpenseDialog onAddExpense={handleAddExpense} />
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

export default Index;
