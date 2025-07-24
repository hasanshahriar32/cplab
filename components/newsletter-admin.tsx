'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Send, Users, Mail, Calendar, TrendingUp } from 'lucide-react';

export function NewsletterAdmin() {
  const [campaigns, setCampaigns] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    totalCampaigns: 0,
    lastSent: null,
  });

  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
    htmlContent: '',
    targetAudience: ['all'],
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  const interests = [
    { value: 'all', label: 'All Subscribers' },
    { value: 'research', label: 'Research Interest' },
    { value: 'news', label: 'News Interest' },
    { value: 'publications', label: 'Publications Interest' },
    { value: 'jobs', label: 'Jobs Interest' },
    { value: 'general', label: 'General Interest' },
  ];

  useEffect(() => {
    fetchStats();
    fetchCampaigns();
    fetchSubscribers();
  }, []);

  const fetchStats = async () => {
    try {
      const [subscribersRes, campaignsRes] = await Promise.all([
        fetch('/api/newsletter-subscribers'),
        fetch('/api/newsletter-campaigns'),
      ]);

      const subscribersData = await subscribersRes.json();
      const campaignsData = await campaignsRes.json();

      const activeSubscribers = subscribersData.docs?.filter((sub: any) => sub.status === 'active').length || 0;
      const lastSentCampaign = campaignsData.docs?.find((camp: any) => camp.status === 'sent');

      setStats({
        totalSubscribers: subscribersData.totalDocs || 0,
        activeSubscribers,
        totalCampaigns: campaignsData.totalDocs || 0,
        lastSent: lastSentCampaign?.sentAt || null,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/newsletter-campaigns?limit=10&sort=-createdAt');
      const data = await response.json();
      setCampaigns(data.docs || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter-subscribers?limit=100&where[status][equals]=active');
      const data = await response.json();
      setSubscribers(data.docs || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.subject || !newCampaign.content) {
      setResult({ success: false, message: 'Subject and content are required' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // First create the campaign
      const createResponse = await fetch('/api/newsletter-campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newCampaign,
          status: 'draft',
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create campaign');
      }

      const campaign = await createResponse.json();

      // Then send the campaign
      const sendResponse = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId: campaign.doc.id,
          subject: newCampaign.subject,
          content: newCampaign.content,
          htmlContent: newCampaign.htmlContent,
          targetAudience: newCampaign.targetAudience,
        }),
      });

      const sendData = await sendResponse.json();

      if (sendResponse.ok) {
        setResult({ 
          success: true, 
          message: 'Newsletter sent successfully!',
          details: sendData.results 
        });
        setNewCampaign({
          subject: '',
          content: '',
          htmlContent: '',
          targetAudience: ['all'],
        });
        fetchStats();
        fetchCampaigns();
      } else {
        setResult({ success: false, message: sendData.error || 'Failed to send newsletter' });
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send newsletter',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold">{stats.totalSubscribers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeSubscribers}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
              </div>
              <Mail className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Sent</p>
                <p className="text-sm font-semibold">
                  {stats.lastSent ? new Date(stats.lastSent).toLocaleDateString() : 'Never'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign */}
      <Card>
        <CardHeader>
          <CardTitle>Send Newsletter Campaign</CardTitle>
          <CardDescription>
            Create and send a newsletter to your subscribers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject Line *
            </label>
            <Input
              id="subject"
              value={newCampaign.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setNewCampaign({ ...newCampaign, subject: e.target.value })
              }
              placeholder="Monthly Research Update - January 2025"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content *
            </label>
            <Textarea
              id="content"
              rows={8}
              value={newCampaign.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                setNewCampaign({ ...newCampaign, content: e.target.value })
              }
              placeholder="Write your newsletter content here..."
            />
          </div>

          <div>
            <label htmlFor="htmlContent" className="block text-sm font-medium mb-1">
              HTML Content (Optional)
            </label>
            <Textarea
              id="htmlContent"
              rows={6}
              value={newCampaign.htmlContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                setNewCampaign({ ...newCampaign, htmlContent: e.target.value })
              }
              placeholder="<h1>Custom HTML content...</h1>"
            />
            <p className="text-xs text-gray-500 mt-1">
              If provided, this will override the text content with custom HTML
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Target Audience
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest.value}
                  variant={newCampaign.targetAudience.includes(interest.value) ? "default" : "outline"}
                  className="cursor-pointer transition-colors hover:bg-blue-100"
                  onClick={() => {
                    setNewCampaign(prev => ({
                      ...prev,
                      targetAudience: prev.targetAudience.includes(interest.value)
                        ? prev.targetAudience.filter(i => i !== interest.value)
                        : [...prev.targetAudience, interest.value]
                    }));
                  }}
                >
                  {interest.label}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={createCampaign} 
            disabled={loading || !newCampaign.subject || !newCampaign.content}
            className="w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Newsletter...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Newsletter Campaign
              </>
            )}
          </Button>

          {result && (
            <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={result.success ? 'default' : 'destructive'}>
                      {result.success ? 'Success' : 'Error'}
                    </Badge>
                    <span>{result.message}</span>
                  </div>
                  {result.details && (
                    <div className="text-sm space-y-1">
                      <p>Total Recipients: {result.details.totalRecipients}</p>
                      <p className="text-green-600">Successfully Sent: {result.details.successful}</p>
                      {result.details.failed > 0 && (
                        <p className="text-red-600">Failed: {result.details.failed}</p>
                      )}
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>
            Your latest newsletter campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No campaigns found</p>
            ) : (
              campaigns.map((campaign: any) => (
                <div key={campaign.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{campaign.subject}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {campaign.content?.substring(0, 100)}...
                      </p>
                    </div>
                    <Badge variant={
                      campaign.status === 'sent' ? 'default' :
                      campaign.status === 'failed' ? 'destructive' :
                      campaign.status === 'sending' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {campaign.recipientCount || 0} recipients
                    </span>
                    <span>
                      {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString() : 
                       new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {campaign.successCount !== undefined && (
                    <div className="text-xs space-x-4">
                      <span className="text-green-600">✓ {campaign.successCount} sent</span>
                      {campaign.failureCount > 0 && (
                        <span className="text-red-600">✗ {campaign.failureCount} failed</span>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
