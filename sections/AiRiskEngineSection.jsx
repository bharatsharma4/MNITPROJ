import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Flame,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Brain,
  Sliders,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { ChartWrapper } from '../charts/ChartWrapper';
import { HsiGauge } from '../charts/HsiGauge';
import { FallShockwaveChart } from '../charts/FallShockwaveChart';
import { useDashboardStore } from '../../store/dashboardStore';

export const AiRiskEngineSection = () => {
  const simulatedVitals = useDashboardStore((state) => state.simulatedVitals);
  const [simTemp, setSimTemp] = useState(38.5);
  const [simHumidity, setSimHumidity] = useState(85);
  const [simHr, setSimHr] = useState(130);

  // Dynamic Heat Strain Index Calculation:
  // HSI approximation formula: HSI = 0.55 * (Temp) + 0.2 * (Humidity) + 0.15 * (HR - 60)
  const computedHsi = parseFloat((0.55 * simTemp + 0.15 * simHumidity + 0.12 * (simHr - 60)).toFixed(1));

  return (
    <motion.section
      id="ai-risk-engine"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-6"
    >
      <SectionLabel number="03" label="AI-Assisted Risk Engine & Emergency Algorithms" badgeText="Slide 2 & 3 Risk Interpretation" />

      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
            Edge & Backend AI Risk Synthesis
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-1 max-w-3xl">
            Raw sensor feeds are continuously processed by rule-based anomaly scoring, the Heat Strain Index (HSI) biometeorological model, and a 2-stage IMU fall detection shockwave classifier.
          </p>
        </div>
      </div>

      {/* Two AI Engine Modules: Heat Strain Index (HSI) & MPU6050 Fall Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive HSI Sandbox & Arc Gauge */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="font-sans font-bold text-lg text-text-primary">
                  Heat Strain Index (HSI) Calculator
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                PROACTIVE HEAT STRESS
              </span>
            </div>

            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Fuses ambient heat, humidity, and cardiovascular exertion to predict thermal exhaustion before clinical collapse in boiler rooms, mines, or wildfire operations.
            </p>

            {/* Live Interactive Sliders */}
            <div className="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-border-subtle mb-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-text-muted">Ambient Temperature (°C):</span>
                  <span className="text-accent-primary font-bold">{simTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="50"
                  step="0.5"
                  value={simTemp}
                  onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-text-muted">Relative Humidity (% RH):</span>
                  <span className="text-accent-secondary font-bold">{simHumidity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="1"
                  value={simHumidity}
                  onChange={(e) => setSimHumidity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-secondary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-text-muted">Heart Rate (BPM):</span>
                  <span className="text-rose-400 font-bold">{simHr} BPM</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="180"
                  step="1"
                  value={simHr}
                  onChange={(e) => setSimHr(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>
            </div>
          </div>

          {/* Radial HSI Arc Gauge */}
          <div className="pt-2 border-t border-border-subtle">
            <HsiGauge value={computedHsi} />
          </div>
        </div>

        {/* Right: MPU6050 Fall Detection Shockwave & Algorithmic Triage */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-rose-400" />
                <h3 className="font-sans font-bold text-lg text-text-primary">
                  MPU6050 Fall Shockwave Classifier
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                SVM &gt; 2.8g TRIGGER
              </span>
            </div>

            <p className="text-xs text-text-secondary mb-3 leading-relaxed">
              Two-stage temporal classification prevents false alarms from drops or sitting down by requiring: (1) Signal Vector Magnitude impact spike &gt;2.8g, followed by (2) sustained zero-velocity immobility window.
            </p>

            <FallShockwaveChart height={220} />
          </div>

          {/* Fall Classifier Rules Matrix */}
          <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-border-subtle text-center">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-border-subtle">
              <div className="text-[10px] font-mono text-text-muted">STAGE 1</div>
              <div className="font-mono text-xs font-bold text-rose-400">Peak &gt; 2.8g</div>
              <div className="text-[9px] text-slate-400">Impact Shock</div>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-border-subtle">
              <div className="text-[10px] font-mono text-text-muted">STAGE 2</div>
              <div className="font-mono text-xs font-bold text-amber-400">&gt;60° Tilt Shift</div>
              <div className="text-[9px] text-slate-400">Posture Change</div>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-border-subtle">
              <div className="text-[10px] font-mono text-text-muted">STAGE 3</div>
              <div className="font-mono text-xs font-bold text-emerald-400">5s Immobility</div>
              <div className="text-[9px] text-slate-400">Zero Acceleration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Signal Hazard Cross-Confirmation Rules Table */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-accent-primary" />
          <h3 className="font-sans font-bold text-base text-text-primary">
            Multi-Signal AI Cross-Correlation Rules (False Alarm Elimination)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-rose-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold mb-2">
              <span>PRIORITY 1: CRITICAL FIRE / SOS</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <p className="text-xs text-text-secondary mb-2">
              <strong>Trigger Rule:</strong> Gas &gt; 250 PPM <span className="text-rose-400">+</span> Temp &gt; 42°C <span className="text-rose-400">+</span> HR &gt; 120 BPM <span className="text-rose-400">+</span> SVM &gt; 2.8g.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-500/20">
              Immediate auto-dispatch with emergency GPS broadcast.
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold mb-2">
              <span>PRIORITY 2: HEAT EXHAUSTION</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <p className="text-xs text-text-secondary mb-2">
              <strong>Trigger Rule:</strong> Calculated HSI &gt; 38°C Eq <span className="text-amber-400">+</span> Sustained Cardiac Drift (&gt;30 mins).
            </p>
            <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-500/20">
              OLED alert to wearer + shift supervisor rotation warning.
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold mb-2">
              <span>PRIORITY 3: HYPOXIA / HIGH ALTITUDE</span>
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
            </div>
            <p className="text-xs text-text-secondary mb-2">
              <strong>Trigger Rule:</strong> SpO₂ &lt; 90% for &gt;45s <span className="text-cyan-400">+</span> Ambient Temp &lt; 5°C.
            </p>
            <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-500/20">
              Oxygen supplement recommendation to alpine patrol unit.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
