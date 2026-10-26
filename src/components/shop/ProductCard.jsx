import React from 'react';
import { Star, Heart, Eye, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onQuickView }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm tracking-wider ${
          product.badge === 'Sale' ? 'bg-rose-500 text-white' :
          product.badge === 'Trending' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'
        }`}>
          {product.badge}
        </span>
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-slate-600 hover:text-rose-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-slate-800 font-semibold text-xs px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 onClick={() => onQuickView(product)} className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold text-slate-900">${product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-slate-900 hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-colors duration-200 shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}