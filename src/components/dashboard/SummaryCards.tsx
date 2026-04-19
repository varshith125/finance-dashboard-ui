import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.ts';
import {
  totalIncome,
  totalExpenses,
  netBalance,
  forMonth,
} from '../../utils/calculations.ts';
import { getYearMonth } from '../../utils/formatters.ts';
import type { Transaction, MonthComparison } from '../../types/index.ts';

function getMonthComparison(transactions: Transaction[], type: 'income' | 'expense'): MonthComparison {
  const months = [...new Set(transactions.map((t) => getYearMonth(t.date)))].sort();
  const cur = months[months.length - 1];
  const prev = months[months.length - 2];

  const fn = type === 'income' ? totalIncome : totalExpenses;

  if (!cur || !prev) return { change: 0, direction: 'flat' };

  const curVal = fn(forMonth(transactions, cur));
  const prevVal = fn(forMonth(transactions, prev));

  if (prevVal === 0) return { change: 0, direction: 'flat' };

  const pct = ((curVal - prevVal) / prevVal) * 100;
  return { change: Math.abs(pct).toFixed(1), direction: pct >= 0 ? 'up' : 'down' };
}

interface SummaryCardProps {
  variant: 'balance' | 'income' | 'expense';
  label: string;
  value: number;
  change?: number | string;
  direction?: 'up' | 'down' | 'flat';
  icon: LucideIcon;
}

function SummaryCard({ variant, label, value, change, direction, icon: Icon }: SummaryCardProps) {
  const isUp = direction === 'up';
  const ChangeIcon = isUp ? ArrowUpRight : ArrowDownRight;
  // For expenses, "up" is bad; for income/balance, "up" is good
  const positiveForVariant = variant !== 'expense';
  const isPositive = positiveForVariant ? isUp : !isUp;

  return (
    <div className={`summary-card ${variant} animate-slide-up`}>
      <div className="summary-card-icon">
        <Icon size={20} />
      </div>
      <div className="summary-label">{label}</div>
      <div className="summary-value">{formatCurrency(value)}</div>
      {change !== undefined && (
        <div className={`summary-change ${isPositive ? 'up' : 'down'}`}>
          <ChangeIcon size={13} />
          {change}% vs last month
        </div>
      )}
    </div>
  );
}

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const months = [...new Set(transactions.map((t) => getYearMonth(t.date)))].sort();
  const curMonth = months[months.length - 1];

  const curMonthTx = curMonth ? forMonth(transactions, curMonth) : [];
  const curIncome = totalIncome(curMonthTx);
  const curExpenses = totalExpenses(curMonthTx);
  const balance = netBalance(transactions);

  const incomeComparison = getMonthComparison(transactions, 'income');
  const expenseComparison = getMonthComparison(transactions, 'expense');

  return (
    <div className="summary-grid">
      <SummaryCard
        variant="balance"
        label="Total Balance"
        value={balance}
        icon={Wallet}
      />
      <SummaryCard
        variant="income"
        label="This Month Income"
        value={curIncome}
        change={incomeComparison.change}
        direction={incomeComparison.direction}
        icon={TrendingUp}
      />
      <SummaryCard
        variant="expense"
        label="This Month Expenses"
        value={curExpenses}
        change={expenseComparison.change}
        direction={expenseComparison.direction}
        icon={TrendingDown}
      />
    </div>
  );
}
