"use client";

import { useState, useEffect } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/lib/data';
import { useChatWidget } from '@/components/AIChatWidget';
import { RestaurantCardSkeleton, PageHeaderSkeleton } from '@/components/LoadingSkeleton';

const RestaurantsPage = () => {
  const { openChat } = useChatWidget();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Simulate loading time for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Get unique cuisines for filter
  const cuisines = ['All', ...new Set(restaurants.flatMap(r => r.cuisine))];

  // Filter restaurants based on search and cuisine
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeaderSkeleton />
          
          {/* Search and filter skeleton */}
          <div className="mb-12 animate-pulse">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="h-12 bg-slate-200 rounded-xl"></div>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="h-10 w-20 bg-slate-200 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Restaurant cards skeleton */}
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 tracking-tight">
            Our Collection
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Discover exceptional dining experiences from our carefully curated selection of 
            world-class restaurants, each offering their own unique culinary artistry.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl font-light text-slate-800 mb-2">{restaurants.length}</div>
              <div className="text-slate-600 font-light text-sm uppercase tracking-wider">Restaurants</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-slate-800 mb-2">
                {restaurants.reduce((total, restaurant) => total + restaurant.menu.length, 0)}+
              </div>
              <div className="text-slate-600 font-light text-sm uppercase tracking-wider">Signature Dishes</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-slate-800 mb-2">
                {restaurants.length > 0 ? (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1) : '0'}
              </div>
              <div className="text-slate-600 font-light text-sm uppercase tracking-wider">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-700 font-light"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Cuisine Filter */}
          <div className="flex justify-center gap-3 flex-wrap">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-6 py-2 rounded-full font-light transition-all duration-300 ${
                  selectedCuisine === cuisine
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="text-center mb-8">
            <p className="text-slate-600 font-light">
              Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Restaurants Grid */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredRestaurants.map((restaurant, index) => (
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
          ))}
        </div>

        {/* No Results */}
        {filteredRestaurants.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-light text-slate-800 mb-2">No restaurants found</h3>
            <p className="text-slate-600 font-light mb-8">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCuisine('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-full font-light hover:from-slate-900 hover:to-black transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-20 p-12 bg-white rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-3xl font-light text-slate-900 mb-4">
            Can&apos;t Find What You&apos;re Craving?
          </h3>
          <p className="text-slate-600 font-light mb-8 max-w-2xl mx-auto">
            Our AI culinary concierge is here to help you discover the perfect dining experience 
            tailored to your preferences and dietary requirements.
          </p>
          <button 
            onClick={openChat}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Ask Our AI Concierge
          </button>
        </div>
      </div>
    </main>
  );
};

export default RestaurantsPage;
