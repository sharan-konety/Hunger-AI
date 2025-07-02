"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

interface CartProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen }) => {
  const { items, removeFromCart, clearCart, getTotalPrice, currentRestaurant, completeOrder } = useCart();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCheckout = () => {
    completeOrder(); // This saves the order and clears the cart
    setShowOrderConfirmation(true);
    setTimeout(() => {
      setShowOrderConfirmation(false);
      setIsOpen(false);
    }, 3000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Cart Modal */}
      <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-end p-4 md:p-8">
        <div className={`
          relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 
          transform transition-all duration-300 ease-out flex flex-col
          ${isOpen 
            ? 'translate-y-0 scale-100 opacity-100' 
            : 'translate-y-8 scale-95 opacity-0'
          }
          md:max-w-md max-h-[90vh] md:max-h-[85vh]
        `}>
          {/* Header */}
          <div className="flex-shrink-0 bg-white border-b border-slate-100 p-6 md:p-8 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-tight">Your Cart</h2>
                <p className="text-slate-600 font-light mt-1 text-sm md:text-base">
                  {items.length === 0 ? 'No items selected' : `${items.length} item${items.length > 1 ? 's' : ''} selected`}
                </p>
                {currentRestaurant && (
                  <p className="text-cyan-600 font-medium text-sm mt-1">
                    From {currentRestaurant.name}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-all duration-300 flex-shrink-0"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {showOrderConfirmation ? (
              <div className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-3">Order Confirmed!</h3>
                <p className="text-slate-600 font-light mb-4">Thank you for choosing Hunger.</p>
                <p className="text-lg text-cyan-600 font-medium mb-6">
                  Estimated delivery: <span className="font-semibold">15-30 minutes</span>
                </p>
                <a
                  href="/orders"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Order History
                </a>
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-slate-900 mb-3">Your cart is empty</h3>
                <p className="text-slate-600 font-light text-sm md:text-base">Discover our curated selection of restaurants and add some delicious items to get started.</p>
              </div>
            ) : (
              <div className="p-4 md:p-6 space-y-4">
                {items.map((item, idx) => (
                  <div key={item.id + idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all duration-300">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 mb-1 truncate">{item.name}</h4>
                      <div className="flex items-center gap-3">
                        <p className="text-cyan-600 font-medium">${item.price.toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <span className="text-slate-500 text-sm">× {item.quantity}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all duration-300 ml-4 flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Always Visible */}
          {!showOrderConfirmation && items.length > 0 && (
            <div className="flex-shrink-0 bg-white border-t border-slate-100 p-4 md:p-6 rounded-b-3xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-light text-slate-900">Total</span>
                <span className="text-2xl font-medium text-slate-900">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-2xl px-4 md:px-6 py-3 md:py-4 font-medium transition-all duration-300 text-sm md:text-base"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-2xl px-6 md:px-8 py-3 md:py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
