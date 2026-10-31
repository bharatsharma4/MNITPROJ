import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ShieldCheck, AlertCircle, BookOpen } from 'lucide-react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal
} from '@floating-ui/react';

export const InfoTooltip = ({ 
  definition, 
  whyItMatters, 
  source, 
  confidence = 'high',
  term,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const confidenceColors = {
    high: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
    medium: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
    low: 'text-rose-400 bg-rose-950/60 border-rose-500/30'
  };

  return (
    <span className="inline-flex items-center align-middle relative">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-colors cursor-help focus:outline-none focus:ring-1 focus:ring-accent-primary ml-1"
        aria-label={`Info about ${term || 'metric'}`}
        type="button"
      >
        {children || <Info className="w-3.5 h-3.5" />}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="z-50 max-w-sm w-80 p-4 rounded-xl bg-slate-950/95 backdrop-blur-xl border border-slate-700/60 shadow-2xl text-slate-100 text-xs pointer-events-auto"
            >
              {term && (
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
                  <span className="font-sans font-bold text-sm text-accent-primary tracking-wide">
                    {term}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase ${confidenceColors[confidence]}`}>
                    {confidence} Confidence
                  </span>
                </div>
              )}

              {definition && (
                <div className="mb-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                    Definition
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {definition}
                  </p>
                </div>
              )}

              {whyItMatters && (
                <div className="mb-2.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-accent-secondary mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-accent-secondary" />
                    Why It Matters
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {whyItMatters}
                  </p>
                </div>
              )}

              {source && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                  <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">Source: {source}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </span>
  );
};
