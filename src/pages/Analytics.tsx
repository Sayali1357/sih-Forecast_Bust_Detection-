import React from 'react';
import { forecastService } from '../services/forecastService';
import { 
  BarChart3, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Database,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export const Analytics: React.FC = () => {
  const analytics = forecastService.getRegionalAnalytics();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-command-900 border border-command-border">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100 font-display uppercase tracking-wider">
              Forecast Analytics & Regional Error Memory
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              NCMRWF NWP VERIFICATION BENCHMARK
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Systematic statistical error memory tracking (MAE, RMSE, Bias, and failure mechanisms) by lead time and synoptic regime.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-command-800 border border-command-border text-xs font-mono text-cyan-300">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Ingesting 45 Years IMD Historical Reanalysis</span>
        </div>
      </div>

      {/* Top 3 KPI Verification Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-command-900 border border-command-border">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Mean Absolute Error (MAE)
          </span>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-cyan-400">{analytics.overallMAE} mm</span>
            <span className="text-xs font-mono text-slate-400">QPF National</span>
          </div>
          <p className="text-[11px] text-slate-400">Baseline across Day 1 to Day 10 lead times</p>
        </div>

        <div className="p-4 rounded-xl bg-command-900 border border-command-border">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Root Mean Square Error (RMSE)
          </span>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-purple-300">{analytics.overallRMSE} mm</span>
            <span className="text-xs font-mono text-slate-400">Penalizes Spikes</span>
          </div>
          <p className="text-[11px] text-slate-400">Elevated during orographic cloudburst events</p>
        </div>

        <div className="p-4 rounded-xl bg-command-900 border border-command-border">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Systematic Forecast Bias
          </span>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="text-xl font-black font-mono text-rose-400">{analytics.overallBias}</span>
          </div>
          <p className="text-[11px] text-slate-400">Coarse NWP grids over-forecast light rain, under-forecast extremes</p>
        </div>
      </div>

      {/* MAE / RMSE / Bias Lead Time Degradation Chart */}
      <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-command-border">
          <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
            NWP Error Metrics Growth Curve by Lead Time (D1 to D10)
          </h3>
          <span className="text-[10px] font-mono text-rose-400 font-bold">
            EXPONENTIAL ERROR INFLATION AT D5+
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.leadTimeCurve} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid stroke="#1E2D4E" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#64748B" fontSize={11} fontFamily="JetBrains Mono" unit="mm" />
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
              <Line type="monotone" dataKey="rmse" name="RMSE (mm)" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="mae" name="MAE (mm)" stroke="#00F0FF" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="bias" name="Systematic Bias (mm)" stroke="#EF4444" strokeWidth={2} strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Variable Error Memory Table & Weather System Failure Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variable Error Memory */}
        <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-command-border">
            <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
              Variable-Wise Systematic Error Memory
            </h3>
            <span className="text-[10px] font-mono text-slate-400">NCMRWF Verification</span>
          </div>

          <div className="space-y-2">
            {analytics.variableBreakdown.map((vb) => (
              <div key={vb.variable} className="p-3 rounded-lg bg-command-850/70 border border-command-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">{vb.variable}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{vb.errorTrend}</div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-cyan-300">MAE: {vb.mae} | RMSE: {vb.rmse}</div>
                  <div className="text-[10px] text-rose-400">Bust Rate: {vb.failureRate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Synoptic Weather System Failure Ranking */}
        <div className="p-4 rounded-xl bg-command-900 border border-command-border space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-command-border">
            <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
              Synoptic System Error Vulnerability Ranking
            </h3>
            <span className="text-[10px] font-mono text-rose-400 font-bold">Historical Risk</span>
          </div>

          <div className="space-y-2">
            {analytics.weatherSystemErrorRanking.map((ws, i) => (
              <div key={ws.system} className="p-3 rounded-lg bg-command-850/70 border border-command-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold bg-command-800 text-slate-300">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{ws.system}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">Key Driver: {ws.primaryDriver}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-rose-400">Avg Bust: {ws.avgBustProb}</div>
                  <div className="text-[10px] text-slate-400">Cliff Horizon: {ws.avgCliffDay}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
