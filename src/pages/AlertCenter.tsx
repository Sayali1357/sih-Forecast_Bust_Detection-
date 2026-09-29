import React, { useState } from 'react';
import { OperationalAlert, MeteorologicalSubdivision, LeadTimeDay } from '../types';
import { forecastService } from '../services/forecastService';
import { AlertCard } from '../components/alerts/AlertCard';
import { 
  Bell, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Volume2, 
  Radio, 
  Filter,
  PlusCircle
} from 'lucide-react';

interface AlertCenterProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay, alert?: OperationalAlert) => void;
}

export const AlertCenter: React.FC<AlertCenterProps> = ({
  onSelectSubdivision,
  onNavigateToTab,
  onOpenBulletin
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [alertsList, setAlertsList] = useState<OperationalAlert[]>(forecastService.getAlerts());

  const filteredAlerts = alertsList.filter((a) => {
    if (activeCategory === 'ALL') return true;
    return a.severity.toUpperCase() === activeCategory.toUpperCase();
  });

  const handleResolve = (alert: OperationalAlert) => {
    forecastService.resolveAlert(alert.id);
    forecastService.playAlertBeep('click');
    setAlertsList([...forecastService.getAlerts()]);
  };

  const handleDispatch = (alert: OperationalAlert) => {
    const sub = forecastService.searchSubdivisions(alert.region)[0] || forecastService.getSubdivisions()[0];
    onOpenBulletin(sub, alert.leadDay as LeadTimeDay, alert);
  };

  const handleViewRegion = (regionName: string) => {
    const sub = forecastService.searchSubdivisions(regionName)[0];
    if (sub) {
      onSelectSubdivision(sub);
      onNavigateToTab('region-detail');
    }
  };

  const handleViewAnalysis = (alert: OperationalAlert) => {
    const sub = forecastService.searchSubdivisions(alert.region)[0];
    if (sub) {
      onSelectSubdivision(sub);
      onNavigateToTab('explainable-ai');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Smart Forecast-Bust Alert Engine
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              REAL-TIME OPERATIONAL DESPATCH FEED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated alerts triggered when ensemble divergence or physical bust probability exceeds operational threshold (P &gt; 50%).
          </p>
        </div>

        {/* Severity Category Filter Bar */}
        <div className="flex items-center gap-1 bg-command-800 p-1 rounded-lg border border-command-border text-xs font-mono">
          {['ALL', 'CRITICAL', 'WARNING', 'WATCH', 'RESOLVED'].map((cat) => {
            const count = cat === 'ALL' 
              ? alertsList.length 
              : alertsList.filter(a => a.severity.toUpperCase() === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  forecastService.playAlertBeep('click');
                }}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-command-950/60 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Alert Stats Counter Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-rose-400 font-bold block">CRITICAL THREATS</span>
            <span className="text-2xl font-black font-mono">{alertsList.filter(a => a.severity === 'Critical').length} ACTIVE</span>
          </div>
          <ShieldAlert className="w-8 h-8 text-rose-500 opacity-60" />
        </div>

        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold block">WARNING LEVEL</span>
            <span className="text-2xl font-black font-mono">{alertsList.filter(a => a.severity === 'Warning').length} ZONES</span>
          </div>
          <AlertTriangle className="w-8 h-8 text-amber-500 opacity-60" />
        </div>

        <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/40 text-sky-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-sky-400 font-bold block">WATCH & MONITOR</span>
            <span className="text-2xl font-black font-mono">{alertsList.filter(a => a.severity === 'Watch').length} ZONES</span>
          </div>
          <Radio className="w-8 h-8 text-sky-500 opacity-60" />
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">RESOLVED & STABILIZED</span>
            <span className="text-2xl font-black font-mono">{alertsList.filter(a => a.severity === 'Resolved').length} LOGGED</span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-60" />
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onViewRegion={handleViewRegion}
            onViewAnalysis={handleViewAnalysis}
            onDispatchBulletin={handleDispatch}
          />
        ))}
      </div>
    </div>
  );
};
