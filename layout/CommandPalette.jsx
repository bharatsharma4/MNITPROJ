import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Cpu, Activity, Compass, LineChart, AlertOctagon, ShieldAlert, Award, X, CornerDownLeft, Sparkles, BookOpen } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { dashboardData } from '../../data/dashboardData';

export const CommandPalette = () => {
  const isOpen = useDashboardStore((state) => state.isCommandPaletteOpen);
  const setIsOpen = useDashboardStore((state) => state.setIsCommandPaletteOpen);
  const setSelectedNodeId = useDashboardStore((state) => state.setSelectedNodeId);
  const triggerSimulatedSOS = useDashboardStore((state) => state.triggerSimulatedSOS);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const sections = [
    { id: 'overview', title: 'Mission Command (Hero)', icon: Activity },
    { id: 'sensor-array', title: '6-Sensor Hardware Telemetry', icon: Cpu },
    { id: 'ai-risk-engine', title: 'AI Risk Engine & Heat Strain Index', icon: Activity },
    { id: 'geo-radar', title: 'Geospatial Disaster Radar & GPS', icon: Compass },
    { id: 'telemetry', title: 'Live Time-Series Sensor Streams', icon: LineChart },
    { id: 'incident-log', title: 'Incident Triage & Emergency Log', icon: AlertOctagon },
    { id: 'risk-mitigation', title: 'Feasibility & 2x2 Risk Matrix', icon: ShieldAlert },
    { id: 'verdict-roadmap', title: 'Evaluation Verdict & Roadmap', icon: Award },
  ];

  const filteredSections = sections.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGlossary = dashboardData.glossary.filter(g =>
    g.term.toLowerCase().includes(query.toLowerCase()) ||
    g.definition.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNodes = dashboardData.nodes.filter(n =>
    n.name.toLowerCase().includes(query.toLowerCase()) ||
    n.wearer.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectSection = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
    setIsOpen(false);
    const el = document.getElementById('overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 font-mono"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
            <Search className="w-5 h-5 text-accent-primary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections, sensor specs, wearers, glossary terms..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Container */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Quick Actions */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">
                Quick Command Actions
              </div>
              <button
                type="button"
                onClick={() => {
                  triggerSimulatedSOS();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Trigger Simulated SOS Drill (3.8g Fall Shock & Rapid Triage)
                </span>
                <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            {/* Sections */}
            {filteredSections.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">
                  Jump to Section
                </div>
                <div className="space-y-1">
                  {filteredSections.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSelectSection(s.id)}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-accent-primary transition-colors text-left"
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-slate-400" />
                          {s.title}
                        </span>
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-40" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Wearable Nodes */}
            {filteredNodes.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">
                  Switch Active Wearable Node
                </div>
                <div className="space-y-1">
                  {filteredNodes.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => handleSelectNode(n.id)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-accent-primary transition-colors text-left"
                    >
                      <div>
                        <span className="font-bold text-accent-primary mr-2">[{n.id}]</span>
                        <span>{n.name} — {n.wearer}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${n.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
                        {n.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Glossary Terms */}
            {filteredGlossary.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-accent-secondary" />
                  Hardware & Medical Glossary
                </div>
                <div className="space-y-2">
                  {filteredGlossary.map((g, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="font-bold text-accent-primary text-xs mb-1">{g.term}</div>
                      <p className="text-slate-300 text-[11px] mb-1">{g.definition}</p>
                      <div className="text-[10px] text-slate-500 italic">Context: {g.context}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Press ESC or click outside to dismiss</span>
            <span>SIH 2026 Problem Statement 26181</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
