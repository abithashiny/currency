import { useState, useEffect, useCallback } from 'react';
import { HiSwitchHorizontal, HiClipboardCopy } from 'react-icons/hi';
import { convertCurrency, saveHistory } from '../services/api';
import Card from './Card';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', name: 'Aus Dollar', symbol: 'A$', flag: '🇦🇺' },
];

const ConverterCard = () => {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Conversion function
  const doConvert = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    try {
      const { data } = await convertCurrency(parseFloat(amount), from, to);
      setResult(data.result);
      setRate(data.rate);
    } catch (err) {
      console.error('Conversion error:', err);
    }
    setLoading(false);
  }, [amount, from, to]);

  // Debounce conversion
  useEffect(() => {
    const timer = setTimeout(() => doConvert(), 800);
    return () => clearTimeout(timer);
  }, [doConvert]);

  // Swap currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  // Copy result to clipboard
  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save conversion to history
  const handleSaveHistory = async () => {
    if (!result) return;
    try {
      await saveHistory({
        amount: parseFloat(amount),
        fromCurrency: from,
        toCurrency: to,
        result: result,
      });
      alert('Saved to history ✅');
    } catch (err) {
      console.error('Save history error:', err);
    }
  };

  const fromCur = currencies.find((c) => c.code === from);
  const toCur = currencies.find((c) => c.code === to);

  return (
    <Card
      title="Currency Converter"
      subtitle="Real-time exchange rates"
      icon={<span className="text-xl">💱</span>}
    >
      <div className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block text-xs font-medium text-text/60 dark:text-text-dark/60 mb-1.5">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-primary font-semibold">
              {fromCur?.symbol}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg font-medium"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* From / Swap / To */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-text/60 dark:text-text-dark/60 mb-1.5">
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swap}
            className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110 mb-0.5"
          >
            <HiSwitchHorizontal className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <label className="block text-xs font-medium text-text/60 dark:text-text-dark/60 mb-1.5">
              To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-text dark:text-text-dark outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        {result !== null && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border border-primary/20 fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text/60 dark:text-text-dark/60">
                  1 {from} = {rate} {to}
                </p>
                <p className="text-2xl font-bold text-text dark:text-text-dark mt-1">
                  {toCur?.symbol}{' '}
                  {loading ? (
                    <span className="inline-block w-24 h-7 bg-primary/20 rounded animate-pulse" />
                  ) : (
                    result.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                {/* Copy */}
                <button
                  onClick={copyResult}
                  className={`p-2.5 rounded-lg transition-all ${
                    copied
                      ? 'bg-positive text-white'
                      : 'bg-bg dark:bg-bg-dark text-text/60 dark:text-text-dark/60 hover:text-primary'
                  }`}
                >
                  <HiClipboardCopy className="w-5 h-5" />
                </button>

                {/* Save */}
                <button
                  onClick={handleSaveHistory}
                  className="p-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ConverterCard;