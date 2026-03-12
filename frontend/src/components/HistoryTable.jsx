import { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import Card from './Card';

const HistoryTable = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getHistory();
        setHistory(data);
      } catch (err) {
        console.error('History fetch error:', err);
      }
      setLoading(false);
    };
    fetchHistory();
    // Refresh every 30 seconds
    const interval = setInterval(fetchHistory, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      title="Conversion History"
      subtitle="Recent currency conversions"
      icon={<span className="text-xl">📋</span>}
      noPadding
    >
      <div className="overflow-x-auto overflow-y-auto max-h-80 px-2 pb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 dark:border-border-dark/50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-text/50 dark:text-text-dark/50 uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text/50 dark:text-text-dark/50 uppercase tracking-wider">From</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text/50 dark:text-text-dark/50 uppercase tracking-wider">To</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text/50 dark:text-text-dark/50 uppercase tracking-wider">Result</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-text/50 dark:text-text-dark/50 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 bg-primary/10 rounded animate-pulse w-16" />
                    </td>
                  ))}
                </tr>
              ))
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-text/40 dark:text-text-dark/40">
                  <div className="text-3xl mb-2">📭</div>
                  No conversions yet. Use the converter to get started!
                </td>
              </tr>
            ) : (
              history.map((item, idx) => (
                <tr
                  key={item._id || idx}
                  className="border-b border-border/20 dark:border-border-dark/20 hover:bg-primary/5 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-text dark:text-text-dark">
                    {item.amount?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                      {item.fromCurrency}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-semibold">
                      {item.toCurrency}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-text dark:text-text-dark">
                    {item.result?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-text/50 dark:text-text-dark/50 text-xs">
                    {new Date(item.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default HistoryTable;
