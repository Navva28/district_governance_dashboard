import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DepartmentalChart = ({ data, onDepartmentClick }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">{entry?.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    if (onDepartmentClick) {
      onDepartmentClick(data?.department);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Departmental Performance Comparison</h2>
          <p className="text-sm text-muted-foreground">Click on bars to drill down to department details</p>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span className="text-muted-foreground">Performance Score</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-sm" />
            <span className="text-muted-foreground">Budget Utilization</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-sm" />
            <span className="text-muted-foreground">Project Completion</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="department" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="performance" 
              name="Performance Score"
              fill="#1e40af" 
              radius={[2, 2, 0, 0]}
              onClick={handleBarClick}
              style={{ cursor: 'pointer' }}
            />
            <Bar 
              dataKey="budgetUtilization" 
              name="Budget Utilization"
              fill="#10b981" 
              radius={[2, 2, 0, 0]}
              onClick={handleBarClick}
              style={{ cursor: 'pointer' }}
            />
            <Bar 
              dataKey="projectCompletion" 
              name="Project Completion"
              fill="#ea580c" 
              radius={[2, 2, 0, 0]}
              onClick={handleBarClick}
              style={{ cursor: 'pointer' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentalChart;