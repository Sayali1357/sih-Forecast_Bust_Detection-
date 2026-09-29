import React, { useState } from 'react';
import { MeteorologicalSubdivision, HistoricalAnalogCase } from '../types';
import { forecastService } from '../services/forecastService';
import { HistoricalAnalogCard } from '../components/cards/HistoricalAnalogCard';
import { 
  History, 
  Sparkles, 
  Layers, 
  Cpu, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  BarChart2, 
  Compass,
  ArrowRight
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

interface HistoricalAnalogsProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onNavigateToTab: (tab: any) => void;
}

export const HistoricalAnalogs: React.FC<HistoricalAnalogsProps> = ({
  onSelectSubdivision,
  onNavigateToTab
}) => {
  const analogs = forecastService.getHistoricalAnalogs();
  const subdivisions = forecastService.getSubdivisions();
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || subdivisions[0]
  );
  const [biasApplied, setBiasApplied] = useState(false);

  // Comparison chart of historical forecast vs realized outcome
  const analogChartData = analogs.map((a) => ({
    name: `${a.year} ${a.weatherSystem.split(' ')[0]}`,
    Forecast_QPF: parseInt(a.forecastValue) || 120,
    Actual_Observed: parseInt(a.actualValue) || 240,
    Similarity: a.similarityScore
  }));

  const handleApplyBias = () => {
    forecastService.playAlertBeep('click');
    setBiasApplied(true);
    setTimeout(() => setBiasApplied(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Historical Analog Intelligence Engine
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              NCMRWF ERA5 REANALYSIS VAULT (1979–2025)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep-learning atmospheric twin search comparing current 500hPa geopotential and vorticity fields with historical forecast bust events.
          </p>
        </div>

        <button
          onClick={handleApplyBias}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-colors"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{biasApplied ? '✓ Historical Bias Correction Active' : 'Apply Analog Bias Correction'}</span>
        </button>
      </div>

      {/* Top Synoptic Pattern Reference Box */}
      <div className="p-4 rounded-xl bg-command-900 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            CURRENT ATMOSPHERIC PATTERN UNDER EVALUATION
          </span>
          <span className="text-[10px] font-mono text-slate-400">CYCLE 00Z RUN</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-command-850 border border-command-border">
            <span className="text-slate-500 text-[10px] block">PRIMARY REGION</span>
            <span className="text-slate-100 font-bold">{selectedSub.name}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-command-850 border border-command-border">
            <span className="text-slate-500 text-[10px] block">ACTIVE SYNOPTIC SYSTEM</span>
            <span className="text-cyan-300 font-bold">{selectedSub.activeWeatherSystem}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-command-850 border border-command-border">
            <span className="text-slate-500 text-[10px] block">CRITICAL LEAD TIME</span>
            <span className="text-amber-400 font-bold">Day 4 to Day 6 (+96h to +144h)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-command-850 border border-command-border">
            <span className="text-slate-500 text-[10px] block">KEY ANOMALY VECTOR</span>
            <span className="text-rose-400 font-bold">Δp: -4.2 hPa / 6h offshore drop</span>
          </div>
        </div>
      </div>

      {/* Historical Forecast Error Comparison Bar Chart */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            Historical Forecast vs Realized Outcome in Matched Analog Situations
          </h3>
          <span className="text-[10px] font-mono text-rose-400 font-bold">
            Average Under/Over-prediction Error: ±88 mm QPF
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analogChartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
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
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '8px' }} />
              <Bar dataKey="Forecast_QPF" name="NWP Forecast (Day 5)" fill="#38BDF8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Actual_Observed" name="Actual Realized Rain (Observed)" fill="#EF4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Analog Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            Top Atmospheric AI Similarity Matches (Ranked by Euclidean Embedding Distance)
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            {analogs.length} Historical Twins Identified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analogs.map((analog) => (
            <HistoricalAnalogCard
              key={analog.id}
              analog={analog}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
