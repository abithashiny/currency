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
import { getPrediction } from '../services/api';
import Card from './Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PredictionPanel = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');

  const pairs = [
    { from: 'USD', to: 'INR' },
    { from: 'EUR', to: 'INR' },
    { from: 'GBP', to: 'INR' },
    { from: 'JPY', to: 'INR' },
  ];

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const { data } = await getPrediction(from, to, 7);
        setPrediction(data);
      } catch (err) {
        console.error('Prediction error:', err);
      }
      setLoading(false);
    };
    fetchPrediction();
  }, [from, to]);

  const chartData = prediction
    ? {
        labels: prediction.labels,
        datasets: [
          {
            label: `Predicted ${from}→${to}`,
            data: prediction.predictions,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            borderWidth: 2.5,
            borderDash: [6, 3],
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(30,30,50,0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        callbacks: {
          afterLabel: (ctx) => {
            const conf = prediction?.confidence?.[ctx.dataIndex];
            return conf ? `Confidence: ${conf}%` : '';
          },
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

  const avgConfidence = prediction?.confidence
    ? (prediction.confidence.reduce((a, b) => a + b, 0) / prediction.confidence.length).toFixed(1)
    : 0;

  const trendDirection = prediction?.predictions
    ? prediction.predictions[prediction.predictions.length - 1] > prediction.predictions[0]
      ? 'up'
      : 'down'
    : null;

  return (
    <Card
      title="AI Prediction"
      subtitle="7-day exchange rate forecast"
      icon={<span className="text-xl">🔮</span>}
    >
      {/* Pair Selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {pairs.map((p) => (
          <button
            key={`${p.from}${p.to}`}
            onClick={() => { setFrom(p.from); setTo(p.to); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              from === p.from && to === p.to
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-bg dark:bg-bg-dark text-text/60 dark:text-text-dark/60 hover:bg-primary/10'
            }`}
          >
            {p.from}→{p.to}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      {prediction && !loading && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-bg/50 dark:bg-bg-dark/50 text-center">
            <p className="text-[10px] text-text/50 dark:text-text-dark/50 uppercase tracking-wider">Current</p>
            <p className="text-lg font-bold text-text dark:text-text-dark">{prediction.currentRate}</p>
          </div>
          <div className="p-3 rounded-xl bg-bg/50 dark:bg-bg-dark/50 text-center">
            <p className="text-[10px] text-text/50 dark:text-text-dark/50 uppercase tracking-wider">Trend</p>
            <p className={`text-lg font-bold ${trendDirection === 'up' ? 'text-positive' : 'text-negative'}`}>
              {trendDirection === 'up' ? '📈 Up' : '📉 Down'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-bg/50 dark:bg-bg-dark/50 text-center">
            <p className="text-[10px] text-text/50 dark:text-text-dark/50 uppercase tracking-wider">Confidence</p>
            <p className="text-lg font-bold text-primary">{avgConfidence}%</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-56">
        {loading || !chartData ? (
          <div className="w-full h-full bg-primary/5 rounded-xl animate-pulse flex items-center justify-center">
            <span className="text-text/30 dark:text-text-dark/30 text-sm">Generating predictions...</span>
          </div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      {prediction && !loading && (
        <p className="text-[10px] text-text/30 dark:text-text-dark/30 mt-3 text-center">
          Model: {prediction.model} • Generated: {new Date(prediction.generatedAt).toLocaleTimeString()}
        </p>
      )}
    </Card>
  );
};

export default PredictionPanel;
