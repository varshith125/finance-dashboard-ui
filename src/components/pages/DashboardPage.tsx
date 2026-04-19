import useFinanceStore from '../../store/useFinanceStore.ts';
import SummaryCards from '../dashboard/SummaryCards.tsx';
import TrendChart from '../dashboard/TrendChart.tsx';
import CategoryChart from '../dashboard/CategoryChart.tsx';
import InsightsPanel from '../insights/InsightsPanel.tsx';

export default function DashboardPage() {
  const { transactions } = useFinanceStore();

  return (
    <div>
      {/* Summary cards */}
      <SummaryCards transactions={transactions} />

      {/* Charts */}
      <div className="section-heading">Trends</div>
      <div className="charts-grid">
        <TrendChart transactions={transactions} />
        <CategoryChart transactions={transactions} />
      </div>

      {/* Insights */}
      <InsightsPanel />
    </div>
  );
}
