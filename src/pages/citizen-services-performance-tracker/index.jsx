import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import ServiceMetricsCard from './components/ServiceMetricsCard';
import ServiceDeliveryFunnel from './components/ServiceDeliveryFunnel';
import GrievanceFeed from './components/GrievanceFeed';
import SatisfactionTrendChart from './components/SatisfactionTrendChart';
import ServiceChannelRankings from './components/ServiceChannelRankings';
import GeographicHeatMap from './components/GeographicHeatMap';
import ServiceCatalogTable from './components/ServiceCatalogTable';
import CitizenFeedbackSentiment from './components/CitizenFeedbackSentiment';

const CitizenServicesPerformanceTracker = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isDataRefreshing, setIsDataRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Key Performance Indicators Data
  const kpiData = [
    {
      title: 'Avg Service Delivery Time',
      value: '3.2',
      unit: 'days',
      change: '-0.8',
      changeType: 'positive',
      icon: 'Clock',
      benchmark: { target: '5.0' },
      description: 'Average time from application to service completion'
    },
    {
      title: 'Citizen Satisfaction Score',
      value: '4.3',
      unit: '/5.0',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      benchmark: { target: '4.0' },
      description: 'Overall citizen satisfaction rating'
    },
    {
      title: 'Grievance Resolution Rate',
      value: '87',
      unit: '%',
      change: '+5',
      changeType: 'positive',
      icon: 'CheckCircle',
      benchmark: { target: '85' },
      description: 'Percentage of grievances resolved within SLA'
    },
    {
      title: 'Digital Service Adoption',
      value: '72',
      unit: '%',
      change: '+12',
      changeType: 'positive',
      icon: 'Smartphone',
      benchmark: { target: '70' },
      description: 'Citizens using digital channels for services'
    },
    {
      title: 'Transparency Index',
      value: '8.4',
      unit: '/10',
      change: '+0.3',
      changeType: 'positive',
      icon: 'Eye',
      benchmark: { target: '8.0' },
      description: 'Public transparency and accountability score'
    }
  ];

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'revenue', label: 'Revenue Department' },
    { value: 'transport', label: 'Transport Department' },
    { value: 'health', label: 'Health Department' },
    { value: 'education', label: 'Education Department' },
    { value: 'social-welfare', label: 'Social Welfare' }
  ];

  // Auto-refresh data every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDataRefreshing(true);
      setTimeout(() => {
        setLastUpdated(new Date());
        setIsDataRefreshing(false);
      }, 2000);
    }, 900000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleRefreshData = () => {
    setIsDataRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsDataRefreshing(false);
    }, 2000);
  };

  const handleExportData = () => {
    // Mock export functionality
    const exportData = {
      timestamp: new Date()?.toISOString(),
      timeRange: selectedTimeRange,
      department: selectedDepartment,
      kpis: kpiData,
      exportedBy: 'District Administrator'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `citizen-services-report-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Citizen Services Performance Tracker</h1>
              <p className="text-muted-foreground">
                Monitor service delivery efficiency, citizen satisfaction, and grievance resolution across all government touchpoints
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="RefreshCw" size={16} className={isDataRefreshing ? 'animate-spin' : ''} />
                <span>Last updated: {formatLastUpdated()}</span>
              </div>
              <button
                onClick={handleRefreshData}
                disabled={isDataRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Icon name="RefreshCw" size={16} className={isDataRefreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleExportData}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filters:</span>
              </div>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e?.target?.value)}
                className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {timeRanges?.map(range => (
                  <option key={range?.value} value={range?.value}>{range?.label}</option>
                ))}
              </select>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e?.target?.value)}
                className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {departments?.map(dept => (
                  <option key={dept?.value} value={dept?.value}>{dept?.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Live Data</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {kpiData?.map((kpi, index) => (
              <ServiceMetricsCard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                benchmark={kpi?.benchmark}
                description={kpi?.description}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Service Delivery Funnel - 8 columns */}
            <div className="lg:col-span-8">
              <ServiceDeliveryFunnel />
            </div>

            {/* Side Panel - 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <GrievanceFeed />
              <SatisfactionTrendChart />
            </div>
          </div>

          {/* Geographic Heat Map */}
          <div className="grid grid-cols-1 gap-6">
            <GeographicHeatMap />
          </div>

          {/* Service Channel Rankings and Feedback Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServiceChannelRankings />
            <CitizenFeedbackSentiment />
          </div>

          {/* Service Catalog Table */}
          <div className="grid grid-cols-1 gap-6">
            <ServiceCatalogTable />
          </div>

          {/* Quick Navigation */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/executive-overview-dashboard')}
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <Icon name="BarChart3" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Executive Dashboard</div>
                  <div className="text-xs text-muted-foreground">Strategic overview</div>
                </div>
              </button>
              <button
                onClick={() => navigate('/departmental-performance-analytics')}
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <Icon name="TrendingUp" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Department Analytics</div>
                  <div className="text-xs text-muted-foreground">Performance metrics</div>
                </div>
              </button>
              <button
                onClick={() => navigate('/budget-and-resource-monitoring')}
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <Icon name="DollarSign" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Budget Monitoring</div>
                  <div className="text-xs text-muted-foreground">Resource allocation</div>
                </div>
              </button>
              <button
                onClick={() => navigate('/real-time-operations-command-center')}
                className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <Icon name="Activity" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Operations Center</div>
                  <div className="text-xs text-muted-foreground">Real-time monitoring</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenServicesPerformanceTracker;