import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceMetricsCard = ({ title, value, unit, change, changeType, icon, benchmark, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getBenchmarkStatus = () => {
    if (benchmark && benchmark?.target) {
      const current = parseFloat(value);
      const target = parseFloat(benchmark?.target);
      if (current >= target) return 'above';
      if (current >= target * 0.8) return 'near';
      return 'below';
    }
    return 'none';
  };

  const benchmarkStatus = getBenchmarkStatus();

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80">{description}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-xs font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>

        {benchmark && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Target: {benchmark?.target}{unit}</span>
              <span className={`font-medium ${
                benchmarkStatus === 'above' ? 'text-success' :
                benchmarkStatus === 'near' ? 'text-warning' : 'text-error'
              }`}>
                {benchmarkStatus === 'above' ? 'Above Target' :
                 benchmarkStatus === 'near' ? 'Near Target' : 'Below Target'}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  benchmarkStatus === 'above' ? 'bg-success' :
                  benchmarkStatus === 'near' ? 'bg-warning' : 'bg-error'
                }`}
                style={{ 
                  width: `${Math.min(100, (parseFloat(value) / parseFloat(benchmark?.target)) * 100)}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceMetricsCard;