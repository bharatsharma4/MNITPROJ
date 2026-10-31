import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, FolderKanban, FileText, Clock,
  CreditCard, FileSignature, Globe, ChevronLeft, ChevronRight,
  Briefcase, Zap, Settings, HelpCircle
} from 'lucide-react';
import { useFreelanceStore } from '../../store/freelanceStore';
import { clsx } from 'clsx';

const mainNav = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/clients', label: 'Clients', icon: Users },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/proposals', label: 'Proposals', icon: FileSignature },
  { path: '/invoices', label: 'Invoices', icon: FileText },
  { path: '/time-tracking', label: 'Time Tracking', icon: Clock },
  { path: '/payments', label: 'Payments', icon: CreditCard },
  { path: '/client-portal', label: 'Client Portal', icon: Globe },
];

const bottomNav = [
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/help', label: 'Help & Support', icon: HelpCircle },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useFreelanceStore();
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 68 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-full bg-surface-card border-r border-surface-border z-40 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-surface-border shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-btn-primary">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <span className="text-base font-bold text-text-primary tracking-tight whitespace-nowrap">
                FreelanceFlow
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className={clsx(
            'ml-auto w-6 h-6 rounded-lg flex items-center justify-center text-text-muted',
            'hover:bg-surface-hover hover:text-text-primary transition-all duration-200',
            !sidebarOpen && 'mx-auto ml-auto'
          )}
        >
          {sidebarOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto overflow-x-hidden no-scrollbar">
        {sidebarOpen && (
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-2 mb-2">
            Main Menu
          </p>
        )}
        <div className="space-y-0.5">
          {mainNav.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink key={path} to={path}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={clsx(
                    'flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer relative group',
                    sidebarOpen ? '' : 'justify-center',
                    isActive
                      ? 'bg-primary-50 text-primary'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                  )}
                  title={!sidebarOpen ? label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActive"
                      className="absolute inset-0 bg-primary-50 rounded-xl border border-primary-100"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <Icon className={clsx(
                    'w-4 h-4 shrink-0 relative z-10',
                    isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'
                  )} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </NavLink>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-surface-border space-y-0.5">
          {sidebarOpen && (
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-2 mb-2">
              Account
            </p>
          )}
          {bottomNav.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path}>
              <div
                className={clsx(
                  'flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                  sidebarOpen ? '' : 'justify-center',
                  'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                )}
                title={!sidebarOpen ? label : undefined}
              >
                <Icon className="w-4 h-4 text-text-muted shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-surface-border p-3 shrink-0">
        <div className={clsx(
          'flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover cursor-pointer transition-all duration-200',
          !sidebarOpen && 'justify-center'
        )}>
          <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            AM
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-semibold text-text-primary whitespace-nowrap">Alex Morgan</p>
                <p className="text-xs text-text-muted whitespace-nowrap">Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
