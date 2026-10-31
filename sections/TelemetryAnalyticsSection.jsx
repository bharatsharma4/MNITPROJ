import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart as LineChartIcon,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Download,
  Clock,
  Radio
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { ChartWrapper } from '../charts/ChartWrapper';
import { TrendLine } from '../charts/TrendLine';
import { DonutBreakdown } from '../charts/DonutBreakdown';
import { useDashboardStore } from '../../store/dashboardStore';
import { useTelemetrySimulator } from '../../hooks/useTelemetrySimulator';

export const TelemetryAnalyticsSection = () => {
  const timeRange = useDashboardStore((state) => state.timeRange);
  const setTimeRange = useDashboardStore((state) => state.setTimeRange);
  const liveStreaming = useDashboardStore((state) => state.liveStreaming);
  const telemetryHistory = useTelemetrySimulator();

  const ranges = ['1m', '5m', '1h', '24h'];

  return (
    <motion.section
      id="telemetry"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-6"
    >
      <SectionLabel number="05" label="Live Time-Series Sensor Streams & Analytics" badgeText="MQTT / JSON Telemetry" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
            Synchronized Multi-Sensor Telemetry
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-1 max-w-3xl">
            Live biomedical (MAX30102 PPG) and ambient environmental (DHT22 &amp; MQ-135) signals sampled at 50Hz edge rate and synced to the command center in sub-second intervals.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shrink-0">
          <span className="text-[10px] font-mono text-text-muted px-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> WINDOW:
          </span>
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${timeRange === r ? 'bg-accent-primary text-slate-950 font-bold shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-slate-800'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Time-Series Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Synchronized Multi-Parameter Area / Line Chart */}
        <div className="lg:col-span-8">
          <ChartWrapper
            title="Biomedical Heart Rate (BPM) vs. Ambient Temp & Gas PPM"
            subtitle="Synchronized time-series identifying cross-correlated physiological and thermal spikes"
            sourceNote="Live MQTT Broker Stream · Topic: sih/node/yantra/telemetry"
            tableData={telemetryHistory.map(d => ({
              Time: d.time,
              HeartRate_BPM: d.hr,
              AmbientTemp_C: d.temp,
              Humidity_RH: `${d.humidity}%`,
              Gas_PPM: d.gasPpm,
              G_Force: `${d.gForce}g`,
              HSI_Index: d.hsi
            }))}
            tooltip={{
              definition: "Correlates cardiovascular heart rate elevation with environmental toxic smoke and ambient thermal conditions.",
              whyItMatters: "Enables instant differentiation between strenuous labor and imminent toxic suffocation.",
              source: "Slide 2 & 3 · Proposed Solution",
              confidence: "high"
            }}
          >
            <TrendLine data={telemetryHistory} height={340} />
          </ChartWrapper>
        </div>

        {/* Incident Type & Alarm Distribution Donut */}
        <div className="lg:col-span-4">
          <ChartWrapper
            title="Alarm Distribution by Hazard Category"
            subtitle="Breakdown of automatic anomaly triggers across fleet"
            sourceNote="AI Risk Engine Classifier · Slide 3"
            tableData={[
              { Category: 'Fall & Shock Spikes', Share: '38%', Severity: 'Critical' },
              { Category: 'Toxic Gas & Smoke', Share: '28%', Severity: 'High' },
              { Category: 'Heat Strain / Cardiac', Share: '22%', Severity: 'High' },
              { Category: 'Geofence Breaches', Share: '12%', Severity: 'Normal' },
            ]}
            tooltip={{
              definition: "Historical proportion of alarms classified by the rule-based and HSI AI risk engines.",
              whyItMatters: "Helps dispatch teams allocate specialized resources (e.g. oxygen tanks vs. trauma splints).",
              source: "Slide 5 · Target Users",
              confidence: "high"
            }}
          >
            <DonutBreakdown height={280} />
          </ChartWrapper>
        </div>
      </div>
    </motion.section>
  );
};
