import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { buildCategoryData } from '../../utils/calculations.ts';
import { CATEGORY_COLORS } from '../../data/mockData.ts';
import { formatCurrency } from '../../utils/formatters.ts';
import type { Transaction, Category } from '../../types/index.ts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="label">{name}</div>
      <div className="item">
        <span className="dot" style={{ background: CATEGORY_COLORS[name as Category] || '#8b92b3' }} />
        {formatCurrency(value)}
      </div>
    </div>
  );
}

interface CategoryChartProps {
  transactions: Transaction[];
}

export default function CategoryChart({ transactions }: CategoryChartProps) {
  const data = buildCategoryData(transactions);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <div className="chart-title">Spending by Category</div>
          <div className="chart-subtitle">Expense breakdown</div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty">No expense data</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name as Category] || '#8b92b3'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)', paddingTop: 4 }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
