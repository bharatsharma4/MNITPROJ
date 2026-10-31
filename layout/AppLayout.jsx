import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useFreelanceStore } from '../../store/freelanceStore';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function AppLayout({ children, title, subtitle }) {
  const { sidebarOpen } = useFreelanceStore();

  return (
    <div className="min-h-screen bg-surface-bg">
      <Sidebar />
      <Topbar title={title} subtitle={subtitle} />
      <main
        className="min-h-screen pt-16 transition-all duration-300"
        style={{ paddingLeft: sidebarOpen ? 240 : 68 }}
      >
        <div className="p-6 max-w-[1400px]">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
