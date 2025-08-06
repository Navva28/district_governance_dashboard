import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    analytics: true,
    operations: true
  });

  const navigationSections = [
    {
      id: 'overview',
      title: 'Strategic Overview',
      items: [
        {
          label: 'Executive Dashboard',
          path: '/executive-overview-dashboard',
          icon: 'BarChart3',
          description: 'Cross-departmental insights and KPIs'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Operational Analytics',
      items: [
        {
          label: 'Department Performance',
          path: '/departmental-performance-analytics',
          icon: 'TrendingUp',
          description: 'Department-specific metrics and goals'
        },
        {
          label: 'Budget Monitoring',
          path: '/budget-and-resource-monitoring',
          icon: 'DollarSign',
          description: 'Financial oversight and allocation'
        },
        {
          label: 'Citizen Services',
          path: '/citizen-services-performance-tracker',
          icon: 'Users',
          description: 'Service delivery performance'
        }
      ]
    },
    {
      id: 'operations',
      title: 'Real-time Operations',
      items: [
        {
          label: 'Command Center',
          path: '/real-time-operations-command-center',
          icon: 'Activity',
          description: 'Live monitoring and crisis response'
        }
      ]
    }
  ];

  const quickActions = [
    { label: 'Generate Report', icon: 'FileText', action: 'report' },
    { label: 'Export Data', icon: 'Download', action: 'export' },
    { label: 'System Health', icon: 'Shield', action: 'health' },
    { label: 'Settings', icon: 'Settings', action: 'settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSectionToggle = (sectionId) => {
    if (!isCollapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev?.[sectionId]
      }));
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action handlers
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md hover:bg-muted transition-colors duration-150"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigationSections?.map((section) => (
            <div key={section?.id} className="mb-6">
              {/* Section Header */}
              {!isCollapsed && (
                <button
                  onClick={() => handleSectionToggle(section?.id)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  <span>{section?.title}</span>
                  <Icon 
                    name={expandedSections?.[section?.id] ? "ChevronDown" : "ChevronRight"} 
                    size={12} 
                  />
                </button>
              )}

              {/* Section Items */}
              <div className={`space-y-1 ${
                isCollapsed || expandedSections?.[section?.id] ? 'block' : 'hidden'
              }`}>
                {section?.items?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-150 ease-out group ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground border-r-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? `${item?.label} - ${item?.description}` : item?.description}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className={`flex-shrink-0 ${
                        isActivePath(item?.path) ? 'text-primary-foreground' : ''
                      }`}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="truncate">{item?.label}</div>
                        <div className="text-xs opacity-75 truncate">{item?.description}</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="border-t border-border p-4">
          {!isCollapsed && (
            <h3 className="text-xs font-medium text-muted-foreground mb-3">Quick Actions</h3>
          )}
          <div className={`${isCollapsed ? 'space-y-2' : 'grid grid-cols-2 gap-2'}`}>
            {quickActions?.map((action) => (
              <button
                key={action?.action}
                onClick={() => handleQuickAction(action?.action)}
                className={`flex items-center space-x-2 p-2 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 ${
                  isCollapsed ? 'justify-center' : 'justify-start'
                }`}
                title={action?.label}
              >
                <Icon name={action?.icon} size={14} />
                {!isCollapsed && <span className="truncate">{action?.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="border-t border-border p-4">
          <div className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            {!isCollapsed && (
              <div className="text-xs text-muted-foreground">
                <div>System Operational</div>
                <div className="text-[10px] opacity-75">Last sync: 2m ago</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;