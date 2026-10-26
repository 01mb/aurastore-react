import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function FilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  maxPrice,
  setMaxPrice,
  totalCount
}) {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collapsible Range Filter */}
      <div className={`mt-4 p-4 bg-white rounded-xl border border-slate-200 ${showFiltersMobile ? 'block' : 'hidden md:flex'} items-center justify-between gap-6 flex-wrap`}>
        <div className="flex items-center gap-4 flex-1 min-w-[240px]">
          <label className="text-xs font-bold text-slate-700">Max Price: ${maxPrice}</label>
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{totalCount}</span> products
        </div>
      </div>
    </div>
  );
}