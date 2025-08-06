import React from 'react';
import Icon from '../../../components/AppIcon';

const RightPanel = ({ department }) => {
  const getDepartmentData = (dept) => {
    const data = {
      health: {
        goals: [
          { title: 'Patient Satisfaction', current: 87.5, target: 90, color: 'bg-red-500' },
          { title: 'Bed Occupancy', current: 78.2, target: 80, color: 'bg-red-400' },
          { title: 'Vaccination Coverage', current: 94.8, target: 95, color: 'bg-red-600' },
          { title: 'Emergency Response', current: 85, target: 90, color: 'bg-red-300' }
        ],
        resources: [
          { name: 'Medical Staff', value: 35, color: '#ef4444' },
          { name: 'Equipment', value: 25, color: '#f87171' },
          { name: 'Infrastructure', value: 20, color: '#fca5a5' },
          { name: 'Medicines', value: 20, color: '#fecaca' }
        ],
        staff: [
          { name: 'Dr. Rajesh Kumar', role: 'Chief Medical Officer', score: 94, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Dr. Priya Sharma', role: 'Senior Physician', score: 91, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'Nurse Anita Singh', role: 'Head Nurse', score: 88, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
          { name: 'Dr. Amit Patel', role: 'Pediatrician', score: 86, avatar: 'https://randomuser.me/api/portraits/men/56.jpg' }
        ]
      },
      education: {
        goals: [
          { title: 'Student Enrollment', current: 96.7, target: 98, color: 'bg-blue-500' },
          { title: 'Teacher Attendance', current: 89.3, target: 92, color: 'bg-blue-400' },
          { title: 'Pass Rate', current: 82.5, target: 85, color: 'bg-blue-600' },
          { title: 'Infrastructure Score', current: 78, target: 85, color: 'bg-blue-300' }
        ],
        resources: [
          { name: 'Teaching Staff', value: 40, color: '#3b82f6' },
          { name: 'Infrastructure', value: 30, color: '#60a5fa' },
          { name: 'Learning Materials', value: 20, color: '#93c5fd' },
          { name: 'Technology', value: 10, color: '#dbeafe' }
        ],
        staff: [
          { name: 'Prof. Meera Gupta', role: 'District Education Officer', score: 96, avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
          { name: 'Mr. Suresh Yadav', role: 'Principal', score: 92, avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
          { name: 'Ms. Kavita Joshi', role: 'Senior Teacher', score: 89, avatar: 'https://randomuser.me/api/portraits/women/56.jpg' },
          { name: 'Mr. Ravi Kumar', role: 'Academic Coordinator', score: 87, avatar: 'https://randomuser.me/api/portraits/men/68.jpg' }
        ]
      },
      pwd: {
        goals: [
          { title: 'Project Completion', current: 68.4, target: 75, color: 'bg-orange-500' },
          { title: 'Road Quality', current: 72, target: 80, color: 'bg-orange-400' },
          { title: 'Budget Utilization', current: 84.6, target: 90, color: 'bg-orange-600' },
          { title: 'Safety Compliance', current: 92.8, target: 95, color: 'bg-orange-300' }
        ],
        resources: [
          { name: 'Equipment', value: 35, color: '#f97316' },
          { name: 'Materials', value: 30, color: '#fb923c' },
          { name: 'Labor', value: 25, color: '#fdba74' },
          { name: 'Maintenance', value: 10, color: '#fed7aa' }
        ],
        staff: [
          { name: 'Eng. Vikram Singh', role: 'Executive Engineer', score: 93, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Eng. Sunita Devi', role: 'Assistant Engineer', score: 90, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'Mr. Ramesh Chand', role: 'Site Supervisor', score: 87, avatar: 'https://randomuser.me/api/portraits/men/56.jpg' },
          { name: 'Eng. Pooja Malik', role: 'Quality Inspector', score: 85, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
        ]
      },
      rural: {
        goals: [
          { title: 'Scheme Coverage', current: 89.7, target: 95, color: 'bg-green-500' },
          { title: 'Employment Generation', current: 87, target: 90, color: 'bg-green-400' },
          { title: 'Water Access', current: 94.2, target: 98, color: 'bg-green-600' },
          { title: 'Digital Connectivity', current: 78.9, target: 85, color: 'bg-green-300' }
        ],
        resources: [
          { name: 'Human Resources', value: 30, color: '#10b981' },
          { name: 'Infrastructure', value: 25, color: '#34d399' },
          { name: 'Technology', value: 25, color: '#6ee7b7' },
          { name: 'Training', value: 20, color: '#a7f3d0' }
        ],
        staff: [
          { name: 'Mr. Ashok Verma', role: 'Block Development Officer', score: 95, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Ms. Rekha Sharma', role: 'Program Coordinator', score: 92, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'Mr. Dinesh Kumar', role: 'Field Officer', score: 89, avatar: 'https://randomuser.me/api/portraits/men/56.jpg' },
          { name: 'Ms. Sita Devi', role: 'Community Mobilizer', score: 86, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
        ]
      }
    };

    return data?.[dept] || data?.health;
  };

  const departmentData = getDepartmentData(department);

  return (
    <div className="space-y-6">
      {/* Goal Tracking */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Goal Tracking</h3>
          <Icon name="Target" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {departmentData?.goals?.map((goal, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{goal?.title}</span>
                <span className="text-sm text-gray-600">{goal?.current}% / {goal?.target}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${goal?.color}`}
                  style={{ width: `${(goal?.current / goal?.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Resource Allocation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Resource Allocation</h3>
          <Icon name="PieChart" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {departmentData?.resources?.map((resource, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: resource?.color }}
                />
                <span className="text-sm font-medium text-gray-700">{resource?.name}</span>
              </div>
              <span className="text-sm text-gray-600">{resource?.value}%</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border-8 border-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Staff Productivity Rankings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Staff Rankings</h3>
          <Icon name="Users" size={20} className="text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {departmentData?.staff?.map((staff, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img 
                  src={staff?.avatar} 
                  alt={staff?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{staff?.name}</p>
                <p className="text-xs text-gray-500 truncate">{staff?.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  staff?.score >= 90 ? 'bg-green-500' :
                  staff?.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-sm font-medium text-gray-900">{staff?.score}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-primary hover:text-primary-dark font-medium">
            View All Staff →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;