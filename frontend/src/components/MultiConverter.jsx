import { useState, useEffect, useCallback } from 'react';
import { convertMultiple } from '../services/api';
import Card from './Card';

const currencies = [
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'Aus Dollar' },
];

const MultiConverter = () => {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchMultiple = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    try {
      const { data } = await convertMultiple(parseFloat(amount), from);
      setResults(data.results || {});
    } catch (err) {
      console.error('Multi convert error:', err);
    }
    setLoading(false);
  }, [amount, from]);

  useEffect(() => {
    const timer = setTimeout(() => { fetchMultiple(); }, 600);
    return () => clearTimeout(timer);
  }, [fetchMultiple]);

  const fromCur = currencies.find((c) => c.code === from);

  return (
    <Card
      title="Multi Currency Conversion"
      subtitle="Convert to all currencies at once"
      icon={<span className="text-xl">🌍</span>}
    >
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-semibold">
            {fromCur?.symbol}
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            placeholder="Amount"
          />
        </div>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {currencies
          .filter((c) => c.code !== from)
          .map((c) => (
            <div
              key={c.code}
              className="p-3 rounded-xl bg-bg/50 dark:bg-bg-dark/50 border border-border/50 dark:border-border-dark/50 hover:border-primary/30 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">{c.flag}</span>
                <span className="text-xs font-medium text-text/60 dark:text-text-dark/60">{c.code}</span>
              </div>
              <p className="text-lg font-bold text-text dark:text-text-dark">
                {loading ? (
                  <span className="inline-block w-16 h-5 bg-primary/20 rounded animate-pulse" />
                ) : (
                  <>
                    {c.symbol}
                    {results[c.code]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '—'}
                  </>
                )}
              </p>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default MultiConverter;
