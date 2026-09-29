import React, { useState } from 'react';
import { HistoricalAnalogCase } from '../../types';
import { History, Sparkles, ExternalLink, Play, CheckCircle, AlertTriangle, BarChart2 } from 'lucide-react';
import { forecastService } from '../../services/forecastService';

interface HistoricalAnalogCardProps {
  analog: HistoricalAnalogCase;
  onSelect?: (analog: HistoricalAnalogCase) => void;
}

export const HistoricalAnalogCard: React.FC<HistoricalAnalogCardProps> = ({
  analog,
  onSelect
}) => {
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const handleSimulate = () => {
    forecastService.playAlertBeep('click');
    setSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      setSimulating(false);
      setSimResult(
        `Trajectory Simulation Complete: At T+72h, synoptic vortex exhibits 84% track alignment with ${analog.year} ${analog.event}. Projected displacement error: -65km west deflection.`
      );
    }, 1200);
  };

  const isHighMatch = analog.similarityScore >= 90;

  return (
    <div className="p-4 rounded-xl bg-command-900/90 border border-command-border hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between space-y-3">
      {/* Header with year, system and similarity badge */}
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-display text-slate-100">{analog.year}</span>
            <span className="px-1.5 py-0.2 rounded bg-command-800 text-[10px] font-mono text-slate-300 border border-command-border">
              {analog.date}
            </span>
          </div>
          <h4 className="text-xs font-bold text-cyan-400 mt-0.5">{analog.event}</h4>
          <span className="text-[10px] text-slate-400">{analog.weatherSystem} • {analog.subdivision}</span>
        </div>

        <div className="text-right">
          <div className={`text-base font-black font-mono ${
            isHighMatch ? 'text-cyan-400' : 'text-amber-400'
          }`}>
            {analog.similarityScore}%
          </div>
          <span className="text-[9px] font-mono text-slate-400 uppercase">AI SIMILARITY</span>
        </div>
      </div>

      {/* Forecast vs Actual Metrics Box */}
      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-command-850/90 border border-command-border text-xs font-mono">
        <div>
          <span className="text-slate-500 text-[10px] block">NWP FORECAST VALUE</span>
          <span className="text-slate-300 font-bold">{analog.forecastValue}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] block">OBSERVED OUTCOME</span>
          <span className="text-rose-400 font-bold">{analog.actualValue}</span>
        </div>
      </div>

      {/* Error Magnitude & Failure Mechanism */}
      <div className="space-y-1.5 text-xs font-sans">
        <div className="flex items-center gap-1.5 text-rose-300 text-[11px] font-mono">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Historical Error: <strong className="text-rose-400">{analog.errorMagnitude}</strong></span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <strong className="text-slate-400 font-mono text-[10px] block">FAILURE MECHANISM:</strong>
          {analog.failureMechanism}
        </p>
      </div>

      {/* Simulation Feedback Alert */}
      {simResult && (
        <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-[11px] font-mono text-cyan-200 animate-in fade-in">
          {simResult}
        </div>
      )}

      {/* Action button */}
      <div className="pt-2 border-t border-command-border flex items-center justify-between gap-2">
        <button
          onClick={handleSimulate}
          disabled={simulating}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors disabled:opacity-50"
        >
          {simulating ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <span>Running Simulation...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span>Simulate Analog Trajectory</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
