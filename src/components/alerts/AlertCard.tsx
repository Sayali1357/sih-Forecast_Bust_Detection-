import React from 'react';
import { OperationalAlert } from '../../types';
import { ShieldAlert, AlertTriangle, Eye, CheckCircle2, Clock, MapPin, Send, ExternalLink } from 'lucide-react';
import { forecastService } from '../../services/forecastService';

interface AlertCardProps {
  alert: OperationalAlert;
  onViewRegion?: (regionName: string) => void;
  onViewAnalysis?: (alert: OperationalAlert) => void;
  onDispatchBulletin?: (alert: OperationalAlert) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onViewRegion,
  onViewAnalysis,
  onDispatchBulletin
}) => {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          badge: 'bg-rose-600 text-white animate-pulse',
          border: 'border-rose-500/50 bg-rose-950/20',
          icon: ShieldAlert,
          iconColor: 'text-rose-400'
        };
      case 'Warning':
        return {
          badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
          border: 'border-amber-500/40 bg-amber-950/15',
          icon: AlertTriangle,
          iconColor: 'text-amber-400'
        };
      case 'Watch':
        return {
          badge: 'bg-sky-500/20 text-sky-300 border border-sky-500/40',
          border: 'border-sky-500/30 bg-command-900',
          icon: Eye,
          iconColor: 'text-sky-400'
        };
      default:
        return {
          badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
          border: 'border-emerald-500/30 bg-command-900/60 opacity-80',
          icon: CheckCircle2,
          iconColor: 'text-emerald-400'
        };
    }
  };

  const style = getSeverityStyle(alert.severity);
  const Icon = style.icon;

  return (
    <div className={`p-4 rounded-xl border ${style.border} transition-all duration-200 flex flex-col justify-between space-y-3`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Icon className={`w-5 h-5 ${style.iconColor} shrink-0`} />
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${style.badge}`}>
                {alert.severity}
              </span>
              <span className="text-xs font-mono text-slate-400">{alert.bulletinId}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 mt-1 flex items-center gap-1.5 font-display">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {alert.region} ({alert.state})
            </h4>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-mono font-black text-rose-400">
            {alert.bustProbability}% BUST
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 justify-end mt-0.5">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{alert.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Lead time & Key factor metrics */}
      <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-command-850/90 border border-command-border text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block">LEAD TIME HORIZON</span>
          <span className="text-cyan-300 font-bold">{alert.leadTime}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">FORECAST CONFIDENCE</span>
          <span className={`font-bold ${alert.confidenceScore < 35 ? 'text-rose-400' : 'text-amber-400'}`}>
            {alert.confidenceScore}% (LOW)
          </span>
        </div>
      </div>

      {/* Primary Cause & Details */}
      <div className="space-y-1 text-xs">
        <p className="text-slate-200 text-[11px] leading-relaxed">
          <strong className="text-slate-400 font-mono text-[10px] block">MAIN FAILURE FACTORS:</strong>
          {alert.primaryCause}
        </p>
        <p className="text-slate-400 text-[10.5px] italic">
          "{alert.synopticDetails}"
        </p>
      </div>

      {/* Operational Actions */}
      <div className="pt-2 border-t border-command-border/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {onViewRegion && (
            <button
              onClick={() => onViewRegion(alert.region)}
              className="px-2.5 py-1 rounded bg-command-800 hover:bg-command-750 text-cyan-300 text-xs font-mono border border-command-border hover:border-cyan-500/40 transition-colors"
            >
              View Region
            </button>
          )}

          {onViewAnalysis && (
            <button
              onClick={() => onViewAnalysis(alert)}
              className="px-2.5 py-1 rounded bg-command-800 hover:bg-command-750 text-slate-300 text-xs font-mono border border-command-border hover:border-cyan-500/40 transition-colors"
            >
              View XAI
            </button>
          )}
        </div>

        {onDispatchBulletin && alert.severity !== 'Resolved' && (
          <button
            onClick={() => onDispatchBulletin(alert)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-md shadow-rose-950/40 transition-all"
          >
            <Send className="w-3 h-3" />
            <span>Dispatch Bulletin</span>
          </button>
        )}
      </div>
    </div>
  );
};
