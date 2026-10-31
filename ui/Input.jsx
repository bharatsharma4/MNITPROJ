import React from 'react';
import { clsx } from 'clsx';

export function Input({ label, hint, error, className, leftIcon: LeftIcon, rightIcon: RightIcon, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">{label}</label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          className={clsx(
            'w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-card',
            'text-sm text-text-primary placeholder-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'transition-all duration-200',
            error && 'border-status-error focus:ring-status-error/20 focus:border-status-error',
            LeftIcon && 'pl-9',
            RightIcon && 'pr-9',
            className
          )}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      {error && <p className="text-xs text-status-error">{error}</p>}
    </div>
  );
}

export function Select({ label, children, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <select
        className={clsx(
          'w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-card',
          'text-sm text-text-primary',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'transition-all duration-200 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
