import React from 'react';
import { 
  Home, 
  Radar, 
  Map, 
  AlertTriangle, 
  GitCompare, 
  History, 
  CloudLightning, 
  Sparkles, 
  TrendingDown, 
  Bell, 
  BarChart3, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Server,
  Layers
} from 'lucide-react';

export type PageTab = 
  | 'overview'
  | 'bust-radar'
  | 'confidence-map'
  | 'bust-probability'
  | 'model-disagreement'
  | 'historical-analogs'
  | 'weather-systems'
  | 'explainable-ai'
  | 'timeline'
  | 'alerts'
  | 'analytics'
  | 'region-detail';

interface SidebarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  id: PageTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'bust-radar', label: 'Bust Radar', icon: Radar, badge: 'LIVE', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    { id: 'confidence-map', label: 'Confidence Map', icon: Map, badge: '10-Day', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    { id: 'bust-probability', label: 'Bust Probability', icon: AlertTriangle },
    { id: 'model-disagreement', label: 'Model Disagreement', icon: GitCompare, badge: '4-NWP', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { id: 'historical-analogs', label: 'Historical Analogs', icon: History },
    { id: 'weather-systems', label: 'Weather Systems', icon: CloudLightning, badge: '03 Act', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'explainable-ai', label: 'Explainable AI (XAI)', icon: Sparkles, badge: 'SHAP', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { id: 'timeline', label: 'Reliability Timeline', icon: TrendingDown },
    { id: 'alerts', label: 'Alert Center', icon: Bell, badge: '08', badgeColor: 'bg-rose-600 text-white animate-pulse' },
    { id: 'analytics', label: 'Forecast Analytics', icon: BarChart3 },
    { id: 'region-detail', label: 'Region Deep-Dive', icon: Compass },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-57px)] bg-command-900 border-r border-command-border flex flex-col transition-all duration-300 shadow-2xl lg:shadow-none ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Sidebar Header / Brand (Mobile only) */}
        <div className="lg:hidden p-4 border-b border-command-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-display text-sm tracking-wide">
            <Radar className="w-5 h-5 animate-pulse" />
            <span>MOES / NCMRWF</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          <div className={`px-2 py-1 text-[10px] font-mono uppercase text-slate-500 font-bold ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? '—' : 'Operational Views'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-command-800/80 border border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                
                {!collapsed && (
                  <span className="truncate tracking-wide text-left flex-1">
                    {item.label}
                  </span>
                )}

                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono border font-semibold ${item.badgeColor || 'bg-command-750 text-slate-300 border-command-border'}`}>
                    {item.badge}
                  </span>
                )}

                {/* Collapsed active indicator bar */}
                {collapsed && isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* System & Telemetry Status Box at Bottom */}
        <div className="p-2 border-t border-command-border bg-command-950/60">
          {!collapsed ? (
            <div className="p-2.5 rounded-lg bg-command-850/80 border border-command-border space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  HPC Core
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Model: NCUM-G / 0.25°</span>
                <span>T+240h</span>
              </div>
              <div className="w-full bg-command-750 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[88%]" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-2" title="HPC Cluster: Online (Pratyush 00Z)">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          )}

          {/* Desktop Collapse / Expand toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center py-2 mt-1 rounded text-slate-500 hover:text-slate-200 hover:bg-command-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
