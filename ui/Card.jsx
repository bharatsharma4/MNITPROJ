import React from 'react';
import { clsx } from 'clsx';

export function Card({ children, className, hover, padding = true, ...props }) {
  return (
    <div
      className={clsx(
        'bg-surface-card rounded-2xl border border-surface-border shadow-card',
        hover && 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-md hover:border-primary-100 cursor-pointer',
        padding && 'p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={clsx('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={clsx('text-sm font-semibold text-text-primary', className)}>
      {children}
    </h3>
  );
}
