import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Select from './Select';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('mumbai');
  const [isConnectionHealthy, setIsConnectionHealthy] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [alertCount, setAlertCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Executive Dashboard',
      path: '/executive-overview-dashboard',
      icon: 'BarChart3',
      description: 'Strategic overview and cross-departmental insights'
    },
    {
      label: 'Department Analytics',
      path: '/departmental-performance-analytics',
      icon: 'TrendingUp',
      description: 'Detailed performance monitoring by department'
    },
    {
      label: 'Budget & Resources',
      path: '/budget-and-resource-monitoring',
      icon: 'DollarSign',
      description: 'Financial oversight and resource allocation'
    },
    {
      label: 'Citizen Services',
      path: '/citizen-services-performance-tracker',
      icon: 'Users',
      description: 'Service delivery performance tracking'
    },
    {
      label: 'Operations Center',
      path: '/real-time-operations-command-center',
      icon: 'Activity',
      description: 'Real-time monitoring and crisis management'
    }
  ];

  const districtOptions = [
    { value: 'mumbai', label: 'Mumbai District' },
    { value: 'pune', label: 'Pune District' },
    { value: 'nashik', label: 'Nashik District' },
    { value: 'nagpur', label: 'Nagpur District' },
    { value: 'aurangabad', label: 'Aurangabad District' }
  ];

  // Simulate real-time connection monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate occasional connection issues
      setIsConnectionHealthy(Math.random() > 0.1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getActivePageTitle = () => {
    const activeItem = navigationItems?.find(item => item?.path === location.pathname);
    return activeItem ? activeItem?.label : 'District Governance Dashboard';
  };

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">
                District Governance
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Analytics Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.description}
            >
              <div className="flex items-center space-x-2">
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </div>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* District Selector */}
          <div className="hidden md:block min-w-[180px]">
            <Select
              options={districtOptions}
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              placeholder="Select District"
            />
          </div>

          {/* Connection Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-md bg-muted">
            <div className={`w-2 h-2 rounded-full ${
              isConnectionHealthy ? 'bg-success' : 'bg-warning'
            }`} />
            <span className="text-xs text-muted-foreground">
              {formatLastUpdated()}
            </span>
          </div>

          {/* Alert Notifications */}
          <button className="relative p-2 rounded-md hover:bg-muted transition-colors duration-150">
            <Icon name="Bell" size={20} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-150"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-lg">
          <div className="px-4 py-2">
            {/* Mobile District Selector */}
            <div className="mb-4">
              <Select
                options={districtOptions}
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                placeholder="Select District"
              />
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <div className="text-left">
                    <div>{item?.label}</div>
                    <div className="text-xs opacity-75">{item?.description}</div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Mobile Connection Status */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isConnectionHealthy ? 'bg-success' : 'bg-warning'
                  }`} />
                  <span>Last updated {formatLastUpdated()}</span>
                </div>
                <span>{isConnectionHealthy ? 'Connected' : 'Reconnecting...'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;