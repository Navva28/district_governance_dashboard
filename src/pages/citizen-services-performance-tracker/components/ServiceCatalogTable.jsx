import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceCatalogTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const serviceData = [
    {
      id: 1,
      name: 'Birth Certificate',
      category: 'Certificates',
      deliveryTime: 3,
      targetTime: 7,
      satisfaction: 4.5,
      completionRate: 94,
      volume: 1250,
      digitalAdoption: 85,
      avgCost: 50,
      department: 'Revenue'
    },
    {
      id: 2,
      name: 'Driving License',
      category: 'Licenses',
      deliveryTime: 15,
      targetTime: 21,
      satisfaction: 3.8,
      completionRate: 78,
      volume: 890,
      digitalAdoption: 72,
      avgCost: 200,
      department: 'Transport'
    },
    {
      id: 3,
      name: 'Property Tax Payment',
      category: 'Payments',
      deliveryTime: 1,
      targetTime: 1,
      satisfaction: 4.2,
      completionRate: 96,
      volume: 2340,
      digitalAdoption: 91,
      avgCost: 0,
      department: 'Revenue'
    },
    {
      id: 4,
      name: 'Building Permit',
      category: 'Permits',
      deliveryTime: 45,
      targetTime: 60,
      satisfaction: 3.2,
      completionRate: 65,
      volume: 156,
      digitalAdoption: 45,
      avgCost: 1500,
      department: 'Urban Planning'
    },
    {
      id: 5,
      name: 'Pension Application',
      category: 'Welfare',
      deliveryTime: 30,
      targetTime: 45,
      satisfaction: 4.1,
      completionRate: 88,
      volume: 445,
      digitalAdoption: 38,
      avgCost: 0,
      department: 'Social Welfare'
    },
    {
      id: 6,
      name: 'Death Certificate',
      category: 'Certificates',
      deliveryTime: 2,
      targetTime: 7,
      satisfaction: 4.6,
      completionRate: 97,
      volume: 680,
      digitalAdoption: 82,
      avgCost: 50,
      department: 'Revenue'
    },
    {
      id: 7,
      name: 'Trade License',
      category: 'Licenses',
      deliveryTime: 21,
      targetTime: 30,
      satisfaction: 3.5,
      completionRate: 72,
      volume: 234,
      digitalAdoption: 68,
      avgCost: 800,
      department: 'Commerce'
    },
    {
      id: 8,
      name: 'Water Connection',
      category: 'Utilities',
      deliveryTime: 12,
      targetTime: 15,
      satisfaction: 3.9,
      completionRate: 81,
      volume: 320,
      digitalAdoption: 55,
      avgCost: 500,
      department: 'Water Works'
    },
    {
      id: 9,
      name: 'Ration Card',
      category: 'Welfare',
      deliveryTime: 14,
      targetTime: 21,
      satisfaction: 4.0,
      completionRate: 85,
      volume: 567,
      digitalAdoption: 42,
      avgCost: 0,
      department: 'Food & Supplies'
    },
    {
      id: 10,
      name: 'Marriage Certificate',
      category: 'Certificates',
      deliveryTime: 5,
      targetTime: 7,
      satisfaction: 4.3,
      completionRate: 92,
      volume: 890,
      digitalAdoption: 78,
      avgCost: 100,
      department: 'Revenue'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Certificates', label: 'Certificates' },
    { value: 'Licenses', label: 'Licenses' },
    { value: 'Permits', label: 'Permits' },
    { value: 'Welfare', label: 'Welfare Schemes' },
    { value: 'Payments', label: 'Payments' },
    { value: 'Utilities', label: 'Utilities' }
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = serviceData?.filter(service => {
      const matchesCategory = filterCategory === 'all' || service?.category === filterCategory;
      const matchesSearch = service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           service?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [serviceData, sortConfig, filterCategory, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return 'ArrowUpDown';
    }
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getPerformanceStatus = (deliveryTime, targetTime) => {
    const ratio = deliveryTime / targetTime;
    if (ratio <= 0.7) return { status: 'excellent', color: 'text-success bg-success/10' };
    if (ratio <= 1.0) return { status: 'good', color: 'text-primary bg-primary/10' };
    if (ratio <= 1.3) return { status: 'warning', color: 'text-warning bg-warning/10' };
    return { status: 'poor', color: 'text-error bg-error/10' };
  };

  const getCompletionRateColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Service Catalog Performance</h3>
          <p className="text-sm text-muted-foreground">Detailed service delivery metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories?.map(category => (
              <option key={category?.value} value={category?.value}>{category?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Service Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('deliveryTime')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Delivery Time</span>
                  <Icon name={getSortIcon('deliveryTime')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('satisfaction')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Satisfaction</span>
                  <Icon name={getSortIcon('satisfaction')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('completionRate')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Completion</span>
                  <Icon name={getSortIcon('completionRate')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('volume')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Volume</span>
                  <Icon name={getSortIcon('volume')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('digitalAdoption')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Digital %</span>
                  <Icon name={getSortIcon('digitalAdoption')} size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((service) => {
              const performance = getPerformanceStatus(service?.deliveryTime, service?.targetTime);
              return (
                <tr key={service?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-foreground">{service?.name}</div>
                      <div className="text-xs text-muted-foreground">{service?.department}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      {service?.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${performance.color}`}>
                        {service?.deliveryTime} days
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Target: {service?.targetTime}d
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="font-medium text-foreground">{service?.satisfaction}</span>
                      <Icon name="Star" size={12} className="text-warning" />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className={`font-medium ${getCompletionRateColor(service?.completionRate)}`}>
                        {service?.completionRate}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            service?.completionRate >= 90 ? 'bg-success' :
                            service?.completionRate >= 75 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${service?.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-medium text-foreground">
                      {service?.volume?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <span className="font-medium text-foreground">{service?.digitalAdoption}%</span>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="h-1 rounded-full bg-primary"
                          style={{ width: `${service?.digitalAdoption}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 hover:bg-muted rounded transition-colors" title="View Details">
                        <Icon name="Eye" size={14} className="text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors" title="Export Data">
                        <Icon name="Download" size={14} className="text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData?.length)} of {filteredAndSortedData?.length} services
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <div className="flex items-center space-x-1">
            {[...Array(Math.min(5, totalPages))]?.map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:bg-muted'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalogTable;