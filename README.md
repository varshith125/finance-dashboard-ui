# FinTrack — Personal Finance Dashboard

> A clean, interactive finance dashboard to track income, expenses, and spending patterns — built as part of a frontend evaluation project.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-2-22b5bf?style=flat)
![Zustand](https://img.shields.io/badge/Zustand-4-orange?style=flat)
![CSS](https://img.shields.io/badge/Styling-Vanilla%20CSS-blue?style=flat)

---

##  About the Project

I built FinTrack for my frontend evaluation assignment. As a fresher, my goal was to demonstrate my understanding of React, component structure, and state management while building an interface that looks clean and feels interactive.

I wanted to challenge myself to write clean code without relying heavily on massive libraries. For example, instead of using a UI component library (like MUI or Bootstrap), I built the styling from scratch using Vanilla CSS to showcase my fundamental CSS skills.

---

##  Live Demo

> Run it locally in under a minute:

```bash
git clone <your-repo-url>
cd fintrack
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠 Tech Stack

| Technology | Version | Why I chose it |
|---|---|---|
| **React** | 18 | Component model is ideal for data-driven dashboards |
| **Vite** | 5 | Starts in ~500ms, excellent HMR for fast iteration |
| **Zustand** | 4 | Lightweight global state without Redux boilerplate |
| **Recharts** | 2 | React-native chart library, composable with JSX |
| **Lucide React** | latest | Clean, consistent icon set with tree-shakeable imports |
| **Vanilla CSS** | — | Full control over design system without framework overhead |
| **Google Fonts** | — | Inter — modern, readable, and professional |

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
├── data/
│   └── mockData.js              # 35+ mock transactions (Jan–Mar), category colors
│
├── utils/
│   ├── formatters.js            # formatCurrency, formatDate, getYearMonth
│   └── calculations.js         # Pure functions — filtering, chart data, insights
│
├── store/
│   └── useFinanceStore.js       # Zustand store — single source of truth
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Navigation, mobile drawer
│   │   └── Header.jsx           # Role switcher, badge, dark mode, export
│   │
│   ├── dashboard/
│   │   ├── SummaryCards.jsx     # Balance, Income, Expenses cards
│   │   ├── TrendChart.jsx       # Recharts AreaChart (6-month trend)
│   │   └── CategoryChart.jsx   # Recharts PieChart (donut)
│   │
│   ├── transactions/
│   │   ├── TransactionFilters.jsx  # All filter controls
│   │   ├── TransactionTable.jsx    # Table, sorting, pagination, CRUD
│   │   └── AddEditModal.jsx        # Add/Edit form with validation
│   │
│   ├── insights/
│   │   └── InsightsPanel.jsx    # 4 insight cards
│   │
│   └── pages/
│       ├── DashboardPage.jsx    # Composes Dashboard view
│       ├── TransactionsPage.jsx # Composes Transactions view
│       └── InsightsPage.jsx     # Insights + category breakdown table
│
├── App.jsx                      # Page routing, dark mode class, sidebar state
├── main.jsx                     # React entry point
└── index.css                    # Complete CSS design system
```

---

##  Architecture Decisions

### Why Zustand over Context or Redux?

Redux felt like overkill for a project of this scope, and Context API can sometimes cause unnecessary re-renders when state changes. Zustand was easy to learn, requires very little boilerplate, and let me keep the state clean while easily adding localStorage persistence.

### Why pure functions for data logic?

I learned that keeping business logic—like filtering, sorting, and math—outside of React components makes the code much easier to read and test. By placing this logic in `calculations.js`, the store stays lean, and the components just render the data they are given.

### Why hand-written CSS?

While tools like Tailwind or Material UI are great, I wanted to show my fundamental CSS skills. Building the design system from scratch using CSS custom properties (variables), flexbox, and grid helped me deepen my understanding of how modern layouts and responsive breakpoints work under the hood.

---

##  State Flow

```
useFinanceStore (Zustand)
│
├── transactions[]     ← Source of truth for all data
├── filters {}         ← search, type, categories, dateFrom, dateTo
├── sorting {}         ← field, direction
├── role               ← 'viewer' | 'admin'
└── darkMode           ← boolean

     ↓ computed at render time by calculations.js

applyFilters(transactions, filters, sorting)
   → filtered[]  →  TransactionTable, InsightsPanel, InsightsPage

buildTrendData(transactions)
   → months[]    →  TrendChart

buildCategoryData(transactions)
   → categories[]  →  CategoryChart, InsightsPage
```

Every time a filter changes or a transaction is added/edited/deleted, every component that reads from the store re-renders automatically with fresh derived data.

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
4. **Unit tests** — `calculations.js` is pure functions with no side effects — ideal for Vitest unit tests with zero mocking needed
5. **Recurring transactions** — Flag a transaction as recurring and auto-generate it monthly
6. **Notifications** — Alert when a category exceeds its budget limit

---

##  About

Built by venkata varshith as part of a frontend evaluation project.  
Feel free to reach out: [varshith6066@gmail.com] · [www.linkedin.com/in/venkata-varshith-82b2542a5] · [https://github.com/varshith125/finance-dashboard-ui.git]

---

##  License

MIT — use it, learn from it, build on it.
