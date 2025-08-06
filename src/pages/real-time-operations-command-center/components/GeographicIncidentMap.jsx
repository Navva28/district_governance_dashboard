import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicIncidentMap = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [mapView, setMapView] = useState('satellite');
  const [showResolved, setShowResolved] = useState(false);

  const incidentTypes = [
    { id: 'infrastructure', label: 'Infrastructure', color: '#ef4444', icon: 'Construction' },
    { id: 'health', label: 'Health Emergency', color: '#dc2626', icon: 'Heart' },
    { id: 'security', label: 'Security', color: '#7c3aed', icon: 'Shield' },
    { id: 'environmental', label: 'Environmental', color: '#059669', icon: 'Leaf' },
    { id: 'traffic', label: 'Traffic', color: '#ea580c', icon: 'Car' },
    { id: 'utility', label: 'Utility', color: '#0891b2', icon: 'Zap' }
  ];

  const initialIncidents = [
    {
      id: 1,
      type: 'infrastructure',
      title: 'Road Blockage - NH48',
      description: 'Major road blockage due to fallen tree blocking traffic',
      lat: 19.0760,
      lng: 72.8777,
      severity: 'high',
      status: 'active',
      reportedAt: new Date(Date.now() - 1800000),
      department: 'PWD',
      assignedTeam: 'Emergency Response Team A',
      estimatedResolution: '2 hours'
    },
    {
      id: 2,
      type: 'health',
      title: 'Medical Emergency',
      description: 'Multiple casualties reported at construction site',
      lat: 19.0896,
      lng: 72.8656,
      severity: 'critical',
      status: 'active',
      reportedAt: new Date(Date.now() - 900000),
      department: 'Health',
      assignedTeam: 'Medical Response Unit',
      estimatedResolution: '1 hour'
    },
    {
      id: 3,
      type: 'utility',
      title: 'Power Outage',
      description: 'Widespread power outage affecting 5000+ households',
      lat: 19.0728,
      lng: 72.8826,
      severity: 'medium',
      status: 'investigating',
      reportedAt: new Date(Date.now() - 2700000),
      department: 'Utilities',
      assignedTeam: 'Power Restoration Team',
      estimatedResolution: '4 hours'
    },
    {
      id: 4,
      type: 'environmental',
      title: 'Water Contamination',
      description: 'Suspected water contamination in residential area',
      lat: 19.0825,
      lng: 72.8735,
      severity: 'high',
      status: 'resolved',
      reportedAt: new Date(Date.now() - 7200000),
      resolvedAt: new Date(Date.now() - 3600000),
      department: 'Health',
      assignedTeam: 'Environmental Health Unit',
      resolution: 'Water supply restored after testing'
    },
    {
      id: 5,
      type: 'security',
      title: 'Security Alert',
      description: 'Suspicious activity reported near government building',
      lat: 19.0785,
      lng: 72.8690,
      severity: 'medium',
      status: 'monitoring',
      reportedAt: new Date(Date.now() - 1200000),
      department: 'Security',
      assignedTeam: 'Security Patrol Unit',
      estimatedResolution: '30 minutes'
    },
    {
      id: 6,
      type: 'traffic',
      title: 'Traffic Congestion',
      description: 'Heavy traffic congestion due to festival procession',
      lat: 19.0744,
      lng: 72.8794,
      severity: 'low',
      status: 'monitoring',
      reportedAt: new Date(Date.now() - 600000),
      department: 'Traffic Police',
      assignedTeam: 'Traffic Management Team',
      estimatedResolution: '3 hours'
    }
  ];

  useEffect(() => {
    setIncidents(initialIncidents);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#dc2626';
      case 'investigating': return '#ea580c';
      case 'monitoring': return '#ca8a04';
      case 'resolved': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getIncidentTypeData = (typeId) => {
    return incidentTypes?.find(type => type?.id === typeId) || incidentTypes?.[0];
  };

  const filteredIncidents = showResolved 
    ? incidents 
    : incidents?.filter(incident => incident?.status !== 'resolved');

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Geographic Incident Map</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowResolved(!showResolved)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
                showResolved 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name="Eye" size={14} />
              <span>Show Resolved</span>
            </button>
            <select
              value={mapView}
              onChange={(e) => setMapView(e?.target?.value)}
              className="px-3 py-1 rounded-md border border-border bg-card text-foreground text-sm"
            >
              <option value="satellite">Satellite</option>
              <option value="roadmap">Road Map</option>
              <option value="terrain">Terrain</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          {incidentTypes?.map((type) => {
            const count = filteredIncidents?.filter(i => i?.type === type?.id)?.length;
            return (
              <div key={type?.id} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type?.color }}
                />
                <span className="text-muted-foreground">
                  {type?.label} ({count})
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative">
        <div className="h-96 bg-muted rounded-b-lg overflow-hidden">
          {/* Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="District Incident Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=19.0760,72.8777&z=12&output=embed&maptype=${mapView}`}
            className="border-0"
          />
          
          {/* Incident Markers Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {filteredIncidents?.map((incident, index) => {
              const typeData = getIncidentTypeData(incident?.type);
              return (
                <div
                  key={incident?.id}
                  className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + (index % 5) * 15}%`,
                    top: `${30 + Math.floor(index / 5) * 20}%`
                  }}
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: getSeverityColor(incident?.severity) }}
                  >
                    <Icon name={typeData?.icon} size={12} color="white" />
                  </div>
                  {incident?.severity === 'critical' && (
                    <div className="absolute -inset-2 rounded-full border-2 border-error animate-ping opacity-75" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Incident Details Panel */}
        {selectedIncident && (
          <div className="absolute top-4 right-4 w-80 bg-card border border-border rounded-lg shadow-lg z-10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground">{selectedIncident?.title}</h4>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getIncidentTypeData(selectedIncident?.type)?.icon} 
                    size={16} 
                    color={getIncidentTypeData(selectedIncident?.type)?.color}
                  />
                  <span className="text-sm text-muted-foreground">
                    {getIncidentTypeData(selectedIncident?.type)?.label}
                  </span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getStatusColor(selectedIncident?.status) }}
                  >
                    {selectedIncident?.status}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {selectedIncident?.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Severity:</span>
                    <div 
                      className="font-medium capitalize"
                      style={{ color: getSeverityColor(selectedIncident?.severity) }}
                    >
                      {selectedIncident?.severity}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Department:</span>
                    <div className="font-medium text-foreground">{selectedIncident?.department}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reported:</span>
                    <div className="font-medium text-foreground">
                      {formatTimestamp(selectedIncident?.reportedAt)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team:</span>
                    <div className="font-medium text-foreground">{selectedIncident?.assignedTeam}</div>
                  </div>
                </div>
                
                {selectedIncident?.status !== 'resolved' && selectedIncident?.estimatedResolution && (
                  <div className="p-2 bg-warning/10 rounded-md">
                    <div className="text-xs text-muted-foreground">Estimated Resolution:</div>
                    <div className="text-sm font-medium text-warning">
                      {selectedIncident?.estimatedResolution}
                    </div>
                  </div>
                )}
                
                {selectedIncident?.status === 'resolved' && (
                  <div className="p-2 bg-success/10 rounded-md">
                    <div className="text-xs text-muted-foreground">Resolution:</div>
                    <div className="text-sm font-medium text-success">
                      {selectedIncident?.resolution}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Resolved {formatTimestamp(selectedIncident?.resolvedAt)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-error">
              {filteredIncidents?.filter(i => i?.status === 'active')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active Incidents</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">
              {filteredIncidents?.filter(i => i?.severity === 'critical')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {filteredIncidents?.filter(i => i?.status === 'investigating')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Under Investigation</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">
              {incidents?.filter(i => i?.status === 'resolved')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Resolved Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicIncidentMap;