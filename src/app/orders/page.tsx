"use client";

import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

export default function OrdersPage() {
  const { pastOrders, reorder } = useCart();
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleReorder = async (orderId: string) => {
    setReorderingId(orderId);
    try {
      await reorder(orderId);
      // Show success feedback or redirect to cart
    } catch (error) {
      console.error('Failed to reorder:', error);
    } finally {
      setReorderingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-24 md:pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-4 md:mb-6 tracking-tight">
            Your Order History
          </h1>
          <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg text-slate-600 font-light">
            Reorder your favorite meals with just one click
          </p>
        </div>

        {/* Orders List */}
        {pastOrders.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <div className="text-5xl md:text-6xl mb-4 md:mb-6">🍽️</div>
            <h2 className="text-xl md:text-2xl font-light text-slate-900 mb-3 md:mb-4">No orders yet</h2>
            <p className="text-slate-600 font-light mb-6 md:mb-8 text-sm md:text-base">
              Start exploring our amazing restaurants and place your first order!
            </p>
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {pastOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Order Header */}
                <div className="p-4 md:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-1 truncate">
                          {order.restaurantName}
                        </h3>
                        <p className="text-slate-600 font-light text-sm md:text-base">
                          Order #{order.id.slice(-8)}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xl md:text-2xl font-medium text-slate-900">
                          ${order.total.toFixed(2)}
                        </div>
                        <div className="text-slate-600 font-light text-sm md:text-base">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-600 font-light text-sm">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 mb-1 text-sm md:text-base">{item.name}</h4>
                          <p className="text-slate-600 font-light text-xs md:text-sm line-clamp-2">{item.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-medium text-slate-900 text-sm md:text-base">
                            {item.quantity}x ${item.price.toFixed(2)}
                          </div>
                          <div className="text-slate-600 font-light text-xs md:text-sm">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reorder Button */}
                  <button
                    onClick={() => handleReorder(order.id)}
                    disabled={reorderingId === order.id}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 touch-target"
                  >
                    {reorderingId === order.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Reordering...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reorder
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 