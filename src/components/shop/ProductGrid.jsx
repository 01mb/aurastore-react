import React from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag } from 'lucide-react';

export default function ProductGrid({ products, wishlist, onToggleWishlist, onQuickView, onResetFilters }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 mt-8">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          We couldn't find any products matching your active filters.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}