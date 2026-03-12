const axios = require("axios");

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

const cleanText = (text = "") => {
  return text.replace(/<[^>]*>?/gm, "");
};

const currencyKeywords = [
  "currency",
  "forex",
  "exchange",
  "usd",
  "eur",
  "inr",
  "yen",
  "dollar",
  "rupee",
  "euro",
  "central bank",
  "interest rate",
  "inflation",
];

const getNews = async () => {
  try {

    const response = await axios.get(
      "https://finnhub.io/api/v1/news",
      {
        params: {
          category: "general",
          token: FINNHUB_API_KEY,
        },
      }
    );

    const articles = response.data || [];

    console.log("Total news:", articles.length);

    const filtered = articles.filter((article) => {

      const headline = (article.headline || "").toLowerCase();
      const summary = (article.summary || "").toLowerCase();

      return currencyKeywords.some((keyword) =>
        headline.includes(keyword) || summary.includes(keyword)
      );

    });

    return filtered.slice(0, 6).map((article, index) => ({
      id: index + 1,
      title: article.headline,
      summary: cleanText(article.summary || "No summary available"),
      source: article.source,
      sentiment: "neutral",
      category: "Currency Markets",
      date: new Date(article.datetime * 1000).toISOString(),
    }));

  } catch (error) {
    console.error("News API error:", error.message);
    return [];
  }
};

module.exports = { getNews };