import ConverterCard from '../components/ConverterCard';
import MultiConverter from '../components/MultiConverter';
import TrendChart from '../charts/TrendChart';
import ComparisonChart from '../charts/ComparisonChart';
import HistoryTable from '../components/HistoryTable';
import NewsCard from '../components/NewsCard';
import PredictionPanel from '../components/PredictionPanel';
import Chatbot from '../components/Chatbot';

const Dashboard = ({ activeSection }) => {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Dashboard View */}
        {activeSection === 'dashboard' && (
          <>
            {/* Top Row: Converter + Multi Converter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up">
              <ConverterCard />
              <MultiConverter />
            </div>

            {/* Trend Charts */}
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <TrendChart />
            </div>

            {/* Comparison + Prediction */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <ComparisonChart />
              <PredictionPanel />
            </div>

            {/* News + History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up" style={{ animationDelay: '0.3s' }}>
              <NewsCard />
              <HistoryTable />
            </div>
          </>
        )}

        {/* Converter View */}
        {activeSection === 'converter' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up">
            <ConverterCard />
            <MultiConverter />
          </div>
        )}

        {/* History View */}
        {activeSection === 'history' && (
          <div className="fade-in-up">
            <HistoryTable />
          </div>
        )}
      </div>

      {/* Chatbot Overlay */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
