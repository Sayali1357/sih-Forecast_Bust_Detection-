import React, { useState } from 'react';
import { MeteorologicalSubdivision, LeadTimeDay, OperationalAlert } from '../../types';
import { forecastService } from '../../services/forecastService';
import { FileText, Download, Printer, Send, CheckCircle2, ShieldAlert, X, Copy } from 'lucide-react';

interface BulletinModalProps {
  isOpen: boolean;
  onClose: () => void;
  subdivision?: MeteorologicalSubdivision | null;
  leadDay?: LeadTimeDay;
  alert?: OperationalAlert | null;
}

export const BulletinModal: React.FC<BulletinModalProps> = ({
  isOpen,
  onClose,
  subdivision,
  leadDay = 5,
  alert
}) => {
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  const targetSub = subdivision || forecastService.getSubdivisions()[0];
  const metric = targetSub.dayMetrics[leadDay];
  const bulletinId = alert?.bulletinId || `NCMRWF-XAI-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toUTCString();

  const bulletinText = `
================================================================================
MINISTRY OF EARTH SCIENCES (MoES) | GOVERNMENT OF INDIA
NATIONAL CENTRE FOR MEDIUM RANGE WEATHER FORECASTING (NCMRWF)
OPERATIONAL FORECAST RELIABILITY & BUST EARLY WARNING BULLETIN
================================================================================
BULLETIN ID: ${bulletinId}
ISSUED AT: ${timestamp}
SYNOPTIC CYCLE: 00Z OPERATIONAL RUN (Pratyush HPC Assimilation)
PROBLEM STATEMENT REF: SIH PS 26079 - AI BUST DETECTION SUITE

1. TARGET REGION & LEAD TIME HORIZON
--------------------------------------------------------------------------------
SUBDIVISION: ${targetSub.name} (${targetSub.code})
STATE: ${targetSub.state}
TARGET LEAD TIME: DAY ${leadDay} (+${leadDay * 24} HOURS PROJECTION)
ACTIVE SYNOPTIC SYSTEM: ${targetSub.activeWeatherSystem}

2. RELIABILITY & BUST RISK DIAGNOSTICS
--------------------------------------------------------------------------------
FORECAST BUST PROBABILITY : ${metric.bustProbability}% [${metric.bustProbability >= 65 ? 'CRITICAL HIGH RISK' : 'ELEVATED RISK'}]
FORECAST CONFIDENCE SCORE : ${metric.confidenceScore}% (Significantly Degraded)
EXPECTED QPF ERROR MAGNITUDE : ±${metric.variableErrors.rainfallQPF} mm (HIGH UNCERTAINTY)
INTER-MODEL AGREEMENT    : ${metric.modelAgreementLabel} (${metric.modelAgreement})
50-MEMBER SPREAD (σ)     : ±${metric.modelSpread} mm

3. 4-WAY NWP ENSEMBLE DISPERSION
--------------------------------------------------------------------------------
* NCUM-G (NCMRWF 12km)   : ${metric.models.ncum.value} mm | MSLP ${metric.models.ncum.pressure} hPa
* ECMWF IFS (ECMWF 9km)  : ${metric.models.ecmwf.value} mm | MSLP ${metric.models.ecmwf.pressure} hPa
* NCEP GFS (NOAA 13km)   : ${metric.models.gfs.value} mm | MSLP ${metric.models.gfs.pressure} hPa
* MoES AI-DL (Hybrid)    : ${metric.models.moesAi.value} mm | MSLP ${metric.models.moesAi.pressure} hPa

4. EXPLAINABLE AI (XAI) ATTRIBUTION SUMMARY
--------------------------------------------------------------------------------
${metric.synopticBriefing}

PRIMARY ATTRIBUTION DRIVERS:
- ${metric.xaiDrivers[0]?.feature || 'Rapid Pressure Change'}: ${metric.xaiDrivers[0]?.delta} (+${metric.xaiDrivers[0]?.impactPercent}% impact)
- ${metric.xaiDrivers[1]?.feature || 'Model Spread'}: ${metric.xaiDrivers[1]?.delta} (+${metric.xaiDrivers[1]?.impactPercent}% impact)
- ${metric.xaiDrivers[2]?.feature || 'Historical Memory'}: ${metric.xaiDrivers[2]?.delta} (+${metric.xaiDrivers[2]?.impactPercent}% impact)

5. HISTORICAL ANALOG CORRECTION RECOMMENDATION
--------------------------------------------------------------------------------
CLOSEST HISTORICAL TWIN: ${metric.historicalAnalog.year} (${metric.historicalAnalog.similarity}% AI Match)
RECOMMENDED BIAS FIX   : ${metric.historicalAnalog.recommendation}

AUTHORIZED BY:
NCMRWF Operational AI Diagnostic Desk / MoES Meteorological Command
================================================================================
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(bulletinText);
    setCopied(true);
    forecastService.playAlertBeep('click');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([bulletinText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Forecast_Bust_Bulletin_${targetSub.code}_D${leadDay}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    forecastService.playAlertBeep('click');
  };

  const handleDispatch = () => {
    forecastService.playAlertBeep('critical');
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-command-900 border border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-command-850 border-b border-command-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-display">
                Forecast Bust Early Warning Bulletin
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                MoES / NCMRWF Operational Dispatch • ID: {bulletinId}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-command-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bulletin Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-command-950 font-mono text-xs text-cyan-200/90 whitespace-pre-wrap leading-relaxed select-all">
          {bulletinText}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-command-850 border-t border-command-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-command-800 hover:bg-command-750 text-slate-200 text-xs font-mono border border-command-border transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-command-800 hover:bg-command-750 text-slate-200 text-xs font-mono border border-command-border transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download .TXT</span>
            </button>
          </div>

          <button
            onClick={handleDispatch}
            disabled={dispatched}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-lg shadow-rose-950/60 transition-all disabled:opacity-50"
          >
            {dispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                <span>Transmitted to Regional MoES Centres!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmit Operational Bulletin</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
