const { generatePrediction } = require('../services/predictService');
const { generateMLPrediction } = require('../services/mlPredictionService');

const predict = async (req, res) => {
  try {
    const { from = 'USD', to = 'INR', days = 7 } = req.query;
    const prediction = await generatePrediction(from, to, parseInt(days));
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const predictML = async (req, res) => {
  try {

    const prediction = await generateMLPrediction();

    res.json({
      from: "USD",
      to: "INR",
      labels: prediction.labels,
      predictions: prediction.predictions,
      confidence: prediction.predictions.map(() => 90),
      model: "Prophet ML Forecast",
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { predict, predictML };