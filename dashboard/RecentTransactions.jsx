import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { payments } from '../../data/freelanceData';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-status-success', bg: 'bg-status-successBg' },
  pending: { icon: Clock, color: 'text-status-warning', bg: 'bg-status-warningBg' },
  overdue: { icon: AlertCircle, color: 'text-status-error', bg: 'bg-status-errorBg' },
};

export function RecentTransactions() {
  const navigate = useNavigate();
  const recent = payments.slice(0, 5);

  return (
    <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Recent Transactions</h3>
          <p className="text-xs text-text-muted mt-0.5">Latest payment activity</p>
        </div>
        <button
          onClick={() => navigate('/payments')}
          className="text-xs font-medium text-primary hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {recent.map((payment, i) => {
          const config = statusConfig[payment.status] || statusConfig.pending;
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover cursor-pointer transition-all duration-200 group"
            >
              <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', config.bg)}>
                <StatusIcon className={clsx('w-4 h-4', config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate group-hover:text-primary transition-colors">
                  {payment.invoice}
                </p>
                <p className="text-xs text-text-muted">{payment.client}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={clsx(
                  'text-sm font-semibold',
                  payment.status === 'completed' ? 'text-status-success' :
                    payment.status === 'overdue' ? 'text-status-error' : 'text-text-primary'
                )}>
                  ${payment.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-text-muted capitalize">{payment.method}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
