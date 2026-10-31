import React from 'react';

export const SkeletonCard = ({ className = "h-32" }) => {
  return (
    <div className={`glass-card p-5 rounded-2xl animate-pulse flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-800 rounded w-1/3" />
        <div className="h-4 w-4 bg-slate-800 rounded-full" />
      </div>
      <div className="h-8 bg-slate-800 rounded w-1/2 my-3" />
      <div className="h-3 bg-slate-800 rounded w-3/4" />
    </div>
  );
};
