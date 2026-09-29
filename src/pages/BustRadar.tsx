import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay } from '../types';
import { forecastService } from '../services/forecastService';
import { IndiaRadarMap } from '../components/maps/IndiaRadarMap';
import { LeadTimeSelector } from '../components/controls/LeadTimeSelector';
import { 
  Radar, 
  AlertOctagon, 
  Sparkles, 
  Flame, 
  Send, 
  Download, 
  Compass, 
  Layers, 
  TrendingDown, 
  Crosshair,
  BarChart2,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface BustRadarProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
  onNavigateToTab: (tab: any) => void;
}

export const BustRadar: React.FC<BustRadarProps> = ({
  onSelectSubdivision,
  onOpenBulletin,
  onNavigateToTab
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || forecastService.getSubdivisions()[0]
  );

  const subdivisions = forecastService.getSubdivisions();
  const rankedHotspots = forecastService.getRankedFailureHotspots(selectedDay);
  const currentMetric = selectedSub.dayMetrics[selectedDay];

  // Chart data for 10-day curve
  const curveData = Object.keys(selectedSub.dayMetrics).map((dStr) => {
    const d = Number(dStr) as LeadTimeDay;
    const m = selectedSub.dayMetrics[d];
    return {
      day: `D${d}`,
      confidence: m.confidenceScore,
      bustProb: m.bustProbability,
      isCliff: d === 5
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              AI Forecast Bust Radar
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              MEDIUM-RANGE VULNERABILITY ANALYZER
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-model divergence and spatial parameterization failure tracking across Indian Subcontinent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenBulletin(selectedSub, selectedDay)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-colors shadow-lg shadow-rose-950/50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Dispatch Bust Bulletin</span>
          </button>
        </div>
      </div>

      {/* Critical Cliff Warning Alert Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-command-900 to-command-900 border border-rose-500/50 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-mono text-rose-300">
                CRITICAL CLIFF DETECTED: DAY 4 → DAY 5
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-rose-600 text-white">
                Δ -37% DROP
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Forecast confidence plummets from <strong>69% (Day 4)</strong> to <strong>32% (Day 5)</strong> due to deep convective parameterization collapse in GFS/NCUM ensemble suites across the Western Ghats and Bay of Bengal corridor.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-mono text-slate-400">HPC Ensemble Spread</div>
          <div className="text-xl font-mono font-black text-rose-400">HIGH (σ &gt; 4.6σ)</div>
        </div>
      </div>

      {/* 10-Day Model Reliability Curve Line Chart */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
              10-Day Model Reliability & Bust Probability Curve ({selectedSub.name})
            </h3>
          </div>
          <span className="text-[10px] font-mono text-rose-400 font-bold">
            CLIFF TRANSITION: D4 (+96h) → D5 (+120h)
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={curveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
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
              <ReferenceLine x="D5" stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'CLIFF D5', fill: '#EF4444', fontSize: 10 }} />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#00F0FF" 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: '#00F0FF' }}
                name="Confidence %" 
              />
              <Line 
                type="monotone" 
                dataKey="bustProb" 
                stroke="#EF4444" 
                strokeWidth={2} 
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#EF4444' }}
                name="Bust Prob %" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lead Time Slider */}
      <LeadTimeSelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      {/* Grid: Interactive Subcontinent Radar Map + Ranked Failure Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Map (7 Cols) */}
        <div className="lg:col-span-7">
          <IndiaRadarMap
            subdivisions={subdivisions}
            selectedDay={selectedDay}
            selectedSubdivision={selectedSub}
            onSelectSubdivision={(s) => {
              setSelectedSub(s);
              forecastService.playAlertBeep('click');
            }}
            heightClass="h-[520px]"
            showScanner={true}
          />
        </div>

        {/* Ranked Failure Hotspots & Anomaly Inspector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Anomaly Deep-Dive Card */}
          <div className="p-4 rounded-xl bg-command-900 border border-cyan-500/40 space-y-3">
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-command-border">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  ANOMALY DEEP-DIVE INSPECTION
                </span>
                <h4 className="text-base font-bold text-slate-100 font-display">
                  {selectedSub.name}
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedSub.state} • Sub-division {selectedSub.code}
                </span>
              </div>

              <div className="text-right">
                <span className="text-sm font-black font-mono text-rose-400">
                  {currentMetric.bustProbability}% BUST
                </span>
                <div className="text-[10px] font-mono text-slate-400">Day {selectedDay} Target</div>
              </div>
            </div>

            {/* Historical Analog & Agreement */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-command-850 border border-command-border text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] block">HISTORICAL ANALOG</span>
                <span className="text-cyan-300 font-bold">{currentMetric.historicalAnalog.similarity}% MATCH</span>
                <span className="text-[10px] text-slate-400 block">{currentMetric.historicalAnalog.year} Event</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">MODEL AGREEMENT</span>
                <span className="text-rose-400 font-bold">{currentMetric.modelAgreement}</span>
                <span className="text-[10px] text-slate-400 block">{currentMetric.modelAgreementLabel}</span>
              </div>
            </div>

            {/* Atmospheric Regime & Failure Mechanics */}
            <div className="space-y-1.5 text-xs font-sans">
              <strong className="text-[10px] font-mono text-slate-400 uppercase block">Atmospheric Regime:</strong>
              <div className="text-slate-200 bg-command-850/60 p-2.5 rounded-lg border border-command-border text-[11px] leading-relaxed">
                {selectedSub.synopticDescription}
              </div>
            </div>

            {/* Precipitation Spread across 4 Models */}
            <div className="p-2.5 rounded-lg bg-command-850 border border-command-border space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Day {selectedDay} QPF Spread:</span>
                <span className="text-purple-300 font-bold">±{currentMetric.modelSpread} mm</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                <div className="p-1 rounded bg-command-800">NCUM: <strong>{currentMetric.models.ncum.value}mm</strong></div>
                <div className="p-1 rounded bg-command-800 text-amber-300">ECMWF: <strong>{currentMetric.models.ecmwf.value}mm</strong></div>
                <div className="p-1 rounded bg-command-800 text-sky-300">GFS: <strong>{currentMetric.models.gfs.value}mm</strong></div>
                <div className="p-1 rounded bg-command-800 text-purple-300">AI: <strong>{currentMetric.models.moesAi.value}mm</strong></div>
              </div>
            </div>

            {/* Dispatch & XAI Links */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  onSelectSubdivision(selectedSub);
                  onNavigateToTab('explainable-ai');
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain Why Bust Prob is {currentMetric.bustProbability}%</span>
              </button>
            </div>
          </div>

          {/* Hotspots Queue */}
          <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-command-border">
              <span className="text-slate-300 font-semibold uppercase">Ranked Failure Hotspots Queue</span>
              <span className="text-rose-400 font-bold">5 HIGH-VULNERABILITY</span>
            </div>

            <div className="space-y-1.5">
              {rankedHotspots.slice(0, 5).map((hotspot, idx) => (
                <div
                  key={hotspot.subdivision.id}
                  onClick={() => {
                    setSelectedSub(hotspot.subdivision);
                    forecastService.playAlertBeep('click');
                  }}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    selectedSub.id === hotspot.subdivision.id
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                      : 'bg-command-850/50 border-command-border hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold bg-command-800 text-slate-300">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-100">{hotspot.subdivision.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{hotspot.primaryDriver}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-black text-rose-400">{hotspot.bustProb}%</div>
                    <div className="text-[9px] font-mono text-slate-500">Day {selectedDay} Target</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
