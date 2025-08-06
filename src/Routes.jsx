import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CitizenServicesPerformanceTracker from './pages/citizen-services-performance-tracker';
import BudgetAndResourceMonitoring from './pages/budget-and-resource-monitoring';
import DepartmentalPerformanceAnalytics from './pages/departmental-performance-analytics';
import RealTimeOperationsCommandCenter from './pages/real-time-operations-command-center';
import ExecutiveOverviewDashboard from './pages/executive-overview-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BudgetAndResourceMonitoring />} />
        <Route path="/citizen-services-performance-tracker" element={<CitizenServicesPerformanceTracker />} />
        <Route path="/budget-and-resource-monitoring" element={<BudgetAndResourceMonitoring />} />
        <Route path="/departmental-performance-analytics" element={<DepartmentalPerformanceAnalytics />} />
        <Route path="/real-time-operations-command-center" element={<RealTimeOperationsCommandCenter />} />
        <Route path="/executive-overview-dashboard" element={<ExecutiveOverviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
