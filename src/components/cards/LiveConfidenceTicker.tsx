import React from 'react';
import { LIVE_TELEMETRY } from '../../data/mockData';
import { Activity, ArrowDownRight, AlertTriangle, Cpu, Radio, Sparkles } from 'lucide-react';

export const LiveConfidenceTicker: React.FC = () => {
  return (
    <div className="w-full bg-command-900/90 rounded-xl border border-command-border p-4 space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-command-border">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <h3 className="text-sm font-bold text-slate-100 font-display uppercase tracking-wider flex items-center gap-2">
            Continuous Confidence Evolution
          </h3>
        </div>

        <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-mono font-bold animate-pulse">
          <ArrowDownRight className="w-3.5 h-3.5" />
          <span>DETERIORATING RAPIDLY (-33% IN 6H)</span>
        </div>
      </div>

      {/* Hourly progression tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {LIVE_TELEMETRY.map((item, idx) => {
          const isLatest = idx === LIVE_TELEMETRY.length - 1;
          const conf = item.confidence;
          const isCritical = conf < 45;
          const isLow = conf < 60;

          return (
            <div
              key={item.timeUTC}
              className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                isLatest
                  ? 'bg-rose-950/30 border-rose-500/50 shadow-md shadow-rose-950/50 relative overflow-hidden'
                  : 'bg-command-850/60 border-command-border'
              }`}
            >
              {isLatest && (
                <span className="absolute top-0 right-0 px-1.5 py-0.2 rounded-bl text-[8px] font-mono font-bold bg-rose-600 text-white">
                  LIVE
                </span>
              )}

              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>{item.timeUTC}</span>
                <span className={item.delta6h === '-0%' ? 'text-slate-500' : 'text-rose-400 font-bold'}>
                  {item.delta6h}
                </span>
              </div>

              <div className="my-1 flex items-baseline gap-2">
                <span className={`text-2xl font-black font-mono tracking-tight ${
                  isCritical ? 'text-rose-400' : isLow ? 'text-amber-400' : 'text-cyan-400'
                }`}>
                  {item.confidence}%
                </span>
                <span className="text-[10px] font-mono text-slate-400">confidence</span>
              </div>

              <div className="w-full bg-command-750 h-1 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isCritical ? 'bg-rose-500' : isLow ? 'bg-amber-400' : 'bg-cyan-400'}`}
                  style={{ width: `${item.confidence}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* What Changed? Synoptic Reason Breakdown */}
      <div className="p-3 rounded-lg bg-command-850/90 border border-command-border text-xs font-mono space-y-1.5">
        <div className="text-cyan-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>WHAT CHANGED? (AI DIAGNOSTIC TRACE)</span>
        </div>

        <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
          <li>
            <span className="text-rose-400 font-semibold">Model spread escalated:</span> +42mm rain variance across ECMWF IFS vs NCUM-G ensemble suites.
          </li>
          <li>
            <span className="text-amber-300 font-semibold">Pressure anomaly increased:</span> Central surface pressure plunged 4.2 hPa faster than NWP operational run.
          </li>
          <li>
            <span className="text-cyan-300 font-semibold">Satellite Radiance shift:</span> INSAT-3DR water vapor channel reveals deep convective updraft uncaptured in initial boundary states.
          </li>
        </ul>
      </div>
    </div>
  );
};
