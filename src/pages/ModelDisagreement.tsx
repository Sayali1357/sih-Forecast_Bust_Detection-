import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay, WeatherVariable } from '../types';
import { forecastService } from '../services/forecastService';
import { EnsembleComparison } from '../components/cards/EnsembleComparison';
import { LeadTimeSelector } from '../components/controls/LeadTimeSelector';
import { 
  GitCompare, 
  Layers, 
  CloudRain, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles, 
  Send,
  Compass,
  Cpu,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface ModelDisagreementProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
}

export const ModelDisagreement: React.FC<ModelDisagreementProps> = ({
  onSelectSubdivision,
  onNavigateToTab,
  onOpenBulletin
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const [selectedVar, setSelectedVar] = useState<WeatherVariable>('rainfall');
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || forecastService.getSubdivisions()[0]
  );

  const subdivisions = forecastService.getSubdivisions();
  const currentMetric = selectedSub.dayMetrics[selectedDay];

  // Inter-model comparison data across top 5 vulnerable regions
  const interModelSpreadData = subdivisions.slice(0, 5).map((s) => {
    const m = s.dayMetrics[selectedDay];
    return {
      name: s.name.split('(')[0].trim(),
      NCUM: m.models.ncum.value,
      ECMWF: m.models.ecmwf.value,
      GFS: m.models.gfs.value,
      MoES_AI: m.models.moesAi.value,
      spread: m.modelSpread
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Forecast Model Disagreement Index
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              NCUM • ECMWF IFS • NCEP GFS • MoES AI-DL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quantifying NWP ensemble divergence and spatial spread to isolate forecast unreliability zones.
          </p>
        </div>

        {/* Region Quick Switcher */}
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

      {/* 4-Way NWP Ensemble Card Component */}
      <EnsembleComparison
        subdivision={selectedSub}
        leadDay={selectedDay}
        selectedVariable={selectedVar}
        onVariableChange={setSelectedVar}
      />

      {/* Multi-Subdivision Inter-Model Bar Chart */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            Multi-Model Precipitation Spread Across High-Risk Hotspots (Day {selectedDay})
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">
            UNIT: mm / 24h QPF
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interModelSpreadData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid stroke="#1E2D4E" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#64748B" fontSize={11} fontFamily="JetBrains Mono" unit="mm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#00F0FF',
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '10px' }} />
              <Bar dataKey="NCUM" name="NCUM-G (12km)" fill="#00F0FF" radius={[3, 3, 0, 0]} />
              <Bar dataKey="ECMWF" name="ECMWF IFS (9km)" fill="#F59E0B" radius={[3, 3, 0, 0]} />
              <Bar dataKey="GFS" name="NCEP GFS (13km)" fill="#38BDF8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="MoES_AI" name="MoES AI-DL (Hybrid)" fill="#A855F7" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scientific Principle Card */}
      <div className="p-4 rounded-xl bg-command-850/80 border border-command-border text-xs font-sans text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold uppercase text-[11px]">
          <Info className="w-4 h-4" />
          <span>Meteorological Interpretation Note:</span>
        </div>
        <p className="leading-relaxed">
          While multi-model disagreement indicates elevated uncertainty, high disagreement alone does not prove a forecast bust. The AI Reliability Engine correlates model spread with historical analog error patterns and physical boundary layer anomalies before generating operational bust probabilities.
        </p>
      </div>
    </div>
  );
};
