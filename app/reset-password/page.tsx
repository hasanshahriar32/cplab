import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-30 delay-700"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Suspense fallback={
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-blue-500 border-r-cyan-500 mx-auto"></div>
              <div className="animate-ping absolute inset-0 rounded-full h-12 w-12 border-2 border-blue-400 opacity-20"></div>
            </div>
            <p className="mt-4 text-blue-100 font-medium">Initializing secure environment...</p>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-blue-200/60 text-sm font-medium tracking-wide">
          Cyber Physical Lab • Secure Authentication
        </p>
      </div>
    </div>
  );
}
