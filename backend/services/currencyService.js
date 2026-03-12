const axios = require('axios');

const SUPPORTED_CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD'];

// Cache rates for 10 minutes
let ratesCache = {};
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000;

const fetchLatestRates = async (base = 'USD') => {
  const now = Date.now();
  if (ratesCache[base] && now - cacheTimestamp < CACHE_DURATION) {
    return ratesCache[base];
  }
  try {
    const { data } = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
    ratesCache[base] = data.rates;
    cacheTimestamp = now;
    return data.rates;
  } catch (error) {
    console.error('Error fetching rates:', error.message);
    // Fallback rates
    return getFallbackRates(base);
  }
};

const getFallbackRates = (base) => {
  const usdRates = { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53 };
  if (base === 'USD') return usdRates;
  const baseToUsd = 1 / usdRates[base];
  const rates = {};
  for (const cur of SUPPORTED_CURRENCIES) {
    rates[cur] = parseFloat((baseToUsd * usdRates[cur]).toFixed(4));
  }
  return rates;
};

const convertCurrency = async (amount, from, to) => {
  const rates = await fetchLatestRates(from);
  const rate = rates[to];
  return {
    amount,
    from,
    to,
    rate,
    result: parseFloat((amount * rate).toFixed(2)),
  };
};

const convertToMultiple = async (amount, from) => {
  const rates = await fetchLatestRates(from);
  const results = {};
  for (const cur of SUPPORTED_CURRENCIES) {
    if (cur !== from) {
      results[cur] = parseFloat((amount * rates[cur]).toFixed(2));
    }
  }
  return results;
};

const generateTrendData = async (from, to, range) => {
  const rates = await fetchLatestRates(from);
  const baseRate = rates[to] || 83.5;
  let labels = [];
  let values = [];

  if (range === '7d') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    values = labels.map((_, i) => {
      const variance = (Math.random() - 0.5) * baseRate * 0.02;
      return parseFloat((baseRate + variance + (i * 0.05)).toFixed(2));
    });
  } else if (range === '30d') {
    for (let i = 30; i >= 1; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      const variance = (Math.random() - 0.5) * baseRate * 0.03;
      values.push(parseFloat((baseRate + variance + (i * 0.02)).toFixed(2)));
    }
  } else if (range === '12m') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    labels = months;
    values = months.map((_, i) => {
      const variance = (Math.random() - 0.5) * baseRate * 0.05;
      return parseFloat((baseRate + variance + (i * 0.15)).toFixed(2));
    });
  }

  return { labels, values, from, to, range };
};

const generateComparisonData = async (target, range) => {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];
  let labels = [];

  if (range === '7d') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  } else if (range === '30d') {
    for (let i = 30; i >= 1; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
    }
  } else if (range === '12m') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  const result = { labels };

  for (const cur of currencies) {
    const rates = await fetchLatestRates(cur);
    const baseRate = rates[target] || 1;
    result[cur] = labels.map((_, i) => {
      const variance = (Math.random() - 0.5) * baseRate * 0.02;
      return parseFloat((baseRate + variance + (i * baseRate * 0.002)).toFixed(4));
    });
  }

  return result;
};

module.exports = {
  convertCurrency,
  convertToMultiple,
  generateTrendData,
  generateComparisonData,
  fetchLatestRates,
  SUPPORTED_CURRENCIES,
};
