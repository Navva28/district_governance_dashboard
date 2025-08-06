import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const SystemHealthMonitor = () => {
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const [timeRange, setTimeRange] = useState('1h');
  const [healthData, setHealthData] = useState([]);
  const [isRealTime, setIsRealTime] = useState(true);

  const metrics = [
    { id: 'cpu', label: 'CPU Usage', unit: '%', color: '#3b82f6', icon: 'Cpu' },
    { id: 'memory', label: 'Memory Usage', unit: '%', color: '#10b981', icon: 'HardDrive' },
    { id: 'network', label: 'Network I/O', unit: 'Mbps', color: '#f59e0b', icon: 'Wifi' },
    { id: 'disk', label: 'Disk Usage', unit: '%', color: '#ef4444', icon: 'Database' }
  ];

  const timeRanges = [
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' }
  ];

  // Generate initial data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const points = timeRange === '15m' ? 15 : timeRange === '1h' ? 60 : timeRange === '6h' ? 72 : 144;
      const interval = timeRange === '15m' ? 60000 : timeRange === '1h' ? 60000 : timeRange === '6h' ? 300000 : 600000;
      
      return Array.from({ length: points }, (_, i) => {
        const timestamp = new Date(now - (points - i - 1) * interval);
        return {
          time: timestamp?.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          timestamp,
          cpu: Math.max(20, Math.min(95, 45 + Math.sin(i * 0.1) * 20 + Math.random() * 10)),
          memory: Math.max(30, Math.min(90, 60 + Math.cos(i * 0.08) * 15 + Math.random() * 8)),
          network: Math.max(10, Math.min(100, 35 + Math.sin(i * 0.15) * 25 + Math.random() * 15)),
          disk: Math.max(40, Math.min(85, 65 + Math.cos(i * 0.05) * 10 + Math.random() * 5))
        };
      });
    };

    setHealthData(generateData());
  }, [timeRange]);

  // Real-time updates
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setHealthData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData?.[newData?.length - 1];
        const now = new Date();
        
        const newPoint = {
          time: now?.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          timestamp: now,
          cpu: Math.max(20, Math.min(95, lastPoint?.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(90, lastPoint?.memory + (Math.random() - 0.5) * 5)),
          network: Math.max(10, Math.min(100, lastPoint?.network + (Math.random() - 0.5) * 20)),
          disk: Math.max(40, Math.min(85, lastPoint?.disk + (Math.random() - 0.5) * 3))
        };

        newData?.push(newPoint);
        return newData?.slice(-60); // Keep last 60 points
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const getCurrentValue = (metric) => {
    if (healthData?.length === 0) return 0;
    return healthData?.[healthData?.length - 1]?.[metric];
  };

  const getMetricStatus = (value, metric) => {
    const thresholds = {
      cpu: { warning: 70, critical: 85 },
      memory: { warning: 75, critical: 90 },
      network: { warning: 80, critical: 95 },
      disk: { warning: 80, critical: 90 }
    };

    const threshold = thresholds?.[metric];
    if (value >= threshold?.critical) return 'critical';
    if (value >= threshold?.warning) return 'warning';
    return 'good';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'good': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const selectedMetricData = metrics?.find(m => m?.id === selectedMetric);
  const currentValue = getCurrentValue(selectedMetric);
  const status = getMetricStatus(currentValue, selectedMetric);

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Health Monitor</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
                isRealTime 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={isRealTime ? "Pause" : "Play"} size={14} />
              <span>{isRealTime ? 'Live' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Metric Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {metrics?.map((metric) => {
            const value = getCurrentValue(metric?.id);
            const metricStatus = getMetricStatus(value, metric?.id);
            
            return (
              <button
                key={metric?.id}
                onClick={() => setSelectedMetric(metric?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                  selectedMetric === metric?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card hover:bg-muted'
                }`}
              >
                <Icon name={metric?.icon} size={16} />
                <div className="text-left">
                  <div className="text-sm font-medium">{metric?.label}</div>
                  <div className={`text-xs ${getStatusColor(metricStatus)}`}>
                    {value?.toFixed(1)}{metric?.unit}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Time Range Selection */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {timeRanges?.map((range) => (
            <button
              key={range?.value}
              onClick={() => setTimeRange(range?.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                timeRange === range?.value
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name={selectedMetricData?.icon} size={20} color={selectedMetricData?.color} />
              <div>
                <h4 className="font-medium text-foreground">{selectedMetricData?.label}</h4>
                <p className="text-sm text-muted-foreground">Current: 
                  <span className={`ml-1 font-medium ${getStatusColor(status)}`}>
                    {currentValue?.toFixed(1)}{selectedMetricData?.unit}
                  </span>
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'critical' ? 'bg-error/20 text-error' :
              status === 'warning'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
            }`}>
              {status === 'critical' ? 'Critical' : status === 'warning' ? 'Warning' : 'Normal'}
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedMetricData?.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={selectedMetricData?.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
                formatter={(value) => [`${value?.toFixed(1)}${selectedMetricData?.unit}`, selectedMetricData?.label]}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetricData?.color}
                strokeWidth={2}
                fill={`url(#gradient-${selectedMetric})`}
                dot={false}
                activeDot={{ r: 4, fill: selectedMetricData?.color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Threshold Indicators */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Normal (&lt; 70%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span>Warning (70-85%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full" />
              <span>Critical (&gt; 85%)</span>
            </div>
          </div>
          <div>
            Last updated: {new Date()?.toLocaleTimeString('en-IN', { hour12: false })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;