import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, PageTab } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { BulletinModal } from './components/modals/BulletinModal';

import { Overview } from './pages/Overview';
import { BustRadar } from './pages/BustRadar';
import { ConfidenceMap } from './pages/ConfidenceMap';
import { BustProbability } from './pages/BustProbability';
import { ModelDisagreement } from './pages/ModelDisagreement';
import { HistoricalAnalogs } from './pages/HistoricalAnalogs';
import { WeatherSystems } from './pages/WeatherSystems';
import { ExplainableAI } from './pages/ExplainableAI';
import { Timeline } from './pages/Timeline';
import { AlertCenter } from './pages/AlertCenter';
import { Analytics } from './pages/Analytics';
import { RegionDetail } from './pages/RegionDetail';

import { MeteorologicalSubdivision, LeadTimeDay, OperationalAlert } from './types';
import { forecastService } from './services/forecastService';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Selected subdivision state across app
  const [selectedSubdivision, setSelectedSubdivision] = useState<MeteorologicalSubdivision | null>(
    forecastService.getSubdivisionById('sub-mh-konkan') || forecastService.getSubdivisions()[0]
  );

  // Bulletin Modal state
  const [bulletinModalOpen, setBulletinModalOpen] = useState(false);
  const [bulletinSub, setBulletinSub] = useState<MeteorologicalSubdivision | null>(null);
  const [bulletinDay, setBulletinDay] = useState<LeadTimeDay>(5);
  const [bulletinAlert, setBulletinAlert] = useState<OperationalAlert | null>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K for Global Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenBulletin = (
    sub: MeteorologicalSubdivision,
    day: LeadTimeDay = 5,
    alert?: OperationalAlert
  ) => {
    setBulletinSub(sub);
    setBulletinDay(day);
    setBulletinAlert(alert || null);
    setBulletinModalOpen(true);
  };

  const handleSelectSubdivision = (sub: MeteorologicalSubdivision) => {
    setSelectedSubdivision(sub);
  };

  const handleNavigateToTab = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-command-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Global Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAlerts={() => handleNavigateToTab('alerts')}
        sidebarOpen={mobileMenuOpen}
        setSidebarOpen={setMobileMenuOpen}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Main Command Center Layout with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleNavigateToTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        {/* Dynamic Page View Container */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 pb-24 lg:pb-12 max-w-[1700px] mx-auto w-full">
          {activeTab === 'overview' && (
            <Overview
              onNavigateToTab={handleNavigateToTab}
              onSelectSubdivision={handleSelectSubdivision}
              onOpenBulletin={handleOpenBulletin}
            />
          )}

          {activeTab === 'bust-radar' && (
            <BustRadar
              onSelectSubdivision={handleSelectSubdivision}
              onOpenBulletin={handleOpenBulletin}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'confidence-map' && (
            <ConfidenceMap
              onSelectSubdivision={handleSelectSubdivision}
              onOpenBulletin={handleOpenBulletin}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'bust-probability' && (
            <BustProbability
              onSelectSubdivision={handleSelectSubdivision}
              onNavigateToTab={handleNavigateToTab}
              onOpenBulletin={handleOpenBulletin}
            />
          )}

          {activeTab === 'model-disagreement' && (
            <ModelDisagreement
              onSelectSubdivision={handleSelectSubdivision}
              onNavigateToTab={handleNavigateToTab}
              onOpenBulletin={handleOpenBulletin}
            />
          )}

          {activeTab === 'historical-analogs' && (
            <HistoricalAnalogs
              onSelectSubdivision={handleSelectSubdivision}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'weather-systems' && (
            <WeatherSystems
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'explainable-ai' && (
            <ExplainableAI
              onSelectSubdivision={handleSelectSubdivision}
              onNavigateToTab={handleNavigateToTab}
              onOpenBulletin={handleOpenBulletin}
            />
          )}

          {activeTab === 'timeline' && (
            <Timeline
              onSelectSubdivision={handleSelectSubdivision}
              onNavigateToTab={handleNavigateToTab}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertCenter
              onSelectSubdivision={handleSelectSubdivision}
              onNavigateToTab={handleNavigateToTab}
              onOpenBulletin={handleOpenBulletin}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics />
          )}

          {activeTab === 'region-detail' && (
            <RegionDetail
              selectedSubdivision={selectedSubdivision}
              onSelectSubdivision={handleSelectSubdivision}
              onOpenBulletin={handleOpenBulletin}
              onNavigateToTab={handleNavigateToTab}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={handleNavigateToTab}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectSubdivision={(sub) => {
          handleSelectSubdivision(sub);
          handleNavigateToTab('region-detail');
        }}
      />

      {/* Bulletin Export & Transmission Modal */}
      <BulletinModal
        isOpen={bulletinModalOpen}
        onClose={() => setBulletinModalOpen(false)}
        subdivision={bulletinSub}
        leadDay={bulletinDay}
        alert={bulletinAlert}
      />
    </div>
  );
};

export default App;
