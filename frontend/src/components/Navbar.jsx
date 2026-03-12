import { useState } from 'react';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';

const Navbar = ({ darkMode, setDarkMode, activeSection, setActiveSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = ['Dashboard', 'Converter', 'History'];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <h1 className="text-xl font-bold gradient-text hidden sm:block">
              Currency Analytics Dashboard
            </h1>
            <h1 className="text-lg font-bold gradient-text sm:hidden">
              Currency Dashboard
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.toLowerCase()
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-text dark:text-text-dark hover:bg-primary/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-bg dark:bg-card-dark text-text dark:text-text-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <HiSun className="w-5 h-5 text-yellow-400" /> : <HiMoon className="w-5 h-5 text-indigo-500" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-text dark:text-text-dark hover:bg-primary/10"
            >
              {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border dark:border-border-dark px-4 py-3 space-y-1 fade-in-up">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => { setActiveSection(item.toLowerCase()); setMobileOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'text-text dark:text-text-dark hover:bg-primary/10'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
