import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApprovalWorkflowStatus = ({ workflows, title }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-success bg-success/10 border-success/20';
      case 'Pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'Under Review': return 'text-primary bg-primary/10 border-primary/20';
      case 'Rejected': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return 'CheckCircle';
      case 'Pending': return 'Clock';
      case 'Under Review': return 'Eye';
      case 'Rejected': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button variant="ghost" size="sm" iconName="RefreshCw" />
      </div>
      <div className="space-y-4">
        {workflows?.map((workflow, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {workflow?.title}
                  </h4>
                  <span className={`text-xs font-medium ${getPriorityColor(workflow?.priority)}`}>
                    {workflow?.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{workflow?.department}</p>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow?.status)}`}>
                <div className="flex items-center space-x-1">
                  <Icon name={getStatusIcon(workflow?.status)} size={12} />
                  <span>{workflow?.status}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <span className="ml-1 font-medium text-foreground">
                  ₹{workflow?.amount?.toLocaleString('en-IN')} Cr
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <span className="ml-1 text-foreground">{workflow?.submittedDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {workflow?.approvers?.slice(0, 3)?.map((approver, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center"
                      title={approver?.name}
                    >
                      <span className="text-xs font-medium text-primary">
                        {approver?.name?.charAt(0)}
                      </span>
                    </div>
                  ))}
                  {workflow?.approvers?.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        +{workflow?.approvers?.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {workflow?.currentStep} of {workflow?.totalSteps} steps
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" iconName="Eye" />
                <Button variant="ghost" size="sm" iconName="MessageSquare" />
                {workflow?.status === 'Pending' && (
                  <Button variant="ghost" size="sm" iconName="Clock" />
                )}
              </div>
            </div>

            {workflow?.status === 'Pending' && workflow?.daysWaiting > 0 && (
              <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={14} className="text-warning" />
                  <span className="text-xs text-warning">
                    Waiting for {workflow?.daysWaiting} days - {workflow?.nextApprover}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3">
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(workflow?.currentStep / workflow?.totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-warning">
              {workflows?.filter(w => w?.status === 'Pending')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {workflows?.filter(w => w?.status === 'Under Review')?.length}
            </div>
            <div className="text-xs text-muted-foreground">In Review</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">
              {workflows?.filter(w => w?.status === 'Approved')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflowStatus;