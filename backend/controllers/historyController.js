const mongoose = require('mongoose');
const History = require('../models/History');

const isDbConnected = () => mongoose.connection.readyState === 1;

const saveHistory = async (req, res) => {
  if (!isDbConnected()) {
    return res.status(503).json({ error: 'Database unavailable', saved: false });
  }
  try {
    const { amount, fromCurrency, toCurrency, result } = req.body;
    const entry = new History({ amount, fromCurrency, toCurrency, result });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistory = async (req, res) => {
  if (!isDbConnected()) {
    return res.json([]);
  }
  try {
    const history = await History.find().sort({ date: -1 }).limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveHistory, getHistory };

