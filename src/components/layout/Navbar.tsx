import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Bell, 
  Search, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  CloudRain, 
  Menu,
  ExternalLink
} from 'lucide-react';
import { forecastService } from '../../services/forecastService';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAlerts: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAlerts,
  sidebarOpen,
  setSidebarOpen,
  audioEnabled,
  setAudioEnabled
}) => {
  const [timeUTC, setTimeUTC] = useState<string>('');

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

  const kpis = forecastService.getGlobalKPIs();
  const unresolvedAlerts = forecastService.getAlerts().filter(a => !a.isResolved).length;

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    if (next) {
      forecastService.playAlertBeep('click');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-command-900/95 backdrop-blur-md border-b border-command-border px-4 py-2.5 flex items-center justify-between shadow-lg">
      {/* Left: Brand & Problem Statement Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-1.5 rounded-md hover:bg-command-800 text-slate-400 hover:text-cyan-400 focus:outline-none transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 shadow-inner">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-100 tracking-wide font-display uppercase flex items-center gap-1.5">
                Forecast Reliability Command Center
              </h1>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                SIH PS 26079
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>MoES / NCMRWF</span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-cyan-400/80 font-mono text-[10px]">AI-Based Medium-Range Bust Detection</span>
            </p>
          </div>
        </div>
      </div>

      {/* Center: Live Operational Status pill */}
      <div className="hidden xl:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-command-850 border border-command-border text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">LIVE</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">{timeUTC || '14:00:00 UTC'}</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400">CYCLE 00Z OPERATIONAL</span>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-[11px] font-mono text-rose-300">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>8 BUST THREATS ACTIVE</span>
        </div>
      </div>

      {/* Right: Quick actions & widgets */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-command-800 hover:bg-command-750 border border-command-border text-slate-300 text-xs transition-colors hover:border-cyan-500/40 group"
          title="Search Subdivisions, Systems, Analogs (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline text-[11px]">Quick Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-command-900 border border-command-border rounded text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Audio Beep Toggle */}
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-lg border transition-colors ${
            audioEnabled 
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' 
              : 'bg-command-800 border-command-border text-slate-400 hover:text-slate-200'
          }`}
          title={audioEnabled ? 'Operational Audio Alerts Active' : 'Audio Alerts Muted'}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Alerts Badge */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 rounded-lg bg-command-800 hover:bg-command-750 border border-command-border text-slate-300 transition-colors hover:border-rose-500/40"
          title="Operational Alert Center"
        >
          <Bell className="w-4 h-4 text-amber-400" />
          {unresolvedAlerts > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold font-mono text-white bg-rose-600 rounded-full border border-command-900 animate-pulse">
              {unresolvedAlerts.toString().padStart(2, '0')}
            </span>
          )}
        </button>

        {/* Operational Profile Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-command-border">
          <div className="w-8 h-8 rounded-lg bg-command-800 border border-command-border flex items-center justify-center text-cyan-400 text-xs font-bold font-mono shadow-inner">
            MOES
          </div>
        </div>
      </div>
    </header>
  );
};
