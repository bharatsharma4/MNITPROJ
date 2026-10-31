import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  Compass,
  AlertTriangle,
  Radio,
  Zap,
  ShieldCheck,
  MapPin,
  Clock,
  Battery,
  Wifi
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { ScoreDisplay } from '../ui/ScoreDisplay';
import { KpiCard } from '../ui/KpiCard';
import { QuoteBlock } from '../ui/QuoteBlock';
import { Badge } from '../ui/Badge';
import { dashboardData } from '../../data/dashboardData';
import { useDashboardStore } from '../../store/dashboardStore';

export const HeroSection = () => {
  const selectedNodeId = useDashboardStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useDashboardStore((state) => state.setSelectedNodeId);
  const simulatedVitals = useDashboardStore((state) => state.simulatedVitals);
  const liveStreaming = useDashboardStore((state) => state.liveStreaming);

  const activeNode = dashboardData.nodes.find(n => n.id === selectedNodeId) || dashboardData.nodes[0];

  return (
    <motion.section
      id="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-6 sm:py-8 space-y-6"
    >
      {/* Top Eyebrow Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant="neutral" size="sm">SMART INDIA HACKATHON 2026</Badge>
            <Badge variant="purple" size="sm">PROBLEM STATEMENT #26181</Badge>
            <Badge variant="positive" size="sm">HARDWARE + SOFTWARE</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary uppercase leading-none">
            AI-POWERED PERSONAL HEALTH &amp; DISASTER RESILIENCE COMPANION
          </h1>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-2 max-w-3xl leading-relaxed">
            Team YANTRA (Team ID: 209) · Single-node edge telemetry fusing biomedical vitals, environmental toxicity, 6-axis motion dynamics, and GPS geofencing for sub-second emergency response.
          </p>
        </div>

        {/* Live SOS / Status Indicator */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 shrink-0">
          <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 ${activeNode.status === 'CRITICAL' ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse shadow-alert' : activeNode.status === 'WARNING' ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'}`}>
            <div className="w-3 h-3 rounded-full bg-current animate-ping" />
            <div>
              <div className="text-[10px] font-mono uppercase font-bold tracking-widest">
                ACTIVE TRIAGE STATE
              </div>
              <div className="font-sans font-bold text-sm tracking-wide">
                {activeNode.state.replace('_', ' ')}
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] text-text-muted">
            Last Edge Sync: {liveStreaming ? 'Just Now (<1s)' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Hero Score Display & Core Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <ScoreDisplay
            score={dashboardData.meta.overallScore.value}
            scale={dashboardData.meta.overallScore.scale}
            label={dashboardData.meta.overallScore.label}
            rationale={dashboardData.meta.overallScore.rationale}
          />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-between border-l-4 border-l-accent-primary">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent-primary font-bold mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Core Value Proposition
              </div>
              <p className="font-sans text-sm italic font-medium text-text-primary leading-relaxed">
                "{dashboardData.meta.keyQuote.text}"
              </p>
            </div>
            <div className="text-[11px] font-mono text-text-muted pt-3 mt-3 border-t border-border-subtle flex items-center justify-between">
              <span>{dashboardData.meta.teamName}</span>
              <span>{dashboardData.meta.keyQuote.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Mission KPIs Grid */}
      <div>
        <SectionLabel number="01" label="System Vitals & Mission Readiness KPIs" badgeText="Real-Time Sync" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {dashboardData.kpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              delta={kpi.delta}
              deltaDirection={kpi.deltaDirection}
              status={kpi.status}
              trend={kpi.trend}
              tooltip={kpi.tooltip}
              icon={
                kpi.id.includes('score') || kpi.id.includes('status') ? Activity :
                kpi.id.includes('latency') ? Zap :
                kpi.id.includes('nodes') ? Radio :
                kpi.id.includes('heat') ? Thermometer :
                kpi.id.includes('fall') ? AlertTriangle : Compass
              }
            />
          ))}
        </div>
      </div>

      {/* Interactive Monitored Node Live Telemetry HUD */}
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-ping" />
              <h3 className="font-sans font-bold text-lg text-text-primary">
                Live Wearable Telemetry HUD — [{activeNode.id}]
              </h3>
            </div>
            <p className="font-mono text-xs text-text-muted mt-0.5">
              Assigned to: <strong className="text-text-secondary">{activeNode.wearer}</strong> · Location: {activeNode.location}
            </p>
          </div>

          {/* Node Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {dashboardData.nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 border ${selectedNodeId === node.id ? 'bg-accent-primary/20 text-accent-primary border-accent-primary font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'bg-slate-900/80 text-text-secondary border-border-default hover:border-slate-600'}`}
              >
                <span className={`w-2 h-2 rounded-full ${node.status === 'CRITICAL' ? 'bg-rose-500 animate-ping' : node.status === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span>{node.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Live Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-400 text-xs font-mono">
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 animate-pulse" /> HR (PPG)</span>
              <span>MAX30102</span>
            </div>
            <div className="mt-2">
              <span className="font-display text-3xl font-bold text-text-primary">{simulatedVitals.hr}</span>
              <span className="font-mono text-xs text-text-muted ml-1">BPM</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Normal Range: 60-100</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between text-cyan-400 text-xs font-mono">
              <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> SpO₂ Oxygen</span>
              <span>Optical</span>
            </div>
            <div className="mt-2">
              <span className="font-display text-3xl font-bold text-text-primary">{simulatedVitals.spo2}</span>
              <span className="font-mono text-xs text-text-muted ml-1">%</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Normal: &gt;95%</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 text-xs font-mono">
              <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" /> Ambient Temp</span>
              <span>DHT22</span>
            </div>
            <div className="mt-2">
              <span className="font-display text-3xl font-bold text-text-primary">{simulatedVitals.temp}</span>
              <span className="font-mono text-xs text-text-muted ml-1">°C</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Humidity: {simulatedVitals.humidity}%</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between text-orange-400 text-xs font-mono">
              <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> Toxic Gas</span>
              <span>MQ-135</span>
            </div>
            <div className="mt-2">
              <span className="font-display text-3xl font-bold text-text-primary">{simulatedVitals.gasPpm}</span>
              <span className="font-mono text-xs text-text-muted ml-1">PPM</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Safety Limit: &lt;100</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-400 text-xs font-mono">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Acceleration</span>
              <span>MPU6050</span>
            </div>
            <div className="mt-2">
              <span className="font-display text-3xl font-bold text-text-primary">{simulatedVitals.gForce}</span>
              <span className="font-mono text-xs text-text-muted ml-1">g SVM</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Fall Thresh: 2.8g</span>
          </div>

          {/* Embedded 0.96" OLED Simulation Screen */}
          <div className="bg-black p-3 rounded-xl border-2 border-slate-700 shadow-inner flex flex-col justify-between font-mono text-[10px] text-cyan-300">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1 text-[9px] uppercase tracking-wider">
              <span>YANTRA HUD</span>
              <span className="text-emerald-400">92%</span>
            </div>
            <div className="space-y-0.5 my-1">
              <div>HR:{simulatedVitals.hr} BPM</div>
              <div>SpO2:{simulatedVitals.spo2}% T:{simulatedVitals.temp}C</div>
              <div className="text-amber-300">GAS:{simulatedVitals.gasPpm}PPM</div>
            </div>
            <div className="text-[8px] text-cyan-400/80 truncate border-t border-cyan-500/30 pt-0.5">
              OLED 128x64 I2C LIVE
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
