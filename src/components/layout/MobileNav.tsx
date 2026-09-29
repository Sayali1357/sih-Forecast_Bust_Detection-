import React from 'react';
import { PageTab } from './Sidebar';
import { Home, Radar, Sparkles, Bell, GitCompare } from 'lucide-react';
import { forecastService } from '../../services/forecastService';

interface MobileNavProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const unresolvedAlerts = forecastService.getAlerts().filter(a => !a.isResolved).length;

  const items = [
    { id: 'overview' as PageTab, label: 'COMMAND', icon: Home },
    { id: 'bust-radar' as PageTab, label: 'BUST RADAR', icon: Radar },
    { id: 'explainable-ai' as PageTab, label: 'XAI DRIVERS', icon: Sparkles },
    { id: 'alerts' as PageTab, label: `ALERTS (${unresolvedAlerts})`, icon: Bell },
    { id: 'model-disagreement' as PageTab, label: 'MODELS', icon: GitCompare },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-command-900/95 backdrop-blur-md border-t border-command-border px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              forecastService.playAlertBeep('click');
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-mono transition-colors relative ${
              isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-400'}`} />
            <span className="tracking-tight">{item.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
