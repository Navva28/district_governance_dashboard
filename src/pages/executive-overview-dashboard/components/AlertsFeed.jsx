import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertsFeed = ({ alerts, onAlertClick }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      case 'deadline': return 'Clock';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      case 'deadline': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Priority Alerts</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">{alerts?.filter(a => a?.type === 'critical')?.length} Critical</span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all duration-150 ${getAlertColor(alert.type)}`}
            onClick={() => onAlertClick && onAlertClick(alert)}
          >
            <div className="flex items-start space-x-3">
              <Icon name={getAlertIcon(alert.type)} size={16} className="mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">{alert.title}</h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                {alert.department && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                      {alert.department}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsFeed;