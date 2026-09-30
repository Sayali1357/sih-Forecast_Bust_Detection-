import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  // Brand & Landing
  brandName: string;
  brandTagline: string;
  appTitle: string;
  heroHeadline: string;
  heroSubtitle: string;
  predictiveIntelligence: string;
  tapToExplore: string;
  systemOnline: string;
  documentation: string;
  ensembles: string;
  severeAnomalyDetected: string;
  globalPlanetaryModel: string;
  moistureFluxStable: string;
  globalEnsembleSync: string;
  newDelhi: string;
  mumbai: string;
  chennai: string;
  kolkata: string;
  
  // Navigation
  navLanding: string;
  navOverview: string;
  navBustRadar: string;
  navConfidenceMap: string;
  navBustProbability: string;
  navModelDisagreement: string;
  navHistoricalAnalogs: string;
  navWeatherSystems: string;
  navExplainableAI: string;
  navTimeline: string;
  navAlertCenter: string;
  navAnalytics: string;
  navRegionDeepDive: string;
  operationalViews: string;
  
  // Controls & Navbar
  quickSearch: string;
  searchPlaceholder: string;
  audioAlertsActive: string;
  audioAlertsMuted: string;
  themeToggle: string;
  lightMode: string;
  darkMode: string;
  languageSelect: string;
  liveStatus: string;
  cycleOperational: string;
  threatsActive: string;
  hpcCore: string;
  online: string;
  
  // Common terms
  leadTime: string;
  day: string;
  days: string;
  confidenceScore: string;
  bustProbability: string;
  riskLevel: string;
  modelSpread: string;
  low: string;
  moderate: string;
  high: string;
  critical: string;
  extreme: string;
  exportBulletin: string;
  close: string;
  viewDetails: string;
  backToHero: string;
}

