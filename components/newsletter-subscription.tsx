'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, Mail, User, Users } from 'lucide-react';

interface NewsletterSubscriptionProps {
  showInterests?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

export function NewsletterSubscription({ 
  showInterests = true, 
  className = "",
  title = "Subscribe to Our Newsletter",
  description = "Stay updated with the latest research, publications, and lab news."
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['general']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const interests = [
    { value: 'research', label: 'Research Updates', icon: '🔬' },
    { value: 'news', label: 'News & Events', icon: '📰' },
    { value: 'publications', label: 'Publications', icon: '📚' },
    { value: 'jobs', label: 'Job Opportunities', icon: '💼' },
    { value: 'general', label: 'General Updates', icon: '📧' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setResult({ success: false, message: 'Please enter your email address' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          interests: selectedInterests,
          source: 'website',
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, message: data.message });
        // Reset form on success
        setEmail('');
        setFirstName('');
        setLastName('');
        setSelectedInterests(['general']);
      } else {
        setResult({ success: false, message: data.error || 'Failed to subscribe' });
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

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="newsletter-email" className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Name Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="newsletter-firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="newsletter-firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newsletter-lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                id="newsletter-lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Interests Selection */}
          {showInterests && (
            <div>
              <label className="block text-sm font-medium mb-2">
                What are you interested in? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest.value}
                    variant={selectedInterests.includes(interest.value) ? "default" : "outline"}
                    className="cursor-pointer transition-colors hover:bg-blue-100"
                    onClick={() => toggleInterest(interest.value)}
                  >
                    <span className="mr-1">{interest.icon}</span>
                    {interest.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Subscribe to Newsletter
              </>
            )}
          </Button>

          {/* Result Message */}
          {result && (
            <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <AlertDescription>
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  )}
                  <span className={result.success ? 'text-green-700' : 'text-red-700'}>
                    {result.message}
                  </span>
                </div>
                {result.success && (
                  <p className="text-green-600 text-sm mt-2">
                    Check your email for a welcome message!
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </form>

        {/* Privacy Note */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>We respect your privacy. Unsubscribe at any time.</p>
          <p>By subscribing, you agree to receive emails from Cyber Physical Lab.</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for sidebars or footers
export function CompactNewsletterSubscription({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setResult({ success: false, message: 'Please enter your email address' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          interests: ['general'],
          source: 'website',
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, message: 'Subscribed successfully!' });
        setEmail('');
      } else {
        setResult({ success: false, message: data.error || 'Failed to subscribe' });
      }
    } catch (error) {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Mail className="w-5 h-5 mr-2" />
        Newsletter
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Stay updated with our latest research and news.
      </p>
      
      <form onSubmit={handleSubscribe} className="space-y-3">
        <Input
          type="email"
          placeholder="your-email@example.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" size="sm" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>

      {result && (
        <p className={`text-xs mt-2 ${result.success ? 'text-green-600' : 'text-red-600'}`}>
          {result.message}
        </p>
      )}
    </div>
  );
}

export default NewsletterSubscription;
