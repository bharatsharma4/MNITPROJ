import React from 'react';

export const ConfidencePill = ({ level = 'high', label }) => {
  const configs = {
    high: {
      dot: 'bg-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      title: 'High Confidence (Direct sensor measurement)'
    },
    medium: {
      dot: 'bg-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      title: 'Medium Confidence (Fused algorithmic inference)'
    },
    low: {
      dot: 'bg-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      title: 'Low Confidence (Uncalibrated estimate)'
    }
  };

  const current = configs[level.toLowerCase()] || configs.high;

  return (
    <span 
      title={current.title}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${current.bg} ${current.border} ${current.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} animate-pulse`} />
      {label || `${level} Confidence`}
    </span>
  );
};
