// Render the restaurant's menu with name, description, price, and "Add to cart" button
// Use mock data from lib/data.ts
// Update cart context on add
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { restaurants, MenuItem } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { MenuItemSkeleton } from '@/components/LoadingSkeleton';

const mockDeliveryTime = '20-30 min';
const mockDeliveryFee = 'Free delivery over $35';

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const restaurant = restaurants.find(r => r.id === resolvedParams.id);
  const { items, addToCart, updateQuantity, currentRestaurant, clearCart } = useCart();
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get current quantity of an item in cart
  const getItemQuantity = (itemId: string): number => {
    const cartItem = items.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
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
      <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
        <Image
          src={restaurant.image}
          alt={`${restaurant.name} restaurant banner`}
          fill
          sizes="100vw"
          className="object-cover scale-105"
          priority={true}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+pP5+XsH4/mm2x8ZhUDsJA1A3OIl9TrUMeqlqUAIHIHBJ5HU/FMDcjZd8XkPbzjsjxtOTf/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full pb-8 md:pb-12 pt-20 md:pt-32">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4 tracking-tight drop-shadow-lg">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/90 text-sm md:text-lg mb-3 md:mb-4">
                <span className="font-light">{restaurant.cuisine.join(' • ')}</span>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 fill-current text-yellow-400" viewBox="0 0 20 20">
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
        <div className="absolute top-4 md:top-8 left-4 md:left-6 z-20 pt-16 md:pt-24">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg touch-target"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="font-light text-sm md:text-base">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-16 relative z-10">
        {/* About Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 lg:p-12">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4 md:mb-6 tracking-tight">About {restaurant.name}</h2>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed font-light max-w-4xl">
              {restaurant.description}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-100">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">🍽️</div>
                <div className="text-slate-800 font-medium mb-1 text-sm md:text-base">Premium Quality</div>
                <div className="text-slate-600 text-xs md:text-sm font-light">Fresh ingredients daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">🚀</div>
                <div className="text-slate-800 font-medium mb-1 text-sm md:text-base">Fast Delivery</div>
                <div className="text-slate-600 text-xs md:text-sm font-light">{mockDeliveryTime}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">👨‍🍳</div>
                <div className="text-slate-800 font-medium mb-1 text-sm md:text-base">Expert Chefs</div>
                <div className="text-slate-600 text-xs md:text-sm font-light">Master craftsmanship</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">⭐</div>
                <div className="text-slate-800 font-medium mb-1 text-sm md:text-base">{restaurant.rating.toFixed(1)} Rating</div>
                <div className="text-slate-600 text-xs md:text-sm font-light">Customer favorite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-4 md:mb-6 tracking-tight">
              Our Menu
            </h2>
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-light px-4">
              Discover our carefully crafted dishes, each prepared with the finest ingredients 
              and culinary expertise to deliver an unforgettable dining experience.
            </p>
          </div>
          
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Show loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <MenuItemSkeleton key={index} />
              ))
            ) : (
              // Show actual menu items
              restaurant.menu.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-cyan-200 p-6 md:p-8 transition-all duration-500 group transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-2 md:mb-3 group-hover:text-slate-800 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-medium text-slate-900">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {/* Quantity Controls */}
                    {getItemQuantity(item.id) === 0 ? (
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 touch-target"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="text-sm md:text-base">Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 md:gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                          className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md touch-target"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                          </svg>
                        </button>
                        <span className="text-lg md:text-xl font-semibold text-slate-900 min-w-[2rem] text-center">
                          {getItemQuantity(item.id)}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                          className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </div>

      {/* Restaurant Conflict Modal */}
      {showRestaurantModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-2 md:mb-3">Different Restaurant</h3>
              <p className="text-slate-600 font-light mb-6 md:mb-8 text-sm md:text-base">
                You have items from {currentRestaurant?.name} in your cart. Adding items from {restaurant.name} will clear your current cart.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={handleCancelAdd}
                  className="flex-1 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl px-4 py-3 font-medium transition-all duration-300 touch-target"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAndAdd}
                  className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl px-4 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-target"
                >
                  Clear & Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
