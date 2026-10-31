import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  HardHat,
  ShieldAlert,
  Building2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { dashboardData } from '../../data/dashboardData';

export const VerdictRoadmapSection = () => {
  const getCohortIcon = (iconName) => {
    switch (iconName) {
      case 'User': return Users;
      case 'HardHat': return HardHat;
      case 'ShieldAlert': return ShieldAlert;
      case 'Building2': return Building2;
      default: return Users;
    }
  };

  return (
    <motion.section
      id="verdict-roadmap"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-8"
    >
      <SectionLabel number="08" label="Beneficiary Impact, Final Verdict & AI Roadmap" badgeText="Slide 5 & 6 Evaluation" />

      {/* Target Beneficiaries Grid */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary mb-2">
          Target Beneficiaries &amp; Socio-Economic Impact
        </h2>
        <p className="font-mono text-xs sm:text-sm text-text-secondary mb-6 max-w-3xl">
          Multi-domain deployment architecture spanning vulnerable domestic citizens, hazardous industrial workforce, and first responder disaster dispatch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.targetBeneficiaries.map((b, idx) => {
            const Icon = getCohortIcon(b.icon);
            return (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-accent-primary/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-accent-primary/10 text-accent-primary border border-accent-primary/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      COHORT 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-text-primary mb-1">
                    {b.cohort}
                  </h3>
                  <div className="text-xs font-mono text-accent-primary font-semibold mb-2">
                    {b.value}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {b.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle text-[11px] font-mono text-emerald-400 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                  <strong>PROS:</strong> {b.pros}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Verdict Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border-2 border-accent-primary/30">
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="positive" size="sm">RECOMMENDATION: STRONG POSITIVE</Badge>
              <Badge variant="neutral" size="sm">HACKATHON READINESS: 9.4 / 10</Badge>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
              Definitive Technical Assessment
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
              {dashboardData.verdict.summary}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-bold uppercase text-accent-primary tracking-wider">
                Top Decisive Advantages
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dashboardData.verdict.topReasons.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verdict Score Badge */}
          <div className="lg:col-span-4 bg-slate-900/90 p-6 rounded-2xl border border-border-default text-center space-y-3">
            <Award className="w-10 h-10 text-accent-primary mx-auto" />
            <div className="font-display text-5xl font-bold text-text-primary">
              {dashboardData.verdict.score}
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              Production-Viable Prototype
            </div>
            <p className="text-[11px] font-mono text-text-muted">
              Validated against SIH 2026 Problem Statement #26181 Technical Rubric.
            </p>
          </div>
        </div>
      </div>

      {/* Future AI Extensions Roadmap */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent-tertiary" />
          <h3 className="font-sans font-bold text-lg text-text-primary">
            Next-Gen AI &amp; Software Roadmap
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardData.verdict.futureAiExtensions.map((ext, idx) => {
            const [title, desc] = ext.split(': ');
            return (
              <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">
                    0{idx + 1}
                  </span>
                  <span>{title}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Glossary Accordion / Cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-accent-primary" />
          <h3 className="font-sans font-bold text-lg text-text-primary">
            Hardware &amp; Medical Jargon Reference Glossary
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.glossary.map((g, idx) => (
            <div key={idx} className="bg-slate-900/70 p-4 rounded-xl border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="font-mono font-bold text-xs text-accent-primary mb-1">{g.term}</div>
                <p className="text-xs text-text-secondary leading-relaxed mb-2">{g.definition}</p>
              </div>
              <div className="text-[10px] font-mono text-text-muted border-t border-slate-800/80 pt-2 italic">
                {g.context}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted gap-4">
        <div>
          SMART INDIA HACKATHON 2026 · TEAM YANTRA · PS #26181
        </div>
        <div>
          Hardware + Software IoT Personal Safety Companion
        </div>
      </div>
    </motion.section>
  );
};
