import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceFeed = () => {
  const [grievances, setGrievances] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(true);

  const mockGrievances = [
    {
      id: 'GRV-2025-001',
      title: 'Delayed Birth Certificate',
      category: 'Certificates',
      priority: 'high',
      status: 'pending',
      submittedAt: new Date(Date.now() - 1800000),
      citizen: 'Rajesh Kumar',
      department: 'Revenue',
      description: 'Birth certificate application submitted 15 days ago, no response received'
    },
    {
      id: 'GRV-2025-002',
      title: 'Road Repair Request',
      category: 'Infrastructure',
      priority: 'medium',
      status: 'in-progress',
      submittedAt: new Date(Date.now() - 3600000),
      citizen: 'Priya Sharma',
      department: 'PWD',
      description: 'Pothole on Main Street causing traffic issues'
    },
    {
      id: 'GRV-2025-003',
      title: 'Pension Payment Delay',
      category: 'Welfare',
      priority: 'high',
      status: 'resolved',
      submittedAt: new Date(Date.now() - 7200000),
      citizen: 'Mohan Singh',
      department: 'Social Welfare',
      description: 'Monthly pension payment delayed by 10 days'
    },
    {
      id: 'GRV-2025-004',
      title: 'Water Supply Issue',
      category: 'Utilities',
      priority: 'medium',
      status: 'pending',
      submittedAt: new Date(Date.now() - 10800000),
      citizen: 'Anita Patel',
      department: 'Water Works',
      description: 'No water supply for 3 days in Sector 15'
    },
    {
      id: 'GRV-2025-005',
      title: 'School Admission Query',
      category: 'Education',
      priority: 'low',
      status: 'in-progress',
      submittedAt: new Date(Date.now() - 14400000),
      citizen: 'Suresh Gupta',
      department: 'Education',
      description: 'Confusion regarding admission process for Class 1'
    }
  ];

  useEffect(() => {
    setGrievances(mockGrievances);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'pending': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredGrievances = grievances?.filter(grievance => {
    if (filter === 'all') return true;
    return grievance?.status === filter;
  });

  const statusCounts = {
    all: grievances?.length,
    pending: grievances?.filter(g => g?.status === 'pending')?.length,
    'in-progress': grievances?.filter(g => g?.status === 'in-progress')?.length,
    resolved: grievances?.filter(g => g?.status === 'resolved')?.length
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Grievance Feed</h3>
            <p className="text-sm text-muted-foreground">Real-time citizen complaints</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted'}`} />
          <span className="text-xs text-muted-foreground">{isLive ? 'Live' : 'Offline'}</span>
        </div>
      </div>
      {/* Status Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending' },
          { key: 'in-progress', label: 'In Progress' },
          { key: 'resolved', label: 'Resolved' }
        ]?.map(tab => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              filter === tab?.key 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label} ({statusCounts?.[tab?.key]})
          </button>
        ))}
      </div>
      {/* Grievances List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredGrievances?.map((grievance) => (
          <div key={grievance?.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(grievance?.priority)}`}>
                  {grievance?.priority}
                </div>
                <span className="text-xs text-muted-foreground">{grievance?.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(grievance?.status)}`}>
                  <Icon name={getStatusIcon(grievance?.status)} size={12} />
                  <span>{grievance?.status?.replace('-', ' ')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(grievance?.submittedAt)}</span>
              </div>
            </div>

            <h4 className="text-sm font-medium text-foreground mb-2">{grievance?.title}</h4>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{grievance?.description}</p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Citizen: {grievance?.citizen}</span>
                <span>Dept: {grievance?.department}</span>
              </div>
              <span className="px-2 py-1 bg-background rounded text-xs">{grievance?.category}</span>
            </div>
          </div>
        ))}
      </div>
      {filteredGrievances?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No grievances found for selected filter</p>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{statusCounts?.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">{statusCounts?.['in-progress']}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">{statusCounts?.resolved}</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceFeed;