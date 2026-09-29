import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay } from '../types';
import { forecastService } from '../services/forecastService';
import { XaiAttributionWaterfall } from '../components/ai/XaiAttributionWaterfall';
import { LeadTimeSelector } from '../components/controls/LeadTimeSelector';
import { 
  Sparkles, 
  Cpu, 
  Send, 
  Compass, 
  Layers, 
  TrendingDown, 
  Activity,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ExplainableAIProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
}

export const ExplainableAI: React.FC<ExplainableAIProps> = ({
  onSelectSubdivision,
  onNavigateToTab,
  onOpenBulletin
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const subdivisions = forecastService.getSubdivisions();
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || subdivisions[0]
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Explainable Meteorological AI (XAI) Suite
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              SHAP & INTEGRATED GRADIENTS CORE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deconstructing why a medium-range forecast is likely to fail into interpretable physical and dynamical drivers.
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Target Region:</span>
          <select
            value={selectedSub.id}
            onChange={(e) => {
              const s = forecastService.getSubdivisionById(e.target.value);
              if (s) {
                setSelectedSub(s);
                forecastService.playAlertBeep('click');
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-command-800 border border-command-border text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
          >
            {subdivisions.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lead Time Selector */}
      <LeadTimeSelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      {/* Main XAI Attribution Waterfall & Driver Matrix */}
      <XaiAttributionWaterfall
        subdivision={selectedSub}
        leadDay={selectedDay}
      />

      {/* Mathematical Methodology Card */}
      <div className="p-4 rounded-xl bg-command-850/90 border border-command-border text-xs font-mono space-y-2 text-slate-300">
        <div className="text-cyan-400 font-bold uppercase text-[11px] flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          <span>XAI Formulation Reference (MoES-NCMRWF Neural Calibration):</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          The bust attribution score represents the Shapley marginal contribution of synoptic feature x_i (e.g., baroclinic pressure gradient ∇p, 50-member QPF variance σ_QPF, or ERA5 analog distance d_ERA5) towards the transition into a high-error regime:
        </p>
        <div className="p-2.5 rounded bg-command-950 border border-command-border text-cyan-300 text-[11px] overflow-x-auto font-mono">
          P(Bust | X) = σ( β₀ + ∑ Φᵢ(xᵢ) + γ · Spread_ECMWF/NCUM + δ · Analog_Error )
        </div>
      </div>
    </div>
  );
};
