import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicHeatMap = () => {
  const [selectedMetric, setSelectedMetric] = useState('satisfaction');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [zoomLevel, setZoomLevel] = useState('district');

  const districtData = [
    {
      id: 'north',
      name: 'North Zone',
      satisfaction: 4.2,
      deliveryTime: 3.5,
      grievanceRate: 12,
      digitalAdoption: 78,
      facilities: 45,
      population: 285000,
      coordinates: { x: 150, y: 80 }
    },
    {
      id: 'south',
      name: 'South Zone',
      satisfaction: 3.8,
      deliveryTime: 4.8,
      grievanceRate: 18,
      digitalAdoption: 65,
      facilities: 38,
      population: 320000,
      coordinates: { x: 180, y: 200 }
    },
    {
      id: 'east',
      name: 'East Zone',
      satisfaction: 4.5,
      deliveryTime: 2.9,
      grievanceRate: 8,
      digitalAdoption: 85,
      facilities: 52,
      population: 195000,
      coordinates: { x: 280, y: 140 }
    },
    {
      id: 'west',
      name: 'West Zone',
      satisfaction: 3.9,
      deliveryTime: 4.2,
      grievanceRate: 15,
      digitalAdoption: 72,
      facilities: 41,
      population: 240000,
      coordinates: { x: 80, y: 160 }
    },
    {
      id: 'central',
      name: 'Central Zone',
      satisfaction: 4.1,
      deliveryTime: 3.8,
      grievanceRate: 14,
      digitalAdoption: 80,
      facilities: 48,
      population: 275000,
      coordinates: { x: 180, y: 140 }
    }
  ];

  const metrics = [
    { value: 'satisfaction', label: 'Satisfaction Score', unit: '/5.0', color: 'blue' },
    { value: 'deliveryTime', label: 'Delivery Time', unit: ' days', color: 'orange' },
    { value: 'grievanceRate', label: 'Grievance Rate', unit: '%', color: 'red' },
    { value: 'digitalAdoption', label: 'Digital Adoption', unit: '%', color: 'green' }
  ];

  const getMetricValue = (region, metric) => {
    return region?.[metric];
  };

  const getMetricColor = (value, metric) => {
    let intensity;
    switch (metric) {
      case 'satisfaction':
        intensity = (value - 3) / 2; // Scale 3-5 to 0-1
        break;
      case 'deliveryTime':
        intensity = 1 - ((value - 2) / 4); // Scale 2-6 to 1-0 (lower is better)
        break;
      case 'grievanceRate':
        intensity = 1 - (value / 25); // Scale 0-25 to 1-0 (lower is better)
        break;
      case 'digitalAdoption':
        intensity = value / 100; // Scale 0-100 to 0-1
        break;
      default:
        intensity = 0.5;
    }
    
    intensity = Math.max(0, Math.min(1, intensity));
    
    const colors = {
      blue: `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`,
      orange: `rgba(234, 88, 12, ${0.3 + intensity * 0.7})`,
      red: `rgba(220, 38, 38, ${0.3 + intensity * 0.7})`,
      green: `rgba(16, 185, 129, ${0.3 + intensity * 0.7})`
    };
    
    const selectedMetricConfig = metrics?.find(m => m?.value === metric);
    return colors?.[selectedMetricConfig?.color || 'blue'];
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(selectedRegion?.id === region?.id ? null : region);
  };

  const getDistrictAverage = (metric) => {
    const sum = districtData?.reduce((acc, region) => acc + region?.[metric], 0);
    return (sum / districtData?.length)?.toFixed(metric === 'satisfaction' ? 1 : 0);
  };

  const getBestPerformingRegion = (metric) => {
    if (metric === 'deliveryTime' || metric === 'grievanceRate') {
      return districtData?.reduce((best, current) => 
        current?.[metric] < best?.[metric] ? current : best
      );
    } else {
      return districtData?.reduce((best, current) => 
        current?.[metric] > best?.[metric] ? current : best
      );
    }
  };

  const selectedMetricConfig = metrics?.find(m => m?.value === selectedMetric);
  const bestRegion = getBestPerformingRegion(selectedMetric);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Geographic Service Quality Map</h3>
          <p className="text-sm text-muted-foreground">District-wide performance visualization</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metrics?.map(metric => (
              <option key={metric?.value} value={metric?.value}>{metric?.label}</option>
            ))}
          </select>
          <button
            onClick={() => setZoomLevel(zoomLevel === 'district' ? 'zone' : 'district')}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name={zoomLevel === 'district' ? 'ZoomIn' : 'ZoomOut'} size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-muted/30 rounded-lg p-4" style={{ height: '400px' }}>
            <svg width="100%" height="100%" viewBox="0 0 360 280" className="border border-border rounded">
              {/* District Boundaries */}
              <rect x="10" y="10" width="340" height="260" fill="none" stroke="var(--color-border)" strokeWidth="2" />
              
              {/* Zone Regions */}
              {districtData?.map((region) => (
                <g key={region?.id}>
                  <circle
                    cx={region?.coordinates?.x}
                    cy={region?.coordinates?.y}
                    r={Math.sqrt(region?.population / 1000)}
                    fill={getMetricColor(getMetricValue(region, selectedMetric), selectedMetric)}
                    stroke={selectedRegion?.id === region?.id ? 'var(--color-primary)' : 'var(--color-border)'}
                    strokeWidth={selectedRegion?.id === region?.id ? 3 : 1}
                    className="cursor-pointer hover:stroke-primary transition-all duration-200"
                    onClick={() => handleRegionClick(region)}
                  />
                  <text
                    x={region?.coordinates?.x}
                    y={region?.coordinates?.y + 5}
                    textAnchor="middle"
                    className="text-xs font-medium fill-foreground pointer-events-none"
                  >
                    {region?.name?.split(' ')?.[0]}
                  </text>
                  <text
                    x={region?.coordinates?.x}
                    y={region?.coordinates?.y - 15}
                    textAnchor="middle"
                    className="text-xs font-bold fill-foreground pointer-events-none"
                  >
                    {getMetricValue(region, selectedMetric)}{selectedMetricConfig?.unit}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3">
              <h4 className="text-xs font-semibold text-foreground mb-2">
                {selectedMetricConfig?.label}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-4 h-4 rounded" style={{ 
                  background: `linear-gradient(to right, ${getMetricColor(0, selectedMetric)}, ${getMetricColor(5, selectedMetric)})` 
                }} />
                <span>Low → High</span>
              </div>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute top-4 right-4 bg-card border border-border rounded-lg px-3 py-1">
              <span className="text-xs font-medium text-foreground capitalize">{zoomLevel} View</span>
            </div>
          </div>
        </div>

        {/* Region Details Panel */}
        <div className="space-y-4">
          {selectedRegion ? (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{selectedRegion?.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Population: {selectedRegion?.population?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {metrics?.map(metric => (
                  <div key={metric?.value} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{metric?.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {getMetricValue(selectedRegion, metric?.value)}{metric?.unit}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Service Facilities</span>
                  <span className="text-sm font-medium text-foreground">{selectedRegion?.facilities}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <Icon name="MousePointer" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click on a region to view details</p>
            </div>
          )}

          {/* District Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">District Summary</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Average {selectedMetricConfig?.label}</span>
                <span className="text-sm font-medium text-foreground">
                  {getDistrictAverage(selectedMetric)}{selectedMetricConfig?.unit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Best Performing</span>
                <span className="text-sm font-medium text-success">{bestRegion?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Facilities</span>
                <span className="text-sm font-medium text-foreground">
                  {districtData?.reduce((sum, region) => sum + region?.facilities, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              <Icon name="Download" size={16} />
              <span>Export Map Data</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-muted text-muted-foreground rounded-md text-sm font-medium hover:bg-muted/80 transition-colors">
              <Icon name="Share" size={16} />
              <span>Share Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;