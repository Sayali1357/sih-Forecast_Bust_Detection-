import { 
  MeteorologicalSubdivision, 
  HistoricalAnalogCase, 
  WeatherSystemItem, 
  OperationalAlert, 
  LiveTelemetryLog, 
  GlobalKPIs,
  LeadTimeDay
} from '../types';

export const GLOBAL_KPIS: GlobalKPIs = {
  indiaConfidence: 72,
  activeBustRisks: 8,
  highRiskRegions: 5,
  activeWeatherSystems: 3,
  highestBustProbability: 78,
  highestBustRegion: 'Odisha Coastal Grid',
  lastDataUpdate: '2 min ago',
  operationalCycle: 'CYCLE 00Z (GFS/NCUM/ECMWF Ingested)',
  nwpIngestionStatus: 'OPERATIONAL (Pratyush / Mihir HPC Suite)',
  cliffWarning: {
    detected: true,
    dropText: 'Δ -37% DROP',
    transitionDays: 'Day 4 → Day 5',
    mechanism: 'Deep convective parameterization collapse in GFS/NCUM ensemble suites across Central-West Corridor'
  }
};

export const LIVE_TELEMETRY: LiveTelemetryLog[] = [
  {
    timeUTC: '08:00 UTC',
    confidence: 72,
    status: 'STABLE',
    delta6h: '-0%',
    triggerEvent: 'Operational 00Z ingest finalized across 36 sub-divisions.',
    modelSpreadDelta: '±12.4mm',
    pressureAnomalyDelta: '-0.8 hPa'
  },
  {
    timeUTC: '10:00 UTC',
    confidence: 65,
    status: 'DEGRADING',
    delta6h: '-7%',
    triggerEvent: 'INSAT-3DR radiance divergence detected over Northern Bay grid nodes.',
    modelSpreadDelta: '±22.1mm',
    pressureAnomalyDelta: '-1.9 hPa'
  },
  {
    timeUTC: '12:00 UTC',
    confidence: 48,
    status: 'DETERIORATING RAPIDLY',
    delta6h: '-17%',
    triggerEvent: 'Central surface pressure plummeted 4.2 hPa faster than NWP run forecast.',
    modelSpreadDelta: '±34.6mm',
    pressureAnomalyDelta: '-3.6 hPa'
  },
  {
    timeUTC: '14:00 (LIVE)',
    confidence: 39,
    status: 'CRITICAL CLIFF',
    delta6h: '-33%',
    triggerEvent: 'ECMWF vs GFS rain variance escalated to +42mm with track bifurcation.',
    modelSpreadDelta: '±41.8mm',
    pressureAnomalyDelta: '-4.2 hPa'
  }
];

export const WEATHER_SYSTEMS: WeatherSystemItem[] = [
  {
    id: 'ws-1',
    name: 'BOB-02 Monsoon Depression',
    code: 'BOB-02',
    category: 'Monsoon Depression',
    status: 'ACTIVE',
    risk: 'Critical',
    bustProbability: 78,
    forecastUncertainty: 'VERY HIGH',
    focalRegions: ['Odisha Coast', 'Gangetic West Bengal', 'Chhattisgarh', 'Vidarbha'],
    leadTimeWindow: 'Day 4 to Day 6 (+96h to +144h)',
    currentIntensity: 'Deep Depression (992 hPa, 45 kts)',
    keyUncertaintyFactor: 'Steering flow bifurcation between ECMWF and GFS dynamical cores over Chota Nagpur plateau.'
  },
  {
    id: 'ws-2',
    name: 'Western Disturbance WD-14',
    code: 'WD-14',
    category: 'Western Disturbance',
    status: 'ACTIVE',
    risk: 'Moderate',
    bustProbability: 48,
    forecastUncertainty: 'MODERATE',
    focalRegions: ['Jammu & Kashmir', 'Himachal Pradesh', 'Punjab', 'Uttarakhand'],
    leadTimeWindow: 'Day 2 to Day 4 (+48h to +96h)',
    currentIntensity: 'Mid-Tropospheric Trough (500 hPa)',
    keyUncertaintyFactor: 'Orographic precipitation wave capture timing along Pir Panjal range.'
  },
  {
    id: 'ws-3',
    name: 'Konkan-Goa Offshore Trough Surge',
    code: 'OTS-W',
    category: 'Heavy Rainfall',
    status: 'ACTIVE',
    risk: 'High',
    bustProbability: 68,
    forecastUncertainty: 'HIGH',
    focalRegions: ['Maharashtra (Konkan/Ghats)', 'Goa', 'Coastal Karnataka', 'Gujarat Saurashtra'],
    leadTimeWindow: 'Day 4 to Day 7 (+96h to +168h)',
    currentIntensity: 'Meso-β Convective Vortex (Low-Level Jet 38 kts)',
    keyUncertaintyFactor: 'Low-level moisture transport underestimation across Western Ghats ridge line.'
  },
  {
    id: 'ws-4',
    name: 'Bay of Bengal Tropical Cyclone (Pre-Genesis)',
    code: 'TC-BOB-01',
    category: 'Cyclone',
    status: 'DEVELOPING',
    risk: 'High',
    bustProbability: 62,
    forecastUncertainty: 'HIGH',
    focalRegions: ['Andhra Pradesh Coast', 'Odisha Coast', 'Tamil Nadu'],
    leadTimeWindow: 'Day 6 to Day 9 (+144h to +216h)',
    currentIntensity: 'Well-Marked Low (1000 hPa)',
    keyUncertaintyFactor: 'Upper-tropospheric vertical wind shear relaxation rate.'
  },
  {
    id: 'ws-5',
    name: 'Northwest Semi-Arid Heat Dome',
    code: 'HD-NW',
    category: 'Heat Wave',
    status: 'MONITORING',
    risk: 'Low',
    bustProbability: 24,
    forecastUncertainty: 'LOW',
    focalRegions: ['West Rajasthan', 'East Rajasthan', 'West MP'],
    leadTimeWindow: 'Day 1 to Day 5 (+24h to +120h)',
    currentIntensity: 'Max Temp 44.5°C with Anticyclonic Subsidence',
    keyUncertaintyFactor: 'Dry convective boundary layer depth and advection.'
  },
  {
    id: 'ws-6',
    name: 'Southwest Active Monsoon Phase',
    code: 'SWM-ACT',
    category: 'Active Monsoon',
    status: 'ACTIVE',
    risk: 'High',
    bustProbability: 66,
    forecastUncertainty: 'HIGH',
    focalRegions: ['Assam & Meghalaya', 'Sub-Himalayan WB', 'Konkan', 'Central India'],
    leadTimeWindow: 'Day 3 to Day 7 (+72h to +168h)',
    currentIntensity: 'Monsoon Trough South of Normal Position',
    keyUncertaintyFactor: 'Intra-seasonal Madden-Julian Oscillation (MJO) phase 3 interference.'
  },
  {
    id: 'ws-7',
    name: 'Monsoon Break Signal Watch',
    code: 'MB-WATCH',
    category: 'Break Monsoon',
    status: 'MONITORING',
    risk: 'Low',
    bustProbability: 18,
    forecastUncertainty: 'LOW',
    focalRegions: ['Foothills of Himalayas', 'Tamil Nadu'],
    leadTimeWindow: 'Day 8 to Day 10 (+192h to +240h)',
    currentIntensity: 'Weak Trough Shift Indices',
    keyUncertaintyFactor: 'Rossby wave train propagation over Eurasian sector.'
  }
];

export const HISTORICAL_ANALOGS: HistoricalAnalogCase[] = [
  {
    id: 'ha-1',
    year: 2022,
    date: '18 July 2022',
    event: 'Monsoon Depression BOB-02 Landfall Split',
    weatherSystem: 'Monsoon Depression',
    subdivision: 'Odisha Coastal Grid',
    similarityScore: 94.2,
    historicalForecastError: 'CRITICAL',
    forecastValue: '205 mm (NCUM-G)',
    actualValue: '112 mm (Observed AWS)',
    errorMagnitude: '+93 mm Overshoot (-140km Track Shift)',
    failureMechanism: 'Orographic blocking stalled moisture funnel over Ghats, resulting in westward track deflection.',
    synopticSignature: 'Mid-level shear 34 kts, MSLP drop 5.1 hPa / 12h, high SST anomaly (+1.4°C).'
  },
  {
    id: 'ha-2',
    year: 2019,
    date: '26-28 July 2019',
    event: 'Konkan-Ghats Cloudburst & Flash Flood Bust',
    weatherSystem: 'Heavy Rainfall / Offshore Trough',
    subdivision: 'Maharashtra (Konkan/Ghats)',
    similarityScore: 91.4,
    historicalForecastError: 'CRITICAL',
    forecastValue: '85 mm (Medium QPF)',
    actualValue: '284 mm (Extreme Deluge)',
    errorMagnitude: '-199 mm Severe Underestimate',
    failureMechanism: 'Coarse 12km NWP missed Meso-β convective core trigger anchored along Mahabaleshwar cliffs.',
    synopticSignature: 'Low-Level Jet 42 kts perpendicular to Western Ghats with deep saturated column.'
  },
  {
    id: 'ha-3',
    year: 2021,
    date: '26 July 2021',
    event: 'Gangetic West Bengal Micro-Cyclone Surge',
    weatherSystem: 'Active Monsoon Surge',
    subdivision: 'West Bengal / Gangetic Plain',
    similarityScore: 88.7,
    historicalForecastError: 'HIGH',
    forecastValue: '160 mm (ECMWF)',
    actualValue: '68 mm (Observed)',
    errorMagnitude: '+92 mm QPF Bias Overestimation',
    failureMechanism: 'Dry air entrainment from northwest quadrant choked convective towers at T+72h.',
    synopticSignature: 'Upper-tropospheric divergence zone moved 180 km faster than ensemble mean.'
  },
  {
    id: 'ha-4',
    year: 2020,
    date: '07 August 2020',
    event: 'Idukki Orographic Squall Surge',
    weatherSystem: 'Heavy Rainfall',
    subdivision: 'Kerala & Mahe',
    similarityScore: 84.1,
    historicalForecastError: 'HIGH',
    forecastValue: '75 mm',
    actualValue: '218 mm',
    errorMagnitude: '-143 mm Underestimation Bust',
    failureMechanism: 'Convective parameterization scheme failed on extreme slope uplift mechanics.',
    synopticSignature: 'Strong Cross-Equatorial Flow (>45 kts at 850 hPa).'
  },
  {
    id: 'ha-5',
    year: 2023,
    date: '14 January 2023',
    event: 'Intense Western Disturbance Deep Trough',
    weatherSystem: 'Western Disturbance',
    subdivision: 'Himachal Pradesh & Kashmir',
    similarityScore: 81.6,
    historicalForecastError: 'MODERATE',
    forecastValue: '35 cm Snowfall',
    actualValue: '68 cm Blizzard Snow',
    errorMagnitude: '-33 cm Underestimate',
    failureMechanism: 'Moisture incursion from Arabian Sea amplified trough depth unexpectedly at Day 4.',
    synopticSignature: 'Subtropical Westerly Jet stream core >120 kts dipping south of 30°N.'
  }
];

export const OPERATIONAL_ALERTS: OperationalAlert[] = [
  {
    id: 'alt-001',
    severity: 'Critical',
    region: 'Odisha Coastal Grid',
    state: 'Odisha',
    leadTime: 'Day 5 (+120h)',
    leadDay: 5,
    bustProbability: 78,
    confidenceScore: 22,
    primaryCause: 'Extreme multi-model QPF spread (±41.8mm) + Rapid surface pressure drop (Δp: -4.2 hPa/6h) matching 2022 analog bust.',
    timestamp: '12 min ago',
    bulletinId: 'NCMRWF-XAI-2026-BOB02-05',
    synopticDetails: 'ECMWF projects 185mm landfall core while NCUM projects 110mm south deflection. High track uncertainty.'
  },
  {
    id: 'alt-002',
    severity: 'Critical',
    region: 'West Bengal / Gangetic Plain',
    state: 'West Bengal',
    leadTime: 'Day 4 (+96h)',
    leadDay: 4,
    bustProbability: 74,
    confidenceScore: 28,
    primaryCause: 'ECMWF EPS kurtosis divergence > 3.6 with severe QPF overshoot risk over Delta basin.',
    timestamp: '25 min ago',
    bulletinId: 'NCMRWF-XAI-2026-WB-04',
    synopticDetails: 'Dry air intrusion at 700 hPa likely to cause severe precipitation over-prediction in standard NWP suites.'
  },
  {
    id: 'alt-003',
    severity: 'Warning',
    region: 'Assam & Meghalaya',
    state: 'Assam',
    leadTime: 'Day 6 (+144h)',
    leadDay: 6,
    bustProbability: 69,
    confidenceScore: 31,
    primaryCause: 'Orographic precipitation bias over steep Khasi hills exceeding historical ±65mm boundary.',
    timestamp: '42 min ago',
    bulletinId: 'NCMRWF-XAI-2026-NE-06',
    synopticDetails: 'High-resolution MoES AI model indicates severe localized cloudburst risk uncaptured by 13km GFS.'
  },
  {
    id: 'alt-004',
    severity: 'Warning',
    region: 'Maharashtra (Konkan/Ghats)',
    state: 'Maharashtra',
    leadTime: 'Day 5 (+120h)',
    leadDay: 5,
    bustProbability: 68,
    confidenceScore: 32,
    primaryCause: 'Offshore trough intensity under-prediction. Low model agreement (0.28) and 91% similarity to July 2019 flood bust.',
    timestamp: '1 hour ago',
    bulletinId: 'NCMRWF-XAI-2026-MH-05',
    synopticDetails: 'NCUM-Global underestimates low-level moisture transport across 72°E by 2.1 g/kg, leading to severe dry bias.'
  },
  {
    id: 'alt-005',
    severity: 'Warning',
    region: 'Gujarat Saurashtra',
    state: 'Gujarat',
    leadTime: 'Day 7 (+168h)',
    leadDay: 7,
    bustProbability: 61,
    confidenceScore: 36,
    primaryCause: 'Cyclonic vortex wind divergence over Kutch coast (+6.4 m/s spread across members).',
    timestamp: '2 hours ago',
    bulletinId: 'NCMRWF-XAI-2026-GJ-07',
    synopticDetails: 'Mid-tropospheric cyclonic circulation position erratic in GFS ensemble members after +144h.'
  },
  {
    id: 'alt-006',
    severity: 'Watch',
    region: 'Kerala & Mahe',
    state: 'Kerala',
    leadTime: 'Day 3 (+72h)',
    leadDay: 3,
    bustProbability: 46,
    confidenceScore: 54,
    primaryCause: 'Cross-equatorial flow surge acceleration along Idukki-Wayanad ridge.',
    timestamp: '3 hours ago',
    bulletinId: 'NCMRWF-XAI-2026-KL-03',
    synopticDetails: 'Moderate model agreement, but historical memory indicates recurring 35% under-prediction in heavy spells.'
  },
  {
    id: 'alt-007',
    severity: 'Watch',
    region: 'Himachal Pradesh & Uttarakhand',
    state: 'Himachal Pradesh',
    leadTime: 'Day 4 (+96h)',
    leadDay: 4,
    bustProbability: 42,
    confidenceScore: 58,
    primaryCause: 'Western Disturbance interaction with moisture corridor over Northwest Himalayas.',
    timestamp: '4 hours ago',
    bulletinId: 'NCMRWF-XAI-2026-HP-04',
    synopticDetails: 'Orographic snowline elevation variance between ECMWF (2200m) and GFS (2600m).'
  },
  {
    id: 'alt-008',
    severity: 'Resolved',
    region: 'Tamil Nadu & Puducherry',
    state: 'Tamil Nadu',
    leadTime: 'Day 2 (+48h)',
    leadDay: 2,
    bustProbability: 16,
    confidenceScore: 84,
    primaryCause: 'Coastal convective divergence stabilized following 12Z radar assimilation cycle.',
    timestamp: '6 hours ago',
    bulletinId: 'NCMRWF-XAI-2026-TN-02',
    synopticDetails: 'High ensemble convergence across all 4 operational models with Doppler radar confirmation.',
    isResolved: true
  }
];

