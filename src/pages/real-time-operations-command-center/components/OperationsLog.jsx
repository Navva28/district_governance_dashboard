import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OperationsLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'system', label: 'System Events' },
    { value: 'security', label: 'Security' },
    { value: 'performance', label: 'Performance' },
    { value: 'user', label: 'User Actions' },
    { value: 'incident', label: 'Incidents' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
    { value: 'critical', label: 'Critical' }
  ];

  const initialLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      category: 'incident',
      severity: 'critical',
      title: 'Emergency Response Activated',
      description: 'Medical emergency response team deployed to construction site accident',
      user: 'Emergency Coordinator',
      department: 'Health',
      ip: '192.168.1.45',
      resolution: 'Response team dispatched, casualties evacuated to district hospital',
      status: 'resolved',
      duration: '45 minutes'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 600000),
      category: 'system',
      severity: 'warning',
      title: 'Database Performance Degradation',
      description: 'Education database showing increased response times above threshold',
      user: 'System Monitor',
      department: 'Education',
      ip: '192.168.1.30',
      resolution: 'Database optimization completed, performance restored',
      status: 'resolved',
      duration: '30 minutes'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      category: 'security',
      severity: 'warning',
      title: 'Multiple Failed Login Attempts',
      description: 'Suspicious login activity detected from external IP address',
      user: 'Security System',
      department: 'IT Security',
      ip: '203.45.67.89',
      resolution: 'IP address blocked, security protocols updated',
      status: 'resolved',
      duration: '15 minutes'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1200000),
      category: 'user',
      severity: 'info',
      title: 'Bulk Report Generation',
      description: 'District Collector generated comprehensive performance reports',
      user: 'collector@district.gov.in',
      department: 'Administration',
      ip: '192.168.1.10',
      resolution: 'Reports generated successfully and distributed',
      status: 'completed',
      duration: '12 minutes'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1800000),
      category: 'maintenance',
      severity: 'info',
      title: 'Scheduled System Backup',
      description: 'Weekly automated backup of all departmental databases',
      user: 'Backup Service',
      department: 'IT',
      ip: '192.168.1.100',
      resolution: 'All databases backed up successfully',
      status: 'completed',
      duration: '2 hours'
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 2400000),
      category: 'performance',
      severity: 'error',
      title: 'Server CPU Overload',
      description: 'Central server CPU usage exceeded 95% for extended period',
      user: 'Performance Monitor',
      department: 'IT',
      ip: '192.168.1.10',
      resolution: 'Load balancing activated, additional resources allocated',
      status: 'resolved',
      duration: '1 hour'
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 3000000),
      category: 'incident',
      severity: 'warning',
      title: 'Power Outage Response',
      description: 'Coordinated response to widespread power outage in residential areas',
      user: 'Operations Manager',
      department: 'Utilities',
      ip: '192.168.1.55',
      resolution: 'Emergency generators deployed, power restored',
      status: 'resolved',
      duration: '3 hours'
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 3600000),
      category: 'system',
      severity: 'info',
      title: 'Software Update Deployment',
      description: 'Security patches deployed across all departmental systems',
      user: 'System Administrator',
      department: 'IT',
      ip: '192.168.1.101',
      resolution: 'Updates installed successfully on all systems',
      status: 'completed',
      duration: '45 minutes'
    },
    {
      id: 9,
      timestamp: new Date(Date.now() - 4200000),
      category: 'user',
      severity: 'info',
      title: 'Training Session Conducted',
      description: 'Emergency response training for department heads completed',
      user: 'Training Coordinator',
      department: 'Administration',
      ip: '192.168.1.25',
      resolution: 'All participants completed certification',
      status: 'completed',
      duration: '4 hours'
    },
    {
      id: 10,
      timestamp: new Date(Date.now() - 5400000),
      category: 'security',
      severity: 'critical',
      title: 'Security Breach Attempt',
      description: 'Attempted unauthorized access to sensitive government data',
      user: 'Security System',
      department: 'IT Security',
      ip: '45.67.89.123',
      resolution: 'Attack blocked, security measures enhanced',
      status: 'resolved',
      duration: '2 hours'
    }
  ];

  useEffect(() => {
    setLogs(initialLogs);
  }, []);

  useEffect(() => {
    let filtered = logs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(log =>
        log?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        log?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        log?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      filtered = filtered?.filter(log => log?.category === selectedFilter);
    }

    // Apply severity filter
    if (selectedSeverity !== 'all') {
      filtered = filtered?.filter(log => log?.severity === selectedSeverity);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, selectedFilter, selectedSeverity]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'error': return 'bg-error/10 border-error/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-primary/10 border-primary/20';
      default: return 'bg-muted border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'system': return 'Server';
      case 'security': return 'Shield';
      case 'performance': return 'Activity';
      case 'user': return 'User';
      case 'incident': return 'AlertTriangle';
      case 'maintenance': return 'Settings';
      default: return 'Info';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success';
      case 'completed': return 'text-success';
      case 'active': return 'text-warning';
      case 'investigating': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDuration = (duration) => {
    return duration || 'N/A';
  };

  // Pagination
  const totalPages = Math.ceil(filteredLogs?.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const currentLogs = filteredLogs?.slice(startIndex, endIndex);

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Operations Log</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Database" size={16} />
            <span>{filteredLogs?.length} entries</span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
            placeholder="Filter by category"
          />
          <Select
            options={severityOptions}
            value={selectedSeverity}
            onChange={setSelectedSeverity}
            placeholder="Filter by severity"
          />
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
                setSelectedSeverity('all');
              }}
              className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      {/* Log Entries */}
      <div className="max-h-96 overflow-y-auto">
        {currentLogs?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No log entries found matching your criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {currentLogs?.map((log) => (
              <div key={log?.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg border ${getSeverityBg(log?.severity)}`}>
                    <Icon 
                      name={getCategoryIcon(log?.category)} 
                      size={16} 
                      className={getSeverityColor(log?.severity)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{log?.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{formatTimestamp(log?.timestamp)}</span>
                        <span className={`px-2 py-1 rounded-full font-medium ${
                          log?.severity === 'critical' ? 'bg-error/20 text-error' :
                          log?.severity === 'error' ? 'bg-error/20 text-error' :
                          log?.severity === 'warning'? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                        }`}>
                          {log?.severity}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {log?.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                      <div>
                        <span className="text-muted-foreground">User:</span>
                        <div className="font-medium text-foreground">{log?.user}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Department:</span>
                        <div className="font-medium text-foreground">{log?.department}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">IP Address:</span>
                        <div className="font-medium text-foreground">{log?.ip}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium text-foreground">{formatDuration(log?.duration)}</div>
                      </div>
                    </div>
                    
                    {log?.resolution && (
                      <div className="p-2 bg-muted/50 rounded text-xs">
                        <span className="text-muted-foreground">Resolution: </span>
                        <span className="text-foreground">{log?.resolution}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Category:</span>
                        <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground capitalize">
                          {log?.category}
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${getStatusColor(log?.status)} capitalize`}>
                        {log?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs?.length)} of {filteredLogs?.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                {currentPage}
              </span>
              <span className="text-sm text-muted-foreground">of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationsLog;