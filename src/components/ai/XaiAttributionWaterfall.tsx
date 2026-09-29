import React from 'react';
import { MeteorologicalSubdivision, LeadTimeDay } from '../../types';
import { Sparkles, TrendingUp, TrendingDown, Layers, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

interface XaiAttributionWaterfallProps {
  subdivision: MeteorologicalSubdivision;
  leadDay: LeadTimeDay;
}

export const XaiAttributionWaterfall: React.FC<XaiAttributionWaterfallProps> = ({
  subdivision,
  leadDay
}) => {
  const metric = subdivision.dayMetrics[leadDay];
  if (!metric) return null;

  const negativeDrivers = metric.xaiDrivers.filter(d => d.category === 'negative');
  const positiveDrivers = metric.xaiDrivers.filter(d => d.category === 'positive');

  return (
    <div className="w-full bg-command-900/90 rounded-xl border border-command-border p-4 space-y-4">
      {/* Header & Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-slate-100 font-display uppercase tracking-wider">
              Explainable Meteorological AI (XAI)
            </h3>
            <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
              SHAP + INTEGRATED GRADIENTS
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Diagnostic feature attribution for <span className="text-cyan-400 font-semibold">{subdivision.name}</span> at <span className="text-cyan-400 font-semibold">Day {leadDay} (+{(leadDay*24)}h)</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-command-800 border border-command-border text-xs font-mono">
            <span className="text-slate-400">Confidence: </span>
            <span className={`font-bold ${metric.confidenceScore < 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {metric.confidenceScore}%
            </span>
            <span className="text-slate-500 mx-1">|</span>
            <span className="text-slate-400">Bust Prob: </span>
            <span className={`font-bold ${metric.bustProbability >= 60 ? 'text-rose-400' : 'text-amber-400'}`}>
              {metric.bustProbability}%
            </span>
          </div>
        </div>
      </div>

      {/* Natural-Language AI Meteorological Briefing */}
      <div className="p-3.5 rounded-lg bg-command-850 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed font-sans relative">
        <div className="text-[11px] font-mono text-cyan-400 font-bold mb-1 flex items-center gap-1.5 uppercase tracking-wide">
          <Cpu className="w-3.5 h-3.5" />
          <span>Synthesized Synoptic Briefing</span>
        </div>
        <p className="italic">
          "{metric.synopticBriefing}"
        </p>
        <div className="mt-2 pt-2 border-t border-command-border flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Evaluated by MoES-XAI Neural Core v4.2</span>
          <span className="text-cyan-400/80 font-bold">50-Member Ensemble Spread: ±{metric.modelSpread}mm</span>
        </div>
      </div>

      {/* Feature Attribution Bar Graph */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold uppercase tracking-wider">Uncertainty Attribution Drivers (SHAP Magnitude)</span>
          <span className="text-slate-400 text-[10px]">Impact towards forecast failure risk</span>
        </div>

        <div className="space-y-2">
          {metric.xaiDrivers.map((item, index) => {
            const isNeg = item.category === 'negative';
            return (
              <div 
                key={item.feature}
                className="p-2.5 rounded-lg bg-command-850/60 border border-command-border/80 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                      isNeg ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className="text-slate-200 font-semibold">{item.feature}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{item.delta}</span>
                    <span className={`font-bold text-xs ${isNeg ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isNeg ? `+${item.impactPercent}% IMPACT` : `+${item.impactPercent}% SUPPORT`}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-command-750 h-2 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full ${
                      isNeg 
                        ? 'bg-gradient-to-r from-rose-500 to-red-400' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                    style={{ width: `${Math.min(100, item.impactPercent * 2.5)}%` }}
                  />
                </div>

                <p className="text-[10.5px] text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confidence Drivers Matrix: Destabilizing vs Supporting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {/* Negative / Destabilizing */}
        <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-rose-300 font-bold pb-1 border-b border-rose-500/20">
            <span className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              Destabilizing Drivers (Bust Inducers)
            </span>
            <span>&gt;80% Cumulative</span>
          </div>

          <ul className="space-y-1.5 text-[11px] text-slate-300 font-mono">
            {negativeDrivers.map(d => (
              <li key={d.feature} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold mt-0.5">•</span>
                <span className="flex-1 text-slate-300">{d.feature}: <span className="text-slate-400 text-[10px]">{d.description}</span></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Positive / Supporting */}
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-300 font-bold pb-1 border-b border-emerald-500/20">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Supporting Drivers (Stabilizers)
            </span>
            <span>+21% Cumulative</span>
          </div>

          <ul className="space-y-1.5 text-[11px] text-slate-300 font-mono">
            {positiveDrivers.map(d => (
              <li key={d.feature} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span className="flex-1 text-slate-300">{d.feature}: <span className="text-slate-400 text-[10px]">{d.description}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
