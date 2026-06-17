import { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SLOGANS = [
  'CRAFT YOUR STORY',
  'DESIGN YOUR FUTURE',
  'ARCHITECT YOUR PORTFOLIO'
];

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sloganIdx, setSloganIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    // Check local preferences
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSloganIdx((prev) => (prev + 1) % SLOGANS.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="w-full flex items-center justify-between py-5 px-6 border-b border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/20 backdrop-blur-md sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2.5">
        <div className="bg-aura-600 text-white p-2 rounded-2xl shadow-lg shadow-aura-500/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-none">
            CV Aura
          </h1>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">
            Resume Architect
          </span>
        </div>
      </div>

      {/* Rotating Slogan Section - Center */}
      <div className="hidden md:flex items-center justify-center flex-1 mx-4">
        <span 
          className={`text-xs font-black tracking-[0.25em] bg-[length:200%_auto] bg-gradient-to-r from-black via-slate-550 to-black dark:from-white dark:via-neutral-450 dark:to-white bg-clip-text text-transparent animate-shimmer transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ✦ {SLOGANS[sloganIdx]} ✦
        </span>
      </div>

      {/* User Session & Theme Controls */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-neutral-900">
            <img 
              src={user.photoURL || 'https://api.dicebear.com/7.x/adventurer/svg'} 
              alt="Avatar" 
              className="w-7 h-7 rounded-full border border-black dark:border-white shadow-sm"
              onError={(e) => {
                // Handle fallback image if avatar fails to load
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/adventurer/svg';
              }}
            />
            <span className="text-xs font-bold text-slate-700 dark:text-neutral-350">{user.displayName}</span>
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950 transition-colors shadow-sm cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Logout Button */}
        {user && (
          <button
            onClick={logout}
            className="p-2.5 rounded-xl border border-red-200/50 dark:border-red-950 bg-white dark:bg-neutral-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors shadow-sm cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
