# 🛰️ Forecast Reliability Command Center (SIH PS 26079)
> **AI-Based Forecast Bust Detection for Medium-Range Weather Forecasts (Day 1 – Day 10)**  
> **Organization:** Ministry of Earth Sciences (MoES) / National Centre for Medium Range Weather Forecasting (NCMRWF)  
> **Problem Statement ID:** SIH 26079

---

## 📌 Core Purpose: *"Predict the reliability of the forecast, not just the weather."*

Medium-range weather forecasts (NWP) experience large errors during rapidly evolving atmospheric systems (Monsoon depressions, Western disturbances, Ghats orographic deluges, Tropical cyclones, Heat domes). This platform sits on top of the NWP pipeline to answer the four vital questions:

1. **[WHERE?]** Which meteorological subdivisions & coastal sectors are likely to experience severe forecast errors?
2. **[WHEN?]** At which lead-time horizon (Day 1 to Day 10 / $+24\text{h}$ to $+240\text{h}$) does the forecast suffer a reliability collapse?
3. **[HOW LIKELY?]** What is the exact mathematical probability ($0-100\%$) of a forecast bust?
4. **[WHY?]** What physical and multi-model dynamical factors (SHAP & Integrated Gradients attribution) are driving low confidence?

---

## ⚡ Key Technical Features

- **🌐 Subcontinent Threat Radar & 10-Day Confidence Map:** Interactive India map with 36 meteorological subdivisions, radar sweep scanner, layer toggling (Bust Probability, Confidence, Rainfall QPF Error, Temp Error, Model Spread), and lead-time controls (D1–D10).
- **📉 Lead-Time Cliff Detection:** Automated detection of sudden confidence drops (e.g., Day 4 $\to$ Day 5 cliff, $\Delta -37\%$ confidence drop due to convective parameterization collapse).
- **⇄ 4-Way NWP Multi-Model Disagreement Index:** Inter-model comparison across **NCUM-G (12km)**, **ECMWF IFS (9km HRES)**, **NCEP GFS (13km)**, and **MoES AI-DL (Neural Hybrid)** with dynamic $\pm\sigma$ ensemble spread metrics.
- **🏛️ Historical Analog Intelligence (ERA5 Vault):** AI embedding similarity search comparing current synoptic states with 45 years of historical forecast busts (2022 Monsoon Depression, 2019 Konkan Flood, 2021 Bengal Surge, etc.) and recommended spatial bias nudging.
- **✦ Explainable Meteorological AI (XAI):** SHAP + Integrated Gradients feature attribution waterfall (Rapid Pressure change $\Delta p/\Delta t$, Model spread, Historical error bias, 850hPa wind shear) with natural-language synoptic briefing generation.
- **🌀 Weather System Intelligence Monitor:** Real-time monitoring across 7 synoptic systems: *Cyclone, Monsoon Depression, Heavy Rainfall, Western Disturbance, Heat Wave, Active Monsoon, Break Monsoon*.
- **🚨 Smart Alert Center & Bulletin Transceiver:** Automated operational alert feed with severity filters (*Critical, Warning, Watch, Resolved*) and instant text/bulletin transmission for forecasters.
- **📊 Regional Error Memory & NWP Verification:** Historical MAE, RMSE, and systematic bias distributions.
- **🔍 Global Instant Search (Ctrl+K):** Instant lookup for all 36 subdivisions, weather systems, and historical twins.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Custom Dark Navy Meteorological Command Palette, Glassmorphism, Neon Radar Accents)
- **Charts & Spatial Analytics:** Recharts, SVG High-Precision Interactive Map, Leaflet
- **Icons & UI:** Lucide React, JetBrains Mono & Outfit Google Fonts
- **State & Services:** Modular TypeScript API service layer ready for real NWP/Observation API ingestion.

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd Weather
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🏛️ Developed For
**Smart India Hackathon (SIH) | Problem Statement 26079**  
*Ministry of Earth Sciences (MoES) & National Centre for Medium Range Weather Forecasting (NCMRWF)*
