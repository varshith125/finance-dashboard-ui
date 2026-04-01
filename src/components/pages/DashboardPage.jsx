import useFinanceStore from '../../store/useFinanceStore';
import SummaryCards from '../dashboard/SummaryCards';
import TrendChart from '../dashboard/TrendChart';
import CategoryChart from '../dashboard/CategoryChart';
import InsightsPanel from '../insights/InsightsPanel';

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
