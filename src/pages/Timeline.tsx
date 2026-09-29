import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay } from '../types';
import { forecastService } from '../services/forecastService';
import { 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  Layers, 
  Activity, 
  BarChart2,
  Sparkles,
  ArrowDownRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';

interface TimelineProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onNavigateToTab: (tab: any) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  onSelectSubdivision,
  onNavigateToTab
}) => {
  const subdivisions = forecastService.getSubdivisions();
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || subdivisions[0]
  );
  const [compareSub, setCompareSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-odisha') || subdivisions[1]
  );

  // Build combined 10-day curve data
  const timelineData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => {
    const m1 = selectedSub.dayMetrics[d as LeadTimeDay];
    const m2 = compareSub.dayMetrics[d as LeadTimeDay];

    return {
      day: `Day ${d} (+${d * 24}h)`,
      leadDay: d,
      [selectedSub.name.split('(')[0].trim()]: m1.confidenceScore,
      [`${selectedSub.name.split('(')[0].trim()} Bust Prob`]: m1.bustProbability,
      [compareSub.name.split('(')[0].trim()]: m2.confidenceScore,
      Rainfall_Error: m1.variableErrors.rainfallQPF,
      Temp_Error: m1.variableErrors.temperature * 10,
      Wind_Error: m1.variableErrors.windSpeed * 4
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Forecast Reliability & Cliff Timeline
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              DAY 1 TO DAY 10 DEGRADATION DYNAMICS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking temporal decay and sudden confidence cliff transitions across medium-range forecast horizons.
          </p>
        </div>

        {/* Region Pickers */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Compare:</span>
          <select
            value={selectedSub.id}
            onChange={(e) => {
              const s = forecastService.getSubdivisionById(e.target.value);
              if (s) setSelectedSub(s);
            }}
            className="px-2.5 py-1 rounded bg-command-800 border border-command-border text-cyan-300 font-mono"
          >
            {subdivisions.map(s => <option key={s.id} value={s.id}>{s.name.split('(')[0]}</option>)}
          </select>

          <span className="text-slate-500">vs</span>

          <select
            value={compareSub.id}
            onChange={(e) => {
              const s = forecastService.getSubdivisionById(e.target.value);
              if (s) setCompareSub(s);
            }}
            className="px-2.5 py-1 rounded bg-command-800 border border-command-border text-amber-300 font-mono"
          >
            {subdivisions.map(s => <option key={s.id} value={s.id}>{s.name.split('(')[0]}</option>)}
          </select>
        </div>
      </div>

      {/* Uncertainty Acceleration Highlight Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-command-900 to-command-900 border border-rose-500/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <ArrowDownRight className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-rose-300 uppercase">
              Uncertainty Acceleration Index
            </span>
            <p className="text-sm font-display font-bold text-slate-100 mt-0.5">
              Confidence deterioration accelerated dramatically between Day 4 (+96h) and Day 5 (+120h).
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              D1: 92% → D2: 87% → D3: 81% → D4: 69% → <strong>D5: 32% (CLIFF)</strong> → D6: 28% → D10: 16%
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-lg font-mono font-black text-rose-400">-37% DROP</div>
          <span className="text-[10px] font-mono text-slate-400">24H CLIFF RATE</span>
        </div>
      </div>

      {/* Primary 10-Day Confidence Decay Line Chart */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            10-Day Confidence Deterioration & Bust Probability Curve
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">
            Lead Time: T+24h to T+240h
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="bustGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1E2D4E" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis domain={[0, 100]} stroke="#64748B" fontSize={11} fontFamily="JetBrains Mono" unit="%" />
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
              <ReferenceLine x="Day 5 (+120h)" stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'CLIFF D5', fill: '#EF4444', fontSize: 11 }} />
              <Area type="monotone" dataKey={selectedSub.name.split('(')[0].trim()} name={`${selectedSub.name.split('(')[0]} Confidence %`} stroke="#00F0FF" strokeWidth={2.5} fill="url(#confGrad)" />
              <Area type="monotone" dataKey={compareSub.name.split('(')[0].trim()} name={`${compareSub.name.split('(')[0]} Confidence %`} stroke="#F59E0B" strokeWidth={2} fill="none" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Multi-Parameter Error Expansion Chart */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            Parameter Error Expansion by Lead Time ({selectedSub.name})
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            Rainfall QPF Error (mm) vs Wind Shear (m/s) vs Temp (°C)
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid stroke="#1E2D4E" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
              <YAxis stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#00F0FF',
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '8px' }} />
              <Line type="monotone" dataKey="Rainfall_Error" name="Rainfall QPF Error (mm)" stroke="#A855F7" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Wind_Error" name="Wind Shear Error (m/s scaled)" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Temp_Error" name="Temperature Bias (°C scaled)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