// Helper to build Day 1 to Day 10 curves dynamically for all subdivisions
function generateDayMetrics(
  baseConf: number,
  cliffDay: number,
  cliffDrop: number,
  subdivName: string,
  dominantSys: string
): Record<LeadTimeDay, any> {
  const metrics: Record<number, any> = {};

  for (let d = 1; d <= 10; d++) {
    let conf = baseConf;
    if (d < cliffDay) {
      conf = Math.round(baseConf - (d - 1) * 3.5);
    } else if (d === cliffDay) {
      conf = Math.round(baseConf - (d - 1) * 3.5 - cliffDrop * 0.7);
    } else {
      conf = Math.round(baseConf - (cliffDay - 1) * 3.5 - cliffDrop - (d - cliffDay) * 3.2);
    }
    conf = Math.max(12, Math.min(95, conf));

    const bustProb = Math.min(88, Math.max(8, 100 - conf + Math.floor(Math.random() * 6 - 3)));
    
    let risk: any = 'Low';
    if (bustProb >= 70) risk = 'Critical';
    else if (bustProb >= 50) risk = 'High';
    else if (bustProb >= 30) risk = 'Moderate';

    let expectedError: any = 'MINIMAL';
    if (bustProb >= 70) expectedError = 'EXTREME';
    else if (bustProb >= 50) expectedError = 'HIGH';
    else if (bustProb >= 30) expectedError = 'MODERATE';

    const agreementVal = Number((Math.max(0.15, conf / 100 - 0.05)).toFixed(2));
    let agreementLabel: any = 'HIGH';
    if (agreementVal < 0.35) agreementLabel = 'VERY LOW';
    else if (agreementVal < 0.55) agreementLabel = 'LOW';
    else if (agreementVal < 0.75) agreementLabel = 'MODERATE';

    const spread = Number((((100 - conf) / 100) * 55 + 5).toFixed(1));

    // Dynamic model forecasts based on lead time and region
    const rainMultiplier = subdivName.includes('Konkan') || subdivName.includes('Odisha') || subdivName.includes('Meghalaya') ? 1.8 : 0.8;
    const ncumVal = Math.round((70 + (10 - d) * 4) * rainMultiplier);
    const ecmwfVal = Math.round((ncumVal + spread * 1.5));
    const gfsVal = Math.round((ncumVal + spread * 0.7));
    const aiVal = Math.round((ncumVal + spread * 2.0));

    metrics[d as LeadTimeDay] = {
      leadDay: d as LeadTimeDay,
      confidenceScore: conf,
      bustProbability: bustProb,
      riskLevel: risk,
      expectedError,
      modelAgreement: agreementVal,
      modelAgreementLabel: agreementLabel,
      modelSpread: spread,
      models: {
        ncum: { value: ncumVal, unit: 'mm', pressure: 998 - d, temp: 28.4, desc: 'Moderate Convection' },
        ecmwf: { value: ecmwfVal, unit: 'mm', pressure: 994 - d, temp: 27.2, desc: 'High Gust Warning' },
        gfs: { value: gfsVal, unit: 'mm', pressure: 996 - d, temp: 27.9, desc: 'Moderate Front' },
        moesAi: { value: aiVal, unit: 'mm', pressure: 992 - d, temp: 26.8, desc: 'Severe Convective Peak' }
      },
      variableErrors: {
        rainfallQPF: Math.round(spread * 1.1),
        temperature: Number((1.2 + d * 0.35).toFixed(1)),
        windSpeed: Number((3.2 + d * 0.8).toFixed(1)),
        mslpPressure: Number((1.8 + d * 0.45).toFixed(1)),
        humidity: Math.round(8 + d * 2.4)
      },
      xaiDrivers: [
        {
          feature: 'Rapid Pressure Change (Δp/Δt)',
          impactPercent: Math.min(42, Math.round(bustProb * 0.48)),
          delta: '-4.2 hPa / 6h',
          category: 'negative',
          description: 'Offshore Meso-low rapid deepening rate outpaces NWP dynamical core resolution.'
        },
        {
          feature: 'Multi-Model Disagreement (Spread σ)',
          impactPercent: Math.min(32, Math.round(bustProb * 0.34)),
          delta: `±${spread} mm`,
          category: 'negative',
          description: 'NCUM vs ECMWF vs GFS QPF divergence breaches operational consensus threshold.'
        },
        {
          feature: 'Historical Rainfall Error Bias',
          impactPercent: Math.min(25, Math.round(bustProb * 0.25)),
          delta: '+42mm bias',
          category: 'negative',
          description: 'Regional memory indicates systematic 40% under-prediction during active monsoon surge.'
        },
        {
          feature: 'Low-Level Wind Shear Evolution',
          impactPercent: 14,
          delta: '28 kts shear',
          category: 'negative',
          description: '850-200 hPa vertical shear anomaly induces convective cloud tilting uncertainty.'
        },
        {
          feature: 'Stable Thermal Profile (Inversion)',
          impactPercent: 12,
          delta: '+12%',
          category: 'positive',
          description: 'Boundary layer inversion limits unorganized convective explosion.'
        },
        {
          feature: 'Dense Doppler Radar Assimilation',
          impactPercent: 9,
          delta: '+9%',
          category: 'positive',
          description: 'Continuous reflectivity echo matching constrains Day 1 to Day 3 spatial bias.'
        }
      ],
      synopticBriefing: `Forecast confidence for ${subdivName} at Day ${d} is ${conf < 40 ? 'critically low' : conf < 65 ? 'moderately low' : 'stable'} (${conf}%) because the synoptic state exhibits ${d >= 4 ? 'elevated multi-model QPF divergence (±' + spread + 'mm), rapid offshore pressure deepening, and strong resemblance to historical bust analogs.' : 'good initial model consensus and stable boundary conditions with low ensemble variance.'}`,
      historicalAnalog: {
        year: 2022,
        event: 'Monsoon Depression Axis Bifurcation',
        similarity: Math.min(96, Math.max(72, Math.round(bustProb * 0.8 + 35))),
        historicalForecastError: bustProb >= 65 ? 'CRITICAL' : bustProb >= 45 ? 'HIGH' : 'MODERATE',
        actualRainfall: Math.round(ncumVal * 1.6),
        forecastRainfall: ncumVal,
        errorDelta: `+${Math.round(ncumVal * 0.6)} mm Delta`,
        keyOutcome: 'Core precipitation shifted 120km south of forecasted landfall corridor.',
        recommendation: 'Apply spatial bias nudging of +1.2°N to correct convective centroid.'
      }
    };
  }

  return metrics;
}

