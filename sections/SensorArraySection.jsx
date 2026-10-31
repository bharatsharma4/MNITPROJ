import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Heart,
  Thermometer,
  Wind,
  Compass,
  Zap,
  Tv,
  CheckCircle2,
  Layers,
  Radio,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { ChartWrapper } from '../charts/ChartWrapper';
import { SensorHealthRadar } from '../charts/SensorHealthRadar';
import { BarComparison } from '../charts/BarComparison';
import { ConfidencePill } from '../ui/ConfidencePill';
import { InfoTooltip } from '../ui/InfoTooltip';
import { dashboardData } from '../../data/dashboardData';

export const SensorArraySection = () => {
  const [selectedSensorId, setSelectedSensorId] = useState('ESP32');
  const activeSensor = dashboardData.hardwareSensors.find(s => s.id === selectedSensorId) || dashboardData.hardwareSensors[0];

  const getSensorIcon = (id) => {
    switch (id) {
      case 'ESP32': return Cpu;
      case 'MAX30102': return Heart;
      case 'DHT22': return Thermometer;
      case 'MQ-135': return Wind;
      case 'NEO-6M': return Compass;
      case 'MPU6050': return Zap;
      case 'OLED-096': return Tv;
      default: return Layers;
    }
  };

  return (
    <motion.section
      id="sensor-array"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-6"
    >
      <SectionLabel number="02" label="Hardware Suite & Multi-Sensor Edge Fusion" badgeText="Slide 3 System Architecture" />

      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
            Integrated 6-Sensor Wearable Architecture
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl">
            Single-node fusion executed by ESP32-WROOM-32. Eliminates bulky external modules, lowers Bill of Materials (BOM) cost to &lt;$25, and enables continuous multi-signal safety monitoring.
          </p>
        </div>
      </div>

      {/* Sensor Interactive Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {dashboardData.hardwareSensors.map((sensor) => {
          const Icon = getSensorIcon(sensor.id);
          const isSelected = selectedSensorId === sensor.id;

          return (
            <motion.button
              key={sensor.id}
              type="button"
              onClick={() => setSelectedSensorId(sensor.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${isSelected ? 'bg-accent-primary/15 border-accent-primary shadow-[0_0_20px_rgba(0,240,255,0.2)] ring-1 ring-accent-primary' : 'bg-slate-900/80 border-border-default hover:border-slate-600'}`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-accent-primary text-slate-950' : 'bg-slate-800 text-accent-primary'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{sensor.id}</div>
                <div className="font-sans font-bold text-xs text-text-primary truncate">{sensor.name.split(' ')[0]}</div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1 truncate">{sensor.protocol}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Sensor Deep-Dive Specs Inspector */}
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Component Overview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-accent-primary/10 border border-accent-primary/30 text-accent-primary">
                  {React.createElement(getSensorIcon(activeSensor.id), { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl text-text-primary">
                    {activeSensor.name}
                  </h3>
                  <p className="font-mono text-xs text-accent-primary font-medium">
                    {activeSensor.role}
                  </p>
                </div>
              </div>
              <ConfidencePill level={activeSensor.confidence} />
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
              {activeSensor.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-text-muted block">Bus Protocol</span>
                <span className="font-mono text-xs font-bold text-text-primary">{activeSensor.protocol}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-text-muted block">Sampling Rate</span>
                <span className="font-mono text-xs font-bold text-text-primary">{activeSensor.samplingRate}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-text-muted block">Power Draw</span>
                <span className="font-mono text-xs font-bold text-amber-400">{activeSensor.powerConsumption}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-border-default flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted">ESP32 Pinout Mapping:</span>
              <span className="text-accent-primary font-bold">{activeSensor.pins}</span>
            </div>
          </div>

          {/* Right: Validation Benchmark & Edge Preprocessing Note */}
          <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-border-subtle space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted font-bold block mb-1">
                Hardware Benchmark / Accuracy
              </span>
              <div className="flex items-center gap-2 text-sm font-sans font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {activeSensor.benchmark}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-primary font-bold block mb-1">
                Edge Preprocessing & Noise Reduction
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                Raw analog/I2C signals pass through exponential moving-average (EMA) smoothing filters on the ESP32 before packaging into JSON telemetry payloads. This cuts spurious noise spikes by 94%.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-[11px] font-mono text-accent-primary">
              ⚡ Power-gating enabled: Duty-cycled during quiescent periods to prolong 18650 Li-ion battery life up to 36+ hours.
            </div>
          </div>
        </div>
      </div>

      {/* Two Hardware Analytics Charts: Radar Health & Current Consumption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper
          title="Hardware Sensor Health & Sampling Precision"
          subtitle="6-Axis benchmark validation across stability, calibration, and edge latency"
          sourceNote="Team YANTRA Hardware Validation Suite · Slide 6"
          tableData={[
            { Sensor: 'MAX30102 PPG', Score: '96/100', Target: '90/100', Status: 'Nominal' },
            { Sensor: 'DHT22 Climate', Score: '98/100', Target: '90/100', Status: 'Nominal' },
            { Sensor: 'MQ-135 Gas', Score: '86/100', Target: '90/100', Status: 'Calibrated' },
            { Sensor: 'MPU6050 IMU', Score: '95/100', Target: '90/100', Status: 'Nominal' },
            { Sensor: 'NEO-6M GPS', Score: '92/100', Target: '90/100', Status: 'Nominal' },
            { Sensor: 'ESP32 Gateway', Score: '99/100', Target: '90/100', Status: 'Optimal' },
          ]}
          tooltip={{
            definition: "Multi-parameter evaluation combining signal-to-noise ratio, calibration offset drift, and I2C/UART bus error rates.",
            whyItMatters: "Ensures no false sensor readings trigger unnecessary mass panic or rescue mobilizations.",
            source: "Slide 6 · Validation Plan",
            confidence: "high"
          }}
        >
          <SensorHealthRadar />
        </ChartWrapper>

        <ChartWrapper
          title="Subsystem Active Current Draw (mA)"
          subtitle="Hardware power profile breakdown for battery sizing and duty cycling"
          sourceNote="Technical Approach · Efficiency Focus · Slide 3"
          tableData={[
            { Component: 'MQ-135 Gas Heater', Current: '150 mA', Optimization: 'Pulsed heating duty cycle' },
            { Component: 'ESP32 MCU (Wi-Fi on)', Current: '80 mA', Optimization: 'Light sleep between beacons' },
            { Component: 'NEO-6M GPS Engine', Current: '45 mA', Optimization: 'Event-triggered satellite polling' },
            { Component: '0.96 OLED Display', Current: '20 mA', Optimization: 'Auto-dim after 15s inactivity' },
            { Component: 'MPU6050 6-Axis IMU', Current: '3.6 mA', Optimization: 'Continuous low-power DMP' },
            { Component: 'DHT22 Temp/Humidity', Current: '1.5 mA', Optimization: 'Sampled every 2 seconds' },
            { Component: 'MAX30102 Pulse Oximeter', Current: '0.8 mA', Optimization: 'Adaptive LED drive current' },
          ]}
          tooltip={{
            definition: "Active milliampere (mA) drain of each peripheral module running simultaneously on a regulated 3.3V/5V bus.",
            whyItMatters: "Identifies heavy power consumers (MQ-135 & GPS) to optimize power-gating algorithms.",
            source: "Slide 3 · Efficiency Focus",
            confidence: "high"
          }}
        >
          <BarComparison />
        </ChartWrapper>
      </div>
    </motion.section>
  );
};
