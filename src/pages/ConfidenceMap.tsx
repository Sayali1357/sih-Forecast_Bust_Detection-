import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay, WeatherVariable } from '../types';
import { forecastService } from '../services/forecastService';
import { IndiaRadarMap, MapLayerType } from '../components/maps/IndiaRadarMap';
import { LeadTimeSelector } from '../components/controls/LeadTimeSelector';
import { 
  Map as MapIcon, 
  Layers, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Gauge, 
  Droplets, 
  Sparkles, 
  Send, 
  ChevronRight,
  TrendingDown,
  Compass,
  History
} from 'lucide-react';

interface ConfidenceMapProps {
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  onOpenBulletin: (sub: MeteorologicalSubdivision, day: LeadTimeDay) => void;
  onNavigateToTab: (tab: any) => void;
}

export const ConfidenceMap: React.FC<ConfidenceMapProps> = ({
  onSelectSubdivision,
  onOpenBulletin,
  onNavigateToTab
}) => {
  const [selectedDay, setSelectedDay] = useState<LeadTimeDay>(5);
  const [selectedVariable, setSelectedVariable] = useState<WeatherVariable>('rainfall');
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('confidence');
  const [selectedSub, setSelectedSub] = useState<MeteorologicalSubdivision>(
    forecastService.getSubdivisionById('sub-mh-konkan') || forecastService.getSubdivisions()[0]
  );

  const subdivisions = forecastService.getSubdivisions();
  const currentMetric = selectedSub.dayMetrics[selectedDay];

  const handleLayerSwitch = (variable: WeatherVariable) => {
    setSelectedVariable(variable);
    if (variable === 'rainfall') setActiveLayer('rain-error');
    else if (variable === 'temperature') setActiveLayer('temp-error');
    else if (variable === 'wind') setActiveLayer('model-spread');
    else setActiveLayer('confidence');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header & Layer Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              10-Day Forecast Confidence Map
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              INDIA METEOROLOGICAL SUBDIVISIONS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic spatial confidence projection across 36 IMD subdivisions from Day 1 to Day 10.
          </p>
        </div>

        {/* Variable Switcher Bar */}
        <div className="flex items-center gap-1 bg-command-800 p-1 rounded-lg border border-command-border text-xs font-mono">
          <button
            onClick={() => handleLayerSwitch('rainfall')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              selectedVariable === 'rainfall'
                ? 'bg-cyan-500 text-command-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Rainfall</span>
          </button>
          <button
            onClick={() => handleLayerSwitch('temperature')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              selectedVariable === 'temperature'
                ? 'bg-amber-500 text-command-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Temperature</span>
          </button>
          <button
            onClick={() => handleLayerSwitch('wind')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              selectedVariable === 'wind'
                ? 'bg-purple-500 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Wind</span>
          </button>
          <button
            onClick={() => handleLayerSwitch('pressure')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              selectedVariable === 'pressure'
                ? 'bg-sky-500 text-command-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Pressure</span>
          </button>
        </div>
      </div>

      {/* Lead Time Slider */}
      <LeadTimeSelector 
        selectedDay={selectedDay} 
        onSelectDay={(d) => {
          setSelectedDay(d);
          forecastService.playAlertBeep('click');
        }} 
      />

      {/* Main Map & Right-Side Region Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map (8 Cols) */}
        <div className="lg:col-span-8">
          <IndiaRadarMap
            subdivisions={subdivisions}
            selectedDay={selectedDay}
            selectedSubdivision={selectedSub}
            onSelectSubdivision={(s) => {
              setSelectedSub(s);
              forecastService.playAlertBeep('click');
            }}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
            heightClass="h-[540px]"
          />
        </div>

        {/* Right-Side Detailed Region Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-command-900 border border-cyan-500/40 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-command-border">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  SELECTED METEOROLOGICAL SUBDIVISION
                </span>
                <h3 className="text-lg font-bold text-slate-100 font-display mt-0.5">
                  {selectedSub.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  State: {selectedSub.state} • Code: {selectedSub.code}
                </span>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                  DAY {selectedDay}
                </span>
              </div>
            </div>

            {/* Core 5 Metrics Box */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded-lg bg-command-850 border border-command-border">
                <span className="text-slate-400">Forecast Confidence:</span>
                <span className={`font-black text-sm ${
                  currentMetric.confidenceScore < 40 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {currentMetric.confidenceScore}% ({currentMetric.confidenceScore < 40 ? 'VERY LOW' : 'HIGH'})
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-command-850 border border-command-border">
                <span className="text-slate-400">Bust Probability:</span>
                <span className={`font-black text-sm ${
                  currentMetric.bustProbability >= 65 ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {currentMetric.bustProbability}% ({currentMetric.riskLevel.toUpperCase()} RISK)
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-command-850 border border-command-border">
                <span className="text-slate-400">Expected Error:</span>
                <span className="font-bold text-slate-200">
                  {currentMetric.expectedError} (±{currentMetric.modelSpread} mm)
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-command-850 border border-command-border">
                <span className="text-slate-400">Model Agreement:</span>
                <span className="font-bold text-rose-400">
                  {currentMetric.modelAgreementLabel} ({currentMetric.modelAgreement})
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-command-850 border border-command-border">
                <span className="text-slate-400">Historical AI Similarity:</span>
                <span className="font-bold text-cyan-300">
                  {currentMetric.historicalAnalog.similarity}% (Match: {currentMetric.historicalAnalog.year})
                </span>
              </div>
            </div>

            {/* Variable Errors Breakdown */}
            <div className="p-3 rounded-lg bg-command-850/80 border border-command-border space-y-1.5 text-xs font-mono">
              <div className="text-slate-400 font-semibold text-[11px] pb-1 border-b border-command-border">
                EXPECTED PARAMETER ERRORS AT D{selectedDay}:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Rainfall QPF: <strong className="text-purple-300">±{currentMetric.variableErrors.rainfallQPF}mm</strong></div>
                <div>Temperature: <strong className="text-amber-300">±{currentMetric.variableErrors.temperature}°C</strong></div>
                <div>Wind Speed: <strong className="text-sky-300">±{currentMetric.variableErrors.windSpeed}m/s</strong></div>
                <div>MSLP Pressure: <strong className="text-rose-300">±{currentMetric.variableErrors.mslpPressure}hPa</strong></div>
              </div>
            </div>

            {/* AI Synoptic Briefing */}
            <div className="p-3 rounded-lg bg-command-850 border border-cyan-500/20 text-xs text-slate-300 font-sans leading-relaxed">
              <strong className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">AI Synoptic Diagnostic:</strong>
              {currentMetric.synopticBriefing}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onSelectSubdivision(selectedSub);
                  onNavigateToTab('region-detail');
                }}
                className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-command-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Open Full Regional Dossier</span>
              </button>

              <button
                onClick={() => onOpenBulletin(selectedSub, selectedDay)}
                className="w-full py-2 px-3 rounded-lg bg-command-800 hover:bg-command-750 text-rose-300 text-xs font-mono border border-rose-500/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-rose-400" />
                <span>Export Official Early Warning Bulletin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
