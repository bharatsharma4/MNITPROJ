import React from 'react';
import {
  Radio,
  Play,
  Pause,
  AlertTriangle,
  Search,
  Moon,
  Sun,
  Printer,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { dashboardData } from '../../data/dashboardData';

export const Navbar = () => {
  const theme = useDashboardStore((state) => state.theme);
  const toggleTheme = useDashboardStore((state) => state.toggleTheme);
  const liveStreaming = useDashboardStore((state) => state.liveStreaming);
  const toggleLiveStreaming = useDashboardStore((state) => state.toggleLiveStreaming);
  const setIsCommandPaletteOpen = useDashboardStore((state) => state.setIsCommandPaletteOpen);
  const triggerSimulatedSOS = useDashboardStore((state) => state.triggerSimulatedSOS);
  const audioAlertEnabled = useDashboardStore((state) => state.audioAlertEnabled);
  const toggleAudioAlert = useDashboardStore((state) => state.toggleAudioAlert);
  const selectedNodeId = useDashboardStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useDashboardStore((state) => state.setSelectedNodeId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-bg-surface/85 backdrop-blur-xl border-b border-border-default px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left: Problem statement info & active node switch */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
              TEAM YANTRA COMMAND
            </span>
          </div>

          <div className="h-4 w-[1px] bg-border-default hidden sm:block" />

          {/* Node selector quick pill */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <span className="text-[10px] font-mono text-text-muted px-2 hidden sm:inline">
              NODE:
            </span>
            {dashboardData.nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isCritical = node.status === 'CRITICAL';
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${isSelected ? 'bg-accent-primary text-slate-950 font-bold shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-slate-800'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-rose-500 animate-ping' : 'bg-current'}`} />
                  <span>{node.id.split('-')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Telemetry Controls & Palette */}
        <div className="flex items-center gap-2 justify-end flex-wrap">
          {/* Live Telemetry Toggle */}
          <button
            type="button"
            onClick={toggleLiveStreaming}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${liveStreaming ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]' : 'bg-slate-800/60 text-slate-400 border-slate-700'}`}
          >
            {liveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{liveStreaming ? 'STREAMING' : 'PAUSED'}</span>
          </button>

          {/* Simulated SOS Drill Trigger */}
          <button
            type="button"
            onClick={triggerSimulatedSOS}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]"
            title="Simulate 3.8g Fall Shock & Emergency Triage Dispatch"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            <span>TEST SOS DRILL</span>
          </button>

          {/* Command Palette Trigger (Ctrl+K) */}
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/90 text-text-secondary hover:text-text-primary border border-border-default hover:border-accent-primary/40 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-accent-primary" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[9px] rounded bg-slate-800 text-slate-400 border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/90 text-text-secondary hover:text-accent-primary border border-border-default transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Print Report */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-900/90 text-text-secondary hover:text-accent-primary border border-border-default transition-colors hidden lg:inline-flex"
            title="Print Official SIH Telemetry Report"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