export const SUBDIVISIONS_DATA: MeteorologicalSubdivision[] = [
  {
    id: 'sub-mh-konkan',
    name: 'Maharashtra (Konkan & Goa)',
    state: 'Maharashtra',
    code: 'MR-09',
    lat: 18.92,
    lng: 72.83,
    svgX: 240,
    svgY: 420,
    activeWeatherSystem: 'Active Southwest Monsoon Surge',
    synopticDescription: 'Offshore trough from South Gujarat to Kerala coast with intense convective cells over Western Ghats ridge.',
    dayMetrics: generateDayMetrics(92, 5, 37, 'Maharashtra (Konkan & Goa)', 'Active Monsoon'),
    historicalMemory: {
      systematicBias: 'Severe Underestimation of Orographic Cloudbursts (+48mm avg bias)',
      avgMAE: 34.2,
      mostVulnerableVariable: 'Rainfall QPF (Ghats Zone)',
      dominantFailureMechanism: 'Meso-β convective parameterization collapse at +96h lead time'
    }
  },
  {
    id: 'sub-odisha',
    name: 'Odisha Coastal Grid',
    state: 'Odisha',
    code: 'MR-05',
    lat: 20.27,
    lng: 85.84,
    svgX: 420,
    svgY: 370,
    activeWeatherSystem: 'BOB-02 Monsoon Depression',
    synopticDescription: 'Depression centered 140km SE of Gopalpur with heavy rain bands rotating over coastal districts.',
    dayMetrics: generateDayMetrics(88, 4, 42, 'Odisha Coastal Grid', 'Monsoon Depression'),
    historicalMemory: {
      systematicBias: 'Track Bifurcation Discrepancy & Landfall QPF Overshoot (+55mm)',
      avgMAE: 39.8,
      mostVulnerableVariable: 'Depression Track & Rainfall Core',
      dominantFailureMechanism: 'Steering flow shear over Chota Nagpur plateau'
    }
  },
  {
    id: 'sub-wb-gangetic',
    name: 'West Bengal (Gangetic Plain)',
    state: 'West Bengal',
    code: 'MR-06',
    lat: 22.57,
    lng: 88.36,
    svgX: 460,
    svgY: 340,
    activeWeatherSystem: 'BOB-02 Depression Outer Band',
    synopticDescription: 'Intense cyclonic vorticity feed across Delta basin with high moisture convergence.',
    dayMetrics: generateDayMetrics(89, 4, 38, 'West Bengal (Gangetic Plain)', 'Active Monsoon'),
    historicalMemory: {
      systematicBias: 'Precipitation Overestimation due to dry air intrusion (+40mm)',
      avgMAE: 31.5,
      mostVulnerableVariable: 'Rainfall QPF & MSLP',
      dominantFailureMechanism: 'Dry mid-tropospheric wedge intrusion'
    }
  },
  {
    id: 'sub-assam-meghalaya',
    name: 'Assam & Meghalaya',
    state: 'Assam',
    code: 'MR-03',
    lat: 25.57,
    lng: 91.89,
    svgX: 530,
    svgY: 280,
    activeWeatherSystem: 'Active Monsoon Orographic Surge',
    synopticDescription: 'Extreme southerly moisture flux from Bay of Bengal hitting Khasi & Jaintia hills.',
    dayMetrics: generateDayMetrics(86, 5, 34, 'Assam & Meghalaya', 'Heavy Rainfall'),
    historicalMemory: {
      systematicBias: 'Severe Localized Under-prediction over Cherrapunji-Mawsynram corridor (+85mm)',
      avgMAE: 44.1,
      mostVulnerableVariable: 'Rainfall Intensity (QPF)',
      dominantFailureMechanism: 'Steep orographic slope funneling unresolved at 12km grid'
    }
  },
  {
    id: 'sub-gujarat-saurashtra',
    name: 'Gujarat (Saurashtra & Kutch)',
    state: 'Gujarat',
    code: 'MR-14',
    lat: 22.30,
    lng: 70.80,
    svgX: 180,
    svgY: 340,
    activeWeatherSystem: 'Mid-Tropospheric Cyclone Vortex',
    synopticDescription: 'Vortex circulation lingering over Northeast Arabian Sea and Kutch coast.',
    dayMetrics: generateDayMetrics(90, 6, 32, 'Gujarat (Saurashtra & Kutch)', 'Monsoon Depression'),
    historicalMemory: {
      systematicBias: 'Wind Shear Divergence and Spatial Track Drift (±6.4 m/s)',
      avgMAE: 28.7,
      mostVulnerableVariable: 'Wind Speed & Rainfall QPF',
      dominantFailureMechanism: 'Coastal land-sea thermal boundary layer instability'
    }
  },
  {
    id: 'sub-kerala-mahe',
    name: 'Kerala & Mahe',
    state: 'Kerala',
    code: 'MR-31',
    lat: 10.85,
    lng: 76.27,
    svgX: 260,
    svgY: 530,
    activeWeatherSystem: 'Cross-Equatorial Monsoon Surge',
    synopticDescription: 'Strong westerly winds (35-40 kts) pushing heavy orographic bands into Western Ghats.',
    dayMetrics: generateDayMetrics(93, 4, 30, 'Kerala & Mahe', 'Active Monsoon'),
    historicalMemory: {
      systematicBias: 'Underestimation of Multi-Day Persistent Deluges (+52mm)',
      avgMAE: 32.4,
      mostVulnerableVariable: 'Continuous Multi-day Rainfall',
      dominantFailureMechanism: 'Low-level jet speed pulsations'
    }
  },
  {
    id: 'sub-jk-ladakh',
    name: 'Jammu & Kashmir / Ladakh',
    state: 'Jammu & Kashmir',
    code: 'MR-01',
    lat: 34.08,
    lng: 74.79,
    svgX: 240,
    svgY: 120,
    activeWeatherSystem: 'Western Disturbance WD-14',
    synopticDescription: 'Deep upper-level trough crossing Karakoram and Pir Panjal with heavy snowfall potential.',
    dayMetrics: generateDayMetrics(87, 4, 33, 'Jammu & Kashmir / Ladakh', 'Western Disturbance'),
    historicalMemory: {
      systematicBias: 'Snowline Altitude Estimation Error (±350m variance)',
      avgMAE: 26.3,
      mostVulnerableVariable: 'Snowfall Accumulation & Temp',
      dominantFailureMechanism: 'Complex mountain boundary layer parameterization'
    }
  },
  {
    id: 'sub-rajasthan-west',
    name: 'West Rajasthan',
    state: 'Rajasthan',
    code: 'MR-17',
    lat: 26.91,
    lng: 70.90,
    svgX: 200,
    svgY: 260,
    activeWeatherSystem: 'Northwest Semi-Arid Heat Dome',
    synopticDescription: 'Subsiding anticyclone maintaining clear skies and extreme daytime surface heating (>43°C).',
    dayMetrics: generateDayMetrics(95, 7, 20, 'West Rajasthan', 'Heat Wave'),
    historicalMemory: {
      systematicBias: 'Maximum Temperature Overestimation (+1.8°C)',
      avgMAE: 1.4,
      mostVulnerableVariable: 'Max Surface Temperature',
      dominantFailureMechanism: 'Dry dust aerosol optical depth radiative interaction'
    }
  },
  {
    id: 'sub-ap-coastal',
    name: 'Coastal Andhra Pradesh',
    state: 'Andhra Pradesh',
    code: 'MR-28',
    lat: 16.50,
    lng: 80.64,
    svgX: 330,
    svgY: 450,
    activeWeatherSystem: 'Tropical Low Convergence',
    synopticDescription: 'Convergence zone along Godavari-Krishna delta with scattered convective bursts.',
    dayMetrics: generateDayMetrics(91, 5, 29, 'Coastal Andhra Pradesh', 'Cyclone Watch'),
    historicalMemory: {
      systematicBias: 'Coastal Convective Timing Phase Lag (±4.5 hours)',
      avgMAE: 27.9,
      mostVulnerableVariable: 'Rainfall Timing & Wind Gusts',
      dominantFailureMechanism: 'Diurnal sea-breeze interaction with synoptic trough'
    }
  },
  {
    id: 'sub-mp-west',
    name: 'West Madhya Pradesh',
    state: 'Madhya Pradesh',
    code: 'MR-19',
    lat: 23.25,
    lng: 77.41,
    svgX: 280,
    svgY: 320,
    activeWeatherSystem: 'Monsoon Trough Central Segment',
    synopticDescription: 'Axis of monsoon trough passing through Bhopal-Indore belt with squally showers.',
    dayMetrics: generateDayMetrics(90, 5, 31, 'West Madhya Pradesh', 'Active Monsoon'),
    historicalMemory: {
      systematicBias: 'Monsoon Trough Oscillation Speed Bias (±90 km/day)',
      avgMAE: 25.1,
      mostVulnerableVariable: 'Rainfall QPF',
      dominantFailureMechanism: 'Inland depression decay rate mismatch'
    }
  },
  {
    id: 'sub-tamilnadu',
    name: 'Tamil Nadu & Puducherry',
    state: 'Tamil Nadu',
    code: 'MR-32',
    lat: 11.12,
    lng: 78.65,
    svgX: 300,
    svgY: 510,
    activeWeatherSystem: 'Rain Shadow Convective Surge',
    synopticDescription: 'Mainly stable weather with isolated evening convective thunderstorms over interior districts.',
    dayMetrics: generateDayMetrics(94, 6, 22, 'Tamil Nadu & Puducherry', 'Break Monsoon'),
    historicalMemory: {
      systematicBias: 'Underestimation of Evening Isolated Convective Cells (+22mm)',
      avgMAE: 19.3,
      mostVulnerableVariable: 'Convective Rain & Lightning',
      dominantFailureMechanism: 'Fine-scale local convergence lines'
    }
  },
  {
    id: 'sub-bihar',
    name: 'Bihar',
    state: 'Bihar',
    code: 'MR-07',
    lat: 25.09,
    lng: 85.31,
    svgX: 390,
    svgY: 280,
    activeWeatherSystem: 'Foothill Trough Shift',
    synopticDescription: 'Monsoon trough osculating towards foothills of Himalayas bringing heavy rain to North Bihar.',
    dayMetrics: generateDayMetrics(88, 5, 35, 'Bihar', 'Active Monsoon'),
    historicalMemory: {
      systematicBias: 'Rainfall Core Displacement into Nepal Basin (±75km)',
      avgMAE: 33.1,
      mostVulnerableVariable: 'Rainfall QPF & Catchment Runoff',
      dominantFailureMechanism: 'Foothills orographic wave trap'
    }
  }
];

