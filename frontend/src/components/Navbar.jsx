import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/converter', label: 'Converter' },
      { to: '/history', label: 'History' },
      { to: '/news', label: 'News' },
      { to: '/prediction', label: 'Prediction' },
    ],
    []
  );

  const navLinkClass = ({ isActive }) =>
    [
      'px-3 py-2 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
      isActive
        ? 'bg-primary/10 text-text shadow-lg shadow-black/5'
        : 'text-text/70 hover:text-text hover:bg-primary/10',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-xl bg-white/55 border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-black/15">
                <span className="text-white font-extrabold text-base">FX</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-text leading-tight">Currency Dashboard</div>
                <div className="text-[11px] text-text/60 -mt-0.5">Analytics • News • AI Forecast</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.to === '/'}>
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDarkMode((v) => !v)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 hover:bg-primary/15 text-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <HiSun className="w-5 h-5 text-accent" /> : <HiMoon className="w-5 h-5 text-text/80" />}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 hover:bg-primary/15 text-text transition-all"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border/70">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 grid gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                      isActive ? 'bg-primary/10 text-text' : 'text-text/70 hover:text-text hover:bg-primary/10',
                    ].join(' ')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
