import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { upcomingDeadlines } from '../../data/freelanceData';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

const priorityConfig = {
  critical: { color: 'text-status-error', bg: 'bg-status-errorBg', border: 'border-status-error/20' },
  high: { color: 'text-status-warning', bg: 'bg-status-warningBg', border: 'border-status-warning/20' },
  medium: { color: 'text-primary', bg: 'bg-primary-50', border: 'border-primary/20' },
  low: { color: 'text-status-success', bg: 'bg-status-successBg', border: 'border-status-success/20' },
};

export function UpcomingDeadlines() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Upcoming Deadlines</h3>
          <p className="text-xs text-text-muted mt-0.5">{upcomingDeadlines.length} approaching</p>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs font-medium text-primary hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          All Projects <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {upcomingDeadlines.map((item, i) => {
          const config = priorityConfig[item.priority];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={clsx(
                'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-card',
                config.bg, config.border
              )}
            >
              <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center shrink-0', config.bg)}>
                {item.priority === 'critical'
                  ? <AlertTriangle className={clsx('w-4 h-4', config.color)} />
                  : <CalendarClock className={clsx('w-4 h-4', config.color)} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{item.project}</p>
                <p className="text-xs text-text-muted truncate">{item.client}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={clsx('text-xs font-bold', config.color)}>
                  {item.daysLeft === 0 ? 'Today' : item.daysLeft === 1 ? '1 day' : `${item.daysLeft}d`}
                </p>
                <p className="text-[10px] text-text-muted">{item.deadline}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
