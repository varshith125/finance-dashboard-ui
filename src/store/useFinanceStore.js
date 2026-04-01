import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import mockTransactions from '../data/mockData';

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // ── State ───────────────────────────────────────────
      transactions: mockTransactions,
      role: 'viewer', // 'viewer' | 'admin'
      darkMode: true,

      filters: {
        search: '',
        type: 'all',       // 'all' | 'income' | 'expense'
        categories: [],    // [] means no category filter
        dateFrom: '',
        dateTo: '',
      },

      sorting: {
        field: 'date',     // 'date' | 'amount' | 'category'
        direction: 'desc', // 'asc' | 'desc'
      },

      // ── Role ────────────────────────────────────────────
      setRole: (role) => set({ role }),

      // ── Dark mode ───────────────────────────────────────
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      // ── Filters ─────────────────────────────────────────
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),

      resetFilters: () =>
        set({
          filters: { search: '', type: 'all', categories: [], dateFrom: '', dateTo: '' },
        }),

      // ── Sorting ─────────────────────────────────────────
      setSorting: (field) =>
        set((s) => ({
          sorting: {
            field,
            direction:
              s.sorting.field === field && s.sorting.direction === 'desc' ? 'asc' : 'desc',
          },
        })),

      // ── CRUD ────────────────────────────────────────────
      addTransaction: (transaction) =>
        set((s) => ({
          transactions: [
            { ...transaction, id: String(Date.now()) },
            ...s.transactions,
          ],
        })),

      editTransaction: (id, updatedFields) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedFields } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'finance-dashboard-state',
      // Only persist role and dark mode preference; transactions reset to mock on reload
      partializes: (state) => ({
        role: state.role,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useFinanceStore;
