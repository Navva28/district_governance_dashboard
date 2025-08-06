import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DepartmentTabs from './components/DepartmentTabs';
import GlobalControls from './components/GlobalControls';
import KPICards from './components/KPICards';
import MainVisualization from './components/MainVisualization';
import InteractiveTimeline from './components/InteractiveTimeline';
import RightPanel from './components/RightPanel';
import DataTable from './components/DataTable';

const DepartmentalPerformanceAnalytics = () => {
  const [activeDepartment, setActiveDepartment] = useState('health');
  const [timeRange, setTimeRange] = useState('30d');
  const [comparisonMode, setComparisonMode] = useState('period');
  const [metricGroup, setMetricGroup] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('jun');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDepartmentChange = (department) => {
    setActiveDepartment(department);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleComparisonModeChange = (mode) => {
    setComparisonMode(mode);
  };

  const handleMetricGroupChange = (group) => {
    setMetricGroup(group);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // Implement export functionality
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>Departmental Performance Analytics - District Governance Dashboard</title>
        <meta name="description" content="Monitor detailed departmental metrics, track goal achievement, and analyze performance trends across Health, Education, PWD, and Rural Development sectors." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
        
        <main className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Departmental Performance Analytics
              </h1>
              <p className="text-muted-foreground">
                Monitor detailed metrics, track goal achievement, and analyze trends within specific domains
              </p>
            </div>

            {/* Department Tabs */}
            <DepartmentTabs 
              activeDepartment={activeDepartment}
              onDepartmentChange={handleDepartmentChange}
            />

            {/* Global Controls */}
            <GlobalControls
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
              comparisonMode={comparisonMode}
              onComparisonModeChange={handleComparisonModeChange}
              metricGroup={metricGroup}
              onMetricGroupChange={handleMetricGroupChange}
              onExport={handleExport}
              lastUpdated={lastUpdated}
            />

            {/* KPI Cards */}
            <KPICards 
              department={activeDepartment}
              data={{}}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
              {/* Main Visualization Area */}
              <div className="xl:col-span-8">
                <MainVisualization 
                  department={activeDepartment}
                  timeRange={timeRange}
                />
              </div>

              {/* Right Panel */}
              <div className="xl:col-span-4">
                <RightPanel department={activeDepartment} />
              </div>
            </div>

            {/* Interactive Timeline */}
            <InteractiveTimeline 
              onPeriodSelect={handlePeriodSelect}
              selectedPeriod={selectedPeriod}
            />

            {/* Data Table */}
            <DataTable department={activeDepartment} />
          </div>
        </main>
      </div>
    </>
  );
};

export default DepartmentalPerformanceAnalytics;