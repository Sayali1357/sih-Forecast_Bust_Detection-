import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay } from '../../types';
import { 
  Layers, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Compass, 
  Crosshair, 
  Radio, 
  Info,
  Flame,
  CloudRain,
  Wind
} from 'lucide-react';

export type MapLayerType = 'bust-prob' | 'confidence' | 'rain-error' | 'temp-error' | 'model-spread';

interface IndiaRadarMapProps {
  subdivisions: MeteorologicalSubdivision[];
  selectedDay: LeadTimeDay;
  selectedSubdivision: MeteorologicalSubdivision | null;
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
  activeLayer?: MapLayerType;
  onLayerChange?: (layer: MapLayerType) => void;
  heightClass?: string;
  showScanner?: boolean;
}

export const IndiaRadarMap: React.FC<IndiaRadarMapProps> = ({
  subdivisions,
  selectedDay,
  selectedSubdivision,
  onSelectSubdivision,
  activeLayer = 'bust-prob',
  onLayerChange,
  heightClass = 'h-[440px] md:h-[520px]',
  showScanner = true
}) => {
  const [currentLayer, setCurrentLayer] = useState<MapLayerType>(activeLayer);
  const [hoveredSub, setHoveredSub] = useState<MeteorologicalSubdivision | null>(null);
  const [scannerActive, setScannerActive] = useState<boolean>(showScanner);

  const handleLayerSelect = (layer: MapLayerType) => {
    setCurrentLayer(layer);
    if (onLayerChange) onLayerChange(layer);
  };

  // Compute color for node based on active layer
  const getNodeVisual = (sub: MeteorologicalSubdivision) => {
    const metric = sub.dayMetrics[selectedDay];
    if (!metric) return { fill: '#00F0FF', stroke: '#0284C7', text: 'N/A', size: 14 };

    if (currentLayer === 'bust-prob') {
      const p = metric.bustProbability;
      if (p >= 70) return { fill: '#EF4444', stroke: '#FF2E56', ring: '#EF4444', text: `${p}%`, size: 24, label: 'CRITICAL' };
      if (p >= 50) return { fill: '#F59E0B', stroke: '#FBBF24', ring: '#F59E0B', text: `${p}%`, size: 20, label: 'HIGH' };
      if (p >= 30) return { fill: '#38BDF8', stroke: '#0284C7', ring: '#38BDF8', text: `${p}%`, size: 16, label: 'MODERATE' };
      return { fill: '#10B981', stroke: '#059669', ring: '#10B981', text: `${p}%`, size: 14, label: 'LOW' };
    }

    if (currentLayer === 'confidence') {
      const c = metric.confidenceScore;
      if (c >= 70) return { fill: '#10B981', stroke: '#34D399', ring: '#10B981', text: `${c}%`, size: 16, label: 'HIGH CONF' };
      if (c >= 50) return { fill: '#38BDF8', stroke: '#0284C7', ring: '#38BDF8', text: `${c}%`, size: 18, label: 'MOD CONF' };
      if (c >= 35) return { fill: '#F59E0B', stroke: '#FBBF24', ring: '#F59E0B', text: `${c}%`, size: 22, label: 'LOW CONF' };
      return { fill: '#EF4444', stroke: '#FF2E56', ring: '#EF4444', text: `${c}%`, size: 26, label: 'CRITICAL LOW' };
    }

    if (currentLayer === 'rain-error') {
      const r = metric.variableErrors.rainfallQPF;
      if (r >= 50) return { fill: '#FF2E56', stroke: '#EF4444', ring: '#FF2E56', text: `±${r}mm`, size: 24, label: 'SEVERE' };
      if (r >= 30) return { fill: '#F59E0B', stroke: '#FBBF24', ring: '#F59E0B', text: `±${r}mm`, size: 20, label: 'HIGH' };
      return { fill: '#00F0FF', stroke: '#0284C7', ring: '#00F0FF', text: `±${r}mm`, size: 16, label: 'MODERATE' };
    }

    if (currentLayer === 'model-spread') {
      const s = metric.modelSpread;
      if (s >= 35) return { fill: '#A855F7', stroke: '#C084FC', ring: '#A855F7', text: `±${s}`, size: 22, label: 'HIGH SPREAD' };
      if (s >= 20) return { fill: '#38BDF8', stroke: '#0284C7', ring: '#38BDF8', text: `±${s}`, size: 18, label: 'MOD SPREAD' };
      return { fill: '#10B981', stroke: '#34D399', ring: '#10B981', text: `±${s}`, size: 14, label: 'CONSENSUS' };
    }

    // Temp error
    const t = metric.variableErrors.temperature;
    return { fill: '#F59E0B', stroke: '#FBBF24', ring: '#F59E0B', text: `±${t}°C`, size: 18, label: 'TEMP ERR' };
  };

  return (
    <div className={`relative w-full ${heightClass} bg-command-950/90 rounded-xl border border-command-border overflow-hidden flex flex-col shadow-inner select-none`}>
      {/* Top Map Header & Layer Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 bg-command-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-command-border text-xs font-mono">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-semibold">GRID: 0.25° RES</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400">DAY {selectedDay} (T+{(selectedDay * 24)}H)</span>
        </div>

        {/* Layer switch buttons */}
        <div className="flex items-center gap-1 bg-command-900/90 backdrop-blur-md p-1 rounded-lg border border-command-border">
          <button
            onClick={() => handleLayerSelect('bust-prob')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
              currentLayer === 'bust-prob'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bust Prob
          </button>
          <button
            onClick={() => handleLayerSelect('confidence')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
              currentLayer === 'confidence'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Confidence
          </button>
          <button
            onClick={() => handleLayerSelect('rain-error')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
              currentLayer === 'rain-error'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rain Error
          </button>
          <button
            onClick={() => handleLayerSelect('model-spread')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
              currentLayer === 'model-spread'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Model Spread
          </button>
          <button
            onClick={() => setScannerActive(!scannerActive)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors flex items-center gap-1 ${
              scannerActive 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-command-800 text-slate-400 border-command-border'
            }`}
            title="Toggle Radar Sweep Scanner"
          >
            <Radio className="w-3 h-3" />
            <span className="hidden sm:inline">Scanner</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas with Indian subcontinent contour & subdivisions */}
      <div className="relative w-full h-full flex items-center justify-center p-2">
        {/* Animated Radar Scanner line */}
        {scannerActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-cyan-500/20">
              <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
              <div className="absolute inset-16 rounded-full border border-cyan-500/15" />
              <div className="absolute inset-32 rounded-full border border-cyan-500/10" />
              <div className="radar-scanner" />
            </div>
          </div>
        )}

        <svg 
          viewBox="0 0 620 620" 
          className="w-full h-full max-h-[580px] filter drop-shadow-2xl"
        >
          <defs>
            {/* Grid background pattern */}
            <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2D4E" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
            {/* Radial glow for critical nodes */}
            <radialGradient id="critGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="highGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background grid */}
          <rect width="100%" height="100%" fill="url(#radarGrid)" />

          {/* India Subcontinent Outer Contour Polygon */}
          <path
            d="M 230 65 
               L 255 75 L 290 100 L 270 140 L 255 170 L 210 200 L 160 240 
               L 155 300 L 175 350 L 210 370 L 225 400 L 240 450 L 260 520 
               L 275 570 L 285 575 L 295 565 L 310 520 L 335 460 L 365 410 
               L 430 380 L 465 350 L 450 310 L 430 290 L 485 285 L 545 270 
               L 560 250 L 535 230 L 490 250 L 460 260 L 410 250 L 380 230 
               L 330 200 L 305 180 L 290 140 L 260 110 Z"
            fill="#0F172A"
            fillOpacity="0.85"
            stroke="#2A3C66"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Maritime EEZ Zones / Bay of Bengal & Arabian Sea radar boundary */}
          <path
            d="M 120 220 C 100 360, 160 540, 260 600"
            fill="none"
            stroke="#0284C7"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <path
            d="M 470 290 C 530 400, 440 560, 310 600"
            fill="none"
            stroke="#0284C7"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* Maritime labels */}
          <text x="110" y="440" fill="#38BDF8" opacity="0.3" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="3">ARABIAN SEA</text>
          <text x="440" y="440" fill="#38BDF8" opacity="0.3" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="3">BAY OF BENGAL</text>
          <text x="250" y="605" fill="#38BDF8" opacity="0.3" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">INDIAN OCEAN</text>

          {/* Connectors / Synoptic axis lines */}
          <line x1="420" y1="370" x2="240" y2="420" stroke="#FF2E56" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
          </line>

          {/* Subdivision Hotspot Nodes */}
          {subdivisions.map((sub) => {
            const visual = getNodeVisual(sub);
            const isSelected = selectedSubdivision?.id === sub.id;
            const isHovered = hoveredSub?.id === sub.id;
            const metric = sub.dayMetrics[selectedDay];

            return (
              <g 
                key={sub.id} 
                className="cursor-pointer transition-all duration-300 group"
                onClick={() => onSelectSubdivision(sub)}
                onMouseEnter={() => setHoveredSub(sub)}
                onMouseLeave={() => setHoveredSub(null)}
              >
                {/* Outer animated ping ring for High & Critical threats */}
                {(metric?.bustProbability >= 65 || isSelected) && (
                  <circle
                    cx={sub.svgX}
                    cy={sub.svgY}
                    r={visual.size + 10}
                    fill="none"
                    stroke={visual.ring}
                    strokeWidth="1.5"
                    className="ring-pulse"
                  />
                )}

                {/* Pulsing halo */}
                <circle
                  cx={sub.svgX}
                  cy={sub.svgY}
                  r={visual.size + 4}
                  fill={visual.fill}
                  fillOpacity={isSelected ? 0.4 : isHovered ? 0.3 : 0.15}
                  stroke={visual.stroke}
                  strokeWidth={isSelected ? 2 : 1}
                />

                {/* Center Core Circle */}
                <circle
                  cx={sub.svgX}
                  cy={sub.svgY}
                  r={visual.size / 2}
                  fill={visual.fill}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? 1.5 : 0.8}
                />

                {/* Subdivision Metric Label */}
                <text
                  x={sub.svgX}
                  y={sub.svgY + 3.5}
                  fill="#FFFFFF"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {visual.text}
                </text>

                {/* Subdivision Name tag */}
                <text
                  x={sub.svgX}
                  y={sub.svgY + visual.size + 8}
                  fill={isSelected ? '#00F0FF' : '#94A3B8'}
                  fontSize="9"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  fontFamily="Inter"
                  textAnchor="middle"
                  className="pointer-events-none transition-colors"
                >
                  {sub.name.split('(')[0].trim()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Selection Floating Tooltip */}
        {hoveredSub && (
          <div 
            className="absolute z-30 pointer-events-none bg-command-900/95 border border-cyan-500/50 rounded-lg p-3 shadow-2xl backdrop-blur-md min-w-[210px] text-left animate-in fade-in zoom-in-95 duration-150"
            style={{
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-command-border">
              <span className="font-bold text-xs text-slate-100">{hoveredSub.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                {hoveredSub.code}
              </span>
            </div>
            
            <div className="mt-2 space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Day Horizon:</span>
                <span className="text-cyan-400 font-bold">Day {selectedDay} (+{(selectedDay * 24)}h)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confidence:</span>
                <span className={`font-bold ${
                  hoveredSub.dayMetrics[selectedDay].confidenceScore < 40 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {hoveredSub.dayMetrics[selectedDay].confidenceScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bust Probability:</span>
                <span className={`font-bold ${
                  hoveredSub.dayMetrics[selectedDay].bustProbability >= 65 ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {hoveredSub.dayMetrics[selectedDay].bustProbability}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expected Error:</span>
                <span className="text-slate-200 font-bold">{hoveredSub.dayMetrics[selectedDay].expectedError}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Model Spread:</span>
                <span className="text-purple-300">±{hoveredSub.dayMetrics[selectedDay].modelSpread}mm</span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-command-border/60 text-[10px] text-slate-400 truncate">
              {hoveredSub.activeWeatherSystem}
            </div>
          </div>
        )}
      </div>

      {/* Map Bottom Legend bar */}
      <div className="absolute bottom-2 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto bg-command-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-command-border text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Risk Scale:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-rose-300">&gt;70% Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-amber-300">50-70% High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-sky-300">30-50% Mod</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-300">&lt;30% Low</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[10px]">
          <span>Click any node to inspect telemetry</span>
        </div>
      </div>
    </div>
  );
};
