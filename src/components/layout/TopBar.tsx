import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { ShieldAlert, Bell, Moon, Sun, Award, Globe, UserCheck } from 'lucide-react';

interface TopBarProps {
  currentView: string;
  setView: (view: 'landing' | 'archive' | 'dashboard' | 'auth' | 'case') => void;
}

export default function TopBar({ setView, currentView }: TopBarProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ml' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-glass backdrop-blur-md border-b border-white/5 shadow-sm transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center h-16 px-6 max-w-max-width mx-auto">
        <div 
          className="text-lg font-black text-primary tracking-tight cursor-pointer flex items-center gap-2 select-none"
          onClick={() => setView('landing')}
        >
          <img src="/shield.svg" alt="Kerala Police Shield Badge Logo" className="w-8 h-8" />
          <span>{t('hero.title')}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            className={`${currentView === 'landing' ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-muted hover:text-primary pb-1 border-b-2 border-transparent'} font-bold text-sm transition-all cursor-pointer`}
            onClick={() => setView('landing')}
          >
            {t('nav.home')}
          </button>
          <button 
            className={`${currentView === 'archive' || currentView === 'case' ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-muted hover:text-primary pb-1 border-b-2 border-transparent'} font-bold text-sm transition-all cursor-pointer`}
            onClick={() => setView('archive')}
          >
            {t('nav.archive')}
          </button>
          <button 
            className={`${currentView === 'dashboard' ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-muted hover:text-primary pb-1 border-b-2 border-transparent'} font-bold text-sm transition-all cursor-pointer`}
            onClick={() => setView('dashboard')}
          >
            {t('nav.dashboard')}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button 
            className="text-primary hover:bg-white/5 p-2 rounded-lg transition-all active:scale-95 cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* Theme toggler */}
          <button 
            onClick={toggleTheme}
            className="text-primary hover:bg-white/5 p-2 rounded-lg transition-all active:scale-95 cursor-pointer"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : <Award size={18} />}
          </button>

          {/* Language selector */}
          <button 
            onClick={toggleLanguage}
            className="text-primary hover:bg-white/5 p-2 rounded-lg transition-all active:scale-95 cursor-pointer"
            title="Toggle Language"
          >
            <Globe size={18} />
          </button>

          {/* Secure Audit Access */}
          <button 
            onClick={() => setView('auth')}
            className={`p-2 rounded-lg transition-all active:scale-95 cursor-pointer ${
              currentView === 'auth' ? 'bg-primary text-white' : 'text-primary hover:bg-white/5'
            }`}
            title="Secure Auditor Gate"
          >
            <UserCheck size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
