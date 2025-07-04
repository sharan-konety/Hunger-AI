"use client";

import React, { useState, useEffect } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/lib/data';
import { useChatWidget } from '@/components/AIChatWidget';
import { RestaurantCardSkeleton } from '@/components/LoadingSkeleton';

const RestaurantsPage = () => {
  const { openChat } = useChatWidget();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showAllCuisines, setShowAllCuisines] = useState(false);

  // Get unique cuisines from all restaurants
  const allCuisines = ['All', ...Array.from(new Set(restaurants.flatMap(r => r.cuisine)))];
  
  // Show only first few cuisines by default
  const cuisinesToShow = showAllCuisines ? allCuisines : allCuisines.slice(0, 5);
  const hasMoreCuisines = allCuisines.length > 5;

  // Filter restaurants based on search and cuisine
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.some(cuisine => cuisine.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCuisine = 
      selectedCuisine === 'All' || 
      restaurant.cuisine.includes(selectedCuisine);
    
    return matchesSearch && matchesCuisine;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('All');
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-4 md:mb-6 tracking-tight">
            Our Collection
          </h1>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Discover exceptional dining experiences from our carefully curated selection of 
            world-class restaurants, each offering their own unique culinary artistry.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-6 md:gap-12 mt-8 md:mt-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light text-slate-800 mb-1 md:mb-2">{restaurants.length}</div>
              <div className="text-slate-600 font-light text-xs md:text-sm uppercase tracking-wider">Restaurants</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light text-slate-800 mb-1 md:mb-2">
                {restaurants.reduce((total, restaurant) => total + restaurant.menu.length, 0)}+
              </div>
              <div className="text-slate-600 font-light text-xs md:text-sm uppercase tracking-wider">Signature Dishes</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light text-slate-800 mb-1 md:mb-2">
                {restaurants.length > 0 ? (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1) : '0'}
              </div>
              <div className="text-slate-600 font-light text-xs md:text-sm uppercase tracking-wider">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 md:mb-16 px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 pl-12 md:pl-14 text-base md:text-lg bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400"
                style={{ color: '#0f172a' }}
              />
              <svg className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 touch-target"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Cuisine Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            {cuisinesToShow.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base touch-target ${
                  selectedCuisine === cuisine
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cuisine}
              </button>
            ))}
            
            {/* More/Less Button */}
            {hasMoreCuisines && (
              <button
                onClick={() => setShowAllCuisines(!showAllCuisines)}
                className="px-4 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all duration-300 bg-cyan-50 text-cyan-600 border border-cyan-200 hover:border-cyan-300 hover:bg-cyan-100 flex items-center gap-2 text-sm md:text-base touch-target"
              >
                {showAllCuisines ? (
                  <>
                    <span>Less</span>
                    <svg className="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>More ({allCuisines.length - 5})</span>
                    <svg className="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div className="text-slate-600 font-light text-sm md:text-base">
              {isLoading ? (
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse"></div>
              ) : (
                <span>
                  {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
                  {(searchTerm || selectedCuisine !== 'All') && (
                    <span className="block sm:inline sm:ml-2">
                      {searchTerm && `for "${searchTerm}"`}
                      {searchTerm && selectedCuisine !== 'All' && ' in '}
                      {selectedCuisine !== 'All' && `${selectedCuisine} cuisine`}
                    </span>
                  )}
                </span>
              )}
            </div>
            
            {(searchTerm || selectedCuisine !== 'All') && !isLoading && (
              <button
                onClick={resetFilters}
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1 transition-colors touch-target"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-4">
          {isLoading ? (
            // Show loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          ) : filteredRestaurants.length > 0 ? (
            // Show filtered restaurants
            filteredRestaurants.map((restaurant, index) => (
              <div 
                key={restaurant.id} 
                className="transform hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RestaurantCard 
                  id={restaurant.id}
                  name={restaurant.name}
                  image={restaurant.image}
                  rating={restaurant.rating}
                  cuisine={restaurant.cuisine}
                />
              </div>
            ))
          ) : (
            // No results found
            <div className="col-span-full text-center py-16 md:py-20">
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">🔍</div>
              <h3 className="text-xl md:text-2xl font-light text-slate-900 mb-3 md:mb-4">No restaurants found</h3>
              <p className="text-slate-600 font-light mb-6 md:mb-8 text-sm md:text-base max-w-md mx-auto">
                Try adjusting your search terms or explore different cuisine types.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Show All Restaurants
              </button>
            </div>
          )}
        </div>

        {/* AI Assistant CTA */}
        <div className="text-center mt-16 md:mt-20 px-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-cyan-50 to-slate-50 rounded-3xl p-6 md:p-8 border border-cyan-100">
            <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-2 md:mb-3">
              Need help choosing?
            </h3>
            <p className="text-slate-600 font-light mb-4 md:mb-6 text-sm md:text-base">
              Let our AI concierge help you discover the perfect restaurant based on your preferences.
            </p>
            <button 
              onClick={openChat}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Ask AI Concierge
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RestaurantsPage;
