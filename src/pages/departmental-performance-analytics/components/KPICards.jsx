import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = ({ department, data }) => {
  const getDepartmentKPIs = (dept) => {
    const kpiData = {
      health: [
        {
          title: 'Patient Satisfaction',
          value: '87.5%',
          change: '+2.3%',
          trend: 'up',
          target: '90%',
          icon: 'Heart',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        },
        {
          title: 'Bed Occupancy Rate',
          value: '78.2%',
          change: '-1.5%',
          trend: 'down',
          target: '80%',
          icon: 'Bed',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        },
        {
          title: 'Vaccination Coverage',
          value: '94.8%',
          change: '+3.2%',
          trend: 'up',
          target: '95%',
          icon: 'Syringe',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        },
        {
          title: 'Emergency Response',
          value: '12.5 min',
          change: '-2.1 min',
          trend: 'up',
          target: '10 min',
          icon: 'Ambulance',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        },
        {
          title: 'Staff Productivity',
          value: '85.3%',
          change: '+1.8%',
          trend: 'up',
          target: '88%',
          icon: 'Users',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        },
        {
          title: 'Budget Utilization',
          value: '76.4%',
          change: '+4.2%',
          trend: 'up',
          target: '85%',
          icon: 'DollarSign',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        }
      ],
      education: [
        {
          title: 'Student Enrollment',
          value: '96.7%',
          change: '+1.2%',
          trend: 'up',
          target: '98%',
          icon: 'GraduationCap',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Teacher Attendance',
          value: '89.3%',
          change: '+2.1%',
          trend: 'up',
          target: '92%',
          icon: 'UserCheck',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Pass Rate',
          value: '82.5%',
          change: '+3.8%',
          trend: 'up',
          target: '85%',
          icon: 'Award',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Infrastructure Score',
          value: '7.8/10',
          change: '+0.3',
          trend: 'up',
          target: '8.5/10',
          icon: 'Building',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Digital Adoption',
          value: '73.2%',
          change: '+5.4%',
          trend: 'up',
          target: '80%',
          icon: 'Laptop',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Budget Efficiency',
          value: '91.7%',
          change: '+2.3%',
          trend: 'up',
          target: '95%',
          icon: 'TrendingUp',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        }
      ],
      pwd: [
        {
          title: 'Project Completion',
          value: '68.4%',
          change: '+4.7%',
          trend: 'up',
          target: '75%',
          icon: 'CheckCircle',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        },
        {
          title: 'Road Quality Index',
          value: '7.2/10',
          change: '+0.5',
          trend: 'up',
          target: '8.0/10',
          icon: 'Road',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        },
        {
          title: 'Budget Utilization',
          value: '84.6%',
          change: '+6.2%',
          trend: 'up',
          target: '90%',
          icon: 'DollarSign',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        },
        {
          title: 'Safety Compliance',
          value: '92.8%',
          change: '+1.4%',
          trend: 'up',
          target: '95%',
          icon: 'Shield',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        },
        {
          title: 'Equipment Efficiency',
          value: '76.3%',
          change: '-2.1%',
          trend: 'down',
          target: '80%',
          icon: 'Wrench',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        },
        {
          title: 'Contractor Performance',
          value: '81.5%',
          change: '+3.2%',
          trend: 'up',
          target: '85%',
          icon: 'HardHat',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        }
      ],
      rural: [
        {
          title: 'Scheme Coverage',
          value: '89.7%',
          change: '+2.8%',
          trend: 'up',
          target: '95%',
          icon: 'Users',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          title: 'Employment Generation',
          value: '156,432',
          change: '+12.3%',
          trend: 'up',
          target: '180,000',
          icon: 'Briefcase',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          title: 'Water Access',
          value: '94.2%',
          change: '+1.7%',
          trend: 'up',
          target: '98%',
          icon: 'Droplets',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          title: 'Digital Connectivity',
          value: '78.9%',
          change: '+8.4%',
          trend: 'up',
          target: '85%',
          icon: 'Wifi',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          title: 'Agricultural Productivity',
          value: '₹42,580/ha',
          change: '+7.2%',
          trend: 'up',
          target: '₹45,000/ha',
          icon: 'Wheat',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          title: 'Livelihood Programs',
          value: '83.6%',
          change: '+4.1%',
          trend: 'up',
          target: '90%',
          icon: 'TrendingUp',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        }
      ]
    };

    return kpiData?.[dept] || kpiData?.health;
  };

  const kpis = getDepartmentKPIs(department);

  const getTargetProgress = (value, target) => {
    const numValue = parseFloat(value?.replace(/[^\d.]/g, ''));
    const numTarget = parseFloat(target?.replace(/[^\d.]/g, ''));
    return Math.min((numValue / numTarget) * 100, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpis?.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${kpi?.bgColor}`}>
              <Icon name={kpi?.icon} size={20} className={kpi?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              kpi?.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon name={kpi?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span className="font-medium">{kpi?.change}</span>
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi?.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{kpi?.value}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Target: {kpi?.target}</span>
              <span>{Math.round(getTargetProgress(kpi?.value, kpi?.target))}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  getTargetProgress(kpi?.value, kpi?.target) >= 90 ? 'bg-green-500' :
                  getTargetProgress(kpi?.value, kpi?.target) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${getTargetProgress(kpi?.value, kpi?.target)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;