export const SUBDIVISIONS_MAP = new Map(SUBDIVISIONS_DATA.map(s => [s.id, s]));

export const REGIONAL_ANALYTICS_METRICS = {
  overallMAE: 31.4, // mm
  overallRMSE: 48.7, // mm
  overallBias: '+18.2 mm (Systematic Over-forecast)',
  leadTimeCurve: [
    { day: 'D1', mae: 12.4, rmse: 18.2, bias: 4.1, confidence: 92, bustProb: 8 },
    { day: 'D2', mae: 16.8, rmse: 24.5, bias: 6.8, confidence: 87, bustProb: 13 },
    { day: 'D3', mae: 22.1, rmse: 33.2, bias: 9.5, confidence: 81, bustProb: 19 },
    { day: 'D4', mae: 31.5, rmse: 46.8, bias: 14.2, confidence: 69, bustProb: 31 },
    { day: 'D5', mae: 49.8, rmse: 72.4, bias: 26.5, confidence: 32, bustProb: 68 }, // CLIFF
    { day: 'D6', mae: 58.2, rmse: 84.1, bias: 32.1, confidence: 28, bustProb: 72 },
    { day: 'D7', mae: 66.4, rmse: 95.3, bias: 38.6, confidence: 24, bustProb: 76 },
    { day: 'D8', mae: 74.1, rmse: 106.8, bias: 44.2, confidence: 19, bustProb: 81 },
    { day: 'D9', mae: 81.5, rmse: 118.2, bias: 49.8, confidence: 17, bustProb: 83 },
    { day: 'D10', mae: 87.2, rmse: 126.5, bias: 54.1, confidence: 16, bustProb: 84 }
  ],
  variableBreakdown: [
    { variable: 'Rainfall QPF', mae: '42.8 mm', rmse: '68.4 mm', errorTrend: 'Critical Cliff at D4-D5', failureRate: '38%' },
    { variable: 'Surface Temp', mae: '1.8 °C', rmse: '2.6 °C', errorTrend: 'Gradual Linear Degradation', failureRate: '12%' },
    { variable: 'Wind Shear (850hPa)', mae: '5.2 m/s', rmse: '8.1 m/s', errorTrend: 'Accelerates at D5+', failureRate: '28%' },
    { variable: 'MSLP Pressure', mae: '2.4 hPa', rmse: '3.8 hPa', errorTrend: 'Meso-low deepening phase lag', failureRate: '24%' },
    { variable: 'Relative Humidity', mae: '14.2 %', rmse: '19.8 %', errorTrend: 'Boundary layer dry bias', failureRate: '18%' }
  ],
  weatherSystemErrorRanking: [
    { system: 'Monsoon Depression', avgBustProb: '74%', avgCliffDay: 'Day 4.2', primaryDriver: 'Track Bifurcation' },
    { system: 'Heavy Rainfall (Ghats)', avgBustProb: '69%', avgCliffDay: 'Day 4.5', primaryDriver: 'Orographic Meso-core' },
    { system: 'Tropical Cyclone', avgBustProb: '64%', avgCliffDay: 'Day 5.8', primaryDriver: 'Intensity / RI Mismatch' },
    { system: 'Active Monsoon Surge', avgBustProb: '58%', avgCliffDay: 'Day 5.1', primaryDriver: 'Ensemble Spread' },
    { system: 'Western Disturbance', avgBustProb: '44%', avgCliffDay: 'Day 4.8', primaryDriver: 'Trough Deepening' },
    { system: 'Heat Wave', avgBustProb: '22%', avgCliffDay: 'Day 7.2', primaryDriver: 'Aerosol Radiation' },
    { system: 'Break Monsoon', avgBustProb: '19%', avgCliffDay: 'Day 7.9', primaryDriver: 'Sub-synoptic Shifts' }
  ]
};
