import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceChannelRankings = () => {
  const [sortBy, setSortBy] = useState('performance');
  const [timeRange, setTimeRange] = useState('week');

  const channelData = [
    {
      id: 1,
      name: 'Online Portal',
      icon: 'Globe',
      performance: 92,
      satisfaction: 4.6,
      volume: 8450,
      avgTime: '2.3 days',
      trend: 'up',
      trendValue: '+5.2%',
      availability: 99.8,
      issues: 12
    },
    {
      id: 2,
      name: 'Mobile App',
      icon: 'Smartphone',
      performance: 89,
      satisfaction: 4.4,
      volume: 6230,
      avgTime: '2.1 days',
      trend: 'up',
      trendValue: '+8.1%',
      availability: 99.5,
      issues: 8
    },
    {
      id: 3,
      name: 'Service Centers',
      icon: 'Building',
      performance: 76,
      satisfaction: 4.1,
      volume: 4890,
      avgTime: '4.2 days',
      trend: 'down',
      trendValue: '-2.3%',
      availability: 95.2,
      issues: 23
    },
    {
      id: 4,
      name: 'Phone Support',
      icon: 'Phone',
      performance: 68,
      satisfaction: 3.8,
      volume: 3210,
      avgTime: '5.1 days',
      trend: 'stable',
      trendValue: '+0.5%',
      availability: 92.1,
      issues: 31
    },
    {
      id: 5,
      name: 'Walk-in Counters',
      icon: 'Users',
      performance: 64,
      satisfaction: 3.6,
      volume: 2890,
      avgTime: '6.8 days',
      trend: 'down',
      trendValue: '-4.1%',
      availability: 88.5,
      issues: 45
    }
  ];

  const sortOptions = [
    { value: 'performance', label: 'Performance Score' },
    { value: 'satisfaction', label: 'Satisfaction Rating' },
    { value: 'volume', label: 'Service Volume' },
    { value: 'avgTime', label: 'Average Time' }
  ];

  const timeRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const getSortedChannels = () => {
    return [...channelData]?.sort((a, b) => {
      switch (sortBy) {
        case 'performance':
          return b?.performance - a?.performance;
        case 'satisfaction':
          return b?.satisfaction - a?.satisfaction;
        case 'volume':
          return b?.volume - a?.volume;
        case 'avgTime':
          return parseFloat(a?.avgTime) - parseFloat(b?.avgTime);
        default:
          return 0;
      }
    });
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getRankBadge = (index) => {
    const rank = index + 1;
    if (rank === 1) return 'bg-warning text-warning-foreground';
    if (rank === 2) return 'bg-muted text-muted-foreground';
    if (rank === 3) return 'bg-warning/60 text-warning-foreground';
    return 'bg-muted/50 text-muted-foreground';
  };

  const sortedChannels = getSortedChannels();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Service Channel Rankings</h3>
          <p className="text-sm text-muted-foreground">Performance comparison across channels</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeRanges?.map(range => (
              <option key={range?.value} value={range?.value}>{range?.label}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>{option?.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {sortedChannels?.map((channel, index) => (
          <div key={channel?.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getRankBadge(index)}`}>
                  {index + 1}
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={channel?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{channel?.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {channel?.volume?.toLocaleString()} services this {timeRange}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-1 ${getTrendColor(channel?.trend)}`}>
                  <Icon name={getTrendIcon(channel?.trend)} size={14} />
                  <span className="text-xs font-medium">{channel?.trendValue}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(channel?.performance)}`}>
                  {channel?.performance}% Score
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{channel?.satisfaction}</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
                <div className="flex justify-center mt-1">
                  {[1, 2, 3, 4, 5]?.map(star => (
                    <Icon 
                      key={star} 
                      name="Star" 
                      size={12} 
                      className={star <= Math.floor(channel?.satisfaction) ? "text-warning" : "text-muted-foreground"} 
                    />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{channel?.avgTime}</div>
                <div className="text-xs text-muted-foreground">Avg Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{channel?.availability}%</div>
                <div className="text-xs text-muted-foreground">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{channel?.issues}</div>
                <div className="text-xs text-muted-foreground">Issues</div>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Overall Performance</span>
                <span>{channel?.performance}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    channel?.performance >= 90 ? 'bg-success' :
                    channel?.performance >= 75 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${channel?.performance}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {(sortedChannels?.reduce((sum, ch) => sum + ch?.volume, 0))?.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Services</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {(sortedChannels?.reduce((sum, ch) => sum + ch?.satisfaction, 0) / sortedChannels?.length)?.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">Avg Satisfaction</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {(sortedChannels?.reduce((sum, ch) => sum + ch?.performance, 0) / sortedChannels?.length)?.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Performance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceChannelRankings;