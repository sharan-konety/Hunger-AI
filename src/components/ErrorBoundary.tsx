"use client";

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// General Error Boundary
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🍽️</div>
            <h1 className="text-3xl font-light text-slate-900 mb-4">Oops! Something went wrong</h1>
            <p className="text-slate-600 font-light mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry - your cart is safe! 
              Try refreshing the page or go back to explore our delicious restaurants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-medium hover:from-slate-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Refresh Page
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-all duration-300"
              >
                Go to Home
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <summary className="text-red-800 font-medium cursor-pointer">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-red-700 text-sm overflow-auto">
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

// Cart-specific Error Boundary
export class CartErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Cart Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 m-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-red-800 font-medium">Cart Error</h3>
          </div>
          
          <p className="text-red-700 text-sm mb-4">
            There was a problem with your cart. Your items are still safe!
          </p>
          
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Refresh Cart
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;