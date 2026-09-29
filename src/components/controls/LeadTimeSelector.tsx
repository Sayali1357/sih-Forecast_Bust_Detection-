import React from 'react';
import { LeadTimeDay } from '../../types';
import { Clock, AlertOctagon, ChevronRight } from 'lucide-react';

interface LeadTimeSelectorProps {
  selectedDay: LeadTimeDay;
  onSelectDay: (day: LeadTimeDay) => void;
  showCliffBadge?: boolean;
}

export const LeadTimeSelector: React.FC<LeadTimeSelectorProps> = ({
  selectedDay,
  onSelectDay,
  showCliffBadge = true
}) => {
  const days: LeadTimeDay[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full bg-command-900/90 rounded-xl border border-command-border p-3 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-semibold uppercase tracking-wider">Lead Time Horizon:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
            DAY {selectedDay} (+{(selectedDay * 24)}H PROJECTION)
          </span>
        </div>

        {showCliffBadge && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-mono">
            <AlertOctagon className="w-3 h-3 text-rose-400 animate-pulse" />
            <span>CRITICAL CLIFF: D4 → D5 (Δ -37% CONFIDENCE)</span>
          </div>
        )}
      </div>

      {/* 10-Day Step Buttons Bar */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
        {days.map((d) => {
          const isSelected = selectedDay === d;
          const isCliff = d === 5;
          const hours = d * 24;

          return (
            <button
              key={d}
              onClick={() => onSelectDay(d)}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all duration-200 group ${
                isSelected
                  ? 'bg-cyan-500 text-command-950 font-bold border-cyan-300 shadow-lg shadow-cyan-500/25 scale-[1.03]'
                  : isCliff
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/40 hover:bg-rose-500/20'
                  : 'bg-command-800 text-slate-300 border-command-border hover:bg-command-750 hover:border-cyan-500/30'
              }`}
            >
              <span className="text-xs font-mono tracking-tighter">D{d}</span>
              <span className={`text-[9px] font-mono ${isSelected ? 'text-command-900 font-medium' : 'text-slate-400'}`}>
                +{hours}h
              </span>

              {isCliff && !isSelected && (
                <span className="absolute -top-1.5 right-1 px-1 py-0.2 rounded-full text-[8px] font-mono font-bold bg-rose-600 text-white shadow">
                  CLIFF
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
