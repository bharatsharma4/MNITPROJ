import React from 'react';
import { clsx } from 'clsx';

const variants = {
  default: 'bg-surface-hover text-text-secondary',
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-status-successBg text-status-success',
  warning: 'bg-status-warningBg text-status-warning',
  error: 'bg-status-errorBg text-status-error',
  violet: 'bg-violet/10 text-violet-dark',
  cyan: 'bg-cyan/10 text-cyan-dark',
  info: 'bg-status-infoBg text-status-info',
};

export function Badge({ children, variant = 'default', className, dot, ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    active: { label: 'Active', variant: 'success' },
    inactive: { label: 'Inactive', variant: 'default' },
    prospect: { label: 'Prospect', variant: 'warning' },
    in_progress: { label: 'In Progress', variant: 'primary' },
    review: { label: 'In Review', variant: 'violet' },
    completed: { label: 'Completed', variant: 'success' },
    on_hold: { label: 'On Hold', variant: 'warning' },
    cancelled: { label: 'Cancelled', variant: 'error' },
    pending: { label: 'Pending', variant: 'warning' },
    paid: { label: 'Paid', variant: 'success' },
    overdue: { label: 'Overdue', variant: 'error' },
    draft: { label: 'Draft', variant: 'default' },
    sent: { label: 'Sent', variant: 'info' },
    accepted: { label: 'Accepted', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'error' },
  };

  const config = map[status] || { label: status, variant: 'default' };
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
}
