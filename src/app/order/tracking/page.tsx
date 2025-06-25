'use client';

import React, { useEffect, useState } from 'react';

const statuses = [
  { 
    label: 'Preparing', 
    description: 'Our skilled chefs are crafting your order with care.',
    icon: '👨‍🍳',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    label: 'Out for Delivery', 
    description: 'Your meal is on its way to you.',
    icon: '🚗',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    label: 'Delivered', 
    description: 'Your order has arrived. Enjoy your culinary experience!',
    icon: '✨',
    color: 'from-emerald-500 to-cyan-500'
  },
];

export default function OrderTrackingPage() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (statusIndex >= statuses.length - 1) return;

    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < statuses.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [statusIndex]);

  const currentStatus = statuses[statusIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 tracking-tight">
            Order Tracking
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Follow your order&apos;s journey from our kitchen to your doorstep.
          </p>
        </div>

        {/* Main Tracking Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 mb-12">
          {/* Current Status Display */}
          <div className="text-center mb-12">
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${currentStatus.color} flex items-center justify-center mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300`}>
              <span className="text-5xl">{currentStatus.icon}</span>
            </div>
            
            <h2 className="text-3xl font-light text-slate-900 mb-4 tracking-tight">
              {currentStatus.label}
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-md mx-auto leading-relaxed">
              {currentStatus.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-12">
            <div className="flex justify-between items-center">
              {statuses.map((status, idx) => (
                <div key={status.label} className="flex flex-col items-center relative z-10">
                  {/* Status Circle */}
                  <div
                    className={`w-6 h-6 rounded-full transition-all duration-500 mb-4 ${
                      idx <= statusIndex
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg'
                        : 'bg-slate-200'
                    }`}
                  />
                  
                  {/* Status Label */}
                  <span
                    className={`text-sm font-light transition-all duration-300 ${
                      idx === statusIndex
                        ? 'text-cyan-600 font-medium'
                        : idx < statusIndex
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {status.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-slate-200 -z-10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-1000 ease-out"
                style={{ width: `${(statusIndex / (statuses.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Order Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-slate-600 font-light">Order Number</span>
                <div className="text-slate-900 font-medium">#HG-{Math.floor(Math.random() * 10000)}</div>
              </div>
              <div>
                <span className="text-slate-600 font-light">Estimated Time</span>
                <div className="text-slate-900 font-medium">
                  {statusIndex === 0 ? '15-20 min' : statusIndex === 1 ? '5-10 min' : 'Delivered'}
                </div>
              </div>
              <div>
                <span className="text-slate-600 font-light">Delivery Address</span>
                <div className="text-slate-900 font-medium">Your Location</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Live Updates</h3>
            <p className="text-slate-600 font-light text-sm">Real-time notifications about your order</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Precise Timing</h3>
            <p className="text-slate-600 font-light text-sm">Accurate delivery time estimates</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <div className="text-3xl mb-4">🌟</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Quality Assured</h3>
            <p className="text-slate-600 font-light text-sm">Fresh and hot delivery guaranteed</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
