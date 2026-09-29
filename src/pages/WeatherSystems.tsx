import React, { useState } from 'react';
import { WeatherSystemItem } from '../types';
import { forecastService } from '../services/forecastService';
import { WeatherSystemCard } from '../components/cards/WeatherSystemCard';
import { 
  CloudLightning, 
  Layers, 
  Activity, 
  Wind, 
  Compass, 
  Flame, 
  Waves, 
  Sun, 
  ShieldAlert,
  Info
} from 'lucide-react';

interface WeatherSystemsProps {
  onNavigateToTab: (tab: any) => void;
}

export const WeatherSystems: React.FC<WeatherSystemsProps> = ({
  onNavigateToTab
}) => {
  const systems = forecastService.getWeatherSystems();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filteredSystems = systems.filter(sys => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'ACTIVE') return sys.status === 'ACTIVE';
    if (selectedFilter === 'CRITICAL') return sys.risk === 'Critical' || sys.risk === 'High';
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <CloudLightning className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Weather System Intelligence Monitor
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SYNOPTIC VULNERABILITY MATRIX
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuous tracking of 7 core synoptic weather drivers and their associated medium-range forecast failure probabilities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-command-800 p-1 rounded-lg border border-command-border text-xs font-mono">
          {['ALL', 'ACTIVE', 'CRITICAL'].map((f) => (
            <button
              key={f}
              onClick={() => {
                setSelectedFilter(f);
                forecastService.playAlertBeep('click');
              }}
              className={`px-3 py-1 rounded transition-colors ${
                selectedFilter === f
                  ? 'bg-cyan-500 text-command-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f} ({
                f === 'ALL' ? systems.length : f === 'ACTIVE' ? systems.filter(s => s.status === 'ACTIVE').length : systems.filter(s => s.risk === 'Critical' || s.risk === 'High').length
              })
            </button>
          ))}
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSystems.map((system) => (
          <WeatherSystemCard
            key={system.id}
            system={system}
            onInspect={() => {
              forecastService.playAlertBeep('click');
              onNavigateToTab('bust-radar');
            }}
          />
        ))}
      </div>

      {/* Synoptic Reliability Vulnerability Summary Card */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider pb-2 border-b border-command-border">
          <Info className="w-4 h-4" />
          <span>Synoptic System Vulnerability Ranking (Historical Forecast Verification)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30">
            <span className="text-rose-400 font-bold block">1. MONSOON DEPRESSION</span>
            <span className="text-slate-300 text-[11px] block mt-1">Avg Bust Prob: 74% • Cliff: Day 4.2</span>
            <span className="text-slate-400 text-[10px]">Track bifurcation over landmass</span>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30">
            <span className="text-amber-400 font-bold block">2. GHATS OROGRAPHIC RAIN</span>
            <span className="text-slate-300 text-[11px] block mt-1">Avg Bust Prob: 69% • Cliff: Day 4.5</span>
            <span className="text-slate-400 text-[10px]">Meso-convective core triggering</span>
          </div>

          <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-500/30">
            <span className="text-sky-400 font-bold block">3. TROPICAL CYCLONE</span>
            <span className="text-slate-300 text-[11px] block mt-1">Avg Bust Prob: 64% • Cliff: Day 5.8</span>
            <span className="text-slate-400 text-[10px]">Rapid intensification threshold</span>
          </div>

          <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30">
            <span className="text-purple-300 font-bold block">4. WESTERN DISTURBANCE</span>
            <span className="text-slate-300 text-[11px] block mt-1">Avg Bust Prob: 44% • Cliff: Day 4.8</span>
            <span className="text-slate-400 text-[10px]">Subtropical jet interaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};
