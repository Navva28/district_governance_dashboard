import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AlertBanner from './components/AlertBanner';
import OperationalMetrics from './components/OperationalMetrics';
import ActivityFeed from './components/ActivityFeed';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import GeographicIncidentMap from './components/GeographicIncidentMap';
import CommandPanel from './components/CommandPanel';
import NetworkTopology from './components/NetworkTopology';
import OperationsLog from './components/OperationsLog';
import Icon from '../../components/AppIcon';

const RealTimeOperationsCommandCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'monitoring', label: 'System Monitoring', icon: 'Activity' },
    { id: 'incidents', label: 'Incident Management', icon: 'AlertTriangle' },
    { id: 'network', label: 'Network Topology', icon: 'Network' },
    { id: 'logs', label: 'Operations Log', icon: 'FileText' }
  ];

  // Simulate real-time connection monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate occasional connection issues
      setConnectionStatus(Math.random() > 0.05 ? 'connected' : 'reconnecting');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'F11') {
        e?.preventDefault();
        toggleFullscreen();
      }
      if (e?.ctrlKey && e?.key === 'r') {
        e?.preventDefault();
        window.location?.reload();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderMainContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Primary Metrics */}
            <OperationalMetrics />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Activity Feed - Takes 2 columns */}
              <div className="xl:col-span-2">
                <ActivityFeed />
              </div>
              
              {/* Command Panel - Takes 1 column */}
              <div className="xl:col-span-1">
                <CommandPanel />
              </div>
            </div>
            
            {/* Geographic Incident Map */}
            <GeographicIncidentMap />
          </div>
        );
      
      case 'monitoring':
        return (
          <div className="space-y-6">
            <OperationalMetrics />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SystemHealthMonitor />
              <ActivityFeed />
            </div>
          </div>
        );
      
      case 'incidents':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <GeographicIncidentMap />
              </div>
              <div className="xl:col-span-1">
                <CommandPanel />
              </div>
            </div>
            <ActivityFeed />
          </div>
        );
      
      case 'network':
        return (
          <div className="space-y-6">
            <OperationalMetrics />
            <NetworkTopology />
            <SystemHealthMonitor />
          </div>
        );
      
      case 'logs':
        return (
          <div className="space-y-6">
            <OperationsLog />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SystemHealthMonitor />
              <ActivityFeed />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } mt-16`}>
        {/* Alert Banner */}
        <AlertBanner />
        
        {/* Command Center Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Real-time Operations Command Center
              </h1>
              <p className="text-muted-foreground">
                Comprehensive monitoring and crisis management dashboard
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-success animate-pulse' : 'bg-warning'
                }`} />
                <span className="text-sm text-muted-foreground">
                  {connectionStatus === 'connected' ? 'Connected' : 'Reconnecting...'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lastUpdate?.toLocaleTimeString('en-IN', { hour12: false })}
                </span>
              </div>
              
              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="Toggle Fullscreen (F11)"
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
              </button>
              
              {/* Refresh Button */}
              <button
                onClick={() => window.location?.reload()}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="Refresh Dashboard (Ctrl+R)"
              >
                <Icon name="RefreshCw" size={20} />
              </button>
            </div>
          </div>
          
          {/* View Navigation */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {viewOptions?.map((view) => (
              <button
                key={view?.id}
                onClick={() => setActiveView(view?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === view?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                <Icon name={view?.icon} size={16} />
                <span>{view?.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="p-6">
          {renderMainContent()}
        </div>
        
        {/* Footer */}
        <footer className="bg-card border-t border-border px-6 py-4 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>District Governance Dashboard</span>
              <span>•</span>
              <span>Operations Command Center</span>
              <span>•</span>
              <span>Version 2.1.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>© {new Date()?.getFullYear()} Government of India</span>
              <span>•</span>
              <span>Last Updated: {lastUpdate?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default RealTimeOperationsCommandCenter;