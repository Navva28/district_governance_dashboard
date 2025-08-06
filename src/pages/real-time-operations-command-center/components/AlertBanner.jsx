import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AlertBanner = () => {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'System Performance Alert',
      message: 'Database response time exceeding threshold in Health Department',
      timestamp: new Date(Date.now() - 300000),
      department: 'Health',
      status: 'active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Network Connectivity Issue',
      message: 'Intermittent connectivity reported in Rural Development sector',
      timestamp: new Date(Date.now() - 600000),
      department: 'Rural Development',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'PWD system maintenance scheduled for 02:00 AM tonight',
      timestamp: new Date(Date.now() - 900000),
      department: 'PWD',
      status: 'scheduled'
    }
  ];

  const systemStatus = {
    overall: 'operational',
    uptime: '99.8%',
    activeIncidents: 2,
    resolvedToday: 8
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [alerts?.length]);

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'info': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'outage': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Main Alert Banner */}
      <div className={`${getAlertColor(alerts?.[currentAlert]?.type)} px-6 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon 
              name={alerts?.[currentAlert]?.type === 'critical' ? 'AlertTriangle' : 
                    alerts?.[currentAlert]?.type === 'warning' ? 'AlertCircle' : 'Info'} 
              size={20} 
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{alerts?.[currentAlert]?.title}</span>
                <span className="text-sm opacity-75">• {alerts?.[currentAlert]?.department}</span>
                <span className="text-sm opacity-75">• {formatTimestamp(alerts?.[currentAlert]?.timestamp)}</span>
              </div>
              <p className="text-sm opacity-90 mt-1">{alerts?.[currentAlert]?.message}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-3 py-1 rounded-md bg-black/10 hover:bg-black/20 transition-colors"
            >
              <span className="text-sm">View All</span>
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </button>
            <div className="flex space-x-1">
              {alerts?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAlert(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentAlert ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* System Status Bar */}
      <div className="bg-muted px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-muted-foreground">System Status:</span>
              <span className={`font-medium ${getStatusColor(systemStatus?.overall)}`}>
                Operational
              </span>
            </div>
            <div className="text-muted-foreground">
              Uptime: <span className="font-medium text-foreground">{systemStatus?.uptime}</span>
            </div>
            <div className="text-muted-foreground">
              Active Incidents: <span className="font-medium text-warning">{systemStatus?.activeIncidents}</span>
            </div>
            <div className="text-muted-foreground">
              Resolved Today: <span className="font-medium text-success">{systemStatus?.resolvedToday}</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Last Updated: {new Date()?.toLocaleTimeString('en-IN', { 
              hour12: false, 
              timeZone: 'Asia/Kolkata' 
            })}
          </div>
        </div>
      </div>
      {/* Expanded Alert List */}
      {isExpanded && (
        <div className="bg-card border-t border-border">
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">All Active Alerts</h3>
            <div className="space-y-2">
              {alerts?.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.type === 'critical' ? 'bg-error' :
                      alert.type === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div>
                      <div className="font-medium text-foreground">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{alert.department}</div>
                    <div className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertBanner;