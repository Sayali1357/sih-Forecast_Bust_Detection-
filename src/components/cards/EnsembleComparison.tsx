import React from 'react';
import { MeteorologicalSubdivision, LeadTimeDay, WeatherVariable } from '../../types';
import { GitCompare, AlertTriangle, CheckCircle2, TrendingUp, Cpu, Gauge } from 'lucide-react';

interface EnsembleComparisonProps {
  subdivision: MeteorologicalSubdivision;
  leadDay: LeadTimeDay;
  selectedVariable?: WeatherVariable;
  onVariableChange?: (variable: WeatherVariable) => void;
}

export const EnsembleComparison: React.FC<EnsembleComparisonProps> = ({
  subdivision,
  leadDay,
  selectedVariable = 'rainfall',
  onVariableChange
}) => {
  const metric = subdivision.dayMetrics[leadDay];
  if (!metric) return null;

  const models = metric.models;
  const spread = metric.modelSpread;
  const agreement = metric.modelAgreement;
  const agreementLabel = metric.modelAgreementLabel;

  const isHighSpread = spread > 30;

  return (
    <div className="w-full bg-command-900/90 rounded-xl border border-command-border p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 font-display uppercase tracking-wider">
              4-Way NWP Ensemble Disagreement
            </h3>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
              CYCLE 00Z RUN
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Inter-model verification for <span className="text-cyan-400 font-semibold">{subdivision.name}</span> at <span className="text-cyan-400 font-semibold">Day {leadDay} (+{(leadDay * 24)}h)</span>
          </p>
        </div>

        {/* Variable Switcher */}
        {onVariableChange && (
          <div className="flex items-center gap-1 bg-command-800 p-1 rounded-lg border border-command-border text-[11px] font-mono">
            {(['rainfall', 'temperature', 'wind', 'pressure'] as WeatherVariable[]).map((v) => (
              <button
                key={v}
                onClick={() => onVariableChange(v)}
                className={`px-2 py-0.5 rounded capitalize transition-colors ${
                  selectedVariable === v
                    ? 'bg-cyan-500 text-command-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* High Spread Alert Banner */}
      <div className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
        isHighSpread
          ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
      }`}>
        <div className="flex items-center gap-2.5">
          {isHighSpread ? (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <div>
            <div className="text-xs font-bold font-mono">
              {isHighSpread ? 'CRITICAL ENSEMBLE SPREAD DETECTED' : 'ENSEMBLE CONVERGENCE MAINTAINED'}
            </div>
            <p className="text-[11px] text-slate-300">
              {isHighSpread
                ? `Multi-model consensus threshold breached (±${spread} mm variance). Spatial core shifts between Indian & European dynamical cores.`
                : `Moderate inter-model agreement (Spread ±${spread} mm) within safe operational bounds.`}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-lg font-black font-mono text-rose-400">±{spread} mm</div>
          <div className="text-[9px] font-mono text-slate-400 uppercase">QPF SPREAD σ</div>
        </div>
      </div>

      {/* 4 Model Comparison Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Model 1: NCUM-G (NCMRWF) */}
        <div className="p-3 rounded-lg bg-command-850/80 border border-command-border flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono pb-1 border-b border-command-border">
              <span className="font-bold text-slate-100">NCUM-G</span>
              <span className="text-[10px] text-cyan-400 px-1 py-0.2 rounded bg-cyan-500/10">INDIA OPER 12km</span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-slate-100">{models.ncum.value}</span>
              <span className="text-xs font-mono text-slate-400 ml-1">{models.ncum.unit}</span>
            </div>
            <div className="text-[11px] text-cyan-300 font-mono">{models.ncum.desc}</div>
          </div>
          <div className="mt-2 pt-2 border-t border-command-border text-[10px] font-mono text-slate-400 flex justify-between">
            <span>MSLP: {models.ncum.pressure} hPa</span>
            <span>T: {models.ncum.temp}°C</span>
          </div>
        </div>

        {/* Model 2: ECMWF IFS */}
        <div className="p-3 rounded-lg bg-command-850/80 border border-command-border flex flex-col justify-between hover:border-amber-500/40 transition-colors">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono pb-1 border-b border-command-border">
              <span className="font-bold text-slate-100">ECMWF IFS</span>
              <span className="text-[10px] text-amber-400 px-1 py-0.2 rounded bg-amber-500/10">9km HRES</span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-amber-400">{models.ecmwf.value}</span>
              <span className="text-xs font-mono text-slate-400 ml-1">{models.ecmwf.unit}</span>
            </div>
            <div className="text-[11px] text-amber-300 font-mono">{models.ecmwf.desc}</div>
          </div>
          <div className="mt-2 pt-2 border-t border-command-border text-[10px] font-mono text-slate-400 flex justify-between">
            <span>MSLP: {models.ecmwf.pressure} hPa</span>
            <span>T: {models.ecmwf.temp}°C</span>
          </div>
        </div>

        {/* Model 3: NCEP GFS */}
        <div className="p-3 rounded-lg bg-command-850/80 border border-command-border flex flex-col justify-between hover:border-sky-500/40 transition-colors">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono pb-1 border-b border-command-border">
              <span className="font-bold text-slate-100">NCEP GFS</span>
              <span className="text-[10px] text-sky-400 px-1 py-0.2 rounded bg-sky-500/10">GLOBAL 13km</span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-sky-300">{models.gfs.value}</span>
              <span className="text-xs font-mono text-slate-400 ml-1">{models.gfs.unit}</span>
            </div>
            <div className="text-[11px] text-sky-300 font-mono">{models.gfs.desc}</div>
          </div>
          <div className="mt-2 pt-2 border-t border-command-border text-[10px] font-mono text-slate-400 flex justify-between">
            <span>MSLP: {models.gfs.pressure} hPa</span>
            <span>T: {models.gfs.temp}°C</span>
          </div>
        </div>

        {/* Model 4: MoES AI-DL Hybrid */}
        <div className="p-3 rounded-lg bg-command-850/80 border border-purple-500/30 flex flex-col justify-between hover:border-purple-400 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 px-1.5 py-0.2 rounded-bl text-[8px] font-mono font-bold bg-purple-600 text-white">
            AI-HYBRID
          </div>
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono pb-1 border-b border-command-border">
              <span className="font-bold text-slate-100">MoES AI-DL</span>
              <span className="text-[10px] text-purple-300 px-1 py-0.2 rounded bg-purple-500/10">NEURAL EMULATOR</span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-black font-mono text-purple-300">{models.moesAi.value}</span>
              <span className="text-xs font-mono text-slate-400 ml-1">{models.moesAi.unit}</span>
            </div>
            <div className="text-[11px] text-purple-200 font-mono">{models.moesAi.desc}</div>
          </div>
          <div className="mt-2 pt-2 border-t border-command-border text-[10px] font-mono text-slate-400 flex justify-between">
            <span>MSLP: {models.moesAi.pressure} hPa</span>
            <span>T: {models.moesAi.temp}°C</span>
          </div>
        </div>
      </div>

      {/* Model Agreement & Spread Bar Visualizer */}
      <div className="p-3 rounded-lg bg-command-850 border border-command-border space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            Inter-Model Agreement Score: <span className="text-cyan-400 font-bold">{agreement}</span> ({agreementLabel})
          </span>
          <span className="text-slate-400 text-[11px]">Consensus Threshold: 0.65</span>
        </div>

        <div className="w-full bg-command-750 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              agreement < 0.35 
                ? 'bg-rose-500' 
                : agreement < 0.60 
                ? 'bg-amber-400' 
                : 'bg-emerald-400'
            }`}
            style={{ width: `${Math.round(agreement * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
