import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { useFreelanceStore } from '../../store/freelanceStore';
import { Button } from '../ui/Button';

export function Topbar({ title, subtitle }) {
  const { sidebarOpen } = useFreelanceStore();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-surface-card border-b border-surface-border z-30 flex items-center px-6 gap-4"
      style={{ left: sidebarOpen ? 240 : 68, transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-text-primary truncate">{title}</h1>
        {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className={`relative hidden md:flex items-center transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
        <Search className="absolute left-3 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-surface-border bg-surface-hover text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-surface-card transition-all duration-200"
        />
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:bg-surface-hover hover:text-text-primary transition-all duration-200">
        <Bell className="w-4.5 h-4.5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
      </button>

      {/* Quick Add */}
      <Button variant="primary" size="sm" icon={Plus}>
        <span className="hidden sm:block">New</span>
      </Button>

      {/* Avatar */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
          AM
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-text-muted hidden sm:block group-hover:text-text-primary transition-colors" />
      </div>
    </header>
  );
}
