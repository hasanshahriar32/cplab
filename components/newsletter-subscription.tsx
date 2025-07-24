'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

interface Audience {
  id: string;
  name: string;
  description?: string;
}

interface SubscriptionResult {
  success: boolean;
  message: string;
  data?: {
    contact: any;
    alreadySubscribed?: boolean;
    resubscribed?: boolean;
    newSubscription?: boolean;
  };
}

interface NewsletterSubscriptionProps {
  audienceId?: string; // If provided, will subscribe to this specific audience
  title?: string;
  description?: string;
  showAudienceSelector?: boolean;
  className?: string;
}

export default function NewsletterSubscription({
  audienceId,
  title = "Stay Updated",
  description = "Subscribe to receive the latest updates and news.",
  showAudienceSelector = false,
  className = "",
}: NewsletterSubscriptionProps) {
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [selectedAudienceId, setSelectedAudienceId] = useState(audienceId || '');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubscriptionResult | null>(null);

  // Fetch available audiences if audience selector is enabled
  useEffect(() => {
    if (showAudienceSelector && !audienceId) {
      fetchAudiences();
    }
  }, [showAudienceSelector, audienceId]);

  const fetchAudiences = async () => {
    try {
      const response = await fetch('/api/audiences');
      const data = await response.json();
      
      if (data.success) {
        setAudiences(data.data);
        if (data.data.length === 1) {
          setSelectedAudienceId(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching audiences:', error);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setResult({ success: false, message: 'Please enter your email address' });
      return;
    }

    if (!selectedAudienceId) {
      setResult({ success: false, message: 'Please select an audience' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          audienceId: selectedAudienceId,
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        // Clear form on successful subscription
        setEmail('');
        setFirstName('');
        setLastName('');
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          {/* Audience Selector */}
          {showAudienceSelector && audiences.length > 1 && (
            <div>
              <label htmlFor="audience" className="block text-sm font-medium mb-1">
                Select Audience
              </label>
              <select
                id="audience"
                value={selectedAudienceId}
                onChange={(e) => setSelectedAudienceId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an audience...</option>
                {audiences.map((audience) => (
                  <option key={audience.id} value={audience.id}>
                    {audience.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>

          {/* Result Message */}
          {result && (
            <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <AlertDescription className="flex items-start space-x-2">
                {result.success && (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                )}
                <span className={result.success ? 'text-green-700' : 'text-red-700'}>
                  {result.message}
                </span>
              </AlertDescription>
            </Alert>
          )}
        </form>

        {/* Privacy Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
