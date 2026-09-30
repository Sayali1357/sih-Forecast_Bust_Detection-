import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Bell, 
  Search, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Globe,
  Sun,
  Moon,
  Sparkles,
  Menu,
  Home
} from 'lucide-react';
import { forecastService } from '../../services/forecastService';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAlerts: () => void;
  onGoToHome?: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAlerts,
  onGoToHome,
  sidebarOpen,
  setSidebarOpen,
  audioEnabled,
  setAudioEnabled
}) => {
  const [timeUTC, setTimeUTC] = useState<string>('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().replace('GMT', 'UTC').split(' ').slice(1, 5).join(' ');
      setTimeUTC(utcString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unresolvedAlerts = forecastService.getAlerts().filter(a => !a.isResolved).length;

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    if (next) {
      forecastService.playAlertBeep('click');
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md px-3 sm:px-4 py-2 flex items-center justify-between shadow-lg transition-colors border-b ${
      theme === 'light' 
        ? 'bg-white/95 text-slate-800 border-slate-200' 
        : 'bg-command-900/95 text-slate-100 border-command-border'
    }`}>
      {/* Left: Brand & Problem Statement Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`lg:hidden p-1.5 rounded-md focus:outline-none transition-colors ${
            theme === 'light' ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-command-800 text-slate-400 hover:text-cyan-400'
          }`}
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div 
          onClick={onGoToHome}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
          title="Return to Parjanya AI Showcase Landing"
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
            <Radio className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-wide font-display uppercase flex items-center gap-1 text-slate-900 dark:text-slate-100">
                {t.brandName}
              </h1>
              <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                PS-26079
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>MoES / NCMRWF</span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-400" />
              <span className="text-cyan-600 dark:text-cyan-400/80 font-mono text-[9px] sm:text-[10px] truncate max-w-[170px] sm:max-w-none">
                {t.heroHeadline}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Center: Live Operational Status pill */}
      <div className="hidden xl:flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${
          theme === 'light' 
            ? 'bg-slate-100 border-slate-200 text-slate-700' 
            : 'bg-command-850 border-command-border text-slate-300'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.liveStatus}</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-semibold">{timeUTC || '14:00:00 UTC'}</span>
          <span className="text-slate-400">|</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">{t.cycleOperational}</span>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-[11px] font-mono text-rose-600 dark:text-rose-300">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          <span className="font-bold">8 {t.threatsActive}</span>
        </div>
      </div>

      {/* Right: Actions, Language Switcher, Theme Switcher & Badges */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Showcase Home Link */}
        {onGoToHome && (
          <button
            onClick={onGoToHome}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors group ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-command-800 hover:bg-command-750 border-command-border text-slate-300 hover:border-cyan-500/40'
            }`}
            title="Go to Parjanya Showcase Landing Page"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 group-hover:rotate-12 transition-transform" />
            <span className="hidden lg:inline text-[11px] font-medium">{t.backToHero}</span>
          </button>
        )}

        {/* Search button */}
        <button
          onClick={onOpenSearch}
          className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-lg border text-xs transition-colors group ${
            theme === 'light'
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-command-800 hover:bg-command-750 border-command-border text-slate-300 hover:border-cyan-500/40'
          }`}
          title={t.searchPlaceholder}
        >
          <Search className="w-3.5 h-3.5 text-cyan-500 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline text-[11px]">{t.quickSearch}</span>
          <kbd className={`hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono border rounded ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-500' : 'bg-command-900 border-command-border text-slate-400'
          }`}>
            Ctrl+K
          </kbd>
        </button>

        {/* Multilingual Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs transition-colors font-mono font-bold ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-command-800 hover:bg-command-750 border-command-border text-slate-200'
            }`}
            title={t.languageSelect}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span className="uppercase text-[11px]">{language}</span>
          </button>

          {langDropdownOpen && (
            <div className={`absolute right-0 mt-1 w-32 rounded-lg border shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-command-900 border-cyan-500/40'
            }`}>
              <button
                onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-cyan-500/10 ${
                  language === 'en' ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>English</span>
                <span className="text-[10px] font-mono text-slate-400">EN</span>
              </button>
              <button
                onClick={() => { setLanguage('mr'); setLangDropdownOpen(false); }}
                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-cyan-500/10 ${
                  language === 'mr' ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>मराठी</span>
                <span className="text-[10px] font-mono text-slate-400">MR</span>
              </button>
              <button
                onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-cyan-500/10 ${
                  language === 'hi' ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>हिंदी</span>
                <span className="text-[10px] font-mono text-slate-400">HI</span>
              </button>
            </div>
          )}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
            theme === 'light'
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-amber-600'
              : 'bg-command-800 border-command-border text-cyan-400 hover:bg-command-750'
          }`}
          title={theme === 'dark' ? t.lightMode : t.darkMode}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
        </button>

        {/* Audio Beep Toggle */}
        <button
          onClick={toggleAudio}
          className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
            audioEnabled 
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-300' 
              : theme === 'light'
                ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
                : 'bg-command-800 border-command-border text-slate-400 hover:text-slate-200'
          }`}
          title={audioEnabled ? t.audioAlertsActive : t.audioAlertsMuted}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Alerts Badge */}
        <button
          onClick={onOpenAlerts}
          className={`relative p-1.5 sm:p-2 rounded-lg border transition-colors ${
            theme === 'light'
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-command-800 hover:bg-command-750 border-command-border text-slate-300'
          }`}
          title={t.navAlertCenter}
        >
          <Bell className="w-4 h-4 text-amber-500" />
          {unresolvedAlerts > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold font-mono text-white bg-rose-600 rounded-full border border-slate-900 animate-pulse">
              {unresolvedAlerts.toString().padStart(2, '0')}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
