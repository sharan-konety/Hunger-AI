"use client";


import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/lib/data';
import { useChatWidget } from '@/components/AIChatWidget';

const RestaurantsPage = () => {
  const { openChat } = useChatWidget();

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

        {/* Restaurants Grid */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {restaurants.map((restaurant, index) => (
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
