import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceRankings = ({ rankings, currentDistrict }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'Trophy';
      case 2: return 'Medal';
      case 3: return 'Award';
      default: return 'Hash';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-600 bg-yellow-50';
      case 2: return 'text-gray-600 bg-gray-50';
      case 3: return 'text-orange-600 bg-orange-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'ArrowUp';
    if (change < 0) return 'ArrowDown';
    return 'Minus';
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">District Rankings</h3>
        <span className="text-xs text-muted-foreground">vs. Peer Districts</span>
      </div>
      <div className="space-y-3">
        {rankings?.map((district) => (
          <div
            key={district?.id}
            className={`p-3 rounded-lg border transition-all duration-150 ${
              district?.name === currentDistrict 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-border hover:border-border/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankColor(district?.rank)}`}>
                  <Icon name={getRankIcon(district?.rank)} size={14} />
                </div>
                <div>
                  <h4 className={`text-sm font-medium ${
                    district?.name === currentDistrict ? 'text-primary' : 'text-foreground'
                  }`}>
                    {district?.name}
                    {district?.name === currentDistrict && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground">Score: {district?.score}%</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 text-xs ${getChangeColor(district?.change)}`}>
                  <Icon name={getChangeIcon(district?.change)} size={12} />
                  <span>{Math.abs(district?.change)}</span>
                </div>
                <span className="text-lg font-bold text-foreground">#{district?.rank}</span>
              </div>
            </div>

            {/* Performance indicators */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Budget</div>
                <div className="text-sm font-medium text-foreground">{district?.budgetScore}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Services</div>
                <div className="text-sm font-medium text-foreground">{district?.serviceScore}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Projects</div>
                <div className="text-sm font-medium text-foreground">{district?.projectScore}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View Detailed Rankings
        </button>
      </div>
    </div>
  );
};

export default PerformanceRankings;