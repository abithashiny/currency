
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const predictRoutes = require('./routes/predictRoutes');



// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "https://currency-one-theta.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options("*", cors());
app.use(express.json());

// Routes
// Routes
app.use('/api/currency', require('./routes/currencyRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/predict', predictRoutes);
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
