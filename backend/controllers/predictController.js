const { generatePrediction } = require('../services/predictService');

const predict = async (req, res) => {
  try {
    const { from = 'USD', to = 'INR', days = 7 } = req.query;
    const prediction = await generatePrediction(from, to, parseInt(days));
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥 FIXED ML (fallback to normal prediction)
const predictML = async (req, res) => {
  try {
    const { from = 'USD', to = 'INR', days = 7 } = req.query;

    const prediction = await generatePrediction(from, to, parseInt(days));

    res.json({
      ...prediction,
      model: "Simulated ML Forecast"
    });

  } catch (error) {
    console.error("ML Prediction error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { predict, predictML };