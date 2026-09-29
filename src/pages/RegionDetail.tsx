import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay, WeatherVariable } from '../types';
import { forecastService } from '../services/forecastService';
import { LeadTimeSelector } from '../components/controls/LeadTimeSelector';
import { EnsembleComparison } from '../components/cards/EnsembleComparison';
import { XaiAttributionWaterfall } from '../components/ai/XaiAttributionWaterfall';
import { HistoricalAnalogCard } from '../components/cards/HistoricalAnalogCard';
import { AlertCard } from '../components/alerts/AlertCard';
import { 
  Compass, 
  MapPin, 
  Layers, 
  Send, 
  History, 
  Sparkles, 
  GitCompare, 
  TrendingDown, 
  Bell, 
  Database,
  BarChart2,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface RegionDetailProps {
  selectedSubdivision: MeteorologicalSubdivision | null;
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
  onNavigateToTab: (tab: any) => void;
}

export const RegionDetail: React.FC<RegionDetailProps> = ({
  selectedSubdivision,
  onSelectSubdivision,
  onOpenBulletin,
  onNavigateToTab
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const [activeTab, setActiveTab] = useState<'overview' | 'ensembles' | 'xai' | 'analogs' | 'memory' | 'alerts'>('overview');
  const subdivisions = forecastService.getSubdivisions();

  const sub = selectedSubdivision || forecastService.getSubdivisionById('sub-mh-konkan') || subdivisions[0];
  const currentMetric = sub.dayMetrics[selectedDay];

  // 10-day curve for this region
  const curveData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => {
    const m = sub.dayMetrics[d as LeadTimeDay];
    return {
      day: `D${d}`,
      confidence: m.confidenceScore,
      bustProb: m.bustProbability,
      spread: m.modelSpread,
      qpfError: m.variableErrors.rainfallQPF
    };
  });

  const regionalAlerts = forecastService.getAlerts().filter(
    a => a.region.toLowerCase().includes(sub.name.split('(')[0].trim().toLowerCase()) ||
         a.state.toLowerCase() === sub.state.toLowerCase()
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Region Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-command-900 border border-cyan-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/50 text-cyan-400">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  {sub.code}
                </span>
                <span className="text-xs font-mono text-slate-400">{sub.state} • Sub-grid {sub.lat}°N {sub.lng}°E</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-display mt-1">
                {sub.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {sub.synopticDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Switcher */}
            <select
              value={sub.id}
              onChange={(e) => {
                const s = forecastService.getSubdivisionById(e.target.value);
                if (s) {
                  onSelectSubdivision(s);
                  forecastService.playAlertBeep('click');
                }
              }}
              className="px-3 py-2 rounded-lg bg-command-800 border border-command-border text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
            >
              {subdivisions.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>

            <button
              onClick={() => onOpenBulletin(sub, selectedDay)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-rose-950/50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Export Bulletin</span>
            </button>
          </div>
        </div>

        {/* 5 Core Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-command-border">
          <div className="p-3 rounded-lg bg-command-850/80 border border-command-border">
            <span className="text-slate-500 text-[10px] font-mono block">DAY {selectedDay} CONFIDENCE</span>
            <span className={`text-xl font-black font-mono ${
              currentMetric.confidenceScore < 40 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {currentMetric.confidenceScore}%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-command-850/80 border border-command-border">
            <span className="text-slate-500 text-[10px] font-mono block">BUST PROBABILITY</span>
            <span className={`text-xl font-black font-mono ${
              currentMetric.bustProbability >= 65 ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {currentMetric.bustProbability}%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-command-850/80 border border-command-border">
            <span className="text-slate-500 text-[10px] font-mono block">EXPECTED BIAS</span>
            <span className="text-lg font-bold font-mono text-slate-100">
              ±{currentMetric.modelSpread} mm
            </span>
          </div>

          <div className="p-3 rounded-lg bg-command-850/80 border border-command-border">
            <span className="text-slate-500 text-[10px] font-mono block">MODEL AGREEMENT</span>
            <span className="text-lg font-bold font-mono text-rose-400">
              {currentMetric.modelAgreementLabel}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-command-850/80 border border-command-border col-span-2 sm:col-span-1">
            <span className="text-slate-500 text-[10px] font-mono block">HISTORICAL TWIN</span>
            <span className="text-lg font-bold font-mono text-cyan-300">
              {currentMetric.historicalAnalog.year} ({currentMetric.historicalAnalog.similarity}%)
            </span>
          </div>
        </div>
      </div>

      {/* Lead Time Slider */}
      <LeadTimeSelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      {/* Navigation Tabs for Deep-Dive */}
      <div className="flex flex-wrap items-center gap-1 border-b border-command-border pb-1">
        {[
          { id: 'overview', label: '10-Day Timeline & Overview', icon: TrendingDown },
          { id: 'ensembles', label: '4-Way Ensembles', icon: GitCompare },
          { id: 'xai', label: 'XAI Drivers & Briefing', icon: Sparkles },
          { id: 'analogs', label: 'ERA5 Historical Twins', icon: History },
          { id: 'memory', label: 'Regional Error Memory', icon: Database },
          { id: 'alerts', label: `Alerts (${regionalAlerts.length})`, icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                forecastService.playAlertBeep('click');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-lg text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-command-900 border-t-2 border-t-cyan-400 border-x border-command-border text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-command-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* Tab 1: Overview & 10-Day Curves */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-command-border">
                <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
                  10-Day Reliability & Failure Curve for {sub.name}
                </h3>
                <span className="text-[10px] font-mono text-cyan-400">T+24h to T+240h</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={curveData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
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
                    <Line type="monotone" dataKey="confidence" name="Confidence Score %" stroke="#00F0FF" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="bustProb" name="Bust Probability %" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="spread" name="Model Spread (mm)" stroke="#A855F7" strokeWidth={1.5} strokeDasharray="4 4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Synoptic Briefing & XAI preview */}
            <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-2 text-xs font-sans text-slate-300">
              <div className="text-cyan-400 font-mono font-bold uppercase text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Day {selectedDay} AI Synoptic Diagnostic</span>
              </div>
              <p className="leading-relaxed italic">
                "{currentMetric.synopticBriefing}"
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Ensembles */}
        {activeTab === 'ensembles' && (
          <EnsembleComparison
            subdivision={sub}
            leadDay={selectedDay}
          />
        )}

        {/* Tab 3: Explainable AI */}
        {activeTab === 'xai' && (
          <XaiAttributionWaterfall
            subdivision={sub}
            leadDay={selectedDay}
          />
        )}

        {/* Tab 4: Historical Analogs */}
        {activeTab === 'analogs' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-command-900 border border-command-border">
              <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider pb-2 border-b border-command-border">
                Closest Historical Synoptic Twin for {sub.name}
              </h3>
              <div className="mt-3">
                <HistoricalAnalogCard
                  analog={forecastService.getHistoricalAnalogs()[0]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Regional Error Memory */}
        {activeTab === 'memory' && (
          <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-command-border">
              <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Historical Forecast Error Memory ({sub.name})
              </h3>
              <span className="text-[10px] font-mono text-slate-400">IMD Division Code: {sub.code}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-command-850 border border-command-border space-y-1">
                <span className="text-slate-500 text-[10px] block">SYSTEMATIC BIAS SIGNATURE</span>
                <span className="text-rose-400 font-bold text-sm block">{sub.historicalMemory.systematicBias}</span>
                <p className="text-slate-400 text-[11px] font-sans">Recurring bias pattern identified across last 25 monsoon seasons.</p>
              </div>

              <div className="p-3.5 rounded-lg bg-command-850 border border-command-border space-y-1">
                <span className="text-slate-500 text-[10px] block">HISTORICAL AVERAGE MAE</span>
                <span className="text-cyan-300 font-bold text-sm block">{sub.historicalMemory.avgMAE} mm QPF</span>
                <p className="text-slate-400 text-[11px] font-sans">Mean absolute error for +96h to +144h medium-range lead time.</p>
              </div>

              <div className="p-3.5 rounded-lg bg-command-850 border border-command-border space-y-1">
                <span className="text-slate-500 text-[10px] block">MOST VULNERABLE METEOROLOGICAL VARIABLE</span>
                <span className="text-amber-300 font-bold text-sm block">{sub.historicalMemory.mostVulnerableVariable}</span>
                <p className="text-slate-400 text-[11px] font-sans">Subject to severe localized spikes during convective surges.</p>
              </div>

              <div className="p-3.5 rounded-lg bg-command-850 border border-command-border space-y-1">
                <span className="text-slate-500 text-[10px] block">DOMINANT FAILURE MECHANISM</span>
                <span className="text-purple-300 font-bold text-sm block">{sub.historicalMemory.dominantFailureMechanism}</span>
                <p className="text-slate-400 text-[11px] font-sans">Identified dynamical core bottleneck in operational NWP suites.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Alerts */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
              Operational Alerts for {sub.name} ({regionalAlerts.length})
            </h3>
            {regionalAlerts.length === 0 ? (
              <div className="p-8 rounded-xl bg-command-900 border border-command-border text-center text-xs font-mono text-slate-400">
                No active critical alerts for {sub.name}. Forecast parameters are within regular operational tolerances.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regionalAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
