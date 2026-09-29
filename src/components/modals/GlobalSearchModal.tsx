import React, { useState, useEffect, useRef } from 'react';
import { MeteorologicalSubdivision } from '../../types';
import { forecastService } from '../../services/forecastService';
import { Search, MapPin, Sparkles, CloudLightning, History, ArrowRight, X } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubdivision: (sub: MeteorologicalSubdivision) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSubdivision
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = forecastService.searchSubdivisions(query);
  const weatherSystems = forecastService.getWeatherSystems().filter(
    ws => ws.name.toLowerCase().includes(query.toLowerCase()) || ws.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-command-900 border border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-command-border bg-command-850">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search state, subdivision (e.g. Maharashtra, Odisha), MR code, weather system..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd 
            onClick={onClose}
            className="px-2 py-0.5 text-[10px] font-mono bg-command-900 border border-command-border rounded text-slate-400 cursor-pointer hover:bg-command-800"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-command-border">
          {/* Subdivisions Results */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
              <span>Meteorological Subdivisions ({results.length})</span>
              <span>Select to inspect</span>
            </div>

            {results.length === 0 ? (
              <div className="py-6 text-center text-xs font-mono text-slate-500">
                No meteorological subdivisions matched "{query}"
              </div>
            ) : (
              <div className="space-y-1.5">
                {results.slice(0, 6).map((sub) => {
                  const metric = sub.dayMetrics[5]; // Day 5 benchmark
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        onSelectSubdivision(sub);
                        onClose();
                      }}
                      className="p-3 rounded-lg bg-command-850/60 hover:bg-command-800 border border-command-border hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-command-900 border border-command-border text-cyan-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                              {sub.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-command-750 text-slate-300">
                              {sub.code}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{sub.state} • {sub.activeWeatherSystem}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <div className="text-xs font-mono">
                          <div className="text-rose-400 font-bold">{metric.bustProbability}% BUST</div>
                          <div className="text-[10px] text-slate-400">Day 5 (+120h)</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Weather Systems Results */}
          {weatherSystems.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Synoptic Weather Systems ({weatherSystems.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {weatherSystems.slice(0, 4).map((ws) => (
                  <div
                    key={ws.id}
                    className="p-2.5 rounded-lg bg-command-850/60 border border-command-border text-xs font-mono flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <CloudLightning className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="font-bold text-slate-200">{ws.name}</span>
                        <span className="text-[10px] text-slate-400 block">{ws.category}</span>
                      </div>
                    </div>
                    <span className="text-rose-400 font-bold">{ws.bustProbability}% BUST</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-command-950 border-t border-command-border text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Tip: Use <strong>MR-09</strong> or state names like <strong>Maharashtra</strong></span>
          <span className="text-cyan-400/80">SIH PS 26079 Telemetry Index</span>
        </div>
      </div>
    </div>
  );
};
