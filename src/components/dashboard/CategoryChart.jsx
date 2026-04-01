import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { buildCategoryData } from '../../utils/calculations';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="label">{name}</div>
      <div className="item">
        <span className="dot" style={{ background: CATEGORY_COLORS[name] || '#8b92b3' }} />
        {formatCurrency(value)}
      </div>
    </div>
  );
}

export default function CategoryChart({ transactions }) {
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
                  fill={CATEGORY_COLORS[entry.name] || '#8b92b3'}
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
