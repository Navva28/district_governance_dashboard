import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetHealthScorecard = ({ healthMetrics }) => {
  const getHealthColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getHealthBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getHealthIcon = (score) => {
    if (score >= 80) return 'CheckCircle';
    if (score >= 60) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Budget Health Scorecard</h3>
        <div className="text-xs text-muted-foreground">Updated 5m ago</div>
      </div>
      <div className="space-y-4">
        {healthMetrics?.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getHealthBg(metric?.score)}`}>
                <Icon 
                  name={getHealthIcon(metric?.score)} 
                  size={16} 
                  className={getHealthColor(metric?.score)}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{metric?.category}</h4>
                <p className="text-xs text-muted-foreground">{metric?.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-lg font-bold ${getHealthColor(metric?.score)}`}>
                {metric?.score}%
              </div>
              <div className="text-xs text-muted-foreground">{metric?.status}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Overall Health Score</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-500"
                style={{ width: `${healthMetrics?.reduce((acc, m) => acc + m?.score, 0) / healthMetrics?.length}%` }}
              />
            </div>
            <span className="text-lg font-bold text-success">
              {Math.round(healthMetrics?.reduce((acc, m) => acc + m?.score, 0) / healthMetrics?.length)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetHealthScorecard;