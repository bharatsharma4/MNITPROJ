import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

export const ScoreDisplay = ({ score = 9.4, scale = 10, label, rationale }) => {
  const animatedScore = useCountUp(score, 1400, 1);
  const percentage = (score / scale) * 100;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-accent-primary/10 rounded-full blur-3xl group-hover:bg-accent-primary/20 transition-all duration-700 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
        {/* Animated Radial Arc */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="8"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-accent-primary"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display text-3xl font-bold text-text-primary tracking-tight">
              {animatedScore}
            </div>
            <span className="font-mono text-[10px] text-text-muted">/{scale}</span>
          </div>
        </div>

        {/* Text Breakdown */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
            <Award className="w-4 h-4 text-accent-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary">
              {label || 'EXEMPLARY / PRODUCTION-READY'}
            </span>
          </div>
          <h3 className="font-sans font-bold text-lg text-text-primary mb-2">
            SIH 2026 Readiness Benchmark
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
            {rationale}
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border-subtle">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[11px] text-text-muted">Multi-Sensor Fusion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[11px] text-text-muted">Edge AI Resilience</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[11px] text-text-muted">BOM Cost &lt;$25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
