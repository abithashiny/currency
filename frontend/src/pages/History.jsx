import HistoryTable from '../components/HistoryTable';

const History = () => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">History</h2>
        <p className="text-sm text-text/60 mt-1">Your recent conversions, refreshed automatically.</p>
      </div>

      <HistoryTable />
    </section>
  );
};

export default History;
