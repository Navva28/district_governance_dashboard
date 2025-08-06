import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import BudgetMetricsCard from './components/BudgetMetricsCard';
import WaterfallChart from './components/WaterfallChart';
import BudgetHealthScorecard from './components/BudgetHealthScorecard';
import DepartmentSpendingChart from './components/DepartmentSpendingChart';
import AllocationTable from './components/AllocationTable';
import TopSpendingCategories from './components/TopSpendingCategories';
import ApprovalWorkflowStatus from './components/ApprovalWorkflowStatus';

const BudgetAndResourceMonitoring = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('2024-25');
  const [selectedDepartments, setSelectedDepartments] = useState(['all']);
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for financial year options
  const financialYearOptions = [
    { value: '2024-25', label: 'FY 2024-25' },
    { value: '2023-24', label: 'FY 2023-24' },
    { value: '2022-23', label: 'FY 2022-23' }
  ];

  // Mock data for department options
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'health', label: 'Health Department' },
    { value: 'education', label: 'Education Department' },
    { value: 'pwd', label: 'Public Works Department' },
    { value: 'rural', label: 'Rural Development' },
    { value: 'urban', label: 'Urban Development' }
  ];

  // Mock data for budget category options
  const budgetCategoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'capital', label: 'Capital Expenditure' },
    { value: 'revenue', label: 'Revenue Expenditure' },
    { value: 'schemes', label: 'Centrally Sponsored Schemes' },
    { value: 'maintenance', label: 'Maintenance & Operations' }
  ];

  // Mock data for budget metrics
  const budgetMetrics = [
    {
      title: "Total Budget Utilization",
      value: "₹2,847 Cr",
      subtitle: "78.2% of allocated budget",
      trend: "up",
      trendValue: "+5.2%",
      icon: "TrendingUp",
      variant: "success"
    },
    {
      title: "Budget Variance",
      value: "-₹156 Cr",
      subtitle: "4.3% under budget",
      trend: "down",
      trendValue: "-2.1%",
      icon: "AlertTriangle",
      variant: "warning"
    },
    {
      title: "Pending Approvals",
      value: "₹423 Cr",
      subtitle: "47 proposals awaiting approval",
      trend: "up",
      trendValue: "+12.5%",
      icon: "Clock",
      variant: "error",
      alert: true
    },
    {
      title: "Projected Year-end",
      value: "₹3,642 Cr",
      subtitle: "Expected total spending",
      trend: "up",
      trendValue: "+3.8%",
      icon: "Target",
      variant: "default"
    }
  ];

  // Mock data for waterfall chart
  const waterfallData = [
    { name: 'Budget Allocation', value: 3640, type: 'positive', cumulative: 3640 },
    { name: 'Q1 Spending', value: -890, type: 'negative', cumulative: 2750 },
    { name: 'Q2 Spending', value: -756, type: 'negative', cumulative: 1994 },
    { name: 'Q3 Spending', value: -623, type: 'negative', cumulative: 1371 },
    { name: 'Committed', value: -578, type: 'negative', cumulative: 793 },
    { name: 'Available Balance', value: 793, type: 'balance', cumulative: 793 }
  ];

  // Mock data for budget health scorecard
  const healthMetrics = [
    {
      category: "Spending Velocity",
      description: "Rate of budget utilization",
      score: 85,
      status: "On Track"
    },
    {
      category: "Variance Control",
      description: "Budget vs actual alignment",
      score: 72,
      status: "Needs Attention"
    },
    {
      category: "Approval Efficiency",
      description: "Processing time for approvals",
      score: 91,
      status: "Excellent"
    },
    {
      category: "Compliance Score",
      description: "Adherence to financial rules",
      score: 88,
      status: "Good"
    }
  ];

  // Mock data for department spending comparison
  const departmentSpendingData = [
    { department: 'Health', budget: 890, actual: 756, variance: -15.1 },
    { department: 'Education', budget: 1240, actual: 1156, variance: -6.8 },
    { department: 'PWD', budget: 650, actual: 723, variance: 11.2 },
    { department: 'Rural Dev', budget: 480, actual: 445, variance: -7.3 },
    { department: 'Urban Dev', budget: 380, actual: 367, variance: -3.4 }
  ];

  // Mock data for top spending categories
  const topSpendingCategories = [
    {
      name: 'Infrastructure',
      amount: 1240,
      spent: 967,
      projects: 23,
      variance: -8.2
    },
    {
      name: 'Healthcare',
      amount: 890,
      spent: 756,
      projects: 18,
      variance: -15.1
    },
    {
      name: 'Education',
      amount: 780,
      spent: 689,
      projects: 31,
      variance: -11.7
    },
    {
      name: 'Rural Development',
      amount: 530,
      spent: 445,
      projects: 15,
      variance: -16.0
    }
  ];

  // Mock data for approval workflow status
  const approvalWorkflows = [
    {
      title: "District Hospital Equipment Procurement",
      department: "Health Department",
      amount: 125,
      status: "Pending",
      priority: "High",
      submittedDate: "15 Dec 2024",
      currentStep: 2,
      totalSteps: 4,
      daysWaiting: 8,
      nextApprover: "District Collector",
      approvers: [
        { name: "Dr. Sharma", role: "CMO" },
        { name: "R. Patel", role: "Finance Officer" },
        { name: "A. Kumar", role: "District Collector" },
        { name: "S. Singh", role: "State Health Secretary" }
      ]
    },
    {
      title: "School Infrastructure Upgrade Phase-II",
      department: "Education Department",
      amount: 89,
      status: "Under Review",
      priority: "Medium",
      submittedDate: "18 Dec 2024",
      currentStep: 3,
      totalSteps: 4,
      daysWaiting: 3,
      nextApprover: "State Education Secretary",
      approvers: [
        { name: "M. Gupta", role: "DEO" },
        { name: "P. Joshi", role: "Finance Officer" },
        { name: "K. Verma", role: "District Collector" }
      ]
    },
    {
      title: "Rural Road Connectivity Project",
      department: "PWD",
      amount: 156,
      status: "Approved",
      priority: "High",
      submittedDate: "10 Dec 2024",
      currentStep: 4,
      totalSteps: 4,
      daysWaiting: 0,
      nextApprover: "",
      approvers: [
        { name: "S. Yadav", role: "Executive Engineer" },
        { name: "R. Sharma", role: "Superintending Engineer" }
      ]
    }
  ];

  // Mock data for allocation table
  const allocationTableData = [
    {
      id: 1,
      category: "Capital Expenditure",
      department: "Health",
      project: "District Hospital Modernization",
      allocated: 245,
      spent: 189,
      variance: -22.9,
      status: "Approved",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      category: "Revenue Expenditure",
      department: "Education",
      project: "Teacher Training Program",
      allocated: 67,
      spent: 45,
      variance: -32.8,
      status: "Pending",
      lastUpdated: "4 hours ago"
    },
    {
      id: 3,
      category: "Centrally Sponsored Schemes",
      department: "Rural Development",
      project: "MGNREGA Implementation",
      allocated: 189,
      spent: 156,
      variance: -17.5,
      status: "Approved",
      lastUpdated: "1 hour ago"
    },
    {
      id: 4,
      category: "Capital Expenditure",
      department: "PWD",
      project: "Highway Construction Phase-II",
      allocated: 423,
      spent: 467,
      variance: 10.4,
      status: "Approved",
      lastUpdated: "3 hours ago"
    },
    {
      id: 5,
      category: "Maintenance & Operations",
      department: "Urban Development",
      project: "Water Supply System Upgrade",
      allocated: 134,
      spent: 98,
      variance: -26.9,
      status: "Rejected",
      lastUpdated: "6 hours ago"
    }
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleExportData = () => {
    console.log('Exporting budget data...');
  };

  const handleGenerateReport = () => {
    console.log('Generating comprehensive budget report...');
  };

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <>
      <Helmet>
        <title>Budget & Resource Monitoring - District Governance Dashboard</title>
        <meta name="description" content="Comprehensive financial oversight and resource allocation optimization across all departments with real-time expenditure tracking and variance analysis." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} mt-16`}>
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Budget & Resource Monitoring</h1>
                <p className="text-muted-foreground">
                  Comprehensive financial oversight and resource allocation optimization
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="text-xs text-muted-foreground flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>Last updated {formatLastUpdated()}</span>
                </div>
                <Button variant="outline" size="sm" iconName="Download" onClick={handleExportData}>
                  Export Data
                </Button>
                <Button variant="default" size="sm" iconName="FileText" onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Financial Year"
                  options={financialYearOptions}
                  value={selectedFinancialYear}
                  onChange={setSelectedFinancialYear}
                />
                
                <Select
                  label="Departments"
                  options={departmentOptions}
                  value={selectedDepartments?.[0]}
                  onChange={(value) => setSelectedDepartments([value])}
                />
                
                <Select
                  label="Budget Category"
                  options={budgetCategoryOptions}
                  value={selectedBudgetCategory}
                  onChange={setSelectedBudgetCategory}
                />
              </div>
            </div>

            {/* Budget Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {budgetMetrics?.map((metric, index) => (
                <BudgetMetricsCard key={index} {...metric} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Waterfall Chart - 12 columns */}
              <div className="xl:col-span-3">
                <WaterfallChart 
                  data={waterfallData}
                  title="Budget Flow Analysis (₹ Crores)"
                />
              </div>

              {/* Budget Health Scorecard - 4 columns */}
              <div className="xl:col-span-1">
                <BudgetHealthScorecard healthMetrics={healthMetrics} />
              </div>
            </div>

            {/* Department Spending Comparison */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <DepartmentSpendingChart 
                  data={departmentSpendingData}
                  title="Department-wise Budget vs Actual Spending"
                />
              </div>
              
              <div className="space-y-6">
                <TopSpendingCategories 
                  categories={topSpendingCategories}
                  title="Top Spending Categories"
                />
              </div>
            </div>

            {/* Approval Workflow Status */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-1">
                <ApprovalWorkflowStatus 
                  workflows={approvalWorkflows}
                  title="Approval Workflow Status"
                />
              </div>
              
              {/* Allocation Table - spans remaining columns */}
              <div className="xl:col-span-2">
                <AllocationTable 
                  data={allocationTableData}
                  title="Detailed Budget Allocation"
                />
              </div>
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Budget Efficiency</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Utilization Rate</span>
                    <span className="text-sm font-medium text-foreground">78.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Approval Speed</span>
                    <span className="text-sm font-medium text-foreground">12.5 days avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Variance Control</span>
                    <span className="text-sm font-medium text-success">Good</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Attention Required</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Overdue Approvals</span>
                    <span className="text-sm font-medium text-warning">8 items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Budget Overruns</span>
                    <span className="text-sm font-medium text-error">3 departments</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pending Reviews</span>
                    <span className="text-sm font-medium text-warning">15 proposals</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Target" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Year-end Projection</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expected Utilization</span>
                    <span className="text-sm font-medium text-foreground">94.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Savings Potential</span>
                    <span className="text-sm font-medium text-success">₹187 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <span className="text-sm font-medium text-success">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BudgetAndResourceMonitoring;