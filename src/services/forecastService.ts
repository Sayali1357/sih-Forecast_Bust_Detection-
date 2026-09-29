import { 
  SUBDIVISIONS_DATA, 
  GLOBAL_KPIS, 
  WEATHER_SYSTEMS, 
  HISTORICAL_ANALOGS, 
  OPERATIONAL_ALERTS, 
  LIVE_TELEMETRY,
  REGIONAL_ANALYTICS_METRICS 
} from '../data/mockData';
import { 
  MeteorologicalSubdivision, 
  LeadTimeDay, 
  WeatherVariable, 
  OperationalAlert, 
  WeatherSystemItem, 
  HistoricalAnalogCase 
} from '../types';

export class ForecastReliabilityService {
  private subdivisions: MeteorologicalSubdivision[] = [...SUBDIVISIONS_DATA];
  private alerts: OperationalAlert[] = [...OPERATIONAL_ALERTS];

  // Get Global KPIs
  getGlobalKPIs() {
    return GLOBAL_KPIS;
  }

  // Get all Subdivisions
  getSubdivisions(): MeteorologicalSubdivision[] {
    return this.subdivisions;
  }

  // Get single Subdivision by ID
  getSubdivisionById(id: string): MeteorologicalSubdivision | undefined {
    return this.subdivisions.find(s => s.id === id || s.code.toLowerCase() === id.toLowerCase());
  }

  // Search Subdivisions by state, name or code
  searchSubdivisions(query: string): MeteorologicalSubdivision[] {
    if (!query.trim()) return this.subdivisions;
    const q = query.toLowerCase();
    return this.subdivisions.filter(
      s => s.name.toLowerCase().includes(q) || 
           s.state.toLowerCase().includes(q) || 
           s.code.toLowerCase().includes(q) ||
           s.activeWeatherSystem.toLowerCase().includes(q)
    );
  }

  // Get Ranked Failure Hotspots for a specific day
  getRankedFailureHotspots(day: LeadTimeDay): {
    subdivision: MeteorologicalSubdivision;
    bustProb: number;
    confidence: number;
    risk: string;
    primaryDriver: string;
    variance: string;
  }[] {
    return this.subdivisions
      .map(sub => {
        const metric = sub.dayMetrics[day];
        return {
          subdivision: sub,
          bustProb: metric.bustProbability,
          confidence: metric.confidenceScore,
          risk: metric.riskLevel,
          primaryDriver: metric.xaiDrivers[0]?.feature || 'Convective Disagreement',
          variance: `±${metric.modelSpread}mm QPF`
        };
      })
      .sort((a, b) => b.bustProb - a.bustProb);
  }

  // Get Weather Systems
  getWeatherSystems(): WeatherSystemItem[] {
    return WEATHER_SYSTEMS;
  }

  // Get Historical Analogs
  getHistoricalAnalogs(): HistoricalAnalogCase[] {
    return HISTORICAL_ANALOGS;
  }

  // Get Alerts
  getAlerts(): OperationalAlert[] {
    return this.alerts;
  }

  // Acknowledge or Resolve Alert
  resolveAlert(id: string): boolean {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.isResolved = true;
      alert.severity = 'Resolved';
      return true;
    }
    return false;
  }

  // Dispatch Operational Bulletin
  dispatchBulletin(subdivisionId: string, leadDay: LeadTimeDay): {
    success: boolean;
    bulletinId: string;
    timestamp: string;
    message: string;
  } {
    const sub = this.getSubdivisionById(subdivisionId);
    const id = `NCMRWF-BULL-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      bulletinId: id,
      timestamp: new Date().toISOString(),
      message: `Emergency Forecast Bust Bulletin ${id} successfully transmitted to MoES Regional Meteorological Centre (${sub?.state || 'National Grid'}).`
    };
  }

  // Get Live Telemetry Stream
  getLiveTelemetry() {
    return LIVE_TELEMETRY;
  }

  // Get Regional Error Analytics
  getRegionalAnalytics() {
    return REGIONAL_ANALYTICS_METRICS;
  }

  // Sound generator for operational command center audio cues
  playAlertBeep(type: 'critical' | 'click' | 'warning' = 'critical') {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'critical') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'warning') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      }
    } catch (e) {
      // Audio context might be restricted before user interaction
    }
  }
}

export const forecastService = new ForecastReliabilityService();
