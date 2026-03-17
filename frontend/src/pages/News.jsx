import NewsCard from '../components/NewsCard';

const News = () => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">News</h2>
        <p className="text-sm text-text/60 mt-1">Market sentiment and headlines that move currency markets.</p>
      </div>

      <NewsCard />
    </section>
  );
};

export default News;
