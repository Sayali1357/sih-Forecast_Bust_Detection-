export type LeadTimeDay = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type ConfidenceLevel = 'High' | 'Moderate' | 'Low' | 'Very Low';
export type WeatherVariable = 'rainfall' | 'temperature' | 'wind' | 'pressure' | 'humidity';
export type AlertSeverity = 'Critical' | 'Warning' | 'Watch' | 'Resolved';

export interface MeteorologicalSubdivision {
  id: string;
  name: string;
  state: string;
  code: string;
  lat: number;
  lng: number;
  svgX: number; // For responsive SVG radar map rendering
  svgY: number;
  activeWeatherSystem: string;
  synopticDescription: string;
  dayMetrics: Record<LeadTimeDay, DayMetric>;
  historicalMemory: {
    systematicBias: string;
    avgMAE: number;
    mostVulnerableVariable: string;
    dominantFailureMechanism: string;
  };
}

export interface DayMetric {
  leadDay: LeadTimeDay;
  confidenceScore: number; // 0-100%
  bustProbability: number; // 0-100%
  riskLevel: RiskLevel;
  expectedError: 'MINIMAL' | 'MODERATE' | 'HIGH' | 'EXTREME';
  modelAgreement: number; // 0.00 to 1.00 (or LOW/MED/HIGH)
  modelAgreementLabel: 'VERY LOW' | 'LOW' | 'MODERATE' | 'HIGH';
  modelSpread: number; // e.g. ±41.8 mm
  models: {
    ncum: { value: number; unit: string; pressure: number; temp: number; desc: string };
    ecmwf: { value: number; unit: string; pressure: number; temp: number; desc: string };
    gfs: { value: number; unit: string; pressure: number; temp: number; desc: string };
    moesAi: { value: number; unit: string; pressure: number; temp: number; desc: string };
  };
  variableErrors: {
    rainfallQPF: number; // mm
    temperature: number; // °C
    windSpeed: number; // m/s
    mslpPressure: number; // hPa
    humidity: number; // %
  };
  xaiDrivers: {
    feature: string;
    impactPercent: number;
    delta: string;
    category: 'negative' | 'positive';
    description: string;
  }[];
  synopticBriefing: string;
  historicalAnalog: {
    year: number;
    event: string;
    similarity: number; // e.g. 94%
    historicalForecastError: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    actualRainfall: number;
    forecastRainfall: number;
    errorDelta: string;
    keyOutcome: string;
    recommendation: string;
  };
}

export interface HistoricalAnalogCase {
  id: string;
  year: number;
  date: string;
  event: string;
  weatherSystem: string;
  subdivision: string;
  similarityScore: number;
  historicalForecastError: 'HIGH' | 'CRITICAL' | 'MODERATE';
  forecastValue: string;
  actualValue: string;
  errorMagnitude: string;
  failureMechanism: string;
  synopticSignature: string;
  radarEchoImage?: string;
}

export interface WeatherSystemItem {
  id: string;
  name: string;
  code: string;
  category: 'Monsoon Depression' | 'Cyclone' | 'Heavy Rainfall' | 'Western Disturbance' | 'Heat Wave' | 'Active Monsoon' | 'Break Monsoon';
  status: 'ACTIVE' | 'DEVELOPING' | 'MONITORING' | 'WEAKENING';
  risk: RiskLevel;
  bustProbability: number;
  forecastUncertainty: 'HIGH' | 'VERY HIGH' | 'MODERATE' | 'LOW';
  focalRegions: string[];
  leadTimeWindow: string;
  currentIntensity: string;
  keyUncertaintyFactor: string;
}

export interface OperationalAlert {
  id: string;
  severity: AlertSeverity;
  region: string;
  state: string;
  leadTime: string;
  leadDay: number;
  bustProbability: number;
  confidenceScore: number;
  primaryCause: string;
  timestamp: string;
  isResolved?: boolean;
  bulletinId: string;
  synopticDetails: string;
}

export interface LiveTelemetryLog {
  timeUTC: string;
  confidence: number;
  status: 'STABLE' | 'DEGRADING' | 'DETERIORATING RAPIDLY' | 'CRITICAL CLIFF';
  delta6h: string;
  triggerEvent: string;
  modelSpreadDelta: string;
  pressureAnomalyDelta: string;
}

export interface GlobalKPIs {
  indiaConfidence: number;
  activeBustRisks: number;
  highRiskRegions: number;
  activeWeatherSystems: number;
  highestBustProbability: number;
  highestBustRegion: string;
  lastDataUpdate: string;
  operationalCycle: string;
  nwpIngestionStatus: string;
  cliffWarning: {
    detected: boolean;
    dropText: string;
    transitionDays: string;
    mechanism: string;
  };
}
