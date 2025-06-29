"use client";
// Create a sticky navbar with links to Home, Restaurants, and Cart
import React, { useState } from "react";
import Link from "next/link";
import Cart from "./Cart";
import { useCart } from "./CartContext";

const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-white font-light text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                H
              </div>
              <span className="text-3xl font-light text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors duration-300">
                Hunger
              </span>
            </div>
          </Link>

          {/* Right Side - Navigation Links and Cart */}
          <div className="flex items-center gap-10">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="group">
                <span className="text-slate-700 hover:text-cyan-600 font-light text-lg transition-colors duration-300 relative">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link href="/restaurants" className="group">
                <span className="text-slate-700 hover:text-cyan-600 font-light text-lg transition-colors duration-300 relative">
                  Restaurants
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </div>
            
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-3 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-2xl transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 016.513 7.5h11.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default Navbar;

