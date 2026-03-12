const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  fromCurrency: {
    type: String,
    required: true,
  },
  toCurrency: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', historySchema);
