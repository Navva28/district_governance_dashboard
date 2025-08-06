import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const GlobalControls = ({ 
  timeRange, 
  onTimeRangeChange, 
  comparisonMode, 
  onComparisonModeChange,
  metricGroup,
  onMetricGroupChange,
  onExport,
  lastUpdated 
}) => {
  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const comparisonOptions = [
    { value: 'period', label: 'Period over Period' },
    { value: 'benchmark', label: 'Benchmarking' },
    { value: 'target', label: 'Target Comparison' }
  ];

  const metricGroupOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'performance', label: 'Performance KPIs' },
    { value: 'financial', label: 'Financial Metrics' },
    { value: 'operational', label: 'Operational Metrics' },
    { value: 'quality', label: 'Quality Indicators' }
  ];

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="min-w-[180px]">
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={timeRange}
              onChange={onTimeRangeChange}
            />
          </div>
          <div className="min-w-[200px]">
            <Select
              label="Comparison Mode"
              options={comparisonOptions}
              value={comparisonMode}
              onChange={onComparisonModeChange}
            />
          </div>
          <div className="min-w-[180px]">
            <Select
              label="Metric Group"
              options={metricGroupOptions}
              value={metricGroup}
              onChange={onMetricGroupChange}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Updated {formatLastUpdated()}</span>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;