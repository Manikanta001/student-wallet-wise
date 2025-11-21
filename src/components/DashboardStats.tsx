import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

interface StatsProps {
  totalExpenses: number;
  budget: number;
  savings: number;
  percentChange: number;
}

export const DashboardStats = ({ totalExpenses, budget, savings, percentChange }: StatsProps) => {
  const remaining = budget - totalExpenses;
  const budgetPercentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">₹{totalExpenses.toFixed(2)}</h3>
            <div className="flex items-center gap-1 mt-2">
              {percentChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-destructive" />
              ) : (
                <TrendingDown className="h-4 w-4 text-success" />
              )}
              <span className={`text-xs font-medium ${percentChange >= 0 ? 'text-destructive' : 'text-success'}`}>
                {Math.abs(percentChange).toFixed(1)}% from last month
              </span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Budget</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">₹{budget.toFixed(2)}</h3>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  budgetPercentage > 90 ? 'bg-destructive' : 
                  budgetPercentage > 70 ? 'bg-warning' : 
                  'bg-success'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
            <Target className="h-6 w-6 text-accent" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Remaining</p>
            <h3 className={`text-2xl font-bold mt-2 ${remaining < 0 ? 'text-destructive' : 'text-success'}`}>
              ₹{Math.abs(remaining).toFixed(2)}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              {remaining >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
            remaining >= 0 ? 'bg-success/10' : 'bg-destructive/10'
          }`}>
            <TrendingDown className={`h-6 w-6 ${remaining >= 0 ? 'text-success' : 'text-destructive'}`} />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Savings Goal</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">₹{savings.toFixed(2)}</h3>
            <p className="text-xs text-success font-medium mt-2">+12.5% this month</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
        </div>
      </Card>
    </div>
  );
};
