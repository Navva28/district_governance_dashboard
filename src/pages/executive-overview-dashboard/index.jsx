import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import MetricCard from './components/MetricCard';
import DepartmentalChart from './components/DepartmentalChart';
import AlertsFeed from './components/AlertsFeed';
import PerformanceRankings from './components/PerformanceRankings';
import GeographicHeatMap from './components/GeographicHeatMap';

const ExecutiveOverviewDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('mumbai');
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState('30');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock data for KPI metrics
  const kpiMetrics = [
    {
      id: 1,
      title: "Overall District Performance",
      value: "87.5",
      unit: "%",
      trend: "up",
      trendValue: "2.3",
      status: "excellent",
      icon: "TrendingUp",
      sparklineData: [75, 78, 82, 85, 87, 89, 87, 88]
    },
    {
      id: 2,
      title: "Budget Utilization",
      value: "78.2",
      unit: "%",
      trend: "up",
      trendValue: "5.1",
      status: "good",
      icon: "DollarSign",
      sparklineData: [65, 68, 72, 75, 76, 78, 77, 78]
    },
    {
      id: 3,
      title: "Citizen Satisfaction Index",
      value: "4.2",
      unit: "/5",
      trend: "up",
      trendValue: "0.3",
      status: "good",
      icon: "Heart",
      sparklineData: [3.8, 3.9, 4.0, 4.1, 4.0, 4.2, 4.1, 4.2]
    },
    {
      id: 4,
      title: "Project Completion Rate",
      value: "73.8",
      unit: "%",
      trend: "down",
      trendValue: "1.2",
      status: "warning",
      icon: "CheckCircle",
      sparklineData: [80, 78, 76, 75, 74, 73, 74, 74]
    },
    {
      id: 5,
      title: "Service Delivery Efficiency",
      value: "91.3",
      unit: "%",
      trend: "up",
      trendValue: "3.7",
      status: "excellent",
      icon: "Zap",
      sparklineData: [85, 87, 88, 89, 90, 91, 92, 91]
    },
    {
      id: 6,
      title: "Staff Productivity",
      value: "82.6",
      unit: "%",
      trend: "up",
      trendValue: "1.8",
      status: "good",
      icon: "Users",
      sparklineData: [78, 79, 80, 81, 82, 83, 82, 83]
    },
    {
      id: 7,
      title: "Emergency Response Time",
      value: "12.4",
      unit: "min",
      trend: "down",
      trendValue: "8.3",
      status: "excellent",
      icon: "Clock",
      sparklineData: [18, 16, 15, 14, 13, 12, 13, 12]
    },
    {
      id: 8,
      title: "Transparency Score",
      value: "85.7",
      unit: "%",
      trend: "up",
      trendValue: "4.2",
      status: "good",
      icon: "Eye",
      sparklineData: [78, 80, 82, 83, 84, 85, 86, 86]
    }
  ];

  // Mock data for departmental comparison
  const departmentalData = [
    {
      department: "Health",
      performance: 89,
      budgetUtilization: 85,
      projectCompletion: 78
    },
    {
      department: "Education",
      performance: 92,
      budgetUtilization: 88,
      projectCompletion: 82
    },
    {
      department: "PWD",
      performance: 76,
      budgetUtilization: 72,
      projectCompletion: 68
    },
    {
      department: "Rural Dev",
      performance: 84,
      budgetUtilization: 79,
      projectCompletion: 75
    }
  ];

  // Mock data for alerts
  const alertsData = [
    {
      id: 1,
      type: "critical",
      title: "Budget Overrun Alert",
      description: "PWD department has exceeded allocated budget by 15% for Q3 infrastructure projects",
      department: "PWD",
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      type: "warning",
      title: "Project Deadline Approaching",
      description: "Rural electrification project in Taluka-A is 72 hours behind schedule",
      department: "Rural Development",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 3,
      type: "info",
      title: "Performance Milestone Achieved",
      description: "Education department has achieved 95% enrollment rate target ahead of schedule",
      department: "Education",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 4,
      type: "deadline",
      title: "Monthly Report Due",
      description: "Health department monthly performance report submission due in 24 hours",
      department: "Health",
      timestamp: new Date(Date.now() - 10800000) // 3 hours ago
    },
    {
      id: 5,
      type: "warning",
      title: "Service Delivery Decline",
      description: "Citizen service response time has increased by 18% in the past week",
      department: "Administration",
      timestamp: new Date(Date.now() - 14400000) // 4 hours ago
    }
  ];

  // Mock data for district rankings
  const rankingsData = [
    {
      id: 1,
      name: "Pune District",
      rank: 1,
      score: 94,
      change: 2,
      budgetScore: 96,
      serviceScore: 93,
      projectScore: 92
    },
    {
      id: 2,
      name: "Mumbai District",
      rank: 2,
      score: 87,
      change: 0,
      budgetScore: 85,
      serviceScore: 89,
      projectScore: 88
    },
    {
      id: 3,
      name: "Nashik District",
      rank: 3,
      score: 84,
      change: 1,
      budgetScore: 82,
      serviceScore: 86,
      projectScore: 84
    },
    {
      id: 4,
      name: "Nagpur District",
      rank: 4,
      score: 81,
      change: -1,
      budgetScore: 79,
      serviceScore: 83,
      projectScore: 81
    },
    {
      id: 5,
      name: "Aurangabad District",
      rank: 5,
      score: 78,
      change: -2,
      budgetScore: 76,
      serviceScore: 80,
      projectScore: 78
    }
  ];

  // Mock data for sub-district heat map
  const subDistrictData = [
    {
      id: 1,
      name: "Central Mumbai",
      population: "2.5L",
      metrics: { overall: 92, budget: 89, services: 95, projects: 88 }
    },
    {
      id: 2,
      name: "Western Mumbai",
      population: "3.2L",
      metrics: { overall: 87, budget: 85, services: 89, projects: 86 }
    },
    {
      id: 3,
      name: "Eastern Mumbai",
      population: "2.8L",
      metrics: { overall: 83, budget: 81, services: 85, projects: 82 }
    },
    {
      id: 4,
      name: "Northern Mumbai",
      population: "2.1L",
      metrics: { overall: 79, budget: 77, services: 81, projects: 78 }
    },
    {
      id: 5,
      name: "Southern Mumbai",
      population: "1.9L",
      metrics: { overall: 94, budget: 92, services: 96, projects: 93 }
    },
    {
      id: 6,
      name: "Suburban East",
      population: "4.1L",
      metrics: { overall: 76, budget: 74, services: 78, projects: 75 }
    },
    {
      id: 7,
      name: "Suburban West",
      population: "3.7L",
      metrics: { overall: 81, budget: 79, services: 83, projects: 80 }
    },
    {
      id: 8,
      name: "Harbor Line",
      population: "2.3L",
      metrics: { overall: 85, budget: 83, services: 87, projects: 84 }
    }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefreshInterval !== 'off') {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
        // Simulate occasional connection issues
        setConnectionStatus(Math.random() > 0.95 ? 'connecting' : 'connected');
      }, parseInt(autoRefreshInterval) * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval]);

  const handleMetricClick = (metric) => {
    console.log('Metric clicked:', metric);
    // Navigate to detailed view or show modal
  };

  const handleDepartmentClick = (department) => {
    console.log('Department clicked:', department);
    navigate('/departmental-performance-analytics', { state: { department } });
  };

  const handleAlertClick = (alert) => {
    console.log('Alert clicked:', alert);
    // Handle alert action
  };

  const handleSubDistrictClick = (subDistrict) => {
    console.log('Sub-district clicked:', subDistrict);
    // Filter data or navigate to sub-district view
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } mt-16`}>
        {/* Dashboard Header */}
        <DashboardHeader
          selectedDistrict={selectedDistrict}
          onDistrictChange={setSelectedDistrict}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
          autoRefreshInterval={autoRefreshInterval}
          onAutoRefreshChange={setAutoRefreshInterval}
          lastUpdated={lastUpdated}
          connectionStatus={connectionStatus}
        />

        <div className="p-6 space-y-6">
          {/* KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics?.map((metric) => (
              <MetricCard
                key={metric?.id}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                status={metric?.status}
                icon={metric?.icon}
                sparklineData={metric?.sparklineData}
                onClick={() => handleMetricClick(metric)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Departmental Chart - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <DepartmentalChart
                data={departmentalData}
                onDepartmentClick={handleDepartmentClick}
              />
            </div>

            {/* Right Sidebar Content */}
            <div className="space-y-6">
              <AlertsFeed
                alerts={alertsData}
                onAlertClick={handleAlertClick}
              />
              
              <PerformanceRankings
                rankings={rankingsData}
                currentDistrict="Mumbai District"
              />
            </div>
          </div>

          {/* Geographic Heat Map */}
          <GeographicHeatMap
            subDistrictData={subDistrictData}
            onSubDistrictClick={handleSubDistrictClick}
          />
        </div>
      </main>
    </div>
  );
};

export default ExecutiveOverviewDashboard;