const translations: Record<Language, Translations> = {
  en: {
    brandName: 'Parjanya AI',
    brandTagline: 'AI-Based Forecast Bust Detection for NCMRWF/MoES',
    appTitle: 'Parjanya Command Center',
    heroHeadline: 'Meteorological Confidence',
    heroSubtitle: 'AI-based bust detection for medium-range forecasts. Seamless integration with numerical weather models.',
    predictiveIntelligence: 'PREDICTIVE INTELLIGENCE',
    tapToExplore: 'TAP TO EXPLORE',
    systemOnline: 'SYSTEM ONLINE',
    documentation: 'DOCUMENTATION',
    ensembles: 'ENSEMBLES',
    severeAnomalyDetected: 'SEVERE ANOMALY DETECTED',
    globalPlanetaryModel: 'GLOBAL PLANETARY MODEL ORBITAL TELEMETRY',
    moistureFluxStable: 'MOISTURE FLUX STABLE',
    globalEnsembleSync: 'GLOBAL FORECAST ENSEMBLE SYNCHRONIZED 2026',
    newDelhi: 'NEW DELHI',
    mumbai: 'MUMBAI',
    chennai: 'CHENNAI',
    kolkata: 'KOLKATA',
    
    navLanding: 'Parjanya Showcase',
    navOverview: 'Overview',
    navBustRadar: 'Bust Radar',
    navConfidenceMap: 'Confidence Map',
    navBustProbability: 'Bust Probability',
    navModelDisagreement: 'Model Disagreement',
    navHistoricalAnalogs: 'Historical Analogs',
    navWeatherSystems: 'Weather Systems',
    navExplainableAI: 'Explainable AI (XAI)',
    navTimeline: 'Reliability Timeline',
    navAlertCenter: 'Alert Center',
    navAnalytics: 'Forecast Analytics',
    navRegionDeepDive: 'Region Deep-Dive',
    operationalViews: 'Operational Views',
    
    quickSearch: 'Quick Search...',
    searchPlaceholder: 'Search Subdivisions, Systems, Analogs (Ctrl+K)',
    audioAlertsActive: 'Operational Audio Alerts Active',
    audioAlertsMuted: 'Audio Alerts Muted',
    themeToggle: 'Switch Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    languageSelect: 'Language',
    liveStatus: 'LIVE',
    cycleOperational: 'CYCLE 00Z OPERATIONAL',
    threatsActive: 'BUST THREATS ACTIVE',
    hpcCore: 'HPC Core',
    online: 'ONLINE',
    
    leadTime: 'Lead Time',
    day: 'Day',
    days: 'Days',
    confidenceScore: 'Confidence Score',
    bustProbability: 'Bust Probability',
    riskLevel: 'Risk Level',
    modelSpread: 'Model Spread',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    critical: 'Critical',
    extreme: 'Extreme',
    exportBulletin: 'Export Bulletin',
    close: 'Close',
    viewDetails: 'View Details',
    backToHero: 'Parjanya Home'
  },
  mr: {
    brandName: 'पर्जन्य एआय (Parjanya AI)',
    brandTagline: 'NCMRWF/MoES साठी एआय-आधारित अंदाज अपयश शोध प्रणाली',
    appTitle: 'पर्जन्य नियंत्रण कक्ष',
    heroHeadline: 'हवामानशास्त्रीय विश्वासार्हता',
    heroSubtitle: 'मध्यम पल्ल्याच्या हवामान अंदाजांसाठी एआय-आधारित बस्ट (अपयश) शोध प्रणाली. गणितीय मॉडेल्ससोबत अखंड जोडणी.',
    predictiveIntelligence: 'पूर्वानुमान बुद्धिमत्ता',
    tapToExplore: 'अन्वेषण करण्यासाठी टॅप करा',
    systemOnline: 'प्रणाली ऑनलाइन',
    documentation: 'दस्तऐवजीकरण',
    ensembles: 'मॉडेल समूह (Ensembles)',
    severeAnomalyDetected: 'तीव्र हवामान विसंगती आढळली',
    globalPlanetaryModel: 'जागतिक ग्रहीय मॉडेल कक्षीय टेलिमेट्री',
    moistureFluxStable: 'आर्द्रता प्रवाह स्थिर',
    globalEnsembleSync: 'जागतिक अंदाज समूह समक्रमित २०२६',
    newDelhi: 'नवी दिल्ली',
    mumbai: 'मुंबई',
    chennai: 'चेन्नई',
    kolkata: 'कोलकाता',
    
    navLanding: 'पर्जन्य मुख्य पृष्ठ',
    navOverview: 'विहंगावलोकन',
    navBustRadar: 'बस्ट रडार (Bust Radar)',
    navConfidenceMap: 'विश्वासार्हता नकाशा',
    navBustProbability: 'अपयश संभाव्यता',
    navModelDisagreement: 'मॉडेल असहमती',
    navHistoricalAnalogs: 'ऐतिहासिक सादृश्य घटना',
    navWeatherSystems: 'सक्रिय हवामान प्रणाली',
    navExplainableAI: 'स्पष्टीकरणीय एआय (XAI)',
    navTimeline: 'विश्वासार्हता टाइमलाइन',
    navAlertCenter: 'इशारा व सूचना केंद्र',
    navAnalytics: 'अंदाज विश्लेषण',
    navRegionDeepDive: 'प्रादेशिक सखोल विश्लेषण',
    operationalViews: 'कार्यप्रणाली दृश्ये',
    
    quickSearch: 'जलद शोध...',
    searchPlaceholder: 'उपविभाग, प्रणाली, सादृश्य शोधा (Ctrl+K)',
    audioAlertsActive: 'ऑडिओ इशारे सक्रिय',
    audioAlertsMuted: 'ऑडिओ म्यूट केला आहे',
    themeToggle: 'थीम बदला',
    lightMode: 'लाइट मोड',
    darkMode: 'डार्क मोड',
    languageSelect: 'भाषा निवडा',
    liveStatus: 'थेट (LIVE)',
    cycleOperational: 'सायकल 00Z कार्यरत',
    threatsActive: 'सक्रिय बस्ट धोके',
    hpcCore: 'एचपीसी सुपरकॉम्प्युटर',
    online: 'ऑनलाइन',
    
    leadTime: 'आगामी दिवस (Lead Time)',
    day: 'दिवस',
    days: 'दिवस',
    confidenceScore: 'विश्वासार्हता गुणांक',
    bustProbability: 'अपयश संभाव्यता (Bust Prob)',
    riskLevel: 'धोका पातळी',
    modelSpread: 'मॉडेल तफावत',
    low: 'कमी',
    moderate: 'मध्यम',
    high: 'जास्त',
    critical: 'अतिगंभीर',
    extreme: 'अत्यंत तीव्र',
    exportBulletin: 'बुलेटिन डाउनलोड करा',
    close: 'बंद करा',
    viewDetails: 'तपशील पहा',
    backToHero: 'पर्जन्य शोकेस'
  },
  hi: {
    brandName: 'पर्जन्य एआई (Parjanya AI)',
    brandTagline: 'NCMRWF/MoES के लिए एआई-आधारित पूर्वानुमान विफलता पहचान प्रणाली',
    appTitle: 'पर्जन्य नियंत्रण केंद्र',
    heroHeadline: 'मौसम संबंधी विश्वसनीयता',
    heroSubtitle: 'मध्यम-अवधि के मौसम पूर्वानुमानों के लिए एआई-आधारित बस्ट (विफलता) पहचान। गणितीय मौसम मॉडलों के साथ निर्बाध एकीकरण।',
    predictiveIntelligence: 'पूर्वानुमानित बुद्धिमत्ता',
    tapToExplore: 'अन्वेषण के लिए टैप करें',
    systemOnline: 'सिस्टम ऑनलाइन',
    documentation: 'दस्तावेज़ीकरण',
    ensembles: 'मॉडल एन्सेम्बल',
    severeAnomalyDetected: 'गंभीर मौसम विसंगति की पहचान',
    globalPlanetaryModel: 'वैश्विक ग्रहीय मॉडल कक्षीय टेलीमेट्री',
    moistureFluxStable: 'नमी प्रवाह स्थिर',
    globalEnsembleSync: 'वैश्विक पूर्वानुमान एन्सेम्बल सिंक्रोनाइज़्ड 2026',
    newDelhi: 'नई दिल्ली',
    mumbai: 'मुंबई',
    chennai: 'चेन्नई',
    kolkata: 'कोलकाता',
    
    navLanding: 'पर्जन्य मुख्य पृष्ठ',
    navOverview: 'अवलोकन',
    navBustRadar: 'बस्ट रडार (Bust Radar)',
    navConfidenceMap: 'विश्वसनीयता मानचित्र',
    navBustProbability: 'विफलता प्रायिकता',
    navModelDisagreement: 'मॉडल असहमति',
    navHistoricalAnalogs: 'ऐतिहासिक अनुरूप घटनाएं',
    navWeatherSystems: 'सक्रिय मौसम प्रणालियां',
    navExplainableAI: 'व्याख्यात्मक एआई (XAI)',
    navTimeline: 'विश्वसनीयता टाइमलाइन',
    navAlertCenter: 'चेतावनी और अलर्ट केंद्र',
    navAnalytics: 'पूर्वानुमान विश्लेषण',
    navRegionDeepDive: 'क्षेत्रीय गहन विश्लेषण',
    operationalViews: 'परिचालन दृश्य',
    
    quickSearch: 'त्वरित खोज...',
    searchPlaceholder: 'उपखंड, मौसम प्रणाली, सादृश्य खोजें (Ctrl+K)',
    audioAlertsActive: 'ऑडियो अलर्ट सक्रिय',
    audioAlertsMuted: 'ऑडियो अलर्ट म्यूट',
    themeToggle: 'थीम बदलें',
    lightMode: 'लाइट मोड',
    darkMode: 'डार्क मोड',
    languageSelect: 'भाषा चुनें',
    liveStatus: 'लाइव (LIVE)',
    cycleOperational: 'साइकिल 00Z सक्रिय',
    threatsActive: 'सक्रिय बस्ट खतरे',
    hpcCore: 'एचपीसी कोर',
    online: 'ऑनलाइन',
    
    leadTime: 'लीड टाइम',
    day: 'दिन',
    days: 'दिन',
    confidenceScore: 'विश्वसनीयता स्कोर',
    bustProbability: 'बस्ट प्रायिकता (विफलता)',
    riskLevel: 'जोखिम स्तर',
    modelSpread: 'मॉडल अंतर',
    low: 'कम',
    moderate: 'मध्यम',
    high: 'उच्च',
    critical: 'अति गंभीर',
    extreme: 'अत्यधिक तीव्र',
    exportBulletin: 'बुलेटिन निर्यात करें',
    close: 'बंद करें',
    viewDetails: 'विवरण देखें',
    backToHero: 'पर्जन्य होम'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('parjanya_lang') as Language;
    return saved && ['en', 'mr', 'hi'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('parjanya_lang', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
