import React from 'react';

export const SectionLabel = ({ number, label, badgeText }) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      {number && (
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/20 tracking-wider">
          {number}
        </span>
      )}
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">
        {label}
      </span>
      {badgeText && (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-300 border border-slate-700/50">
          {badgeText}
        </span>
      )}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-border-default to-transparent" />
    </div>
  );
};
