import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveTimeline = ({ onPeriodSelect, selectedPeriod }) => {
  const [timelineView, setTimelineView] = useState('monthly');

  const timelineData = {
    monthly: [
      { id: 'jan', label: 'Jan', value: 85, status: 'completed' },
      { id: 'feb', label: 'Feb', value: 87, status: 'completed' },
      { id: 'mar', label: 'Mar', value: 89, status: 'completed' },
      { id: 'apr', label: 'Apr', value: 86, status: 'completed' },
      { id: 'may', label: 'May', value: 91, status: 'completed' },
      { id: 'jun', label: 'Jun', value: 88, status: 'current' },
      { id: 'jul', label: 'Jul', value: null, status: 'upcoming' },
      { id: 'aug', label: 'Aug', value: null, status: 'upcoming' }
    ],
    quarterly: [
      { id: 'q1', label: 'Q1 2024', value: 87, status: 'completed' },
      { id: 'q2', label: 'Q2 2024', value: 88, status: 'current' },
      { id: 'q3', label: 'Q3 2024', value: null, status: 'upcoming' },
      { id: 'q4', label: 'Q4 2024', value: null, status: 'upcoming' }
    ],
    yearly: [
      { id: '2022', label: '2022', value: 82, status: 'completed' },
      { id: '2023', label: '2023', value: 85, status: 'completed' },
      { id: '2024', label: '2024', value: 88, status: 'current' },
      { id: '2025', label: '2025', value: null, status: 'upcoming' }
    ]
  };

  const currentData = timelineData?.[timelineView];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'current':
        return 'Clock';
      case 'upcoming':
        return 'Calendar';
      default:
        return 'Calendar';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Historical Analysis</h3>
          <p className="text-sm text-gray-600">Interactive timeline for period selection</p>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1 mt-4 sm:mt-0">
          {['monthly', 'quarterly', 'yearly']?.map((view) => (
            <button
              key={view}
              onClick={() => setTimelineView(view)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 capitalize ${
                timelineView === view
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200"></div>
        
        {/* Timeline Points */}
        <div className="flex justify-between items-start relative">
          {currentData?.map((period, index) => (
            <div key={period?.id} className="flex flex-col items-center group cursor-pointer" onClick={() => onPeriodSelect(period?.id)}>
              {/* Timeline Point */}
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all duration-200 group-hover:scale-110 ${
                getStatusColor(period?.status)
              } ${selectedPeriod === period?.id ? 'ring-2 ring-blue-300' : ''}`}>
              </div>
              
              {/* Period Label */}
              <div className="mt-3 text-center">
                <div className="text-sm font-medium text-gray-900 mb-1">{period?.label}</div>
                {period?.value && (
                  <div className="text-xs text-gray-600">{period?.value}%</div>
                )}
                <div className="flex items-center justify-center mt-1">
                  <Icon name={getStatusIcon(period?.status)} size={12} className="text-gray-400" />
                </div>
              </div>
              
              {/* Tooltip on Hover */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {period?.status === 'completed' && period?.value ? `Performance: ${period?.value}%` :
                 period?.status === 'current'? 'Current Period' : 'Upcoming Period'}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-600">Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;