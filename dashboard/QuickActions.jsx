import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, UserPlus, Clock, FolderPlus, Zap } from 'lucide-react';
import { clsx } from 'clsx';

const actions = [
  { label: 'New Invoice', icon: FileText, color: '#2563EB', bg: '#EFF6FF', route: '/invoices' },
  { label: 'Add Client', icon: UserPlus, color: '#8B5CF6', bg: '#F5F3FF', route: '/clients' },
  { label: 'Log Time', icon: Clock, color: '#06B6D4', bg: '#ECFEFF', route: '/time-tracking' },
  { label: 'New Project', icon: FolderPlus, color: '#10B981', bg: '#ECFDF5', route: '/projects' },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-text-primary">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map(({ label, icon: Icon, color, bg, route }, i) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(route)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-border hover:border-primary-100 cursor-pointer transition-all duration-200 group"
            style={{ '--hover-bg': bg }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{ backgroundColor: bg }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center leading-tight">
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
