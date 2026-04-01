import InsightsPanel from '../insights/InsightsPanel';
import useFinanceStore from '../../store/useFinanceStore';
import { applyFilters, buildCategoryData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function InsightsPage() {
  const { transactions, filters, sorting } = useFinanceStore();
  const filtered = applyFilters(transactions, filters, sorting);
  const categoryData = buildCategoryData(filtered.length > 0 ? filtered : transactions);

  return (
    <div>
      {/* Main insight cards */}
      <InsightsPanel />

      {/* Category breakdown table */}
      <div className="section-heading" style={{ marginTop: 8 }}>Spending Breakdown</div>
      <div className="table-card animate-fade-in">
        <div className="table-header-bar">
          <span style={{ fontWeight: 600, fontSize: 14 }}>By Category</span>
        </div>

        {categoryData.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">No expense data</div>
            <div className="empty-state-desc">Add some expense transactions to see a breakdown</div>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Spent</th>
                  <th>Share</th>
                  <th style={{ width: '40%' }}>Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const total = categoryData.reduce((s, c) => s + c.value, 0);
                  return categoryData.map((cat) => {
                    const pct = total > 0 ? (cat.value / total) * 100 : 0;
                    const color = CATEGORY_COLORS[cat.name] || '#8b92b3';
                    return (
                      <tr key={cat.name}>
                        <td>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span
                              style={{
                                width: 10, height: 10,
                                borderRadius: '50%',
                                background: color,
                                flexShrink: 0,
                                display: 'inline-block',
                              }}
                            />
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cat.name}</span>
                          </span>
                        </td>
                        <td style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
                          {formatCurrency(cat.value)}
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                          {pct.toFixed(1)}%
                        </td>
                        <td>
                          <div
                            style={{
                              background: 'var(--bg-secondary)',
                              borderRadius: 99,
                              height: 6,
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: `${pct}%`,
                                height: '100%',
                                background: color,
                                borderRadius: 99,
                                transition: 'width 0.5s ease',
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
