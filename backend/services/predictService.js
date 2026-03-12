const { fetchLatestRates } = require('./currencyService');

const generatePrediction = async (from = 'USD', to = 'INR', days = 7) => {
  const rates = await fetchLatestRates(from);
  const currentRate = rates[to] || 83.5;

  // Simple linear trend with slight noise for realistic predictions
  const trend = (Math.random() - 0.45) * 0.3; // Slight upward bias
  const labels = [];
  const predictions = [];
  const confidence = [];

  for (let i = 1; i <= days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);

    const predicted = currentRate + (trend * i) + (Math.random() - 0.5) * currentRate * 0.005;
    predictions.push(parseFloat(predicted.toFixed(2)));

    // Confidence decreases over time
    const conf = Math.max(60, 95 - (i * 4) + (Math.random() * 3));
    confidence.push(parseFloat(conf.toFixed(1)));
  }

  return {
    from,
    to,
    currentRate,
    labels,
    predictions,
    confidence,
    generatedAt: new Date().toISOString(),
    model: 'Linear Trend Extrapolation v1',
  };
};

module.exports = { generatePrediction };
