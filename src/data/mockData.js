// 35 mock transactions spanning Jan–Mar 2025
// Categories: Food, Transport, Salary, Entertainment, Utilities, Health, Freelance, Shopping, Investment

let idCounter = 1;

const t = (date, amount, category, type, description) => ({
  id: String(idCounter++),
  date,
  amount,
  category,
  type, // 'income' | 'expense'
  description,
});

export const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Health',
  'Shopping',
  'Investment',
  'Salary',
  'Freelance',
  'Other',
];

export const CATEGORY_COLORS = {
  Food:          '#6366f1',
  Transport:     '#22d3a8',
  Entertainment: '#f59e0b',
  Utilities:     '#06b6d4',
  Health:        '#a855f7',
  Shopping:      '#f43f5e',
  Investment:    '#10b981',
  Salary:        '#3b82f6',
  Freelance:     '#ec4899',
  Other:         '#8b92b3',
};

const mockTransactions = [
  // ── January 2025 ─────────────────────────────────────
  t('2025-01-02', 4500, 'Salary',        'income',  'Monthly salary - January'),
  t('2025-01-03', 850,  'Freelance',     'income',  'Web design project'),
  t('2025-01-05', 120,  'Food',          'expense', 'Grocery shopping'),
  t('2025-01-07', 45,   'Transport',     'expense', 'Uber rides'),
  t('2025-01-10', 200,  'Shopping',      'expense', 'Winter clothing'),
  t('2025-01-12', 60,   'Entertainment', 'expense', 'Netflix + Spotify'),
  t('2025-01-14', 90,   'Utilities',     'expense', 'Electricity bill'),
  t('2025-01-15', 35,   'Food',          'expense', 'Restaurant dinner'),
  t('2025-01-18', 150,  'Health',        'expense', 'Gym membership'),
  t('2025-01-20', 500,  'Investment',    'expense', 'Stock purchase'),
  t('2025-01-22', 75,   'Food',          'expense', 'Weekly groceries'),
  t('2025-01-25', 300,  'Freelance',     'income',  'Logo design gig'),
  t('2025-01-28', 55,   'Transport',     'expense', 'Monthly bus pass'),
  t('2025-01-30', 40,   'Other',         'expense', 'Stationery & supplies'),

  // ── February 2025 ────────────────────────────────────
  t('2025-02-01', 4500, 'Salary',        'income',  'Monthly salary - February'),
  t('2025-02-03', 130,  'Food',          'expense', 'Grocery + vegetables'),
  t('2025-02-05', 80,   'Entertainment', 'expense', 'Movie night out'),
  t('2025-02-07', 95,   'Utilities',     'expense', 'Water + internet bill'),
  t('2025-02-09', 1200, 'Freelance',     'income',  'Full website build'),
  t('2025-02-10', 350,  'Shopping',      'expense', 'Shoes & accessories'),
  t('2025-02-12', 65,   'Transport',     'expense', 'Cab + fuel'),
  t('2025-02-14', 90,   'Food',          'expense', 'Valentine dinner'),
  t('2025-02-17', 200,  'Health',        'expense', 'Doctor visit + meds'),
  t('2025-02-20', 500,  'Investment',    'expense', 'Mutual fund SIP'),
  t('2025-02-22', 70,   'Food',          'expense', 'Weekly groceries'),
  t('2025-02-25', 110,  'Entertainment', 'expense', 'Concert tickets'),
  t('2025-02-27', 45,   'Other',         'expense', 'Home supplies'),

  // ── March 2025 ───────────────────────────────────────
  t('2025-03-01', 4500, 'Salary',        'income',  'Monthly salary - March'),
  t('2025-03-02', 600,  'Freelance',     'income',  'SEO consulting'),
  t('2025-03-04', 145,  'Food',          'expense', 'Grocery shopping'),
  t('2025-03-06', 55,   'Transport',     'expense', 'Fuel refill'),
  t('2025-03-08', 280,  'Shopping',      'expense', 'Tech accessories'),
  t('2025-03-10', 70,   'Utilities',     'expense', 'Electricity bill'),
  t('2025-03-12', 85,   'Entertainment', 'expense', 'Streaming subscriptions'),
  t('2025-03-15', 120,  'Health',        'expense', 'Gym + supplements'),
  t('2025-03-18', 750,  'Investment',    'expense', 'ETF purchase'),
  t('2025-03-20', 80,   'Food',          'expense', 'Dining out'),
  t('2025-03-22', 400,  'Freelance',     'income',  'App UI design'),
  t('2025-03-25', 65,   'Food',          'expense', 'Weekly groceries'),
  t('2025-03-28', 50,   'Transport',     'expense', 'Taxi rides'),
  t('2025-03-30', 30,   'Other',         'expense', 'Miscellaneous'),
];

export default mockTransactions;
