import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataTable = ({ department }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getDepartmentProjects = (dept) => {
    const projects = {
      health: [
        {
          id: 'H001',
          name: 'Primary Health Center Upgrade',
          status: 'In Progress',
          progress: 75,
          budget: '₹2,50,00,000',
          spent: '₹1,87,50,000',
          deadline: '2024-09-15',
          manager: 'Dr. Rajesh Kumar',
          priority: 'High'
        },
        {
          id: 'H002',
          name: 'Vaccination Drive Campaign',
          status: 'Completed',
          progress: 100,
          budget: '₹75,00,000',
          spent: '₹72,50,000',
          deadline: '2024-06-30',
          manager: 'Dr. Priya Sharma',
          priority: 'Medium'
        },
        {
          id: 'H003',
          name: 'Telemedicine Infrastructure',
          status: 'Planning',
          progress: 25,
          budget: '₹1,20,00,000',
          spent: '₹30,00,000',
          deadline: '2024-12-31',
          manager: 'Dr. Amit Patel',
          priority: 'High'
        },
        {
          id: 'H004',
          name: 'Ambulance Service Expansion',
          status: 'In Progress',
          progress: 60,
          budget: '₹80,00,000',
          spent: '₹48,00,000',
          deadline: '2024-08-20',
          manager: 'Nurse Anita Singh',
          priority: 'Medium'
        },
        {
          id: 'H005',
          name: 'Medical Equipment Procurement',
          status: 'Delayed',
          progress: 40,
          budget: '₹3,00,00,000',
          spent: '₹1,20,00,000',
          deadline: '2024-07-15',
          manager: 'Dr. Rajesh Kumar',
          priority: 'High'
        }
      ],
      education: [
        {
          id: 'E001',
          name: 'Digital Classroom Initiative',
          status: 'In Progress',
          progress: 80,
          budget: '₹1,50,00,000',
          spent: '₹1,20,00,000',
          deadline: '2024-08-31',
          manager: 'Prof. Meera Gupta',
          priority: 'High'
        },
        {
          id: 'E002',
          name: 'Teacher Training Program',
          status: 'Completed',
          progress: 100,
          budget: '₹45,00,000',
          spent: '₹43,50,000',
          deadline: '2024-05-30',
          manager: 'Mr. Suresh Yadav',
          priority: 'Medium'
        },
        {
          id: 'E003',
          name: 'School Infrastructure Repair',
          status: 'In Progress',
          progress: 65,
          budget: '₹2,00,00,000',
          spent: '₹1,30,00,000',
          deadline: '2024-10-15',
          manager: 'Ms. Kavita Joshi',
          priority: 'High'
        },
        {
          id: 'E004',
          name: 'Mid-Day Meal Enhancement',
          status: 'Planning',
          progress: 30,
          budget: '₹90,00,000',
          spent: '₹27,00,000',
          deadline: '2024-11-30',
          manager: 'Mr. Ravi Kumar',
          priority: 'Medium'
        },
        {
          id: 'E005',
          name: 'Student Assessment System',
          status: 'Delayed',
          progress: 45,
          budget: '₹60,00,000',
          spent: '₹27,00,000',
          deadline: '2024-07-31',
          manager: 'Prof. Meera Gupta',
          priority: 'Low'
        }
      ],
      pwd: [
        {
          id: 'P001',
          name: 'Highway Construction Phase-II',
          status: 'In Progress',
          progress: 70,
          budget: '₹15,00,00,000',
          spent: '₹10,50,00,000',
          deadline: '2024-12-31',
          manager: 'Eng. Vikram Singh',
          priority: 'High'
        },
        {
          id: 'P002',
          name: 'Bridge Maintenance Project',
          status: 'Completed',
          progress: 100,
          budget: '₹3,50,00,000',
          spent: '₹3,40,00,000',
          deadline: '2024-06-15',
          manager: 'Eng. Sunita Devi',
          priority: 'Medium'
        },
        {
          id: 'P003',
          name: 'Rural Road Connectivity',
          status: 'In Progress',
          progress: 55,
          budget: '₹8,00,00,000',
          spent: '₹4,40,00,000',
          deadline: '2024-09-30',
          manager: 'Mr. Ramesh Chand',
          priority: 'High'
        },
        {
          id: 'P004',
          name: 'Drainage System Upgrade',
          status: 'Planning',
          progress: 20,
          budget: '₹2,20,00,000',
          spent: '₹44,00,000',
          deadline: '2025-01-31',
          manager: 'Eng. Pooja Malik',
          priority: 'Medium'
        },
        {
          id: 'P005',
          name: 'Street Lighting Installation',
          status: 'Delayed',
          progress: 35,
          budget: '₹1,80,00,000',
          spent: '₹63,00,000',
          deadline: '2024-08-15',
          manager: 'Eng. Vikram Singh',
          priority: 'Low'
        }
      ],
      rural: [
        {
          id: 'R001',
          name: 'MGNREGA Employment Scheme',
          status: 'In Progress',
          progress: 85,
          budget: '₹5,00,00,000',
          spent: '₹4,25,00,000',
          deadline: '2024-12-31',
          manager: 'Mr. Ashok Verma',
          priority: 'High'
        },
        {
          id: 'R002',
          name: 'Water Conservation Project',
          status: 'Completed',
          progress: 100,
          budget: '₹2,80,00,000',
          spent: '₹2,75,00,000',
          deadline: '2024-05-31',
          manager: 'Ms. Rekha Sharma',
          priority: 'High'
        },
        {
          id: 'R003',
          name: 'Digital Village Initiative',
          status: 'In Progress',
          progress: 60,
          budget: '₹1,50,00,000',
          spent: '₹90,00,000',
          deadline: '2024-10-31',
          manager: 'Mr. Dinesh Kumar',
          priority: 'Medium'
        },
        {
          id: 'R004',
          name: 'Farmer Training Program',
          status: 'Planning',
          progress: 25,
          budget: '₹75,00,000',
          spent: '₹18,75,000',
          deadline: '2024-11-15',
          manager: 'Ms. Sita Devi',
          priority: 'Medium'
        },
        {
          id: 'R005',
          name: 'Rural Housing Scheme',
          status: 'Delayed',
          progress: 40,
          budget: '₹10,00,00,000',
          spent: '₹4,00,00,000',
          deadline: '2024-08-31',
          manager: 'Mr. Ashok Verma',
          priority: 'High'
        }
      ]
    };

    return projects?.[dept] || projects?.health;
  };

  const projects = getDepartmentProjects(department);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'progress') {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedProjects?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = sortedProjects?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Project Details</h3>
            <p className="text-sm text-gray-600">Sortable data table with project status and actions</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Project Name</span>
                  <Icon name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon name={sortField === 'status' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('progress')}
              >
                <div className="flex items-center space-x-1">
                  <span>Progress</span>
                  <Icon name={sortField === 'progress' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProjects?.map((project) => (
              <tr key={project?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{project?.name}</div>
                    <div className="text-sm text-gray-500">{project?.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project?.status)}`}>
                    {project?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          project?.progress >= 80 ? 'bg-green-500' :
                          project?.progress >= 60 ? 'bg-blue-500' :
                          project?.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${project?.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-900">{project?.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{project?.budget}</div>
                  <div className="text-sm text-gray-500">Spent: {project?.spent}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project?.manager}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project?.priority)}`}>
                    {project?.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-primary-dark">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Icon name="Edit" size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedProjects?.length)} of {sortedProjects?.length} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;