import type { Transaction, Filters, Sorting, TrendDataPoint, CategoryDataPoint, MomChange } from '../types/index.ts';
import { getYearMonth } from './formatters.ts';

// Sum all income from a list of transactions
export const totalIncome = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

// Sum all expenses from a list of transactions
export const totalExpenses = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

// Net balance (income - expenses) across all transactions
export const netBalance = (transactions: Transaction[]): number =>
  totalIncome(transactions) - totalExpenses(transactions);

// Get transactions for a specific YYYY-MM month
export const forMonth = (transactions: Transaction[], yearMonth: string): Transaction[] =>
  transactions.filter((t) => getYearMonth(t.date) === yearMonth);

// Build last-N-months trend data for the area chart
export const buildTrendData = (transactions: Transaction[], monthsBack = 6): TrendDataPoint[] => {
  const monthsArr = [...new Set(transactions.map((t) => getYearMonth(t.date)))].sort();
  const latestYM = monthsArr[monthsArr.length - 1];
  
  // Use the latest data month as "now", default to system clock if empty
  let baseDate = new Date();
  if (latestYM) {
    const [y, m] = latestYM.split('-');
    baseDate = new Date(parseInt(y), parseInt(m) - 1, 1);
  }

  const months: TrendDataPoint[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth() - i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    const group = forMonth(transactions, ym);
    months.push({
      month: label,
      income: totalIncome(group),
      expenses: totalExpenses(group),
    });
  }

  return months;
};

// Build category breakdown data for the pie/donut chart
export const buildCategoryData = (transactions: Transaction[]): CategoryDataPoint[] => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const map: Record<string, number> = {};
  for (const t of expenses) {
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
};

// Highest spending category name and amount
export const highestSpendingCategory = (transactions: Transaction[]): CategoryDataPoint | null => {
  const data = buildCategoryData(transactions);
  return data.length > 0 ? data[0] : null;
};

// Month-over-month expense change (%)
export const momExpenseChange = (transactions: Transaction[]): MomChange => {
  const now = new Date();
  const currentYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevYM = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  // For mock data (data is in early 2025), use the latest two months in the data
  const months = [...new Set(transactions.map((t) => getYearMonth(t.date)))].sort();
  const cur = months[months.length - 1] || currentYM;
  const prev = months[months.length - 2] || prevYM;

  const curExp = totalExpenses(forMonth(transactions, cur));
  const prevExp = totalExpenses(forMonth(transactions, prev));

  if (prevExp === 0) return { change: 0, direction: 'flat', cur, prev };

  const change = ((curExp - prevExp) / prevExp) * 100;
  return {
    change: Math.abs(change),
    direction: change >= 0 ? 'up' : 'down',
    curAmount: curExp,
    prevAmount: prevExp,
  };
};

// Savings rate: (income - expenses) / income * 100
export const savingsRate = (transactions: Transaction[]): number => {
  const inc = totalIncome(transactions);
  const exp = totalExpenses(transactions);
  if (inc === 0) return 0;
  return Math.max(0, ((inc - exp) / inc) * 100);
};

// Largest single transaction
export const largestTransaction = (transactions: Transaction[]): Transaction | null =>
  transactions.length > 0
    ? transactions.reduce((max, t) => (t.amount > max.amount ? t : max), transactions[0])
    : null;

// Average monthly spending
export const avgMonthlySpending = (transactions: Transaction[]): number => {
  const months = [...new Set(transactions.map((t) => getYearMonth(t.date)))];
  if (months.length === 0) return 0;
  const exp = totalExpenses(transactions);
  return exp / months.length;
};

// Apply filters + sorting to transactions
export const applyFilters = (transactions: Transaction[], filters: Filters, sorting: Sorting): Transaction[] => {
  let result = [...transactions];

  // Search
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  // Type
  if (filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }

  // Categories
  if (filters.categories.length > 0) {
    result = result.filter((t) => filters.categories.includes(t.category));
  }

  // Date range
  if (filters.dateFrom) {
    result = result.filter((t) => t.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    result = result.filter((t) => t.date <= filters.dateTo);
  }

  // Sorting – fully deterministic to keep pagination stable
  result.sort((a, b) => {
    let valA: string | number;
    let valB: string | number;
    if (sorting.field === 'date') {
      valA = a.date;
      valB = b.date;
    } else if (sorting.field === 'amount') {
      valA = a.amount;
      valB = b.amount;
    } else {
      valA = a.category.toLowerCase();
      valB = b.category.toLowerCase();
    }

    // Primary comparison
    if (valA < valB) return sorting.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sorting.direction === 'asc' ? 1 : -1;

    // Secondary: when sorting by amount or category, break ties by date (newest first)
    if (sorting.field !== 'date') {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
    }

    // Tertiary: break remaining ties by id (numeric ascending) for full determinism
    return Number(a.id) - Number(b.id);
  });

  return result;
};
