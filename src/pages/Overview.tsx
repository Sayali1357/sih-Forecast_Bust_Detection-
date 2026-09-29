import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay } from '../types';
import { forecastService } from '../services/forecastService';
import { IndiaRadarMap, MapLayerType } from '../components/maps/IndiaRadarMap';
import { LeadTimeSelector } from '../components/controls/LeadTimeSelector';
import { LiveConfidenceTicker } from '../components/cards/LiveConfidenceTicker';
import { 
  ShieldAlert, 
  Activity, 
  TrendingDown, 
  MapPin, 
  Sparkles, 
  GitCompare, 
  Radio, 
  CloudRain, 
  Layers, 
  ArrowRight,
  ExternalLink,
  Flame,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface OverviewProps {
  onNavigateToTab: (tab: any) => void;
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
}

export const Overview: React.FC<OverviewProps> = ({
  onNavigateToTab,
  onSelectSubdivision,
  onOpenBulletin
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('bust-prob');
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || forecastService.getSubdivisions()[0]
  );

  const kpis = forecastService.getGlobalKPIs();
  const subdivisions = forecastService.getSubdivisions();
  const rankedHotspots = forecastService.getRankedFailureHotspots(selectedDay);

  const handleSubSelect = (sub: MeteorologicalSubdivision) => {
    setSelectedSub(sub);
    forecastService.playAlertBeep('click');
  };

  const currentMetric = selectedSub.dayMetrics[selectedDay];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 4 Core Questions Banner (WHERE? WHEN? HOW LIKELY? WHY?) */}
      <div className="p-4 rounded-2xl bg-command-900 border border-cyan-500/40 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-command-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-xs font-bold font-mono tracking-wider text-cyan-400 uppercase">
              SIH 26079 Core Telemetry Diagnostics
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-command-800 text-slate-300 border border-command-border">
            CYCLE 00Z OPERATIONAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {/* WHERE? */}
          <div className="p-3 rounded-xl bg-command-850/80 border border-command-border">
            <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>●</span> [WHERE?]
            </div>
            <div className="text-base font-bold text-slate-100 font-display mt-0.5">
              Bay of Bengal & Konkan
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Coastal belt & Central Peninsula focal divergence
            </p>
          </div>

          {/* WHEN? */}
          <div className="p-3 rounded-xl bg-command-850/80 border border-command-border">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>●</span> [WHEN?]
            </div>
            <div className="text-base font-bold text-slate-100 font-display mt-0.5">
              Day 4–6 Lead Time
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Critical drop at +72h to +144h projection
            </p>
          </div>

          {/* HOW LIKELY? */}
          <div className="p-3 rounded-xl bg-command-850/80 border border-command-border">
            <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>●</span> [HOW LIKELY?]
            </div>
            <div className="text-base font-bold text-rose-400 font-display mt-0.5">
              78% MAX BUST PROB
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Odisha & North Bay marine sector
            </p>
          </div>

          {/* WHY? */}
          <div className="p-3 rounded-xl bg-command-850/80 border border-command-border">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>●</span> [WHY?]
            </div>
            <div className="text-base font-bold text-slate-100 font-display mt-0.5">
              Meso-Low Deepening
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              ECMWF vs GFS 75mm rain divergence & radiance shift
            </p>
          </div>
        </div>
      </div>

      {/* 6 Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="p-3.5 rounded-xl bg-command-900 border border-command-border flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            India Confidence
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-slate-100">{kpis.indiaConfidence}%</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
              -9% (6h)
            </span>
          </div>
          <div className="w-full bg-command-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full w-[72%]" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-3.5 rounded-xl bg-command-900 border border-command-border flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Active Bust Risks
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-rose-400">08</span>
            <span className="text-xs font-mono text-slate-400">Regions</span>
          </div>
          <div className="text-[10px] font-mono text-rose-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>05 Critical | 03 Watch</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-3.5 rounded-xl bg-command-900 border border-command-border flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            High-Risk Regions
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-amber-400">05</span>
            <span className="text-xs font-mono text-slate-400">Zones</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Odisha, MH, WB, Assam, GJ
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-3.5 rounded-xl bg-command-900 border border-command-border flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Synoptic Drivers
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-cyan-400">03</span>
            <span className="text-xs font-mono text-slate-400">Systems</span>
          </div>
          <div className="text-[10px] font-mono text-cyan-300">
            BOB-02 • WD-14 • Heat Dome
          </div>
        </div>

        {/* KPI 5 */}
        <div className="p-3.5 rounded-xl bg-command-900 border border-command-border flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Max Bust Prob
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-rose-400">78%</span>
            <span className="text-[10px] font-mono text-slate-400">Odisha</span>
          </div>
          <div className="text-[10px] font-mono text-rose-300">
            Day 5 (+120h Target)
          </div>
        </div>

        {/* KPI 6 */}
        <div className="p-3.5 rounded-xl bg-command-900 border border-command-border flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            NWP Ingestion
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <span className="text-xs font-bold font-mono text-emerald-400">2 min ago</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Sync: Pratyush / Mihir HPC
          </div>
        </div>
      </div>

      {/* Live Confidence Evolution Ticker */}
      <LiveConfidenceTicker />

      {/* Main Grid: Forecast Bust Radar (Interactive Map) + Ranked Hotspots Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Radar Map & Controls */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          <LeadTimeSelector 
            selectedDay={selectedDay}
            onSelectDay={(d) => {
              setSelectedDay(d);
              forecastService.playAlertBeep('click');
            }}
          />

          <IndiaRadarMap
            subdivisions={subdivisions}
            selectedDay={selectedDay}
            selectedSubdivision={selectedSub}
            onSelectSubdivision={handleSubSelect}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
            heightClass="h-[480px] sm:h-[540px]"
          />
        </div>

        {/* Right Column (5 Cols): Selected Region Telemetry Card & Hotspots Queue */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Active Inspector Card */}
          <div className="p-4 rounded-xl bg-command-900 border border-cyan-500/40 space-y-3">
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-command-border">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  HIGH BUST RISK DETECTED
                </div>
                <h3 className="text-base font-bold text-slate-100 font-display mt-0.5">
                  {selectedSub.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  IMD Division ID: {selectedSub.code} • Sub-grid {selectedSub.lat}°N {selectedSub.lng}°E
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  DAY {selectedDay}
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-command-850 border border-command-border text-xs font-mono text-center">
              <div>
                <span className="text-slate-500 text-[10px] block">CONFIDENCE</span>
                <span className={`font-black text-base ${
                  currentMetric.confidenceScore < 40 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {currentMetric.confidenceScore}%
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">BUST PROB</span>
                <span className={`font-black text-base ${
                  currentMetric.bustProbability >= 65 ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {currentMetric.bustProbability}%
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">EXPECTED BIAS</span>
                <span className="font-bold text-slate-200">±{currentMetric.modelSpread}mm</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="text-xs font-sans text-slate-300 leading-relaxed p-2.5 rounded-lg bg-command-850/60 border border-command-border/60">
              <strong className="text-[10px] font-mono text-cyan-400 block mb-1">PRIMARY RISK:</strong>
              {currentMetric.synopticBriefing}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  onSelectSubdivision(selectedSub);
                  onNavigateToTab('explainable-ai');
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-command-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open XAI Drivers</span>
              </button>

              <button
                onClick={() => {
                  onSelectSubdivision(selectedSub);
                  onNavigateToTab('model-disagreement');
                }}
                className="py-2 px-3 rounded-lg bg-command-800 hover:bg-command-750 text-slate-200 text-xs font-mono border border-command-border flex items-center justify-center gap-1.5 transition-colors"
              >
                <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ensembles</span>
              </button>
            </div>
          </div>

          {/* Ranked Failure Hotspots List for Day */}
          <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-command-border">
              <h4 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
                Ranked Failure Hotspots (Day {selectedDay})
              </h4>
              <span className="text-[10px] font-mono text-slate-500">
                Sorted by Bust Prob
              </span>
            </div>

            <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
              {rankedHotspots.slice(0, 5).map((hotspot, idx) => (
                <div
                  key={hotspot.subdivision.id}
                  onClick={() => handleSubSelect(hotspot.subdivision)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedSub.id === hotspot.subdivision.id
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                      : 'bg-command-850/60 border-command-border hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      idx === 0 ? 'bg-rose-600 text-white' : 'bg-command-800 text-slate-400'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {hotspot.subdivision.name.split('(')[0]}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                        {hotspot.primaryDriver}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-xs font-bold font-mono ${
                      hotspot.bustProb >= 65 ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      {hotspot.bustProb}%
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">{hotspot.variance}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateToTab('bust-probability')}
              className="w-full py-1.5 text-center text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1 transition-colors"
            >
              <span>View All 36 Meteorological Subdivisions Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
