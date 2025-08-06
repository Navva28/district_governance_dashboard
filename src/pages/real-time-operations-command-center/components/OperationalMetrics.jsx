import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OperationalMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const initialMetrics = [
    {
      id: 'uptime',
      label: 'System Uptime',
      value: '99.8%',
      trend: '+0.2%',
      status: 'good',
      icon: 'Server',
      description: 'Overall system availability'
    },
    {
      id: 'data_quality',
      label: 'Data Quality Score',
      value: '94.5',
      trend: '-1.2',
      status: 'warning',
      icon: 'Database',
      description: 'Data accuracy and completeness'
    },
    {
      id: 'response_time',
      label: 'Emergency Response',
      value: '4.2 min',
      trend: '-0.8 min',
      status: 'good',
      icon: 'Clock',
      description: 'Average emergency response time'
    },
    {
      id: 'staff_availability',
      label: 'Staff Availability',
      value: '87%',
      trend: '+3%',
      status: 'good',
      icon: 'Users',
      description: 'On-duty staff percentage'
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure Status',
      value: '92%',
      trend: '-2%',
      status: 'warning',
      icon: 'Building',
      description: 'Critical infrastructure health'
    },
    {
      id: 'service_availability',
      label: 'Service Availability',
      value: '96.3%',
      trend: '+1.1%',
      status: 'good',
      icon: 'Globe',
      description: 'Public service accessibility'
    },
    {
      id: 'security_incidents',
      label: 'Security Incidents',
      value: '3',
      trend: '+1',
      status: 'critical',
      icon: 'Shield',
      description: 'Active security incidents'
    },
    {
      id: 'performance_index',
      label: 'Performance Index',
      value: '8.7/10',
      trend: '+0.3',
      status: 'good',
      icon: 'TrendingUp',
      description: 'Overall system performance'
    }
  ];

  useEffect(() => {
    setMetrics(initialMetrics);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics?.map(metric => ({
          ...metric,
          value: generateRandomValue(metric),
          trend: generateRandomTrend(metric)
        }))
      );
      setLastUpdate(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomValue = (metric) => {
    const baseValues = {
      uptime: () => `${(99 + Math.random())?.toFixed(1)}%`,
      data_quality: () => (90 + Math.random() * 10)?.toFixed(1),
      response_time: () => `${(3 + Math.random() * 3)?.toFixed(1)} min`,
      staff_availability: () => `${Math.floor(80 + Math.random() * 20)}%`,
      infrastructure: () => `${Math.floor(85 + Math.random() * 15)}%`,
      service_availability: () => `${(95 + Math.random() * 5)?.toFixed(1)}%`,
      security_incidents: () => Math.floor(Math.random() * 6)?.toString(),
      performance_index: () => `${(7 + Math.random() * 3)?.toFixed(1)}/10`
    };
    
    return baseValues?.[metric?.id] ? baseValues?.[metric?.id]() : metric?.value;
  };

  const generateRandomTrend = (metric) => {
    const change = (Math.random() - 0.5) * 2;
    if (metric?.id === 'response_time') {
      return `${change > 0 ? '+' : ''}${change?.toFixed(1)} min`;
    } else if (metric?.id === 'security_incidents') {
      return `${change > 0 ? '+' : ''}${Math.floor(change)}`;
    } else {
      return `${change > 0 ? '+' : ''}${change?.toFixed(1)}${metric?.value?.includes('%') ? '%' : ''}`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'good': return 'bg-success/10 border-success/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'critical': return 'bg-error/10 border-error/20';
      default: return 'bg-muted border-border';
    }
  };

  const getTrendColor = (trend, status) => {
    if (status === 'critical') return 'text-error';
    const isPositive = trend?.includes('+');
    const isNegative = trend?.includes('-');
    
    if (trend?.includes('min') || trend?.includes('incidents')) {
      return isNegative ? 'text-success' : 'text-error';
    }
    return isPositive ? 'text-success' : isNegative ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
      {metrics?.map((metric) => (
        <div
          key={metric?.id}
          className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getStatusBg(metric?.status)}`}
        >
          <div className="flex items-center justify-between mb-3">
            <Icon 
              name={metric?.icon} 
              size={20} 
              className={getStatusColor(metric?.status)}
            />
            <div className={`w-2 h-2 rounded-full ${
              metric?.status === 'good' ? 'bg-success' :
              metric?.status === 'warning' ? 'bg-warning' : 'bg-error'
            } animate-pulse`} />
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {metric?.value}
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              {metric?.label}
            </div>
            <div className={`text-xs font-medium ${getTrendColor(metric?.trend, metric?.status)}`}>
              {metric?.trend} from last hour
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {metric?.description}
            </p>
          </div>
        </div>
      ))}
      {/* Last Update Indicator */}
      <div className="col-span-full flex items-center justify-center mt-2">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="RefreshCw" size={12} className="animate-spin" />
          <span>
            Last updated: {lastUpdate?.toLocaleTimeString('en-IN', { 
              hour12: false, 
              timeZone: 'Asia/Kolkata' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OperationalMetrics;