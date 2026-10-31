import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function StatsGrid({ stats }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <StatsCard key={stat.id} {...stat} />
      ))}
    </motion.div>
  );
}

export function StatsCard({ label, value, formatted, delta, deltaDir, period, icon: Icon, color, bgColor }) {
  const DeltaIcon = deltaDir === 'up' ? TrendingUp : deltaDir === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-surface-card rounded-2xl border border-surface-border shadow-card p-5 flex flex-col gap-4 cursor-default group hover:shadow-card-md hover:border-primary-100 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className={clsx(
          'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
          deltaDir === 'up' ? 'bg-status-successBg text-status-success' :
            deltaDir === 'down' ? 'bg-status-errorBg text-status-error' :
              'bg-surface-hover text-text-muted'
        )}>
          <DeltaIcon className="w-3 h-3" />
          {delta}
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-text-primary tracking-tight">{formatted || value}</p>
        <p className="text-sm font-medium text-text-secondary mt-0.5">{label}</p>
        {period && <p className="text-xs text-text-muted mt-1">{period}</p>}
      </div>
    </motion.div>
  );
}
