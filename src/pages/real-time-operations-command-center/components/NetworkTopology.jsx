import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NetworkTopology = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [networkHealth, setNetworkHealth] = useState('healthy');
  const [connectionStatus, setConnectionStatus] = useState({});

  const networkNodes = [
    {
      id: 'central_server',
      name: 'Central Server',
      type: 'server',
      status: 'healthy',
      cpu: 45,
      memory: 67,
      connections: ['health_db', 'education_db', 'pwd_db', 'rural_db'],
      location: 'Data Center',
      ip: '192.168.1.10',
      uptime: '99.8%'
    },
    {
      id: 'health_db',
      name: 'Health Database',
      type: 'database',
      status: 'healthy',
      cpu: 32,
      memory: 54,
      connections: ['health_app', 'central_server'],
      location: 'Health Department',
      ip: '192.168.1.20',
      uptime: '99.5%'
    },
    {
      id: 'education_db',
      name: 'Education Database',
      type: 'database',
      status: 'warning',
      cpu: 78,
      memory: 89,
      connections: ['education_app', 'central_server'],
      location: 'Education Department',
      ip: '192.168.1.30',
      uptime: '98.2%'
    },
    {
      id: 'pwd_db',
      name: 'PWD Database',
      type: 'database',
      status: 'healthy',
      cpu: 41,
      memory: 62,
      connections: ['pwd_app', 'central_server'],
      location: 'PWD Office',
      ip: '192.168.1.40',
      uptime: '99.7%'
    },
    {
      id: 'rural_db',
      name: 'Rural Development DB',
      type: 'database',
      status: 'critical',
      cpu: 95,
      memory: 97,
      connections: ['rural_app', 'central_server'],
      location: 'Rural Development Office',
      ip: '192.168.1.50',
      uptime: '94.3%'
    },
    {
      id: 'health_app',
      name: 'Health Management System',
      type: 'application',
      status: 'healthy',
      cpu: 28,
      memory: 45,
      connections: ['health_db', 'api_gateway'],
      location: 'Health Department',
      ip: '192.168.1.21',
      uptime: '99.1%'
    },
    {
      id: 'education_app',
      name: 'Education Portal',
      type: 'application',
      status: 'warning',
      cpu: 65,
      memory: 72,
      connections: ['education_db', 'api_gateway'],
      location: 'Education Department',
      ip: '192.168.1.31',
      uptime: '97.8%'
    },
    {
      id: 'pwd_app',
      name: 'PWD Project Tracker',
      type: 'application',
      status: 'healthy',
      cpu: 38,
      memory: 51,
      connections: ['pwd_db', 'api_gateway'],
      location: 'PWD Office',
      ip: '192.168.1.41',
      uptime: '99.4%'
    },
    {
      id: 'rural_app',
      name: 'Rural Development Portal',
      type: 'application',
      status: 'critical',
      cpu: 88,
      memory: 91,
      connections: ['rural_db', 'api_gateway'],
      location: 'Rural Development Office',
      ip: '192.168.1.51',
      uptime: '93.7%'
    },
    {
      id: 'api_gateway',
      name: 'API Gateway',
      type: 'gateway',
      status: 'healthy',
      cpu: 52,
      memory: 68,
      connections: ['health_app', 'education_app', 'pwd_app', 'rural_app', 'load_balancer'],
      location: 'Data Center',
      ip: '192.168.1.100',
      uptime: '99.9%'
    },
    {
      id: 'load_balancer',
      name: 'Load Balancer',
      type: 'network',
      status: 'healthy',
      cpu: 35,
      memory: 42,
      connections: ['api_gateway', 'firewall'],
      location: 'Data Center',
      ip: '192.168.1.101',
      uptime: '99.9%'
    },
    {
      id: 'firewall',
      name: 'Security Firewall',
      type: 'security',
      status: 'healthy',
      cpu: 29,
      memory: 38,
      connections: ['load_balancer'],
      location: 'Data Center',
      ip: '192.168.1.102',
      uptime: '99.9%'
    }
  ];

  useEffect(() => {
    // Simulate connection status updates
    const interval = setInterval(() => {
      const newConnectionStatus = {};
      networkNodes?.forEach(node => {
        node?.connections?.forEach(connId => {
          const connectionId = `${node?.id}-${connId}`;
          const isHealthy = Math.random() > 0.1; // 90% chance of healthy connection
          newConnectionStatus[connectionId] = {
            status: isHealthy ? 'healthy' : 'degraded',
            latency: Math.floor(Math.random() * 100) + 10,
            bandwidth: Math.floor(Math.random() * 1000) + 100
          };
        });
      });
      setConnectionStatus(newConnectionStatus);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getNodeIcon = (type) => {
    switch (type) {
      case 'server': return 'Server';
      case 'database': return 'Database';
      case 'application': return 'Globe';
      case 'gateway': return 'Router';
      case 'network': return 'Network';
      case 'security': return 'Shield';
      default: return 'Box';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getNodePosition = (nodeId, index) => {
    const positions = {
      central_server: { x: 50, y: 20 },
      health_db: { x: 20, y: 40 },
      education_db: { x: 35, y: 40 },
      pwd_db: { x: 65, y: 40 },
      rural_db: { x: 80, y: 40 },
      health_app: { x: 20, y: 60 },
      education_app: { x: 35, y: 60 },
      pwd_app: { x: 65, y: 60 },
      rural_app: { x: 80, y: 60 },
      api_gateway: { x: 50, y: 75 },
      load_balancer: { x: 50, y: 85 },
      firewall: { x: 50, y: 95 }
    };
    return positions?.[nodeId] || { x: 50, y: 50 };
  };

  const renderConnections = () => {
    const connections = [];
    networkNodes?.forEach(node => {
      const nodePos = getNodePosition(node?.id);
      node?.connections?.forEach(connId => {
        const connectedNode = networkNodes?.find(n => n?.id === connId);
        if (connectedNode) {
          const connPos = getNodePosition(connId);
          const connectionId = `${node?.id}-${connId}`;
          const connStatus = connectionStatus?.[connectionId];
          
          connections?.push(
            <line
              key={connectionId}
              x1={`${nodePos?.x}%`}
              y1={`${nodePos?.y}%`}
              x2={`${connPos?.x}%`}
              y2={`${connPos?.y}%`}
              stroke={connStatus?.status === 'degraded' ? '#f59e0b' : '#10b981'}
              strokeWidth="2"
              strokeDasharray={connStatus?.status === 'degraded' ? '5,5' : 'none'}
              opacity="0.6"
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Network Topology</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              networkHealth === 'healthy' ? 'bg-success' :
              networkHealth === 'warning' ? 'bg-warning' : 'bg-error'
            } animate-pulse`} />
            <span className="text-sm text-muted-foreground">
              Network {networkHealth}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-muted-foreground">Healthy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-success" />
            <span className="text-muted-foreground">Healthy Connection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-warning" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">Degraded Connection</span>
          </div>
        </div>
      </div>
      {/* Network Diagram */}
      <div className="relative h-96 p-4">
        <svg className="w-full h-full">
          {/* Render connections */}
          {renderConnections()}
          
          {/* Render nodes */}
          {networkNodes?.map((node, index) => {
            const position = getNodePosition(node?.id, index);
            return (
              <g key={node?.id}>
                <circle
                  cx={`${position?.x}%`}
                  cy={`${position?.y}%`}
                  r="20"
                  fill={getStatusColor(node?.status)}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedNode(node)}
                />
                <text
                  x={`${position?.x}%`}
                  y={`${position?.y + 8}%`}
                  textAnchor="middle"
                  className="text-xs font-medium fill-white pointer-events-none"
                >
                  {node?.type?.charAt(0)?.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Node Details Panel */}
        {selectedNode && (
          <div className="absolute top-4 right-4 w-72 bg-card border border-border rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{selectedNode?.name}</h4>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name={getNodeIcon(selectedNode?.type)} size={16} />
                <span className="text-sm text-muted-foreground capitalize">
                  {selectedNode?.type}
                </span>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: getStatusColor(selectedNode?.status) }}
                >
                  {selectedNode?.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">CPU Usage:</span>
                  <div className="font-medium text-foreground">{selectedNode?.cpu}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Memory:</span>
                  <div className="font-medium text-foreground">{selectedNode?.memory}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Uptime:</span>
                  <div className="font-medium text-foreground">{selectedNode?.uptime}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">IP Address:</span>
                  <div className="font-medium text-foreground">{selectedNode?.ip}</div>
                </div>
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Location:</span>
                <div className="font-medium text-foreground">{selectedNode?.location}</div>
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Connections:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedNode?.connections?.map((connId) => {
                    const connectedNode = networkNodes?.find(n => n?.id === connId);
                    return (
                      <span
                        key={connId}
                        className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                      >
                        {connectedNode?.name || connId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Network Statistics */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">
              {networkNodes?.filter(n => n?.status === 'healthy')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Healthy Nodes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">
              {networkNodes?.filter(n => n?.status === 'warning')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-error">
              {networkNodes?.filter(n => n?.status === 'critical')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {Object.keys(connectionStatus)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active Connections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;