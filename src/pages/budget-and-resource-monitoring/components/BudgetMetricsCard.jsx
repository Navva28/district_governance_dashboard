import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetMetricsCard = ({ title, value, subtitle, trend, trendValue, icon, variant = 'default', alert = false }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'error':
        return 'border-error/20 bg-error/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`relative p-6 rounded-lg border ${getVariantStyles()} transition-all duration-200 hover:shadow-md`}>
      {alert && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-error rounded-full animate-pulse" />
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            variant === 'success' ? 'bg-success/10' :
            variant === 'warning' ? 'bg-warning/10' :
            variant === 'error'? 'bg-error/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={icon} 
              size={20} 
              className={
                variant === 'success' ? 'text-success' :
                variant === 'warning' ? 'text-warning' :
                variant === 'error'? 'text-error' : 'text-primary'
              }
            />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default BudgetMetricsCard;