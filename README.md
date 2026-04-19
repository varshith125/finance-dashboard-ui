# FinTrack — Personal Finance Dashboard

> A clean, interactive finance dashboard to track income, expenses, and spending patterns — built with React + TypeScript as part of a frontend evaluation project.

![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat&logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-3-22b5bf?style=flat)
![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat&logo=tailwindcss)

---

##  About the Project

I built FinTrack for my frontend evaluation assignment. As a fresher, my goal was to demonstrate my understanding of React, TypeScript, component architecture, and state management while building an interface that looks clean and feels interactive.

The project is fully written in **TypeScript with strict mode** enabled, providing complete type safety across the entire codebase — from the Zustand store to every component prop interface.

---

##  Live Demo

> Run it locally in under a minute:

```bash
git clone https://github.com/varshith125/finance-dashboard-ui.git
cd finance-dashboard-ui
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠 Tech Stack

| Technology | Version | Why I chose it |
|---|---|---|
| **React** | 19 | Component model is ideal for data-driven dashboards |
| **TypeScript** | 5 (strict) | Compile-time type safety, better IDE support, and self-documenting code |
| **Vite** | 8 | Starts in ~300ms, excellent HMR for fast iteration |
| **Zustand** | 5 | Lightweight global state without Redux boilerplate, fully typed with generics |
| **Recharts** | 3 | React-native chart library, composable with JSX |
| **Lucide React** | latest | Clean, consistent icon set with tree-shakeable imports |
| **Tailwind CSS** | 4 | Utility-first styling with Vite plugin integration |
| **Google Fonts** | — | Inter — modern, readable, and professional |

---

## TypeScript Architecture

The project uses a **centralized type system** with strict TypeScript configuration:

### Type Definitions (`src/types/index.ts`)

```typescript
// Union types for type-safe literals
type TransactionType = 'income' | 'expense'
type Category = 'Food' | 'Transport' | 'Entertainment' | ... | 'Other'
type Role = 'viewer' | 'admin'
type SortField = 'date' | 'amount' | 'category'
type PageId = 'dashboard' | 'transactions' | 'insights'

// Core data interface
interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

// Fully typed Zustand store
interface FinanceState {
  transactions: Transaction[];
  filters: Filters;
  sorting: Sorting;
  // ... all actions with typed signatures
}
```

### Type Safety Highlights
- **Zustand store** typed with `create<FinanceState>()` generic — every action and state field is type-checked
- **Component props** use explicit interfaces (`SidebarProps`, `HeaderProps`, `SummaryCardProps`, etc.)
- **Utility functions** have full parameter and return type annotations
- **No `any` types** anywhere in the codebase
- **Strict mode** enabled — `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

---

##  Features

### Dashboard Overview
- **Three summary cards** — Total Balance, Monthly Income, Monthly Expenses
- Each card shows a **month-over-month change indicator** (e.g., ▲ 12.5% vs last month)
- **Area chart** — Income vs Expenses trend across the last 6 months (Recharts)
- **Donut chart** — Spending breakdown by category with color coding

### Transactions
- Full transaction table with **Date, Description, Category, Type, Amount**
- **Real-time search** — filters by description or category as you type
- **Type filter** — toggle between All / Income / Expense
- **Date range filter** — From and To date inputs
- **Category multi-select** — pick one or multiple categories to filter
- **Sorting** — click Date, Amount, or Category to sort; click again to reverse
- **Pagination** — 10 rows per page with smart page controls
- **Result count** — shows "X results" dynamically as filters change

### Role-Based UI
- **Role switcher** in the header — switch between Viewer and Admin
- **Viewer mode** — read-only, no action buttons visible
- **Admin mode** — "Add Transaction" button appears, edit ✏️ and delete 🗑️ per row
- **Role badge** — clear visual indicator of current mode in the header
- Switching roles updates the entire UI instantly, no page reload

### Insights
- **Top spending category** — shows which category you spend the most on
- **Month-over-month comparison** — shows whether spending went up or down vs last month
- **Savings rate** — what percentage of your income you are saving
- **Average monthly spending** — your typical expense level across all months
- Insights **react to filters** — apply a category filter and insights update to reflect it
- **Category breakdown table** with percentage progress bars on the Insights page

### UX Details I'm Proud Of
- Insights show a **"Based on filtered data"** badge when filters are active so users know what they're looking at
- Empty states on every chart, table, and insight section — nothing ever breaks or shows blank space
- Category **color dots** in the transaction table matching the donut chart colors
- **Income shows green, expenses show red** consistently throughout the app
- Form validation in the Add/Edit modal with inline error messages

### Extras
- **Dark / Light mode** toggle in the header, persisted across refreshes
- **CSV export** — downloads the currently filtered transactions as a spreadsheet
- **LocalStorage persistence** — role and theme preference survive a page refresh
- **Responsive layout** — sidebar collapses into a drawer on mobile, charts and grids stack cleanly on smaller screens

---

##  Project Structure

```
src/
│
├── types/
│   └── index.ts                 # Centralized type definitions (10 types, 9 interfaces)
│
├── data/
│   └── mockData.ts              # 35+ typed mock transactions (Jan–Mar), category colors
│
├── utils/
│   ├── formatters.ts            # formatCurrency, formatDate, getYearMonth (fully typed)
│   └── calculations.ts          # Pure typed functions — filtering, chart data, insights
│
├── store/
│   └── useFinanceStore.ts       # Zustand store with FinanceState generic
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Navigation, mobile drawer (SidebarProps)
│   │   └── Header.tsx           # Role switcher, badge, dark mode, export (HeaderProps)
│   │
│   ├── dashboard/
│   │   ├── SummaryCards.tsx     # Balance, Income, Expenses cards (SummaryCardProps)
│   │   ├── TrendChart.tsx       # Recharts AreaChart — 6-month trend (TrendChartProps)
│   │   └── CategoryChart.tsx   # Recharts PieChart — donut (CategoryChartProps)
│   │
│   ├── transactions/
│   │   ├── TransactionFilters.tsx  # All filter controls with typed handlers
│   │   ├── TransactionTable.tsx    # Table, sorting, pagination, CRUD
│   │   └── AddEditModal.tsx        # Add/Edit form with typed FormData & validation
│   │
│   ├── insights/
│   │   └── InsightsPanel.tsx    # 4 insight cards (InsightCardProps)
│   │
│   └── pages/
│       ├── DashboardPage.tsx    # Composes Dashboard view
│       ├── TransactionsPage.tsx # Composes Transactions view
│       └── InsightsPage.tsx     # Insights + category breakdown table
│
├── App.tsx                      # Page routing, dark mode class, sidebar state
├── main.tsx                     # React entry point
├── vite-env.d.ts                # Vite client type declarations
└── index.css                    # Complete CSS design system
```

---

##  Architecture Decisions

### Why TypeScript with Strict Mode?

TypeScript catches bugs at compile time that would otherwise surface as runtime errors. With strict mode enabled, every function parameter, return value, and variable is type-checked. This made refactoring fearless and the codebase self-documenting — hovering over any function or component prop immediately shows its type contract.

### Why Zustand over Context or Redux?

Redux felt like overkill for a project of this scope, and Context API can sometimes cause unnecessary re-renders when state changes. Zustand was easy to learn, requires very little boilerplate, and with TypeScript's `create<FinanceState>()` generic, the entire store is fully type-safe.

### Why pure functions for data logic?

I learned that keeping business logic—like filtering, sorting, and math—outside of React components makes the code much easier to read and test. By placing this logic in `calculations.ts`, the store stays lean, and the components just render the data they are given. TypeScript's function signatures serve as built-in documentation.

### Why hand-written CSS + Tailwind?

The project uses a combination of Tailwind CSS utilities and a custom CSS design system with CSS custom properties (variables). This gives the flexibility of utility classes while maintaining full control over the design tokens (colors, spacing, typography).

---

##  State Flow

```
useFinanceStore (Zustand — typed with FinanceState)
│
├── transactions: Transaction[]   ← Source of truth for all data
├── filters: Filters              ← search, type, categories, dateFrom, dateTo
├── sorting: Sorting              ← field, direction
├── role: Role                    ← 'viewer' | 'admin'
└── darkMode: boolean

     ↓ computed at render time by calculations.ts

applyFilters(transactions, filters, sorting): Transaction[]
   → filtered[]  →  TransactionTable, InsightsPanel, InsightsPage

buildTrendData(transactions): TrendDataPoint[]
   → months[]    →  TrendChart

buildCategoryData(transactions): CategoryDataPoint[]
   → categories[]  →  CategoryChart, InsightsPage
```

Every time a filter changes or a transaction is added/edited/deleted, every component that reads from the store re-renders automatically with fresh derived data.

---

##  Available Scripts

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Type-check + production build (tsc -b && vite build)
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type-checking without emitting
npm run lint         # Run ESLint across .ts/.tsx/.js/.jsx files
```

---

##  Design Decisions

- **Dark mode by default** — finance dashboards typically look better in dark mode; data and numbers are easier to scan against a dark background
- **Frosted Glass Effects** — all cards and modals use a sleek glass effect (`backdrop-filter`) with subtle borders
- **Soft Background Glows** — the application background features subtle color-matched radial gradients to add depth
- **Color language** — green always means income/positive, red always means expense/negative, purple/indigo for neutral/primary — consistent throughout every card, chart, badge, and table row
- **Accent bar on summary cards** — a 3px colored top border per card type (indigo for balance, green for income, red for expenses) gives instant visual hierarchy
- **Category color dots in the table** — same colors as the donut chart so users can cross-reference at a glance
- **Inter typeface** — clean and highly legible font that I found works really well for dashboards

---

##  Mock Data

35 transactions spanning **January to March 2025** across 10 categories:

`Food` · `Transport` · `Entertainment` · `Utilities` · `Health` · `Shopping` · `Investment` · `Salary` · `Freelance` · `Other`

Data includes a realistic mix of monthly salaries, freelance income, and daily expenses so all charts and insights render with meaningful values out of the box.

---

##  What I Would Add Next

Given more time, here is what I would build on top of this:

1. **Budget planning** — Set monthly limits per category, show progress bars against them on the dashboard
2. **Real API integration** — The store's `addTransaction`, `editTransaction`, `deleteTransaction` actions are already structured for a clean swap to API calls
3. **Authentication** — The role system is already built; connecting it to a login flow (e.g., JWT claims setting the role) would take minimal changes
4. **Unit tests** — `calculations.ts` is pure functions with no side effects — ideal for Vitest unit tests with zero mocking needed
5. **Recurring transactions** — Flag a transaction as recurring and auto-generate it monthly
6. **Notifications** — Alert when a category exceeds its budget limit

---

##  About

Built by venkata varshith as part of a frontend evaluation project.  
Feel free to reach out: [varshith6066@gmail.com] · [www.linkedin.com/in/venkata-varshith-82b2542a5] · [https://github.com/varshith125/finance-dashboard-ui.git]

---

##  License

MIT — use it, learn from it, build on it.
