import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Coffee, Bus, BookOpen, Film, MoreHorizontal } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return <Coffee className="h-4 w-4" />;
    case 'transport':
      return <Bus className="h-4 w-4" />;
    case 'books':
      return <BookOpen className="h-4 w-4" />;
    case 'entertainment':
      return <Film className="h-4 w-4" />;
    case 'shopping':
      return <ShoppingBag className="h-4 w-4" />;
    default:
      return <MoreHorizontal className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return 'bg-primary/10 text-primary';
    case 'transport':
      return 'bg-accent/10 text-accent';
    case 'books':
      return 'bg-warning/10 text-warning';
    case 'entertainment':
      return 'bg-primary/20 text-primary';
    case 'shopping':
      return 'bg-success/10 text-success';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getCategoryColor(transaction.category)}`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-foreground">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{transaction.date}</span>
                </div>
              </div>
            </div>
            <span className="font-semibold text-foreground">₹{transaction.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
