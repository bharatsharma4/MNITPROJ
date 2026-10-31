import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  Radio,
  WifiOff,
  BatteryCharging,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { RiskMatrix } from '../charts/RiskMatrix';
import { dashboardData } from '../../data/dashboardData';

export const RiskMitigationSection = () => {
  return (
    <motion.section
      id="risk-mitigation"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-6"
    >
      <SectionLabel number="07" label="Feasibility, 2×2 Risk Matrix & Hidden Signals" badgeText="Slide 4 Technical Viability" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
            Engineering Feasibility &amp; Risk Mitigation
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-1 max-w-3xl">
            Anticipates extreme field challenges: sensor noise hysteresis, catastrophic network loss with Flash ring buffering, and indoor GPS attenuation with dead-reckoning fallback.
          </p>
        </div>
      </div>

      {/* 2x2 Interactive Risk Matrix Component */}
      <RiskMatrix />

      {/* Hidden Signals Analysis Cards (Omissions, Contradictions, Buried Info) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-accent-primary" />
          <h3 className="font-sans font-bold text-lg text-text-primary">
            Hidden Signals &amp; Architectural Deep Dive
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardData.hiddenSignals.map((signal) => (
            <div
              key={signal.id}
              className="glass-card p-5 rounded-2xl flex flex-col justify-between border-t-2 border-t-accent-primary"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary font-bold uppercase">
                    {signal.type}
                  </span>
                  <span className="text-[10px] font-mono text-rose-400 font-semibold uppercase">
                    {signal.severity} Severity
                  </span>
                </div>
                <h4 className="font-sans font-bold text-sm text-text-primary mb-2">
                  {signal.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  {signal.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Architecture Optimized</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three Pillars: Technical, Operational, Scalability Feasibility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-border-subtle">
          <div className="font-mono text-xs font-bold text-accent-primary uppercase mb-2">
            1. Technical Feasibility
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            All modules (MAX30102, DHT22, MQ-135, MPU6050, NEO-6M) operate on low-voltage 3.3V/5V rails with standard I2C/UART/ADC interfaces proven in industrial telemetry.
          </p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-border-subtle">
          <div className="font-mono text-xs font-bold text-accent-primary uppercase mb-2">
            2. Operational Feasibility
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Dual-layer visibility: Wearer gets instant feedback via local 0.96" OLED HUD without requiring a phone; remote command gets real-time geospatial triage maps.
          </p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-border-subtle">
          <div className="font-mono text-xs font-bold text-accent-primary uppercase mb-2">
            3. Scalability Feasibility
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Hierarchical MQTT topic topology (<code className="text-accent-primary">sih/yantra/node_id/telemetry</code>) easily scales to thousands of concurrent nodes with negligible broker load.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
