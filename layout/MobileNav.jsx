import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Activity,
  Compass,
  LineChart as LineChartIcon,
  AlertOctagon,
  Award
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

const mobileNavItems = [
  { id: 'overview', label: 'Command', icon: LayoutDashboard },
  { id: 'sensor-array', label: 'Sensors', icon: Cpu },
  { id: 'ai-risk-engine', label: 'AI Risk', icon: Activity },
  { id: 'geo-radar', label: 'Radar', icon: Compass },
  { id: 'telemetry', label: 'Vitals', icon: LineChartIcon },
  { id: 'incident-log', label: 'Triage', icon: AlertOctagon },
  { id: 'verdict-roadmap', label: 'Verdict', icon: Award },
];

export const MobileNav = () => {
  const activeSection = useDashboardStore((state) => state.activeSection);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-surface/95 backdrop-blur-xl border-t border-border-default z-40 px-2 flex items-center justify-around shadow-2xl">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`min-w-[48px] min-h-[52px] flex flex-col items-center justify-center p-1 rounded-xl transition-all ${isActive ? 'text-accent-primary font-bold scale-105' : 'text-text-muted hover:text-text-primary'}`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] font-mono tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
