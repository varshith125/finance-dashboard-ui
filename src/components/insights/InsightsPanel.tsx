import {
  Tag, TrendingDown, TrendingUp, PiggyBank, Zap, type LucideIcon,
} from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore.ts';
import { applyFilters } from '../../utils/calculations.ts';
import {
  highestSpendingCategory,
  momExpenseChange,
  savingsRate,
  avgMonthlySpending,
} from '../../utils/calculations.ts';
import { formatCurrency } from '../../utils/formatters.ts';

interface InsightCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  desc: string;
}

function InsightCard({ icon: Icon, iconBg, iconColor, label, value, desc }: InsightCardProps) {
  return (
    <div className="insight-card animate-slide-up">
      <div className="insight-icon" style={{ background: iconBg, color: iconColor }}>
        <Icon size={18} />
      </div>
      <div className="insight-label">{label}</div>
      <div className="insight-value" style={{ color: iconColor }}>{value}</div>
      <div className="insight-desc">{desc}</div>
    </div>
  );
}

export default function InsightsPanel() {
  const { transactions, filters, sorting } = useFinanceStore();
  // Insights work on all transactions (not filtered), but we show note if filters active
  const allTx = transactions;
  const filteredTx = applyFilters(transactions, filters, sorting);
  const hasFilters =
    filters.search || filters.type !== 'all' || filters.categories.length > 0 || filters.dateFrom || filters.dateTo;

  // Use filtered data so insights react to filters too
  const data = hasFilters ? filteredTx : allTx;

  if (data.length === 0) {
    return (
      <div>
        <div className="section-heading">Insights</div>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
          }}
        >
          <div className="empty-state">
            <div className="empty-state-icon">💡</div>
            <div className="empty-state-title">No data to analyze</div>
            <div className="empty-state-desc">Add transactions or clear your filters to see insights</div>
          </div>
        </div>
      </div>
    );
  }

  const topCat    = highestSpendingCategory(data);
  const mom       = momExpenseChange(data);
  const savings   = savingsRate(data);
  const avgSpend  = avgMonthlySpending(data);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="section-heading" style={{ marginBottom: 0 }}>Insights</div>
        {hasFilters && (
          <span
            style={{
              fontSize: 11,
              color: 'var(--accent-blue)',
              background: 'rgba(99,102,241,0.1)',
              borderRadius: 99,
              padding: '2px 10px',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            Based on filtered data
          </span>
        )}
      </div>

      <div className="insights-grid">
        {/* Top spending category */}
        <InsightCard
          icon={Tag}
          iconBg="rgba(244,63,94,0.12)"
          iconColor="var(--accent-red)"
          label="Top Spending Category"
          value={topCat ? topCat.name : '—'}
          desc={topCat ? `${formatCurrency(topCat.value)} total spent` : 'No expense data'}
        />

        {/* MoM expense change */}
        <InsightCard
          icon={mom.direction === 'up' ? TrendingUp : TrendingDown}
          iconBg={mom.direction === 'up' ? 'rgba(244,63,94,0.12)' : 'rgba(34,211,168,0.12)'}
          iconColor={mom.direction === 'up' ? 'var(--accent-red)' : 'var(--accent-green)'}
          label="Month-over-Month Expenses"
          value={`${mom.direction === 'up' ? '▲' : '▼'} ${mom.change?.toFixed(1) ?? 0}%`}
          desc={`${formatCurrency(mom.prevAmount ?? 0)} → ${formatCurrency(mom.curAmount ?? 0)}`}
        />

        {/* Savings rate */}
        <InsightCard
          icon={PiggyBank}
          iconBg="rgba(99,102,241,0.12)"
          iconColor="var(--accent-blue)"
          label="Savings Rate"
          value={`${savings.toFixed(1)}%`}
          desc="Of total income saved"
        />

        {/* Avg monthly spending */}
        <InsightCard
          icon={Zap}
          iconBg="rgba(245,158,11,0.12)"
          iconColor="var(--accent-amber)"
          label="Avg Monthly Spending"
          value={formatCurrency(avgSpend)}
          desc="Average across all months"
        />
      </div>
    </div>
  );
}
