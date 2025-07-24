'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Lock, Eye, EyeOff, Shield, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [validToken, setValidToken] = useState<boolean | null>(null);

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  useEffect(() => {
    if (token) {
      // Verify token validity
      verifyToken();
    } else {
      setValidToken(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch('/api/auth/verify-reset-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setValidToken(true);
      } else {
        setValidToken(false);
      }
    } catch (error) {
      setValidToken(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setResult({ success: false, message: 'Please enter a new password' });
      return;
    }

    if (password.length < 6) {
      setResult({ success: false, message: 'Password must be at least 6 characters long' });
      return;
    }

    if (password !== confirmPassword) {
      setResult({ success: false, message: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, message: 'Password reset successfully! You can now log in with your new password.' });
        setPassword('');
        setConfirmPassword('');
      } else {
        setResult({ success: false, message: data.error || 'Failed to reset password' });
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

  if (validToken === null) {
    return (
      <Card className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400 border-r-cyan-400 mx-auto"></div>
              <div className="animate-ping absolute inset-0 rounded-full h-12 w-12 border-2 border-white/30 opacity-30"></div>
            </div>
            <p className="mt-4 text-white/90 font-medium">Verifying reset token...</p>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (validToken === false) {
    return (
      <Card className="w-full max-w-lg mx-4 bg-white/10 backdrop-blur-lg border-red-500/30 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-red-500/30">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-2xl text-red-400 font-bold tracking-wide">
            Invalid Reset Link
          </CardTitle>
          <CardDescription className="text-red-200/80 text-base">
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <p className="text-red-200/90 leading-relaxed">
              Security tokens expire after 1 hour for your protection. 
              Please request a new password reset link from the login page.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/admin/login'}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Login
            </Button>
            
            <p className="text-white/60 text-sm">
              Need help? Contact{' '}
              <a href="mailto:support@cyberphysicallab.com" className="text-cyan-400 hover:text-cyan-300 underline">
                support@cyberphysicallab.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-blue-500/30 shadow-lg">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <CardTitle className="text-3xl text-white font-bold tracking-wide mb-2">
          Reset Your Password
        </CardTitle>
        <CardDescription className="text-blue-200/80 text-base">
          Create a new secure password for your account
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleResetPassword} className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-white/90 tracking-wide">
              New Password *
            </label>
            <div className="relative group">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                minLength={6}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/50 pr-12 py-3 rounded-lg backdrop-blur-sm transition-all duration-300"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        index < passwordStrength 
                          ? strengthColors[passwordStrength - 1] 
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/70">
                  Password strength: {' '}
                  <span className={`font-semibold ${
                    passwordStrength === 4 ? 'text-green-400' :
                    passwordStrength === 3 ? 'text-yellow-400' :
                    passwordStrength === 2 ? 'text-orange-400' :
                    'text-red-400'
                  }`}>
                    {strengthLabels[passwordStrength - 1] || 'Too short'}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white/90 tracking-wide">
              Confirm New Password *
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                minLength={6}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/50 pr-12 py-3 rounded-lg backdrop-blur-sm transition-all duration-300"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {confirmPassword.length > 0 && (
              <div className="flex items-center space-x-2 text-xs">
                {password === confirmPassword ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={loading || password !== confirmPassword || password.length < 6}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-transparent border-t-white border-r-white/70 mr-3"></div>
                Resetting Password...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-3" />
                Reset Password
              </>
            )}
          </Button>

          {/* Result Alert */}
          {result && (
            <Alert className={`${
              result.success 
                ? 'border-green-500/30 bg-green-500/10 backdrop-blur-sm' 
                : 'border-red-500/30 bg-red-500/10 backdrop-blur-sm'
            } rounded-lg`}>
              <AlertDescription>
                <div className="flex items-start space-x-3">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`${result.success ? 'text-green-300' : 'text-red-300'} font-medium`}>
                      {result.message}
                    </p>
                    {result.success && (
                      <div className="mt-3">
                        <Button 
                          onClick={() => window.location.href = '/admin/login'}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Go to Login
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </form>

        {/* Security Info */}
        <div className="pt-4 border-t border-white/10">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/90">Password Requirements:</h4>
            <ul className="text-xs text-white/70 space-y-1">
              <li className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                <span>At least 8 characters long</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${password.match(/[a-z]/) && password.match(/[A-Z]/) ? 'bg-green-400' : 'bg-white/30'}`}></div>
                <span>Mixed case letters (a-z, A-Z)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${password.match(/\d/) ? 'bg-green-400' : 'bg-white/30'}`}></div>
                <span>At least one number (0-9)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${password.match(/[^a-zA-Z\d]/) ? 'bg-green-400' : 'bg-white/30'}`}></div>
                <span>Special character (!@#$%^&*)</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
