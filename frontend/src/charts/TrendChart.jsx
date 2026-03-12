import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { getTrends } from '../services/api';
import Card from '../components/Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const pairs = [
  { from: 'USD', to: 'INR', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { from: 'EUR', to: 'INR', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { from: 'GBP', to: 'INR', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { from: 'JPY', to: 'INR', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
];

const ranges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '12m', label: 'Last 12 Months' },
];

const TrendChart = () => {
  const [range, setRange] = useState('7d');
  const [chartsData, setChartsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const results = {};
      await Promise.all(
        pairs.map(async (pair) => {
          try {
            const { data } = await getTrends(pair.from, pair.to, range);
            results[`${pair.from}_${pair.to}`] = data;
          } catch (err) {
            console.error(`Trend fetch error for ${pair.from}/${pair.to}:`, err);
          }
        })
      );
      setChartsData(results);
      setLoading(false);
    };
    fetchAll();
  }, [range]);

  const buildChartData = (pair) => {
    const key = `${pair.from}_${pair.to}`;
    const trend = chartsData[key];
    if (!trend) return null;

    return {
      labels: trend.labels,
      datasets: [
        {
          label: `${pair.from} → ${pair.to}`,
          data: trend.values,
          borderColor: pair.color,
          backgroundColor: pair.bg,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: pair.color,
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(30,30,50,0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(148,163,184,0.1)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
    },
  };

  return (
    <Card
      title="Currency Trends"
      subtitle="Historical exchange rate charts"
      icon={<span className="text-xl">📈</span>}
    >
      {/* Range Selector */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {ranges.map((r) => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              range === r.value
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-bg dark:bg-bg-dark text-text/60 dark:text-text-dark/60 hover:bg-primary/10'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pairs.map((pair) => {
          const data = buildChartData(pair);
          return (
            <div
              key={`${pair.from}_${pair.to}`}
              className="p-4 rounded-xl bg-bg/30 dark:bg-bg-dark/30 border border-border/30 dark:border-border-dark/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pair.color }} />
                <span className="text-sm font-semibold text-text dark:text-text-dark">
                  {pair.from} → {pair.to}
                </span>
              </div>
              <div className="h-44">
                {loading || !data ? (
                  <div className="w-full h-full bg-primary/5 rounded-lg animate-pulse flex items-center justify-center">
                    <span className="text-text/30 dark:text-text-dark/30 text-sm">Loading...</span>
                  </div>
                ) : (
                  <Line data={data} options={chartOptions} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TrendChart;
