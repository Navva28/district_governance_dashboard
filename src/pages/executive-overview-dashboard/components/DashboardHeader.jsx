import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const DashboardHeader = ({ 
  selectedDistrict, 
  onDistrictChange, 
  selectedDateRange, 
  onDateRangeChange,
  autoRefreshInterval,
  onAutoRefreshChange,
  lastUpdated,
  connectionStatus 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const districtOptions = [
    { value: 'mumbai', label: 'Mumbai District' },
    { value: 'pune', label: 'Pune District' },
    { value: 'nashik', label: 'Nashik District' },
    { value: 'nagpur', label: 'Nagpur District' },
    { value: 'aurangabad', label: 'Aurangabad District' },
    { value: 'kolhapur', label: 'Kolhapur District' },
    { value: 'solapur', label: 'Solapur District' },
    { value: 'sangli', label: 'Sangli District' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const refreshIntervalOptions = [
    { value: 'off', label: 'Manual Refresh' },
    { value: '15', label: 'Every 15 minutes' },
    { value: '30', label: 'Every 30 minutes' },
    { value: '60', label: 'Every hour' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'connecting': return 'Loader';
      case 'disconnected': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Title and Time */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Executive Overview Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive district governance analytics and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="text-sm">
              <div className="font-medium text-foreground">{formatTime(currentTime)}</div>
              <div className="text-muted-foreground">{formatDate(currentTime)}</div>
            </div>
            
            <div className={`flex items-center space-x-2 ${getConnectionStatusColor()}`}>
              <Icon 
                name={getConnectionStatusIcon()} 
                size={16} 
                className={connectionStatus === 'connecting' ? 'animate-spin' : ''}
              />
              <span className="text-xs capitalize">{connectionStatus}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* District Selector */}
          <div className="min-w-[200px]">
            <Select
              label="District"
              options={districtOptions}
              value={selectedDistrict}
              onChange={onDistrictChange}
              className="w-full"
            />
          </div>

          {/* Date Range Selector */}
          <div className="min-w-[160px]">
            <Select
              label="Time Period"
              options={dateRangeOptions}
              value={selectedDateRange}
              onChange={onDateRangeChange}
              className="w-full"
            />
          </div>

          {/* Auto Refresh Control */}
          <div className="min-w-[180px]">
            <Select
              label="Auto Refresh"
              options={refreshIntervalOptions}
              value={autoRefreshInterval}
              onChange={onAutoRefreshChange}
              className="w-full"
            />
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={() => window.location?.reload()}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-150 min-w-[120px]"
            title="Refresh dashboard data"
          >
            <Icon name="RefreshCw" size={16} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>
      {/* Last Updated Info */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={12} />
            <span>Last updated: {lastUpdated ? new Date(lastUpdated)?.toLocaleString('en-IN') : 'Never'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={12} />
            <span>Data sources: 4 departments connected</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={12} />
          <span>Secure connection established</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;