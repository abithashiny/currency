const { getNews } = require('../services/newsService');

const fetchNews = async (req, res) => {
  try {
    const news = await getNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchNews };
