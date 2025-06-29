// Render the restaurant's menu with name, description, price, and "Add to cart" button
// Use mock data from lib/data.ts
// Update cart context on add
"use client";

import React, { useState } from 'react';
import { restaurants, MenuItem } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useCart } from '@/components/CartContext';

const mockDeliveryTime = '20-30 min';
const mockDeliveryFee = 'Free delivery over $35';

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const restaurant = restaurants.find(r => r.id === resolvedParams.id);
  const { addToCart, currentRestaurant, clearCart } = useCart();
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);
  
  if (!restaurant) return notFound();

  const handleAddToCart = (item: MenuItem) => {
    const success = addToCart(item, restaurant.id, restaurant.name);
    
    if (!success) {
      // Show modal asking if user wants to clear cart
      setPendingItem(item);
      setShowRestaurantModal(true);
    }
  };

  const handleClearAndAdd = () => {
    if (pendingItem) {
      clearCart();
      addToCart(pendingItem, restaurant.id, restaurant.name);
    }
    setShowRestaurantModal(false);
    setPendingItem(null);
  };

  const handleCancelAdd = () => {
    setShowRestaurantModal(false);
    setPendingItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full">
          <div className="max-w-7xl mx-auto px-6 w-full pb-12 pt-32">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight drop-shadow-lg">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg mb-4">
                <span className="font-light">{restaurant.cuisine.join(' • ')}</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                </div>
                <span className="font-light">{mockDeliveryTime}</span>
                <span className="font-light text-cyan-300">{mockDeliveryFee}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-6 z-20 pt-24">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="font-light">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        {/* About Section */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6 tracking-tight">About {restaurant.name}</h2>
            <p className="text-lg text-slate-700 leading-relaxed font-light max-w-4xl">
              {restaurant.description}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-slate-100">
              <div className="text-center">
                <div className="text-3xl mb-3">🍽️</div>
                <div className="text-slate-800 font-medium mb-1">Premium Quality</div>
                <div className="text-slate-600 text-sm font-light">Fresh ingredients daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <div className="text-slate-800 font-medium mb-1">Fast Delivery</div>
                <div className="text-slate-600 text-sm font-light">{mockDeliveryTime}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">👨‍🍳</div>
                <div className="text-slate-800 font-medium mb-1">Expert Chefs</div>
                <div className="text-slate-600 text-sm font-light">Master craftsmanship</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⭐</div>
                <div className="text-slate-800 font-medium mb-1">{restaurant.rating.toFixed(1)} Rating</div>
                <div className="text-slate-600 text-sm font-light">Customer favorite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
              Our Menu
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light">
              Discover our carefully crafted dishes, each prepared with the finest ingredients 
              and culinary expertise to deliver an unforgettable dining experience.
            </p>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {restaurant.menu.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-cyan-200 p-8 transition-all duration-500 group transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1 mb-6">
                    <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-slate-900">
                      ${item.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Switch Modal */}
      {showRestaurantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-3">Different Restaurant</h3>
              <p className="text-slate-600 font-light">
                Your cart contains items from <span className="font-medium text-slate-800">{currentRestaurant?.name}</span>. 
                You can only order from one restaurant at a time.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleCancelAdd}
                className="flex-1 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-2xl px-6 py-3 font-medium transition-all duration-300"
              >
                Keep Current Cart
              </button>
              <button
                onClick={handleClearAndAdd}
                className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-2xl px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Clear & Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
