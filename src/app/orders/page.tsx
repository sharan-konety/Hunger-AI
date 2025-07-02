"use client";

import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

const OrdersPage = () => {
  const { pastOrders, reorder, currentRestaurant, clearCart } = useCart();
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);

  const handleReorder = (orderId: string) => {
    const success = reorder(orderId);
    
    if (!success) {
      // Show modal asking if user wants to clear cart
      setPendingOrderId(orderId);
      setShowReorderModal(true);
    }
  };

  const handleClearAndReorder = () => {
    if (pendingOrderId) {
      clearCart();
      reorder(pendingOrderId);
    }
    setShowReorderModal(false);
    setPendingOrderId(null);
  };

  const handleCancelReorder = () => {
    setShowReorderModal(false);
    setPendingOrderId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Order History
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Review your past orders and easily reorder your favorite meals with just one click.
          </p>
        </div>

        {/* Orders List */}
        {pastOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-2xl font-light text-slate-800 mb-4">No Past Orders</h3>
            <p className="text-slate-600 font-light mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start exploring our restaurants to make your first order!
            </p>
            <Link
              href="/restaurants"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Restaurants
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pastOrders.map((order, index) => (
              <div 
                key={order.id} 
                className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-medium text-slate-900 mb-2">
                      {order.restaurant.name}
                    </h3>
                    <p className="text-slate-600 font-light">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="text-right">
                      <div className="text-2xl font-medium text-slate-900">
                        ${order.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-500 font-light">
                        {order.items.reduce((total, item) => total + item.quantity, 0)} items
                      </div>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {order.status === 'completed' ? 'Delivered' : 'Completed'}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-slate-100 pt-6 mb-6">
                  <div className="grid gap-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <span className="font-medium text-slate-800">{item.name}</span>
                          <span className="text-slate-500 ml-2">x{item.quantity}</span>
                        </div>
                        <div className="text-slate-600 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleReorder(order.id)}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reorder
                  </button>
                  <Link
                    href={`/restaurants/${order.restaurant.id}`}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-600 rounded-xl font-medium transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    View Restaurant
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reorder Confirmation Modal */}
      {showReorderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-3">Different Restaurant</h3>
              <p className="text-slate-600 font-light">
                Your cart contains items from <span className="font-medium text-slate-800">{currentRestaurant?.name}</span>. 
                To reorder from a different restaurant, we'll need to clear your current cart.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleCancelReorder}
                className="flex-1 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-2xl px-6 py-3 font-medium transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAndReorder}
                className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-2xl px-6 py-3 font-medium transition-all duration-300"
              >
                Clear & Reorder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 