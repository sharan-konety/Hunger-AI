"use client";

import React from 'react';

// Skeleton for restaurant card
export const RestaurantCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-slate-200"></div>
      
      {/* Content skeleton */}
      <div className="p-8">
        {/* Title skeleton */}
        <div className="h-6 bg-slate-200 rounded mb-4 w-3/4"></div>
        
        {/* Cuisine tags skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-20"></div>
        </div>
        
        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 bg-slate-200 rounded w-12"></div>
          <div className="h-4 bg-slate-200 rounded w-8"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-12 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
};

// Skeleton for menu item
export const MenuItemSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Name skeleton */}
          <div className="h-5 bg-slate-200 rounded mb-3 w-3/4"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
          
          {/* Price skeleton */}
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>
        
        {/* Add button skeleton */}
        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
};

// General text skeleton
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = "" 
}) => {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`h-4 bg-slate-200 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

// Page header skeleton
export const PageHeaderSkeleton: React.FC = () => {
  return (
    <div className="text-center mb-20 animate-pulse">
      {/* Title skeleton */}
      <div className="h-12 bg-slate-200 rounded mx-auto mb-6 w-64"></div>
      
      {/* Divider skeleton */}
      <div className="w-24 h-1 bg-slate-200 mx-auto mb-8"></div>
      
      {/* Description skeleton */}
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6 mx-auto"></div>
      </div>
      
      {/* Stats skeleton */}
      <div className="flex justify-center items-center gap-12 mt-12">
        {[1, 2, 3].map((_, index) => (
          <React.Fragment key={index}>
            <div className="text-center">
              <div className="h-8 bg-slate-200 rounded mb-2 w-12 mx-auto"></div>
              <div className="h-3 bg-slate-200 rounded w-20 mx-auto"></div>
            </div>
            {index < 2 && <div className="w-px h-12 bg-slate-200"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 