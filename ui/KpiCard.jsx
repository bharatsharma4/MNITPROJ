import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';
import { InfoTooltip } from './InfoTooltip';
import { Sparkline } from '../charts/Sparkline';

export const KpiCard = ({
  label,
  value,
  unit = '',
  delta,
  deltaDirection = 'positive',
  status = 'OPTIMAL',
  trend = [],
  tooltip,
  icon: Icon
}) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const isNumber = !isNaN(numericValue);
  const animatedValue = isNumber ? useCountUp(numericValue, 1200, value.toString().includes('.') ? 1 : 0) : value;

  const statusColors = {
    OPTIMAL: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    WARNING: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
    CRITICAL: 'border-rose-500/30 bg-rose-500/10 text-rose-400 animate-pulse'
  };

  const deltaColors = {
    positive: 'text-emerald-400',
    negative: 'text-rose-400',
    neutral: 'text-slate-400'
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0, 240, 255, 0.15)' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between border ${statusColors[status] || 'border-border-default'}`}
    >
      {/* Top row: Label + Tooltip + Status */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {Icon && <Icon className="w-4 h-4 text-accent-primary shrink-0" />}
          <span className="font-mono text-xs text-text-secondary uppercase tracking-wider font-medium">
            {label}
          </span>
          {tooltip && (
            <InfoTooltip
              term={label}
              definition={tooltip.definition}
              whyItMatters={tooltip.whyItMatters}
              source={tooltip.source}
              confidence={tooltip.confidence}
            />
          )}
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase font-semibold ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      {/* Middle row: Big Metric + Unit + Delta */}
      <div className="flex items-baseline justify-between gap-2 my-2">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
            {animatedValue}
          </span>
          {unit && (
            <span className="font-mono text-sm sm:text-base text-text-muted font-medium ml-1">
              {unit}
            </span>
          )}
        </div>

        {delta && (
          <div className={`flex items-center gap-1 text-xs font-mono font-semibold ${deltaColors[deltaDirection]}`}>
            {deltaDirection === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
            {deltaDirection === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
            {deltaDirection === 'neutral' && <Minus className="w-3.5 h-3.5" />}
            <span>{delta}</span>
          </div>
        )}
      </div>

      {/* Bottom row: Sparkline */}
      {trend && trend.length > 0 && (
        <div className="h-9 mt-2 pt-1 border-t border-border-subtle flex items-end">
          <Sparkline 
            data={trend} 
            color={status === 'CRITICAL' ? '#F43F5E' : status === 'WARNING' ? '#F59E0B' : '#00F0FF'} 
          />
        </div>
      )}
    </motion.div>
  );
};
