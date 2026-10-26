import React from 'react';
import { ShoppingBag, Search, Heart, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Header({ searchQuery, setSearchQuery, wishlistCount, onReset }) {
  const { setIsCartOpen, totalCartUnits } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900">AURA<span className="text-indigo-600">.</span></span>
            <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 -mt-1">Modern Storefront</p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search premium electronics, sneakers, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white pl-10 pr-4 py-2.5 rounded-full text-sm outline-none border border-transparent focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Wishlist & Cart Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all shadow-md shadow-indigo-100 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartUnits > 0 && (
              <span className="bg-white text-indigo-700 font-bold text-xs px-2 py-0.5 rounded-full shadow-inner">
                {totalCartUnits}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 pl-10 pr-4 py-2 rounded-lg text-sm outline-none border border-transparent focus:border-indigo-400"
          />
        </div>
      </div>
    </header>
  );
}