import React from 'react';

// Skeleton for restaurant cards
export const RestaurantCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200"></div>
      <div className="p-6">
        <div className="h-6 bg-slate-200 rounded-lg mb-3 w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded-lg mb-2 w-full"></div>
        <div className="h-4 bg-slate-200 rounded-lg mb-4 w-2/3"></div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded-lg w-20"></div>
          <div className="h-5 bg-slate-200 rounded-lg w-16"></div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for menu items
export const MenuItemSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 animate-pulse">
      <div className="flex flex-col h-full">
        <div className="flex-1 mb-6">
          <div className="h-6 bg-slate-200 rounded-lg mb-3 w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-5/6"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-slate-200 rounded-lg w-20"></div>
          <div className="h-12 bg-slate-200 rounded-2xl w-32"></div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for page headers
export const PageHeaderSkeleton: React.FC = () => {
  return (
    <div className="text-center mb-16 animate-pulse">
      <div className="h-12 bg-slate-200 rounded-lg mb-6 w-96 mx-auto"></div>
      <div className="w-16 h-0.5 bg-slate-200 mx-auto mb-6"></div>
      <div className="space-y-3 max-w-3xl mx-auto">
        <div className="h-5 bg-slate-200 rounded-lg w-full"></div>
        <div className="h-5 bg-slate-200 rounded-lg w-4/5 mx-auto"></div>
      </div>
    </div>
  );
};

// Skeleton for text content
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = "" 
}) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`h-4 bg-slate-200 rounded-lg ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}; 