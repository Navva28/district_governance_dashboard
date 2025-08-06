import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  status, 
  sparklineData, 
  icon,
  onClick 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success border-success/20 bg-success/5';
      case 'good': return 'text-success border-success/20 bg-success/5';
      case 'warning': return 'text-warning border-warning/20 bg-warning/5';
      case 'critical': return 'text-error border-error/20 bg-error/5';
      default: return 'text-muted-foreground border-border bg-card';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div 
      className={`bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${getStatusColor(status)}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground truncate">{title}</h3>
        </div>
        <div className={`flex items-center space-x-1 text-xs ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={12} />
          <span>{trendValue}%</span>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      {/* Sparkline visualization */}
      <div className="h-8 flex items-end space-x-1">
        {sparklineData?.map((point, index) => (
          <div
            key={index}
            className="flex-1 bg-primary/20 rounded-sm"
            style={{ height: `${(point / Math.max(...sparklineData)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricCard;