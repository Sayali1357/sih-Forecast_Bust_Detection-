import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay, RiskLevel } from '../types';
import { forecastService } from '../services/forecastService';
import { 
  AlertTriangle, 
  Filter, 
  Search, 
  ArrowUpDown, 
  TrendingUp, 
  Layers, 
  BarChart2, 
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';

interface BustProbabilityProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
}

export const BustProbability: React.FC<BustProbabilityProps> = ({
  onSelectSubdivision,
  onNavigateToTab,
  onOpenBulletin
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'bustProb' | 'confidence' | 'name'>('bustProb');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const subdivisions = forecastService.getSubdivisions();

  // Filter & sort subdivisions
  const filteredSubdivisions = subdivisions.filter((sub) => {
    const metric = sub.dayMetrics[selectedDay];
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.activeWeatherSystem.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = selectedRisk === 'ALL' || metric.riskLevel.toUpperCase() === selectedRisk.toUpperCase();

    return matchesSearch && matchesRisk;
  }).sort((a, b) => {
    const metricA = a.dayMetrics[selectedDay];
    const metricB = b.dayMetrics[selectedDay];

    if (sortBy === 'bustProb') {
      return sortAsc ? metricA.bustProbability - metricB.bustProbability : metricB.bustProbability - metricA.bustProbability;
    }
    if (sortBy === 'confidence') {
      return sortAsc ? metricA.confidenceScore - metricB.confidenceScore : metricB.confidenceScore - metricA.confidenceScore;
    }
    return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  // Chart data for lead-time bust curve across India average
  const leadTimeCurveData = [
    { day: 'D1 (+24h)', avgBust: 8, maxBust: 14, minConf: 88 },
    { day: 'D2 (+48h)', avgBust: 13, maxBust: 22, minConf: 82 },
    { day: 'D3 (+72h)', avgBust: 19, maxBust: 34, minConf: 74 },
    { day: 'D4 (+96h)', avgBust: 31, maxBust: 52, minConf: 62 },
    { day: 'D5 (+120h)', avgBust: 68, maxBust: 78, minConf: 22 }, // CLIFF
    { day: 'D6 (+144h)', avgBust: 72, maxBust: 82, minConf: 18 },
    { day: 'D7 (+168h)', avgBust: 76, maxBust: 85, minConf: 15 },
    { day: 'D8 (+192h)', avgBust: 81, maxBust: 88, minConf: 12 },
    { day: 'D9 (+216h)', avgBust: 83, maxBust: 89, minConf: 11 },
    { day: 'D10 (+240h)', avgBust: 84, maxBust: 91, minConf: 10 },
  ];

  // Distribution chart data
  const riskDistributionData = [
    { name: 'Critical (>70%)', count: subdivisions.filter(s => s.dayMetrics[selectedDay].bustProbability >= 70).length, fill: '#EF4444' },
    { name: 'High (50-70%)', count: subdivisions.filter(s => s.dayMetrics[selectedDay].bustProbability >= 50 && s.dayMetrics[selectedDay].bustProbability < 70).length, fill: '#F59E0B' },
    { name: 'Moderate (30-50%)', count: subdivisions.filter(s => s.dayMetrics[selectedDay].bustProbability >= 30 && s.dayMetrics[selectedDay].bustProbability < 50).length, fill: '#38BDF8' },
    { name: 'Low (<30%)', count: subdivisions.filter(s => s.dayMetrics[selectedDay].bustProbability < 30).length, fill: '#10B981' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Forecast Bust Probability Matrix
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              MEDIUM-RANGE RELIABILITY VERIFICATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Statistical estimation of forecast failure probability and ensemble spread across all 36 subdivisions.
          </p>
        </div>

        {/* Lead Day Selector Buttons */}
        <div className="flex items-center gap-1 bg-command-800 p-1 rounded-lg border border-command-border text-xs font-mono">
          <span className="px-2 text-slate-400 text-[10px]">LEAD DAY:</span>
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as LeadTimeDay[]).map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDay(d);
                forecastService.playAlertBeep('click');
              }}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDay === d
                  ? 'bg-cyan-500 text-command-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              D{d}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead-Time Bust Probability Curve (8 Cols) */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-command-border">
            <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
              National Average vs Maximum Bust Probability Horizon (D1 to D10)
            </h3>
            <span className="text-[10px] font-mono text-rose-400 font-bold">
              CLIFF ACCELERATION: T+96h → T+120h
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadTimeCurveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1E2D4E" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis domain={[0, 100]} stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" unit="%" />
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
                <Line type="monotone" dataKey="maxBust" name="Max Regional Bust %" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="avgBust" name="National Avg Bust %" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="minConf" name="Lowest Confidence %" stroke="#00F0FF" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Risk Distribution Bar Chart (4 Cols) */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-command-border">
            <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
              Risk Distribution (Day {selectedDay})
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Total: {subdivisions.length} Zones</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#00F0FF',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by Subdivision, State, Code..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-command-800 border border-command-border text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center gap-1 bg-command-800 p-1 rounded-lg border border-command-border text-xs font-mono">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRisk(r)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  selectedRisk === r
                    ? 'bg-cyan-500 text-command-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <strong>{filteredSubdivisions.length}</strong> of {subdivisions.length} subdivisions at <strong>Day {selectedDay}</strong>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl bg-command-900 border border-command-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-command-850 border-b border-command-border text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="p-3.5">
                  <button 
                    onClick={() => {
                      setSortBy('name');
                      setSortAsc(!sortAsc);
                    }}
                    className="flex items-center gap-1 hover:text-cyan-400"
                  >
                    <span>Subdivision</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="p-3.5">Lead Horizon</th>
                <th className="p-3.5">
                  <button 
                    onClick={() => {
                      setSortBy('bustProb');
                      setSortAsc(!sortAsc);
                    }}
                    className="flex items-center gap-1 hover:text-rose-400 text-rose-400 font-bold"
                  >
                    <span>Bust Prob</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="p-3.5">
                  <button 
                    onClick={() => {
                      setSortBy('confidence');
                      setSortAsc(!sortAsc);
                    }}
                    className="flex items-center gap-1 hover:text-cyan-400"
                  >
                    <span>Confidence</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="p-3.5">Expected Error</th>
                <th className="p-3.5">Weather System</th>
                <th className="p-3.5">Model Spread</th>
                <th className="p-3.5">Agreement</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-border">
              {filteredSubdivisions.map((sub) => {
                const metric = sub.dayMetrics[selectedDay];
                const isCrit = metric.bustProbability >= 70;
                const isHigh = metric.bustProbability >= 50 && metric.bustProbability < 70;

                return (
                  <tr 
                    key={sub.id}
                    className="hover:bg-command-850/70 transition-colors group cursor-pointer"
                    onClick={() => {
                      onSelectSubdivision(sub);
                      onNavigateToTab('region-detail');
                    }}
                  >
                    <td className="p-3.5 font-bold text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        isCrit ? 'bg-rose-500 animate-pulse' : isHigh ? 'bg-amber-400' : 'bg-cyan-400'
                      }`} />
                      <div>
                        <div className="group-hover:text-cyan-300 transition-colors">{sub.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{sub.state} • {sub.code}</div>
                      </div>
                    </td>

                    <td className="p-3.5 text-cyan-300">
                      Day {selectedDay} (+{(selectedDay * 24)}h)
                    </td>

                    <td className="p-3.5">
                      <span className={`text-sm font-black px-2 py-0.5 rounded ${
                        isCrit 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                          : isHigh 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {metric.bustProbability}%
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className={`font-bold ${
                        metric.confidenceScore < 40 ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {metric.confidenceScore}%
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-300">
                      {metric.expectedError} (±{metric.variableErrors.rainfallQPF}mm)
                    </td>

                    <td className="p-3.5 text-slate-300 max-w-[180px] truncate">
                      {sub.activeWeatherSystem}
                    </td>

                    <td className="p-3.5 text-purple-300">
                      ±{metric.modelSpread} mm
                    </td>

                    <td className="p-3.5">
                      <span className="text-slate-300">{metric.modelAgreementLabel}</span>
                      <span className="text-[10px] text-slate-500 ml-1">({metric.modelAgreement})</span>
                    </td>

                    <td className="p-3.5 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          onSelectSubdivision(sub);
                          onNavigateToTab('explainable-ai');
                        }}
                        className="px-2 py-1 rounded bg-command-800 hover:bg-cyan-500 hover:text-command-950 text-slate-300 text-[11px] border border-command-border transition-colors"
                        title="Inspect XAI drivers"
                      >
                        XAI
                      </button>

                      <button
                        onClick={() => onOpenBulletin(sub, selectedDay)}
                        className="px-2 py-1 rounded bg-rose-600/80 hover:bg-rose-500 text-white text-[11px] font-bold transition-colors"
                        title="Dispatch Bulletin"
                      >
                        Alert
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
