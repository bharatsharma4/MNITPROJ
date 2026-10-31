import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Circle } from 'lucide-react';
import { StatusBadge } from '../ui/Badge';
import { projects } from '../../data/freelanceData';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
};

export function RecentProjects() {
  const navigate = useNavigate();
  const recent = projects.filter(p => p.status !== 'completed').slice(0, 4);

  return (
    <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Active Projects</h3>
          <p className="text-xs text-text-muted mt-0.5">{recent.length} in progress</p>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs font-medium text-primary hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {recent.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex flex-col gap-2 p-3.5 rounded-xl border border-surface-border hover:border-primary-100 hover:bg-surface-hover/50 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate">
                  {project.name}
                </p>
                <p className="text-xs text-text-muted truncate">{project.client}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Circle
                  className="w-2 h-2 fill-current"
                  style={{ color: priorityColors[project.priority] }}
                />
                <StatusBadge status={project.status} />
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-text-muted">{project.progress}% complete</span>
                <span className="text-[11px] text-text-muted">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-primary"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
