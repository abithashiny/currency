const { convertCurrency, convertToMultiple, generateTrendData, generateComparisonData } = require('../services/currencyService');

const convert = async (req, res) => {
  try {
    const { amount, from, to } = req.body;
    if (!amount || !from || !to) {
      return res.status(400).json({ error: 'amount, from, and to are required' });
    }
    const result = await convertCurrency(parseFloat(amount), from.toUpperCase(), to.toUpperCase());
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertMultiple = async (req, res) => {
  try {
    const { amount, from } = req.body;
    if (!amount || !from) {
      return res.status(400).json({ error: 'amount and from are required' });
    }
    const results = await convertToMultiple(parseFloat(amount), from.toUpperCase());
    res.json({ amount, from, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrends = async (req, res) => {
  try {
    const { from = 'USD', to = 'INR', range = '7d' } = req.query;
    const data = await generateTrendData(from, to, range);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComparison = async (req, res) => {
  try {
    const { target = 'INR', range = '7d' } = req.query;
    const data = await generateComparisonData(target, range);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { convert, convertMultiple, getTrends, getComparison };
