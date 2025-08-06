import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AllocationTable = ({ data, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredData?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems?.filter(item => item !== id));
    }
  };

  const filteredData = data?.filter(item =>
    item?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.project?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortConfig?.direction === 'asc' 
      ? aValue?.toString()?.localeCompare(bValue?.toString())
      : bValue?.toString()?.localeCompare(aValue?.toString());
  });

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-success bg-success/10';
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getVarianceColor = (variance) => {
    if (variance > 10) return 'text-error';
    if (variance < -10) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search allocations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          
          {selectedItems?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export ({selectedItems?.length})
              </Button>
              <Button variant="outline" size="sm" iconName="FileText">
                Report
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === paginatedData?.length && paginatedData?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'category', label: 'Category' },
                { key: 'department', label: 'Department' },
                { key: 'project', label: 'Project' },
                { key: 'allocated', label: 'Allocated (₹Cr)' },
                { key: 'spent', label: 'Spent (₹Cr)' },
                { key: 'variance', label: 'Variance (%)' },
                { key: 'status', label: 'Status' },
                { key: 'lastUpdated', label: 'Last Updated' }
              ]?.map(({ key, label }) => (
                <th key={key} className="text-left p-3">
                  <button
                    onClick={() => handleSort(key)}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <span>{label}</span>
                    <Icon 
                      name={
                        sortConfig?.key === key 
                          ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' :'ChevronsUpDown'
                      } 
                      size={14} 
                    />
                  </button>
                </th>
              ))}
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => handleSelectItem(item?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="font-medium text-foreground">{item?.category}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">{item?.department}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">{item?.project}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium text-foreground">
                    ₹{item?.allocated?.toLocaleString('en-IN')}
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-medium text-foreground">
                    ₹{item?.spent?.toLocaleString('en-IN')}
                  </div>
                </td>
                <td className="p-3">
                  <div className={`font-medium ${getVarianceColor(item?.variance)}`}>
                    {item?.variance > 0 ? '+' : ''}{item?.variance}%
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-xs text-muted-foreground">{item?.lastUpdated}</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
            />
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllocationTable;