import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ServiceDeliveryFunnel = () => {
  const [selectedService, setSelectedService] = useState('all');
  const [viewType, setViewType] = useState('funnel');

  const funnelData = [
    { name: 'Applications Received', value: 12450, color: '#3b82f6', percentage: 100 },
    { name: 'Initial Verification', value: 11890, color: '#059669', percentage: 95.5 },
    { name: 'Document Review', value: 10980, color: '#ea580c', percentage: 88.2 },
    { name: 'Approval Process', value: 9850, color: '#dc2626', percentage: 79.1 },
    { name: 'Service Delivered', value: 9320, color: '#10b981', percentage: 74.9 }
  ];

  const bottleneckData = [
    { stage: 'Application', avgTime: 0.5, bottleneck: 'None', severity: 'low' },
    { stage: 'Verification', avgTime: 2.3, bottleneck: 'Document Quality', severity: 'medium' },
    { stage: 'Review', avgTime: 4.8, bottleneck: 'Staff Shortage', severity: 'high' },
    { stage: 'Approval', avgTime: 3.2, bottleneck: 'System Delays', severity: 'medium' },
    { stage: 'Delivery', avgTime: 1.1, bottleneck: 'None', severity: 'low' }
  ];

  const serviceTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'certificates', label: 'Certificates' },
    { value: 'licenses', label: 'Licenses' },
    { value: 'permits', label: 'Permits' },
    { value: 'welfare', label: 'Welfare Schemes' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Applications: {payload?.[0]?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Conversion: {((payload?.[0]?.value / funnelData?.[0]?.value) * 100)?.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Service Delivery Funnel</h3>
          <p className="text-sm text-muted-foreground">Citizen journey from application to completion</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {serviceTypes?.map(type => (
              <option key={type?.value} value={type?.value}>{type?.label}</option>
            ))}
          </select>
          <div className="flex bg-muted rounded-md p-1">
            <button
              onClick={() => setViewType('funnel')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewType === 'funnel' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Funnel
            </button>
            <button
              onClick={() => setViewType('bar')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewType === 'bar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Visualization */}
        <div className="lg:col-span-2">
          <div className="h-80">
            {viewType === 'funnel' ? (
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive={true}
                  >
                    {funnelData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bottleneck Analysis */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Bottleneck Analysis</h4>
          <div className="space-y-3">
            {bottleneckData?.map((item, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item?.stage}</span>
                  <span className="text-xs text-muted-foreground">{item?.avgTime} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item?.bottleneck}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item?.severity)}`}>
                    {item?.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Key Insights</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Document Review stage has highest drop-off</li>
              <li>• Staff shortage causing 4.8 day delays</li>
              <li>• 74.9% overall completion rate</li>
              <li>• System optimization needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDeliveryFunnel;