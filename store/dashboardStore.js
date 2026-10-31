import { create } from 'zustand';
import { dashboardData } from '../data/dashboardData';

export const useDashboardStore = create((set, get) => ({
  activeSection: 'overview',
  selectedNodeId: 'NODE-Y03', // Default to critical node for instant high-value demonstration
  theme: 'dark',
  liveStreaming: true,
  timeRange: '1m',
  searchQuery: '',
  incidentFilter: 'ALL',
  isCommandPaletteOpen: false,
  customNodes: dashboardData.nodes,
  customIncidents: dashboardData.incidentLog,
  simulatedVitals: {
    hr: 138,
    spo2: 89,
    temp: 38.5,
    humidity: 89,
    gasPpm: 320,
    gForce: 3.48,
    hsi: 41.0,
    riskScore: 96
  },
  audioAlertEnabled: false,

  setActiveSection: (section) => set({ activeSection: section }),
  
  setSelectedNodeId: (nodeId) => {
    const node = get().customNodes.find(n => n.id === nodeId);
    set({ 
      selectedNodeId: nodeId,
      simulatedVitals: node ? {
        hr: node.vitals.hr,
        spo2: node.vitals.spo2,
        temp: node.vitals.temp,
        humidity: node.vitals.humidity,
        gasPpm: node.vitals.gasPpm,
        gForce: node.vitals.gForce,
        hsi: node.vitals.hsi === 'High Risk' ? 38.2 : node.vitals.hsi === 'Elevated' ? 41.0 : 24.5,
        riskScore: node.status === 'CRITICAL' ? 95 : node.status === 'WARNING' ? 68 : 14
      } : get().simulatedVitals
    });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    if (typeof document !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
    set({ theme: nextTheme });
  },

  toggleLiveStreaming: () => set((state) => ({ liveStreaming: !state.liveStreaming })),
  setTimeRange: (range) => set({ timeRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIncidentFilter: (filter) => set({ incidentFilter: filter }),
  setIsCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  toggleAudioAlert: () => set((state) => ({ audioAlertEnabled: !state.audioAlertEnabled })),

  acknowledgeIncident: (incidentId) => {
    set((state) => ({
      customIncidents: state.customIncidents.map(inc => 
        inc.id === incidentId ? { ...inc, status: 'RESOLVED', eta: 'Acknowledged' } : inc
      )
    }));
  },

  triggerSimulatedSOS: () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN') + ' IST';
    const newIncident = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      timestamp: timeString,
      nodeId: get().selectedNodeId,
      wearer: "Simulated Field Unit (Active Drill)",
      eventType: "Simulated Mechanical Fall Shockwave (3.82g) + Extreme Heat",
      severity: "CRITICAL",
      coords: "26.1480° N, 91.7400° E",
      location: "Disaster Simulation Perimeter, Zone 2",
      metrics: { hr: 148, spo2: 87, gForce: 3.82, gasPpm: 380 },
      status: "DISPATCHED",
      responder: "Automated NDRF Drone Scout 01",
      eta: "1.5 mins"
    };

    set((state) => ({
      customIncidents: [newIncident, ...state.customIncidents],
      simulatedVitals: {
        hr: 148,
        spo2: 87,
        temp: 39.8,
        humidity: 92,
        gasPpm: 380,
        gForce: 3.82,
        hsi: 44.5,
        riskScore: 99
      }
    }));
  }
}));
