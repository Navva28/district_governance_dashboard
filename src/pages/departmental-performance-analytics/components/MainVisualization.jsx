import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MainVisualization = ({ department, timeRange }) => {
  const [drillLevel, setDrillLevel] = useState('district');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const generateChartData = (dept, level) => {
    const baseData = {
      health: [
        { name: 'Jan', performance: 85, trend: 82, target: 90, budget: 78 },
        { name: 'Feb', performance: 87, trend: 84, target: 90, budget: 82 },
        { name: 'Mar', performance: 89, trend: 86, target: 90, budget: 85 },
        { name: 'Apr', performance: 86, trend: 88, target: 90, budget: 87 },
        { name: 'May', performance: 91, trend: 89, target: 90, budget: 89 },
        { name: 'Jun', performance: 88, trend: 90, target: 90, budget: 91 }
      ],
      education: [
        { name: 'Jan', performance: 82, trend: 80, target: 85, budget: 75 },
        { name: 'Feb', performance: 84, trend: 82, target: 85, budget: 78 },
        { name: 'Mar', performance: 86, trend: 84, target: 85, budget: 82 },
        { name: 'Apr', performance: 83, trend: 85, target: 85, budget: 85 },
        { name: 'May', performance: 88, trend: 86, target: 85, budget: 88 },
        { name: 'Jun', performance: 85, trend: 87, target: 85, budget: 90 }
      ],
      pwd: [
        { name: 'Jan', performance: 68, trend: 65, target: 75, budget: 70 },
        { name: 'Feb', performance: 72, trend: 68, target: 75, budget: 74 },
        { name: 'Mar', performance: 75, trend: 71, target: 75, budget: 78 },
        { name: 'Apr', performance: 71, trend: 74, target: 75, budget: 82 },
        { name: 'May', performance: 78, trend: 76, target: 75, budget: 85 },
        { name: 'Jun', performance: 74, trend: 77, target: 75, budget: 88 }
      ],
      rural: [
        { name: 'Jan', performance: 89, trend: 86, target: 95, budget: 82 },
        { name: 'Feb', performance: 91, trend: 88, target: 95, budget: 85 },
        { name: 'Mar', performance: 93, trend: 90, target: 95, budget: 88 },
        { name: 'Apr', performance: 90, trend: 92, target: 95, budget: 91 },
        { name: 'May', performance: 95, trend: 93, target: 95, budget: 94 },
        { name: 'Jun', performance: 92, trend: 94, target: 95, budget: 96 }
      ]
    };

    return baseData?.[dept] || baseData?.health;
  };

  const chartData = generateChartData(department, drillLevel);

  const drillLevels = [
    { id: 'district', label: 'District Level', icon: 'MapPin' },
    { id: 'subdistrict', label: 'Sub-District', icon: 'Map' },
    { id: 'facility', label: 'Facility Level', icon: 'Building' }
  ];

  const periods = [
    { id: 'current', label: 'Current Period' },
    { id: 'previous', label: 'Previous Period' },
    { id: 'yearago', label: 'Year Ago' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Performance Trends</h3>
          <p className="text-sm text-gray-600">Multi-metric analysis with drill-down capability</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {drillLevels?.map((level) => (
              <button
                key={level?.id}
                onClick={() => setDrillLevel(level?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  drillLevel === level?.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name={level?.icon} size={16} />
                <span className="hidden sm:inline">{level?.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            {periods?.map((period) => (
              <button
                key={period?.id}
                onClick={() => setSelectedPeriod(period?.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  selectedPeriod === period?.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="performance" 
              fill="#3b82f6" 
              name="Performance %" 
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="budget" 
              fill="#10b981" 
              name="Budget Utilization %" 
              radius={[2, 2, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="trend" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="Trend Line"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3 sm:mb-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Budget</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-yellow-500 rounded"></div>
            <span>Trend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-red-500 rounded border-dashed border border-red-500"></div>
            <span>Target</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="ZoomIn">
            Drill Down
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export Chart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainVisualization;