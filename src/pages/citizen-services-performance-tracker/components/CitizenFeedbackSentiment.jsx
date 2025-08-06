import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CitizenFeedbackSentiment = () => {
  const [viewType, setViewType] = useState('sentiment');
  const [timeRange, setTimeRange] = useState('week');
  const [isLiveChat, setIsLiveChat] = useState(true);
  const [newFeedback, setNewFeedback] = useState([]);

  const sentimentData = [
    { name: 'Positive', value: 65, color: '#10b981', count: 3250 },
    { name: 'Neutral', value: 22, color: '#6b7280', count: 1100 },
    { name: 'Negative', value: 13, color: '#ef4444', count: 650 }
  ];

  const trendingIssues = [
    { issue: 'Long waiting times', count: 245, sentiment: 'negative', change: '+12%' },
    { issue: 'Helpful staff', count: 189, sentiment: 'positive', change: '+8%' },
    { issue: 'Digital process easy', count: 167, sentiment: 'positive', change: '+15%' },
    { issue: 'Document requirements unclear', count: 134, sentiment: 'negative', change: '+5%' },
    { issue: 'Quick service delivery', count: 98, sentiment: 'positive', change: '+22%' }
  ];

  const feedbackTrends = [
    { period: 'Mon', positive: 85, neutral: 25, negative: 15 },
    { period: 'Tue', positive: 92, neutral: 28, negative: 12 },
    { period: 'Wed', positive: 78, neutral: 32, negative: 18 },
    { period: 'Thu', positive: 88, neutral: 22, negative: 14 },
    { period: 'Fri', positive: 95, neutral: 20, negative: 10 },
    { period: 'Sat', positive: 72, neutral: 35, negative: 22 },
    { period: 'Today', positive: 89, neutral: 24, negative: 13 }
  ];

  const liveFeedback = [
    {
      id: 1,
      citizen: 'Rajesh Kumar',
      service: 'Birth Certificate',
      feedback: 'Very quick service, got my certificate in just 2 days!',
      sentiment: 'positive',
      timestamp: new Date(Date.now() - 300000),
      rating: 5
    },
    {
      id: 2,
      citizen: 'Priya Sharma',
      service: 'Driving License',
      feedback: 'The online process was confusing, needed to visit office multiple times.',
      sentiment: 'negative',
      timestamp: new Date(Date.now() - 600000),
      rating: 2
    },
    {
      id: 3,
      citizen: 'Mohan Singh',
      service: 'Property Tax',
      feedback: 'Payment was smooth through the app.',
      sentiment: 'positive',
      timestamp: new Date(Date.now() - 900000),
      rating: 4
    }
  ];

  useEffect(() => {
    // Simulate real-time feedback updates
    const interval = setInterval(() => {
      if (isLiveChat && Math.random() > 0.7) {
        const mockFeedback = {
          id: Date.now(),
          citizen: 'Anonymous User',
          service: 'Service Request',
          feedback: 'New feedback received...',
          sentiment: Math.random() > 0.7 ? 'positive' : Math.random() > 0.5 ? 'neutral' : 'negative',
          timestamp: new Date(),
          rating: Math.floor(Math.random() * 5) + 1
        };
        setNewFeedback(prev => [mockFeedback, ...prev?.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isLiveChat]);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'ThumbsUp';
      case 'negative': return 'ThumbsDown';
      case 'neutral': return 'Minus';
      default: return 'MessageCircle';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success bg-success/10';
      case 'negative': return 'text-error bg-error/10';
      case 'neutral': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-muted-foreground capitalize">{entry?.dataKey}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Citizen Feedback Analysis</h3>
            <p className="text-sm text-muted-foreground">Real-time sentiment tracking and insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-md p-1">
            <button
              onClick={() => setViewType('sentiment')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewType === 'sentiment' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sentiment
            </button>
            <button
              onClick={() => setViewType('trends')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewType === 'trends' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Trends
            </button>
            <button
              onClick={() => setViewType('live')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewType === 'live' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Live Feed
            </button>
          </div>
          <button
            onClick={() => setIsLiveChat(!isLiveChat)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isLiveChat ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isLiveChat ? 'bg-success-foreground animate-pulse' : 'bg-muted-foreground'}`} />
            <span>{isLiveChat ? 'Live' : 'Paused'}</span>
          </button>
        </div>
      </div>
      {viewType === 'sentiment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Distribution */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Sentiment Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    labelFormatter={() => 'Sentiment Analysis'}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {sentimentData?.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }} />
                    <span className="text-sm font-medium text-foreground">{item?.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{item?.count} responses</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Issues */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Trending Issues</h4>
            <div className="space-y-3">
              {trendingIssues?.map((issue, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={getSentimentIcon(issue?.sentiment)} size={16} 
                            className={issue?.sentiment === 'positive' ? 'text-success' : 
                                     issue?.sentiment === 'negative' ? 'text-error' : 'text-muted-foreground'} />
                      <span className="text-sm font-medium text-foreground">{issue?.issue}</span>
                    </div>
                    <span className="text-xs text-success font-medium">{issue?.change}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{issue?.count} mentions</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(issue?.sentiment)}`}>
                      {issue?.sentiment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {viewType === 'trends' && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Weekly Feedback Trends</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedbackTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill="#6b7280" name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {viewType === 'live' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Live Feedback Stream</h4>
            <div className="text-xs text-muted-foreground">
              {isLiveChat ? 'Updates every 10 seconds' : 'Updates paused'}
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[...newFeedback, ...liveFeedback]?.map((feedback) => (
              <div key={feedback?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSentimentColor(feedback?.sentiment)}`}>
                      <Icon name={getSentimentIcon(feedback?.sentiment)} size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{feedback?.citizen}</div>
                      <div className="text-xs text-muted-foreground">{feedback?.service}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5]?.map(star => (
                        <Icon 
                          key={star} 
                          name="Star" 
                          size={12} 
                          className={star <= feedback?.rating ? "text-warning" : "text-muted-foreground"} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(feedback?.timestamp)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{feedback?.feedback}</p>
              </div>
            ))}
          </div>

          {[...newFeedback, ...liveFeedback]?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No recent feedback available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitizenFeedbackSentiment;