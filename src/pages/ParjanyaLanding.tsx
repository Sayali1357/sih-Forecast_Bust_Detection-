import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  Globe, 
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { forecastService } from '../services/forecastService';
import { PageTab } from '../components/layout/Sidebar';

interface ParjanyaLandingProps {
  onExplore: () => void;
  onNavigateToTab: (tab: PageTab) => void;
}

export const ParjanyaLanding: React.FC<ParjanyaLandingProps> = ({
  onExplore,
  onNavigateToTab
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleCtaClick = () => {
    forecastService.playAlertBeep('click');
    onExplore();
  };

  return (
    <div className="landing-showcase h-screen w-screen max-h-screen max-w-full overflow-hidden flex flex-col bg-black text-white font-sans select-none">
      {/* 3x3 Grid with Exact Proportions: Left 25%, Center 50%, Right 25% | Top 27%, Middle 46%, Bottom 27% */}
      <div className="flex-1 w-full h-full grid grid-cols-[25%_50%_25%] grid-rows-[27%_46%_27%] gap-0 border border-white/10 divide-x divide-y divide-white/10 overflow-hidden">
        
        {/* =========================================================================
            ROW 1, COL 1: TOP-LEFT (Rocket Plume, Brand, Delhi Coordinates)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('weather-systems')}
          className="relative group cursor-pointer overflow-hidden bg-black"
        >
          <img 
            src="/hero/rocket.jpg" 
            alt="Rocket Plume" 
            className="w-full h-full object-cover object-right opacity-80 transition-transform duration-700 group-hover:scale-105 filter brightness-85 contrast-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
          
          {/* Top-Left Brand Logo & Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
            <div className="w-4 h-4 rounded bg-[#0088FF] shadow-sm shadow-cyan-500/50" />
            <span className="font-sans font-bold text-sm tracking-tight text-white">
              {t.brandName}
            </span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider bg-black/60 text-slate-300 border border-white/20">
              NCMRWF • PS-26079
            </span>
          </div>

          {/* Delhi Coordinates Bottom-Left */}
          <div className="absolute bottom-3 left-3 flex flex-col font-mono text-[10px] tracking-wider text-[#38BDF8] z-10 leading-tight">
            <span>28.6139° N</span>
            <span>77.2090° E</span>
            <span className="text-white font-bold text-[10px] mt-0.5 tracking-widest uppercase">{t.newDelhi}</span>
          </div>
        </div>

        {/* =========================================================================
            ROW 1, COL 2: TOP-CENTER (Night Earth Orbit, Global Forecast Ensemble)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('timeline')}
          className="relative group cursor-pointer overflow-hidden bg-black"
        >
          <img 
            src="/hero/earth_orbit.jpg" 
            alt="Global Ensemble Synchronization" 
            className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105 filter brightness-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/60 pointer-events-none" />
          
          {/* Top-Right: GLOBAL FORECAST ENSEMBLE SYNCHRONIZED 2026 */}
          <div className="absolute top-3 right-3 text-right font-mono text-[10px] tracking-wider text-slate-200 z-10 leading-tight">
            <div className="font-semibold uppercase tracking-wider">{t.globalEnsembleSync.split(' ')[0]} {t.globalEnsembleSync.split(' ')[1]} {t.globalEnsembleSync.split(' ')[2]}</div>
            <div className="font-bold tracking-widest text-slate-100">{t.globalEnsembleSync.split(' ').slice(3).join(' ') || 'SYNCHRONIZED 2026'}</div>
          </div>
        </div>

        {/* =========================================================================
            ROW 1, COL 3: TOP-RIGHT (Cyber Server Lock, System Status & Nav Links)
           ========================================================================= */}
        <div 
          className="relative group overflow-hidden bg-black"
        >
          <img 
            src="/hero/cyber.jpg" 
            alt="Cybersecurity Mainframe" 
            className="w-full h-full object-cover object-center opacity-75 transition-transform duration-700 group-hover:scale-105 filter brightness-85" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none" />
          
          {/* Top Navigation Links */}
          <div className="absolute top-3 right-3 flex items-center gap-2.5 font-mono text-[10px] z-20">
            <div className="flex items-center gap-1 text-[#38BDF8] font-semibold tracking-wider">
              <span className="text-xs">⚡</span>
              <span>{t.systemOnline}</span>
            </div>

            <button 
              onClick={() => onNavigateToTab('explainable-ai')} 
              className="text-slate-300 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t.documentation}
            </button>

            <button 
              onClick={() => onNavigateToTab('model-disagreement')} 
              className="text-slate-300 hover:text-white transition-colors uppercase tracking-wider"
            >
              {t.ensembles}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setLangDropdownOpen(!langDropdownOpen); }}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 hover:bg-slate-800 border border-white/20 text-slate-200 text-[10px] font-mono"
                title={t.languageSelect}
              >
                <Globe className="w-2.5 h-2.5 text-cyan-400" />
                <span className="uppercase font-bold text-[9px]">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-24 rounded bg-black/95 border border-cyan-500/40 shadow-2xl py-1 z-50">
                  <button
                    onClick={(e) => { e.stopPropagation(); setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full px-2 py-0.5 text-left text-[10px] flex justify-between hover:bg-cyan-500/20 ${
                      language === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[8px] font-mono text-slate-500">EN</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLanguage('mr'); setLangDropdownOpen(false); }}
                    className={`w-full px-2 py-0.5 text-left text-[10px] flex justify-between hover:bg-cyan-500/20 ${
                      language === 'mr' ? 'text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>मराठी</span>
                    <span className="text-[8px] font-mono text-slate-500">MR</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full px-2 py-0.5 text-left text-[10px] flex justify-between hover:bg-cyan-500/20 ${
                      language === 'hi' ? 'text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>हिंदी</span>
                    <span className="text-[8px] font-mono text-slate-500">HI</span>
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
              className="p-1 rounded bg-black/80 hover:bg-slate-800 border border-white/20 text-slate-200 transition-colors"
              title={theme === 'dark' ? t.lightMode : t.darkMode}
            >
              {theme === 'dark' ? <Sun className="w-2.5 h-2.5 text-amber-400" /> : <Moon className="w-2.5 h-2.5 text-cyan-400" />}
            </button>
          </div>

          {/* Mumbai Coordinates Bottom-Right */}
          <div 
            onClick={() => onNavigateToTab('analytics')}
            className="absolute bottom-3 right-3 flex flex-col items-end font-mono text-[10px] tracking-wider text-slate-300 z-10 cursor-pointer leading-tight"
          >
            <span>19.0768° N</span>
            <span>72.8777° E</span>
            <span className="text-white font-bold text-[10px] mt-0.5 tracking-widest uppercase">{t.mumbai}</span>
          </div>
        </div>

        {/* =========================================================================
            ROW 2, COL 1: MIDDLE-LEFT (Severe Anomaly Tornado)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('bust-radar')}
          className="relative group cursor-pointer overflow-hidden bg-black"
        >
          <img 
            src="/hero/tornado.jpg" 
            alt="Severe Anomaly Tornado" 
            className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-115" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />
          
          {/* Bottom-Left: SEVERE ANOMALY DETECTED */}
          <div className="absolute bottom-3 left-3 z-10 font-mono text-[10px] tracking-widest leading-tight">
            <div className="text-slate-300 uppercase">{t.severeAnomalyDetected.split(' ')[0]} {t.severeAnomalyDetected.split(' ')[1] || 'ANOMALY'}</div>
            <div className="text-white font-bold uppercase">{t.severeAnomalyDetected.split(' ').slice(2).join(' ') || 'DETECTED'}</div>
          </div>
        </div>

        {/* =========================================================================
            ROW 2, COL 2: CENTER HERO (Meteorological Confidence & Tap to Explore)
           ========================================================================= */}
        <div className="relative flex flex-col justify-center items-center text-center px-6 py-4 bg-[#080B11] overflow-hidden">
          {/* Top Tagline: — PREDICTIVE INTELLIGENCE — */}
          <div className="flex items-center gap-3 text-[#38BDF8] text-[10px] font-mono font-medium tracking-[0.25em] uppercase z-10 mb-4">
            <span className="w-8 h-[1px] bg-[#38BDF8]/50" />
            <span>{t.predictiveIntelligence}</span>
            <span className="w-8 h-[1px] bg-[#38BDF8]/50" />
          </div>

          {/* Clean, Crisp, Elegant Headline */}
          <h1 
            style={{ color: '#FFFFFF' }}
            className="landing-title-white text-4xl sm:text-5xl lg:text-[56px] font-sans font-semibold tracking-tight leading-[1.08] z-10 max-w-lg"
          >
            {t.heroHeadline}
          </h1>

          {/* Subtitle */}
          <p 
            style={{ color: '#D1D5DB' }}
            className="landing-text-muted text-xs sm:text-[13px] font-sans mt-3 max-w-md mx-auto leading-relaxed z-10"
          >
            {t.heroSubtitle}
          </p>

          {/* TAP TO EXPLORE -> Button */}
          <div className="mt-6 z-20">
            <button
              onClick={handleCtaClick}
              className="px-7 py-2.5 rounded-[4px] bg-[#ECEEF1] hover:bg-white text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg group"
            >
              <span>{t.tapToExplore}</span>
              <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ROW 2, COL 3: MIDDLE-RIGHT (Earth Globe & Moisture Flux)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('confidence-map')}
          className="relative group cursor-pointer overflow-hidden bg-black flex items-center justify-center"
        >
          <img 
            src="/hero/globe.jpg" 
            alt="Planetary Sphere" 
            className="w-full h-full object-contain p-2 opacity-95 transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />
          
          {/* Top-Right: MOISTURE FLUX STABLE */}
          <div className="absolute top-3 right-3 text-right font-mono text-[10px] tracking-wider z-10 leading-tight">
            <div className="text-slate-300 uppercase">{t.moistureFluxStable.split(' ')[0]} {t.moistureFluxStable.split(' ')[1]}</div>
            <div className="text-white font-bold uppercase">{t.moistureFluxStable.split(' ').slice(2).join(' ') || 'STABLE'}</div>
          </div>
        </div>

        {/* =========================================================================
            ROW 3, COL 1: BOTTOM-LEFT (Chennai Coordinates)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('region-detail')}
          className="relative group cursor-pointer overflow-hidden bg-black p-3 flex flex-col justify-start"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-black to-black pointer-events-none" />
          
          {/* Top-Left: 13.0827° N 80.2707° E CHENNAI */}
          <div className="relative z-10 font-mono text-[10px] tracking-wider text-slate-300 leading-tight">
            <div>13.0827° N</div>
            <div>80.2707° E</div>
            <div className="text-white font-bold text-[10px] mt-0.5 tracking-widest uppercase">{t.chennai}</div>
          </div>
        </div>

        {/* =========================================================================
            ROW 3, COL 2: BOTTOM-CENTER (Planetary Model Orbital Telemetry)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('bust-probability')}
          className="relative group cursor-pointer overflow-hidden bg-black flex flex-col justify-end"
        >
          <img 
            src="/hero/globe.jpg" 
            alt="Orbital Planetary Model Telemetry" 
            className="absolute inset-0 w-full h-full object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-105 filter brightness-95" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
          
          {/* Bottom-Left: GLOBAL PLANETARY MODEL ORBITAL TELEMETRY */}
          <div className="relative z-10 p-3 font-mono text-[10px] tracking-widest leading-tight">
            <div className="text-slate-300 uppercase">{t.globalPlanetaryModel.split(' ').slice(0, 3).join(' ')}</div>
            <div className="text-white font-bold uppercase">{t.globalPlanetaryModel.split(' ').slice(3).join(' ') || 'ORBITAL TELEMETRY'}</div>
          </div>
        </div>

        {/* =========================================================================
            ROW 3, COL 3: BOTTOM-RIGHT (Weather Drone & Kolkata Coordinates)
           ========================================================================= */}
        <div 
          onClick={() => onNavigateToTab('historical-analogs')}
          className="relative group cursor-pointer overflow-hidden bg-black"
        >
          <img 
            src="/hero/drone.jpg" 
            alt="Weather Drone" 
            className="w-full h-full object-cover object-center opacity-80 transition-transform duration-700 group-hover:scale-105 filter brightness-85" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
          
          {/* Top-Right: Kolkata Coordinates */}
          <div className="absolute top-3 right-3 flex flex-col items-end font-mono text-[10px] tracking-wider text-slate-300 z-10 leading-tight">
            <span>22.3726° N</span>
            <span>88.3639° E</span>
            <span className="text-white font-bold text-[10px] mt-0.5 tracking-widest uppercase">{t.kolkata}</span>
          </div>

          {/* Bottom-Right Arrow */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="text-slate-400 group-hover:text-white transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
