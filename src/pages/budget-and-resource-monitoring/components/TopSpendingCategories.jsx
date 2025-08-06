import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TopSpendingCategories = ({ categories, title }) => {
  const maxAmount = Math.max(...categories?.map(cat => cat?.amount));

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Infrastructure': 'Building',
      'Healthcare': 'Heart',
      'Education': 'GraduationCap',
      'Rural Development': 'Tractor',
      'Technology': 'Laptop',
      'Transportation': 'Car',
      'Utilities': 'Zap',
      'Administration': 'Users'
    };
    return iconMap?.[category] || 'DollarSign';
  };

  const getProgressColor = (percentage) => {
    if (percentage > 80) return 'bg-error';
    if (percentage > 60) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      <div className="space-y-4">
        {categories?.map((category, index) => {
          const percentage = (category?.amount / maxAmount) * 100;
          const utilizationPercentage = (category?.spent / category?.amount) * 100;
          
          return (
            <div key={index} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={getCategoryIcon(category?.name)} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{category?.name}</h4>
                    <p className="text-xs text-muted-foreground">{category?.projects} projects</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">
                    ₹{category?.amount?.toLocaleString('en-IN')} Cr
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(utilizationPercentage)}% utilized
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Budget Allocation</span>
                  <span>{Math.round(percentage)}% of total</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Utilization</span>
                  <span>₹{category?.spent?.toLocaleString('en-IN')} Cr spent</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${getProgressColor(utilizationPercentage)}`}
                    style={{ width: `${utilizationPercentage}%` }}
                  />
                </div>
              </div>
              {category?.variance && (
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Variance from plan:</span>
                  <span className={`font-medium ${
                    category?.variance > 0 ? 'text-error' : 'text-success'
                  }`}>
                    {category?.variance > 0 ? '+' : ''}{category?.variance}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              ₹{categories?.reduce((acc, cat) => acc + cat?.amount, 0)?.toLocaleString('en-IN')} Cr
            </div>
            <div className="text-xs text-muted-foreground">Total Allocated</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              ₹{categories?.reduce((acc, cat) => acc + cat?.spent, 0)?.toLocaleString('en-IN')} Cr
            </div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSpendingCategories;