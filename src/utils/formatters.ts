// Format a number as currency (USD)
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

// Format a date string to readable format
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// e.g. "2025-01-15" → "Jan 2025"
export const formatMonthYear = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Get YYYY-MM from a date string
export const getYearMonth = (dateStr: string): string => dateStr.slice(0, 7);

// Clamp a percentage change display
export const formatChange = (val: number): string => {
  const symbol = val >= 0 ? '+' : '';
  return `${symbol}${val.toFixed(1)}%`;
};
