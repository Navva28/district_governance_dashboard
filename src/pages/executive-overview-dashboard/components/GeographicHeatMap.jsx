import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicHeatMap = ({ subDistrictData, onSubDistrictClick }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [hoveredSubDistrict, setHoveredSubDistrict] = useState(null);

  const metrics = [
    { key: 'overall', label: 'Overall Performance', unit: '%' },
    { key: 'budget', label: 'Budget Utilization', unit: '%' },
    { key: 'services', label: 'Service Delivery', unit: '%' },
    { key: 'projects', label: 'Project Completion', unit: '%' }
  ];

  const getPerformanceColor = (value) => {
    if (value >= 85) return 'bg-success text-success-foreground';
    if (value >= 70) return 'bg-warning text-warning-foreground';
    if (value >= 50) return 'bg-orange-500 text-white';
    return 'bg-error text-error-foreground';
  };

  const getPerformanceLevel = (value) => {
    if (value >= 85) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 50) return 'Needs Improvement';
    return 'Critical';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Sub-District Performance Heat Map</h2>
          <p className="text-sm text-muted-foreground">Click on areas to filter detailed analytics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {metrics?.map((metric) => (
              <option key={metric?.key} value={metric?.key}>
                {metric?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mb-6 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success rounded-sm" />
          <span className="text-xs text-muted-foreground">85%+ Excellent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-warning rounded-sm" />
          <span className="text-xs text-muted-foreground">70-84% Good</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded-sm" />
          <span className="text-xs text-muted-foreground">50-69% Needs Improvement</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-error rounded-sm" />
          <span className="text-xs text-muted-foreground">&lt;50% Critical</span>
        </div>
      </div>
      {/* Heat Map Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {subDistrictData?.map((subDistrict) => {
          const metricValue = subDistrict?.metrics?.[selectedMetric];
          const selectedMetricInfo = metrics?.find(m => m?.key === selectedMetric);
          
          return (
            <div
              key={subDistrict?.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                getPerformanceColor(metricValue)
              } ${hoveredSubDistrict === subDistrict?.id ? 'ring-2 ring-primary' : 'border-transparent'}`}
              onClick={() => onSubDistrictClick && onSubDistrictClick(subDistrict)}
              onMouseEnter={() => setHoveredSubDistrict(subDistrict?.id)}
              onMouseLeave={() => setHoveredSubDistrict(null)}
            >
              <div className="text-center">
                <h3 className="text-sm font-semibold mb-1 truncate">{subDistrict?.name}</h3>
                <div className="text-2xl font-bold mb-1">
                  {metricValue}{selectedMetricInfo?.unit}
                </div>
                <div className="text-xs opacity-90">
                  {getPerformanceLevel(metricValue)}
                </div>
                <div className="mt-2 flex items-center justify-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span className="text-xs">{subDistrict?.population} pop.</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Total Sub-Districts</div>
          <div className="text-xl font-bold text-foreground">{subDistrictData?.length}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Excellent Performance</div>
          <div className="text-xl font-bold text-success">
            {subDistrictData?.filter(sd => sd?.metrics?.[selectedMetric] >= 85)?.length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Need Attention</div>
          <div className="text-xl font-bold text-warning">
            {subDistrictData?.filter(sd => sd?.metrics?.[selectedMetric] < 70)?.length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Average Score</div>
          <div className="text-xl font-bold text-foreground">
            {Math.round(subDistrictData?.reduce((acc, sd) => acc + sd?.metrics?.[selectedMetric], 0) / subDistrictData?.length)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;