import React from 'react';
import { clsx } from 'clsx';

const variants = {
  primary: 'bg-primary text-white border-primary shadow-btn-primary hover:bg-primary-700',
  secondary: 'bg-surface-card text-text-primary border-surface-border shadow-btn hover:bg-surface-hover hover:border-primary-200',
  ghost: 'bg-transparent text-text-secondary border-transparent hover:bg-surface-hover hover:text-text-primary',
  danger: 'bg-status-error text-white border-status-error hover:bg-red-600 shadow-btn',
  violet: 'bg-violet text-white border-violet hover:bg-violet-dark shadow-btn',
  outline: 'bg-transparent text-primary border-primary hover:bg-primary-50',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-base rounded-2xl gap-3',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconRight,
  loading,
  disabled,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-semibold border transition-all duration-200 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon && !iconRight ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
      {Icon && iconRight ? <Icon className="w-4 h-4 shrink-0" /> : null}
    </button>
  );
}
