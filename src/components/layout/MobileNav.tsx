import React from 'react';
import { PageTab } from './Sidebar';
import { Home, Radar, Sparkles, Bell, GitCompare } from 'lucide-react';
import { forecastService } from '../../services/forecastService';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface MobileNavProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const unresolvedAlerts = forecastService.getAlerts().filter(a => !a.isResolved).length;

  const items = [
    { id: 'landing' as PageTab, label: t.brandName.split(' ')[0], icon: Sparkles },
    { id: 'overview' as PageTab, label: t.navOverview, icon: Home },
    { id: 'bust-radar' as PageTab, label: t.navBustRadar.split(' ')[0], icon: Radar },
    { id: 'alerts' as PageTab, label: `${t.navAlertCenter.split(' ')[0]} (${unresolvedAlerts})`, icon: Bell },
    { id: 'model-disagreement' as PageTab, label: t.navModelDisagreement.split(' ')[0], icon: GitCompare },
  ];

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t px-2 py-1.5 flex items-center justify-around shadow-2xl transition-colors ${
      theme === 'light'
        ? 'bg-white/95 border-slate-200 text-slate-700'
        : 'bg-command-900/95 border-command-border text-slate-300'
    }`}>
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
            className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] font-mono transition-colors relative ${
              isActive 
                ? 'text-cyan-500 font-bold' 
                : theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-cyan-500 scale-110' : 'text-slate-400'}`} />
            <span className="tracking-tight truncate max-w-[65px]">{item.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-cyan-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
