import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertOctagon,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowUpDown,
  PhoneCall,
  User
} from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { useDashboardStore } from '../../store/dashboardStore';

export const TriageIncidentSection = () => {
  const incidents = useDashboardStore((state) => state.customIncidents);
  const acknowledgeIncident = useDashboardStore((state) => state.acknowledgeIncident);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredData = useMemo(() => {
    return incidents.filter((item) => {
      if (severityFilter !== 'ALL' && item.severity !== severityFilter) return false;
      if (!globalFilter) return true;
      const searchLower = globalFilter.toLowerCase();
      return (
        item.wearer.toLowerCase().includes(searchLower) ||
        item.nodeId.toLowerCase().includes(searchLower) ||
        item.eventType.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.status.toLowerCase().includes(searchLower)
      );
    });
  }, [incidents, severityFilter, globalFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'timestamp',
        header: 'Time (IST)',
        cell: (info) => <span className="font-mono text-xs text-text-secondary">{info.getValue()}</span>,
      },
      {
        accessorKey: 'nodeId',
        header: 'Node ID',
        cell: (info) => (
          <span className="font-mono text-xs font-bold text-accent-primary">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'wearer',
        header: 'Wearer & Location',
        cell: (info) => {
          const row = info.row.original;
          return (
            <div>
              <div className="font-sans font-bold text-xs text-text-primary">{row.wearer}</div>
              <div className="font-mono text-[10px] text-text-muted">{row.location}</div>
            </div>
          );
        },
      },
      {
        accessorKey: 'eventType',
        header: 'Anomaly / Event Description',
        cell: (info) => {
          const row = info.row.original;
          return (
            <div>
              <div className="font-sans text-xs text-slate-200">{row.eventType}</div>
              <div className="font-mono text-[10px] text-text-muted mt-0.5">
                HR: {row.metrics.hr} BPM | SpO2: {row.metrics.spo2}% | Gas: {row.metrics.gasPpm} PPM | Shock: {row.metrics.gForce}g
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'severity',
        header: 'Severity',
        cell: (info) => {
          const val = info.getValue();
          return (
            <Badge variant={val === 'CRITICAL' ? 'negative' : val === 'WARNING' ? 'warning' : 'positive'}>
              {val}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Triage Status',
        cell: (info) => {
          const val = info.getValue();
          const row = info.row.original;
          return (
            <div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${val === 'DISPATCHED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : val === 'EVACUATING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                {val}
              </span>
              <div className="text-[9px] font-mono text-text-muted mt-1">
                ETA: {row.eta}
              </div>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Emergency Action',
        cell: (info) => {
          const row = info.row.original;
          const isResolved = row.status === 'RESOLVED';

          return (
            <button
              type="button"
              onClick={() => acknowledgeIncident(row.id)}
              disabled={isResolved}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${isResolved ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-accent-primary hover:bg-accent-primary/90 text-slate-950 font-bold shadow-sm'}`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isResolved ? 'Resolved' : 'Acknowledge'}</span>
            </button>
          );
        },
      },
    ],
    [acknowledgeIncident]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const exportTableCSV = () => {
    const headers = ['Incident ID', 'Timestamp', 'Node ID', 'Wearer', 'Location', 'Severity', 'Status', 'ETA', 'Heart Rate', 'SpO2', 'Gas PPM'];
    const rows = filteredData.map(inc => [
      inc.id,
      inc.timestamp,
      inc.nodeId,
      `"${inc.wearer}"`,
      `"${inc.location}"`,
      inc.severity,
      inc.status,
      inc.eta,
      inc.metrics.hr,
      inc.metrics.spo2,
      inc.metrics.gasPpm
    ].join(','));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sih_yantra_triage_incidents_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      id="incident-log"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 space-y-6"
    >
      <SectionLabel number="06" label="Emergency Disaster Triage & Incident Log" badgeText="TanStack Table v8" />

      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-text-primary">
            Incident Telemetry & Triage Dispatch
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl">
            Real-time event logging capturing abnormal vital signs, hazardous gas breaches, and high-G fall impacts with GPS tags and responder status.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search incidents..."
              className="bg-slate-900/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-primary w-44 sm:w-56"
            />
          </div>

          {/* Severity Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            {['ALL', 'CRITICAL', 'WARNING', 'NORMAL'].map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${severityFilter === sev ? 'bg-accent-primary text-slate-950 font-bold' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={exportTableCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-text-secondary hover:text-accent-primary border border-slate-800 text-xs font-mono transition-all"
            title="Download Incident Audit Log"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* TanStack Interactive Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-border-default">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-slate-950/80 border-b border-border-subtle font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-4 font-semibold cursor-pointer select-none hover:text-text-primary transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown className="w-3 h-3 opacity-50" />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-800/40 transition-colors ${row.original.severity === 'CRITICAL' ? 'bg-rose-500/5' : ''}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3.5 px-4 tabular-nums align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-center text-text-muted font-mono text-xs">
                    No incident records matching current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="p-3 bg-slate-950/60 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
          <span>Showing {filteredData.length} active emergency logs</span>
          <span>Automatic refresh on MQTT ingest</span>
        </div>
      </div>
    </motion.section>
  );
};
