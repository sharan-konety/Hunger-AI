"use client";

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    // Here you could send the error to a logging service like Sentry
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-3xl font-light text-slate-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-600 font-light mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix it.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-all duration-300"
              >
                Go Back
              </button>
            </div>
            
            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-slate-500 font-medium mb-2">
                  Error Details (Development)
                </summary>
                <pre className="bg-slate-100 p-4 rounded-lg text-xs text-slate-700 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specific error boundary for cart operations
export class CartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Cart error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-2xl mb-3">⚠️</div>
          <h3 className="text-red-800 font-medium mb-2">Cart Error</h3>
          <p className="text-red-600 text-sm mb-4">
            There was an issue with your cart. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle async errors
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: string) => {
    console.error('Async error caught:', error, errorInfo);
    // You could send this to an error reporting service
  };
};

export default ErrorBoundary; 