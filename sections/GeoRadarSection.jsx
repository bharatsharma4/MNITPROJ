import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  MapPin,
  Radio,
  Navigation,
  Shield,
  Layers,
  Crosshair,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { InfoTooltip } from '../ui/InfoTooltip';
import { dashboardData } from '../../data/dashboardData';
import { useDashboardStore } from '../../store/dashboardStore';

export const GeoRadarSection = () => {
  const selectedNodeId = useDashboardStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useDashboardStore((state) => state.setSelectedNodeId);
  const [activeZone, setActiveZone] = useState('ALL');

  const activeNode = dashboardData.nodes.find(n => n.id === selectedNodeId) || dashboardData.nodes[0];

  // Map coordinates to percentage positions inside tactical radar canvas
  const nodePositions = {
    'NODE-Y01': { x: 78, y: 48, zone: 'Assam Flood Basin' },
    'NODE-Y02': { x: 62, y: 55, zone: 'Jharia Coal Mine' },
    'NODE-Y03': { x: 42, y: 35, zone: 'NCR Delhi Health Sector' },
    'NODE-Y04': { x: 48, y: 22, zone: 'Kedarnath Alpine Ridge' },
  };

  return (
    <motion.section
      id="geo-radar"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-6"
    >
      <SectionLabel number="04" label="Geospatial Disaster Radar & Triage Locator" badgeText="NEO-6M GPS Engine" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
            Real-Time Disaster Triage Radar
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-1 max-w-3xl">
            Live GPS telemetry streaming from NEO-6M satellite receivers. Combines emergency geofence boundary tracking, signal strength (RSSI), and instant responder dispatch vectoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Tactical Radar Display Canvas */}
        <div className="lg:col-span-8 glass-card p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          {/* Radar Header Controls */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-border-subtle z-10 relative">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-accent-primary animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
                TACTICAL SITUATIONAL RADAR GRID
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
              <span>SATELLITE LOCK: 11 SVs</span>
              <span className="text-emerald-400">● 3D FIX (±2.1m)</span>
            </div>
          </div>

          {/* Radar Map Sandbox */}
          <div className="relative flex-1 w-full h-80 sm:h-96 rounded-xl border border-slate-800 bg-[#05070B] overflow-hidden tactical-grid flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute w-72 h-72 rounded-full border border-accent-primary/10 pointer-events-none" />
            <div className="absolute w-52 h-52 rounded-full border border-accent-primary/15 pointer-events-none" />
            <div className="absolute w-32 h-32 rounded-full border border-accent-primary/25 pointer-events-none" />
            <div className="absolute w-full h-[1px] bg-accent-primary/10 pointer-events-none" />
            <div className="absolute h-full w-[1px] bg-accent-primary/10 pointer-events-none" />

            {/* Rotating Radar Sweep Beam */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="w-full h-full rounded-full origin-center animate-radar-sweep opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 240, 255, 0.4) 45deg, transparent 50deg)'
                }}
              />
            </div>

            {/* Plotted Wearable Nodes */}
            {dashboardData.nodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 50, y: 50 };
              const isSelected = selectedNodeId === node.id;
              const isCritical = node.status === 'CRITICAL';
              const isWarning = node.status === 'WARNING';

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring for critical alert */}
                    {isCritical && (
                      <span className="absolute w-10 h-10 rounded-full bg-rose-500/40 animate-ping" />
                    )}
                    {isWarning && (
                      <span className="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-pulse" />
                    )}

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-lg transition-all ${isCritical ? 'bg-rose-500 text-white border-rose-400 animate-pulse' : isWarning ? 'bg-amber-500 text-slate-950 border-amber-300' : 'bg-accent-primary text-slate-950 border-cyan-300'} ${isSelected ? 'ring-4 ring-accent-primary/60 scale-110' : ''}`}>
                      <Navigation className="w-4 h-4 transform rotate-45" />
                    </div>

                    {/* Tooltip Tag */}
                    <div className="absolute left-10 whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900/95 border border-slate-700 shadow-xl text-left pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="font-mono text-[10px] font-bold text-accent-primary">
                        {node.id} · {node.name.split(' ')[0]}
                      </div>
                      <div className="text-[9px] font-sans text-slate-300 truncate max-w-[140px]">
                        {node.wearer.split(' ')[0]} ({node.vitals.hr} BPM)
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Radar Legend Footer */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-border-subtle text-[11px] font-mono text-text-muted flex-wrap gap-2 z-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Priority 1 Triage</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Warning Zone</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-accent-primary" /> Active Normal</span>
            </div>
            <span>Click any marker to inspect triage telemetry</span>
          </div>
        </div>

        {/* Selected Node Geolocation & Dispatch Inspector */}
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                Target Node Geotag
              </span>
              <Badge variant={activeNode.status === 'CRITICAL' ? 'negative' : activeNode.status === 'WARNING' ? 'warning' : 'positive'}>
                {activeNode.status}
              </Badge>
            </div>

            <h3 className="font-sans font-bold text-lg text-text-primary mb-1">
              {activeNode.name}
            </h3>
            <p className="font-mono text-xs text-text-secondary mb-4">
              Wearer: <strong>{activeNode.wearer}</strong>
            </p>

            <div className="space-y-2.5 bg-slate-900/80 p-4 rounded-xl border border-border-subtle font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">GPS Coordinates:</span>
                <span className="text-accent-primary font-bold">{activeNode.coords[0]}° N, {activeNode.coords[1]}° E</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Geofence Sector:</span>
                <span className="text-slate-200">{activeNode.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Satellite RSSI:</span>
                <span className="text-emerald-400">{activeNode.signalStrength} dBm (Strong)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Battery Backup:</span>
                <span className="text-emerald-400 font-bold">{activeNode.battery}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Firmware Build:</span>
                <span className="text-slate-400">{activeNode.firmware}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => alert(`🚨 Direct Rescue Vector Assigned to ${activeNode.wearer} at coordinates ${activeNode.coords.join(', ')}`)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-slate-950 font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <PhoneCall className="w-4 h-4" />
              DISPATCH EMERGENCY RESCUE VECTOR
            </button>
            <div className="text-center font-mono text-[10px] text-text-muted">
              Auto-shares coordinates to 112 / NDRF Field CAD API
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
