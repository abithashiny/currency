import PredictionPanel from '../components/PredictionPanel';
import TrendChart from '../components/TrendChart';
import ComparisonChart from '../components/ComparisonChart';

const Prediction = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">Prediction</h2>
          <p className="text-sm text-text/60 mt-1">AI-powered forecast with context from trends and comparisons.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionPanel />
        <ComparisonChart />
      </div>

      <TrendChart />
    </section>
  );
};

export default Prediction;
