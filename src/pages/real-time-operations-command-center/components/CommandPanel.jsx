import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CommandPanel = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [escalationLevel, setEscalationLevel] = useState('normal');

  const onCallStaff = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Medical Officer',
      department: 'Health',
      phone: '+91 98765 43210',
      status: 'available',
      location: 'District Hospital',
      expertise: ['Emergency Medicine', 'Crisis Management']
    },
    {
      id: 2,
      name: 'Eng. Priya Sharma',
      role: 'Chief Engineer',
      department: 'PWD',
      phone: '+91 98765 43211',
      status: 'on-call',
      location: 'PWD Office',
      expertise: ['Infrastructure', 'Emergency Repairs']
    },
    {
      id: 3,
      name: 'Mr. Amit Patel',
      role: 'Security Chief',
      department: 'Security',
      phone: '+91 98765 43212',
      status: 'busy',
      location: 'Control Room',
      expertise: ['Security Operations', 'Crisis Response']
    },
    {
      id: 4,
      name: 'Ms. Sunita Verma',
      role: 'Education Director',
      department: 'Education',
      phone: '+91 98765 43213',
      status: 'available',
      location: 'Education Office',
      expertise: ['School Safety', 'Emergency Protocols']
    },
    {
      id: 5,
      name: 'Mr. Ravi Singh',
      role: 'Rural Development Officer',
      department: 'Rural Development',
      phone: '+91 98765 43214',
      status: 'available',
      location: 'Field Office',
      expertise: ['Rural Infrastructure', 'Community Response']
    }
  ];

  const quickActions = [
    {
      id: 'emergency_alert',
      label: 'Emergency Alert',
      description: 'Send district-wide emergency notification',
      icon: 'AlertTriangle',
      color: 'error',
      category: 'emergency'
    },
    {
      id: 'evacuate',
      label: 'Evacuation Order',
      description: 'Initiate evacuation procedures',
      icon: 'Users',
      color: 'warning',
      category: 'emergency'
    },
    {
      id: 'medical_response',
      label: 'Medical Response',
      description: 'Deploy medical emergency teams',
      icon: 'Heart',
      color: 'error',
      category: 'medical'
    },
    {
      id: 'traffic_control',
      label: 'Traffic Control',
      description: 'Activate traffic management protocols',
      icon: 'Car',
      color: 'warning',
      category: 'traffic'
    },
    {
      id: 'power_restore',
      label: 'Power Restoration',
      description: 'Initiate power restoration procedures',
      icon: 'Zap',
      color: 'primary',
      category: 'utility'
    },
    {
      id: 'water_supply',
      label: 'Water Supply',
      description: 'Emergency water supply activation',
      icon: 'Droplets',
      color: 'primary',
      category: 'utility'
    },
    {
      id: 'communication',
      label: 'Communication',
      description: 'Establish emergency communication',
      icon: 'Radio',
      color: 'secondary',
      category: 'communication'
    },
    {
      id: 'resource_deploy',
      label: 'Resource Deployment',
      description: 'Deploy emergency resources',
      icon: 'Truck',
      color: 'secondary',
      category: 'logistics'
    }
  ];

  const escalationWorkflow = [
    {
      level: 'normal',
      label: 'Normal Operations',
      description: 'Standard operating procedures',
      color: 'success',
      actions: ['Monitor', 'Log', 'Assign']
    },
    {
      level: 'elevated',
      label: 'Elevated Alert',
      description: 'Increased monitoring and response',
      color: 'warning',
      actions: ['Notify Supervisors', 'Increase Monitoring', 'Prepare Resources']
    },
    {
      level: 'high',
      label: 'High Alert',
      description: 'Active incident management',
      color: 'error',
      actions: ['Activate Response Teams', 'Notify Leadership', 'Deploy Resources']
    },
    {
      level: 'critical',
      label: 'Critical Emergency',
      description: 'Full emergency response activation',
      color: 'error',
      actions: ['Emergency Protocol', 'All Hands Response', 'External Coordination']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'on-call': return 'text-warning';
      case 'busy': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'available': return 'bg-success/10';
      case 'on-call': return 'bg-warning/10';
      case 'busy': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const handleQuickAction = (actionId) => {
    console.log(`Executing quick action: ${actionId}`);
    // Implement quick action logic
  };

  const handleCallStaff = (staffId) => {
    const staff = onCallStaff?.find(s => s?.id === staffId);
    console.log(`Calling ${staff?.name} at ${staff?.phone}`);
    // Implement call functionality
  };

  const handleEscalation = (level) => {
    setEscalationLevel(level);
    console.log(`Escalation level set to: ${level}`);
    // Implement escalation logic
  };

  return (
    <div className="space-y-6">
      {/* Escalation Workflow */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Escalation Workflow</h3>
        <div className="space-y-3">
          {escalationWorkflow?.map((workflow) => (
            <button
              key={workflow?.level}
              onClick={() => handleEscalation(workflow?.level)}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                escalationLevel === workflow?.level
                  ? `border-${workflow?.color} bg-${workflow?.color}/10`
                  : 'border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{workflow?.label}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  workflow?.color === 'success' ? 'bg-success' :
                  workflow?.color === 'warning' ? 'bg-warning' : 'bg-error'
                }`} />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{workflow?.description}</p>
              <div className="flex flex-wrap gap-1">
                {workflow?.actions?.map((action, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                  >
                    {action}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* On-Call Staff Directory */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">On-Call Staff Directory</h3>
        <div className="space-y-3">
          {onCallStaff?.map((staff) => (
            <div
              key={staff?.id}
              className={`p-3 rounded-lg border transition-all ${
                selectedTeam === staff?.id
                  ? 'border-primary bg-primary/10' :'border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    staff?.status === 'available' ? 'bg-success' :
                    staff?.status === 'on-call' ? 'bg-warning' : 'bg-error'
                  }`} />
                  <div>
                    <h4 className="font-medium text-foreground">{staff?.name}</h4>
                    <p className="text-sm text-muted-foreground">{staff?.role}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  onClick={() => handleCallStaff(staff?.id)}
                >
                  Call
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                <div>Department: {staff?.department}</div>
                <div>Location: {staff?.location}</div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {staff?.expertise?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.color === 'error' ? 'destructive' : 
                     action?.color === 'warning' ? 'warning' :
                     action?.color === 'primary' ? 'default' : 'secondary'}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={() => handleQuickAction(action?.id)}
              className="justify-start h-auto p-3"
            >
              <div className="text-left">
                <div className="font-medium">{action?.label}</div>
                <div className="text-xs opacity-75">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">District Collector:</span>
            <span className="font-medium text-foreground">+91 98765 00001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Police Control Room:</span>
            <span className="font-medium text-foreground">100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fire Department:</span>
            <span className="font-medium text-foreground">101</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Medical Emergency:</span>
            <span className="font-medium text-foreground">108</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Disaster Management:</span>
            <span className="font-medium text-foreground">+91 98765 00002</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPanel;