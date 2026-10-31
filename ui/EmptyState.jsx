import React from 'react';
import { motion } from 'framer-motion';

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-primary-300" />
        </div>
      )}
      <h3 className="text-base font-semibold text-text-primary mb-1.5">{title}</h3>
      {description && <p className="text-sm text-text-muted max-w-sm mb-5">{description}</p>}
      {action}
    </motion.div>
  );
}
