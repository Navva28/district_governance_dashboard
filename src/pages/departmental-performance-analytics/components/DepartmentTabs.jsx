import React from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentTabs = ({ activeDepartment, onDepartmentChange }) => {
  const departments = [
    {
      id: 'health',
      name: 'Health',
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'education',
      name: 'Education',
      icon: 'GraduationCap',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'pwd',
      name: 'PWD',
      icon: 'Hammer',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'rural',
      name: 'Rural Development',
      icon: 'Sprout',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {departments?.map((dept) => (
        <button
          key={dept?.id}
          onClick={() => onDepartmentChange(dept?.id)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
            activeDepartment === dept?.id
              ? `${dept?.bgColor} ${dept?.borderColor} ${dept?.color} shadow-sm`
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Icon name={dept?.icon} size={20} />
          <span className="font-medium">{dept?.name}</span>
        </button>
      ))}
    </div>
  );
};

export default DepartmentTabs;