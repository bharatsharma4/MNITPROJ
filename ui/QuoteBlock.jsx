import React from 'react';
import { Quote } from 'lucide-react';

export const QuoteBlock = ({ text, location, author = "Team YANTRA" }) => {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden my-6 border-l-4 border-l-accent-primary">
      <Quote className="w-10 h-10 text-accent-primary/20 absolute -top-1 -right-1" />
      <div className="relative z-10">
        <p className="font-sans text-base sm:text-lg italic font-medium text-text-primary leading-relaxed mb-3">
          "{text}"
        </p>
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-subtle text-xs font-mono text-text-muted">
          <span className="font-semibold text-accent-primary">{author}</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};
