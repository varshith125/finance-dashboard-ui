// ── Domain Types ─────────────────────────────────────────

export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Utilities'
  | 'Health'
  | 'Shopping'
  | 'Investment'
  | 'Salary'
  | 'Freelance'
  | 'Other';

export type Role = 'viewer' | 'admin';

export type SortField = 'date' | 'amount' | 'category';

export type SortDirection = 'asc' | 'desc';

export type FilterType = 'all' | 'income' | 'expense';

export type PageId = 'dashboard' | 'transactions' | 'insights';

// ── Data Interfaces ──────────────────────────────────────

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface Filters {
  search: string;
  type: FilterType;
  categories: Category[];
  dateFrom: string;
  dateTo: string;
}

export interface Sorting {
  field: SortField;
  direction: SortDirection;
}

// ── Chart Data ───────────────────────────────────────────

export interface TrendDataPoint {
  month: string;
  income: number;
  expenses: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
}

export interface MomChange {
  change: number;
  direction: 'up' | 'down' | 'flat';
  curAmount?: number;
  prevAmount?: number;
  cur?: string;
  prev?: string;
}

export interface MonthComparison {
  change: number | string;
  direction: 'up' | 'down' | 'flat';
}

// ── Store ────────────────────────────────────────────────

export interface FinanceState {
  // State
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
  filters: Filters;
  sorting: Sorting;

  // Actions
  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  setSorting: (field: SortField) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updatedFields: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}
