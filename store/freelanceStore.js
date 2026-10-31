import { create } from 'zustand';

export const useFreelanceStore = create((set, get) => ({
  // UI State
  sidebarOpen: true,
  currentPage: 'dashboard',
  activeModal: null,

  // Filters
  projectFilter: 'all',
  clientFilter: 'all',
  invoiceFilter: 'all',
  timeRange: '12m',

  // Timer state
  timer: {
    running: false,
    seconds: 0,
    projectId: null,
    description: '',
  },

  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  setClientFilter: (filter) => set({ clientFilter: filter }),
  setInvoiceFilter: (filter) => set({ invoiceFilter: filter }),
  setTimeRange: (range) => set({ timeRange: range }),

  // Timer actions
  startTimer: (projectId, description) => {
    const interval = setInterval(() => {
      set((s) => ({
        timer: { ...s.timer, seconds: s.timer.seconds + 1 }
      }));
    }, 1000);
    set((s) => ({
      timer: { running: true, seconds: s.timer.seconds, projectId, description, interval }
    }));
  },
  stopTimer: () => {
    const { timer } = get();
    if (timer.interval) clearInterval(timer.interval);
    set({ timer: { running: false, seconds: 0, projectId: null, description: '', interval: null } });
  },
}));
