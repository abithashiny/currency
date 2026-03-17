import ConverterCard from '../components/ConverterCard';
import MultiConverter from '../components/MultiConverter';

const Converter = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">Converter</h2>
          <p className="text-sm text-text/60 mt-1">Real-time exchange conversion with a clean fintech experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConverterCard />
        <MultiConverter />
      </div>
    </section>
  );
};

export default Converter;
