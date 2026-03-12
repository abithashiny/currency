import { useState, useEffect } from 'react';
import { getNews } from '../services/api';
import Card from './Card';

const sentimentConfig = {
  positive: { color: 'bg-positive/15 text-positive', icon: '📈', label: 'Positive' },
  neutral: { color: 'bg-neutral-badge/15 text-neutral-badge', icon: '➡️', label: 'Neutral' },
  negative: { color: 'bg-negative/15 text-negative', icon: '📉', label: 'Negative' },
};

const NewsCard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await getNews();
        setNews(data);
      } catch (err) {
        console.error('News error:', err);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <Card
      title="Currency News & Sentiment"
      subtitle="Market-moving financial news"
      icon={<span className="text-xl">📰</span>}
    >
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-bg/50 dark:bg-bg-dark/50 animate-pulse">
                <div className="h-4 bg-primary/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-primary/10 rounded w-full mb-1" />
                <div className="h-3 bg-primary/10 rounded w-2/3" />
              </div>
            ))
          : news.map((item) => {
              const sentiment = sentimentConfig[item.sentiment] || sentimentConfig.neutral;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-bg/30 dark:bg-bg-dark/30 border border-border/30 dark:border-border-dark/30 hover:border-primary/20 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-text dark:text-text-dark group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${sentiment.color}`}>
                      {sentiment.icon} {sentiment.label}
                    </span>
                  </div>
                  <p className="text-xs text-text/60 dark:text-text-dark/60 leading-relaxed mb-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-text/40 dark:text-text-dark/40">
                    <span className="font-semibold">{item.source}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                  </div>
                </div>
              );
            })}
      </div>
    </Card>
  );
};

export default NewsCard;
