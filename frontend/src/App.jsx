import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Converter from './pages/Converter';
import History from './pages/History';
import News from './pages/News';
import Prediction from './pages/Prediction';
import Chatbot from './components/Chatbot';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved === 'true') return true;
      if (saved === 'false') return false;
      return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const shellClassName = useMemo(
    () =>
      [
        'min-h-dvh text-text dark:text-text-dark',
        'selection:bg-primary/30 selection:text-text dark:selection:text-text-dark',
      ].join(' '),
    []
  );

  return (
    <div className={shellClassName}>
      <ScrollToTop />
      <div className="app-bg">
        <div className="app-overlay" />
        <div className="relative">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/converter" element={<Converter />} />
              <Route path="/history" element={<History />} />
              <Route path="/news" element={<News />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default App;
