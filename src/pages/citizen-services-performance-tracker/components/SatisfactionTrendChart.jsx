import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const SatisfactionTrendChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');

  const satisfactionData = [
    { date: '01 Aug', overall: 4.2, certificates: 4.5, licenses: 3.8, permits: 4.1, welfare: 4.3 },
    { date: '02 Aug', overall: 4.3, certificates: 4.6, licenses: 3.9, permits: 4.2, welfare: 4.4 },
    { date: '03 Aug', overall: 4.1, certificates: 4.4, licenses: 3.7, permits: 4.0, welfare: 4.2 },
    { date: '04 Aug', overall: 4.4, certificates: 4.7, licenses: 4.0, permits: 4.3, welfare: 4.5 },
    { date: '05 Aug', overall: 4.2, certificates: 4.5, licenses: 3.8, permits: 4.1, welfare: 4.3 },
    { date: '06 Aug', overall: 4.5, certificates: 4.8, licenses: 4.1, permits: 4.4, welfare: 4.6 },
    { date: 'Today', overall: 4.3, certificates: 4.6, licenses: 3.9, permits: 4.2, welfare: 4.4 }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const serviceCategories = [
    { key: 'overall', label: 'Overall', color: '#3b82f6', visible: true },
    { key: 'certificates', label: 'Certificates', color: '#10b981', visible: true },
    { key: 'licenses', label: 'Licenses', color: '#f59e0b', visible: true },
    { key: 'permits', label: 'Permits', color: '#ef4444', visible: false },
    { key: 'welfare', label: 'Welfare', color: '#8b5cf6', visible: false }
  ];

  const [visibleCategories, setVisibleCategories] = useState(
    serviceCategories?.reduce((acc, cat) => ({ ...acc, [cat?.key]: cat?.visible }), {})
  );

  const toggleCategory = (categoryKey) => {
    setVisibleCategories(prev => ({
      ...prev,
      [categoryKey]: !prev?.[categoryKey]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-muted-foreground">{entry?.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {entry?.value?.toFixed(1)}/5.0
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getAverageRating = () => {
    const visibleData = satisfactionData?.[satisfactionData?.length - 1];
    const visibleKeys = Object.keys(visibleCategories)?.filter(key => visibleCategories?.[key]);
    if (visibleKeys?.length === 0) return 0;
    
    const sum = visibleKeys?.reduce((acc, key) => acc + visibleData?.[key], 0);
    return (sum / visibleKeys?.length)?.toFixed(1);
  };

  const getRatingTrend = () => {
    const current = parseFloat(getAverageRating());
    const previous = 4.1; // Mock previous period average
    const change = current - previous;
    return { change: change?.toFixed(1), isPositive: change >= 0 };
  };

  const trend = getRatingTrend();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Citizen Satisfaction Trends</h3>
          <p className="text-sm text-muted-foreground">Service quality ratings over time</p>
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
          <div className="flex bg-muted rounded-md p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                chartType === 'line' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                chartType === 'area' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Area
            </button>
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Star" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Average Rating</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">{getAverageRating()}</span>
            <span className="text-sm text-muted-foreground">/5.0</span>
          </div>
        </div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name={trend?.isPositive ? "TrendingUp" : "TrendingDown"} size={16} 
                  className={trend?.isPositive ? "text-success" : "text-error"} />
            <span className="text-sm font-medium text-foreground">Trend</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-bold ${trend?.isPositive ? "text-success" : "text-error"}`}>
              {trend?.isPositive ? '+' : ''}{trend?.change}
            </span>
            <span className="text-sm text-muted-foreground">vs prev period</span>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={satisfactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="var(--color-muted-foreground)"
              />
              <YAxis 
                domain={[3, 5]} 
                tick={{ fontSize: 12 }}
                stroke="var(--color-muted-foreground)"
              />
              <Tooltip content={<CustomTooltip />} />
              {serviceCategories?.map(category => (
                visibleCategories?.[category?.key] && (
                  <Line
                    key={category?.key}
                    type="monotone"
                    dataKey={category?.key}
                    stroke={category?.color}
                    strokeWidth={2}
                    dot={{ fill: category?.color, strokeWidth: 2, r: 4 }}
                    name={category?.label}
                  />
                )
              ))}
            </LineChart>
          ) : (
            <AreaChart data={satisfactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="var(--color-muted-foreground)"
              />
              <YAxis 
                domain={[3, 5]} 
                tick={{ fontSize: 12 }}
                stroke="var(--color-muted-foreground)"
              />
              <Tooltip content={<CustomTooltip />} />
              {serviceCategories?.map(category => (
                visibleCategories?.[category?.key] && (
                  <Area
                    key={category?.key}
                    type="monotone"
                    dataKey={category?.key}
                    stroke={category?.color}
                    fill={category?.color}
                    fillOpacity={0.3}
                    name={category?.label}
                  />
                )
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {serviceCategories?.map(category => (
          <button
            key={category?.key}
            onClick={() => toggleCategory(category?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              visibleCategories?.[category?.key]
                ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: category?.color }}
            />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SatisfactionTrendChart;