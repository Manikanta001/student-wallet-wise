import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CATEGORY_COLORS = {
  Food: "hsl(var(--primary))",
  Transport: "hsl(var(--accent))",
  Books: "hsl(var(--warning))",
  Entertainment: "hsl(217 91% 70%)",
  Shopping: "hsl(160 60% 55%)",
  Other: "hsl(var(--muted-foreground))",
};

interface ExpenseData {
  category: string;
  amount: number;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  const pieData = data.map(item => ({
    name: item.category,
    value: item.amount,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="category" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS] || "hsl(var(--primary))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="hsl(var(--primary))"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS] || "hsl(var(--primary))"}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
