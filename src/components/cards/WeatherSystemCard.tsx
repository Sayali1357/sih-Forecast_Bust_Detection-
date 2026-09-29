import React from 'react';
import { WeatherSystemItem } from '../../types';
import { 
  CloudLightning, 
  Wind, 
  Flame, 
  Sun, 
  Waves, 
  Compass, 
  ShieldAlert, 
  Radio, 
  ChevronRight 
} from 'lucide-react';

interface WeatherSystemCardProps {
  system: WeatherSystemItem;
  onInspect?: (system: WeatherSystemItem) => void;
}

export const WeatherSystemCard: React.FC<WeatherSystemCardProps> = ({
  system,
  onInspect
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cyclone': return Wind;
      case 'Monsoon Depression': return Waves;
      case 'Heavy Rainfall': return CloudLightning;
      case 'Western Disturbance': return Compass;
      case 'Heat Wave': return Flame;
      default: return CloudLightning;
    }
  };

  const Icon = getCategoryIcon(system.category);
  const isCritical = system.risk === 'Critical' || system.risk === 'High';

  return (
    <div className="p-4 rounded-xl bg-command-900/90 border border-command-border hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between space-y-3">
      {/* Header with status badge & risk */}
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-command-border">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${
            isCritical 
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
              : 'bg-command-800 border-command-border text-cyan-400'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 font-display">{system.name}</h4>
            <div className="flex items-center gap-2 text-[10px] font-mono mt-0.5">
              <span className={`px-1.5 py-0.2 rounded font-bold ${
                system.status === 'ACTIVE' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                  : 'bg-command-800 text-slate-400'
              }`}>
                {system.status}
              </span>
              <span className="text-slate-400">{system.currentIntensity}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${
            system.risk === 'Critical' 
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
              : system.risk === 'High' 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
              : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
          }`}>
            {system.risk.toUpperCase()} RISK
          </span>
          <div className="text-xs font-mono font-black text-rose-400 mt-1">
            {system.bustProbability}% BUST PROB
          </div>
        </div>
      </div>

      {/* Lead time window & uncertainty info */}
      <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-command-850/80 border border-command-border text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block">VULNERABILITY HORIZON</span>
          <span className="text-cyan-300 font-bold">{system.leadTimeWindow}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">FORECAST UNCERTAINTY</span>
          <span className={system.forecastUncertainty === 'VERY HIGH' ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>
            {system.forecastUncertainty}
          </span>
        </div>
      </div>

      {/* Focal Regions & Key Uncertainty mechanism */}
      <div className="space-y-1.5 text-xs">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Affected Meteorological Zones:</span>
          <div className="flex flex-wrap gap-1">
            {system.focalRegions.map(reg => (
              <span key={reg} className="px-2 py-0.5 rounded text-[10px] font-mono bg-command-800 border border-command-border text-slate-300">
                {reg}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
          <strong className="text-slate-400 font-mono text-[10px] block">PRIMARY SYNOPTIC UNCERTAINTY:</strong>
          {system.keyUncertaintyFactor}
        </p>
      </div>

      {/* Button */}
      {onInspect && (
        <button
          onClick={() => onInspect(system)}
          className="w-full mt-2 py-1.5 px-3 rounded-lg bg-command-800 hover:bg-command-750 border border-command-border text-slate-300 text-xs font-mono flex items-center justify-between hover:text-cyan-400 transition-colors"
        >
          <span>Inspect Synoptic Telemetry</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
