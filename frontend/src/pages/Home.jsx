import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="min-h-[calc(100dvh-4rem)] flex items-center">
      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/55 px-4 py-2 text-xs font-semibold text-text/70 shadow-sm shadow-black/5 backdrop-blur-xl">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent" />
            Premium currency analytics
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Effortlessly Manage Your Currency Exchange
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-text/70 leading-relaxed">
            Convert currencies in real time, track trends, read market-moving news, and explore AI-powered forecasts—built with a
            clean, modern fintech interface.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/converter"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/15 transition-all"
            >
              Start Converting
            </Link>
            <Link
              to="/prediction"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/60 text-text font-semibold border border-border/70 hover:bg-white/75 transition-all backdrop-blur-xl"
            >
              View AI Prediction
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { k: 'Real-time', v: 'Rates & conversions' },
              { k: 'Insights', v: 'Trends & comparisons' },
              { k: 'AI', v: '7-day forecasts' },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-2xl border border-border/70 bg-white/55 backdrop-blur-xl p-4 shadow-lg shadow-black/5"
              >
                <div className="text-sm font-semibold text-text">{x.k}</div>
                <div className="text-xs text-text/60 mt-1">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
