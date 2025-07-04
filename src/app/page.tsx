"use client";

import Link from 'next/link';
import { useChatWidget } from '@/components/AIChatWidget';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/lib/data';

export default function Home() {
  const { openChat } = useChatWidget();
  const featuredRestaurants = restaurants.slice(0, 3); // Show 3 featured restaurants

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-100/20 via-transparent to-transparent"></div>
        
        <div className="relative px-6 py-32 max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main heading */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-slate-900 mb-6 tracking-tight">
                Hunger
              </h1>
              <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6 md:mb-8"></div>
              <p className="text-xl sm:text-2xl md:text-3xl font-extralight text-slate-700 leading-relaxed">
                Culinary Excellence,
                <span className="block text-cyan-600 font-light">Delivered with Care</span>
              </p>
            </div>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light px-4">
              Experience the finest cuisine from award-winning restaurants, crafted by master chefs 
              and delivered to your doorstep with uncompromising quality.
            </p>
            
            {/* CTA Buttons */}
            <div className="mb-16 md:mb-20 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
              <Link
                href="/restaurants"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-medium text-white bg-gradient-to-r from-slate-800 to-slate-900 rounded-full hover:from-slate-900 hover:to-black transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-target"
              >
                <span className="relative z-10">Explore Restaurants</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <button 
                onClick={openChat}
                className="w-full sm:w-auto group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-light text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:border-cyan-300 hover:text-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 touch-target"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Ask AI Concierge
              </button>
            </div>
          </div>
          
          {/* Elegant Stats */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                { number: "20+", label: "Curated Restaurants", icon: "🏆" },
                { number: "200+", label: "Signature Dishes", icon: "👨‍🍳" },
                { number: "4.9", label: "Guest Rating", icon: "⭐" },
                { number: "50K+", label: "Satisfied Guests", icon: "💎" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 mb-1 md:mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-light text-xs md:text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-24 px-6 bg-white relative">
        {/* Subtle section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-4 md:mb-6 tracking-tight">
              Featured
              <span className="block text-2xl sm:text-3xl md:text-4xl text-cyan-600 font-extralight mt-2">
                Restaurants
              </span>
            </h2>
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6 md:mb-8"></div>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Discover our handpicked selection of exceptional restaurants, each chosen for their 
              commitment to culinary excellence and unforgettable dining experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto px-4">
            {featuredRestaurants.map((restaurant, index) => (
              <div 
                key={restaurant.id} 
                className="transform hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
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
          
          {/* View All Link */}
          <div className="text-center mt-12 md:mt-16">
            <Link
              href="/restaurants"
              className="inline-flex items-center text-slate-700 hover:text-cyan-600 font-light text-base md:text-lg group transition-colors duration-300 touch-target"
            >
              View All Restaurants
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Quality Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-cyan-50 relative">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-6 md:mb-8 tracking-tight">
            The Hunger
            <span className="block text-cyan-600 font-extralight">Promise</span>
          </h3>
          <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-8 md:mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16">
            {[
              {
                title: "Premium Quality",
                description: "Only the finest ingredients from trusted suppliers, prepared by master chefs.",
                icon: "🥇"
              },
              {
                title: "Swift Delivery",
                description: "Temperature-controlled delivery ensuring your meal arrives fresh and perfect.",
                icon: "🚀"
              },
              {
                title: "Exceptional Service",
                description: "Dedicated support team ensuring every order exceeds your expectations.",
                icon: "💫"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg md:text-xl font-medium text-slate-800 mb-3 md:mb-4">
                  {feature.title}
                </h4>
                <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-4 md:mb-6 tracking-tight">
            Ready to Begin Your Culinary Journey?
          </h3>
          <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 font-light max-w-2xl mx-auto">
            Discover exceptional restaurants and let our AI concierge help you find the perfect dining experience.
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-medium text-white bg-gradient-to-r from-slate-800 to-slate-900 rounded-full hover:from-slate-900 hover:to-black transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-target"
          >
            Browse All Restaurants
            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
