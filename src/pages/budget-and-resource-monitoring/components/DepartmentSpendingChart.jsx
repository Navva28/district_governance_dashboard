import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DepartmentSpendingChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-success">
            Budget: ₹{data?.budget?.toLocaleString('en-IN')} Cr
          </p>
          <p className="text-sm text-primary">
            Actual: ₹{data?.actual?.toLocaleString('en-IN')} Cr
          </p>
          <p className="text-sm text-muted-foreground">
            Variance: {data?.variance > 0 ? '+' : ''}{data?.variance}%
          </p>
        </div>
      );
    }
    return null;
  };

  const getVarianceColor = (variance) => {
    if (variance > 10) return '#dc2626';
    if (variance < -10) return '#ea580c';
    return '#10b981';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success/70 rounded-sm" />
            <span className="text-muted-foreground">Budget</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span className="text-muted-foreground">Actual</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="department" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(value) => `₹${value}Cr`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="budget" fill="#10b981" opacity={0.7} radius={[2, 2, 0, 0]} />
            <Bar dataKey="actual" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-success">
            ₹{data?.reduce((acc, d) => acc + d?.budget, 0)?.toLocaleString('en-IN')} Cr
          </div>
          <div className="text-xs text-muted-foreground">Total Budget</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-primary">
            ₹{data?.reduce((acc, d) => acc + d?.actual, 0)?.toLocaleString('en-IN')} Cr
          </div>
          <div className="text-xs text-muted-foreground">Total Spent</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-muted-foreground">
            {Math.round((data?.reduce((acc, d) => acc + d?.actual, 0) / data?.reduce((acc, d) => acc + d?.budget, 0)) * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Utilization</div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSpendingChart;