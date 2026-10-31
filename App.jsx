import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { TimeTrackingPage } from './pages/TimeTrackingPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ProposalsPage } from './pages/ProposalsPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { SettingsPage, HelpPage } from './pages/SettingsPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/proposals" element={<ProposalsPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/time-tracking" element={<TimeTrackingPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/client-portal" element={<ClientPortalPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
