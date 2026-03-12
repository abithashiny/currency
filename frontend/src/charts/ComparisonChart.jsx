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
} from 'chart.js';
import { getComparison } from '../services/api';
import Card from '../components/Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CURRENCY_COLORS = {
  USD: { border: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
  EUR: { border: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
  GBP: { border: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  JPY: { border: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
};

const ranges = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '12m', label: '12 Months' },
];

const ComparisonChart = () => {
  const [range, setRange] = useState('7d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await getComparison('INR', range);
        setData(res);
      } catch (err) {
        console.error('Comparison error:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, [range]);

  const chartData = data
    ? {
        labels: data.labels,
        datasets: Object.keys(CURRENCY_COLORS).map((cur) => ({
          label: `${cur} → INR`,
          data: data[cur] || [],
          borderColor: CURRENCY_COLORS[cur].border,
          backgroundColor: CURRENCY_COLORS[cur].bg,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 6,
          borderWidth: 2.5,
        })),
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#94a3b8',
          font: { size: 11, weight: '500' },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30,30,50,0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(4)}`,
        },
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
      title="Currency Comparison"
      subtitle="Compare USD, EUR, GBP, JPY against INR"
      icon={<span className="text-xl">📊</span>}
    >
      {/* Range Picker */}
      <div className="flex gap-2 mb-5">
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

      {/* Chart */}
      <div className="h-72">
        {loading || !chartData ? (
          <div className="w-full h-full bg-primary/5 rounded-xl animate-pulse flex items-center justify-center">
            <span className="text-text/30 dark:text-text-dark/30">Loading chart...</span>
          </div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </Card>
  );
};

export default ComparisonChart;
