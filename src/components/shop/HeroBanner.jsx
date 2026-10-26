import React from 'react';
import { Sparkles, ArrowRight, Star, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function HeroBanner({ onCategorySelect, featuredProduct }) {
  const { addToCart } = useCart();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-20 lg:py-24">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Lifestyle Gear
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
            Design Engineered For Living.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore meticulously curated audiophile hardware, wearable biometric monitors, and modern everyday essentials.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => {
                onCategorySelect('Electronics');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm transition shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Shop Featured Tech</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onCategorySelect('All');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition active:scale-95"
            >
              Browse All
            </button>
          </div>
        </div>

        {featuredProduct && (
          <div className="w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-800/40 border border-slate-700 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative group">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 mb-5">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                Spotlight Deal
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{featuredProduct.category}</span>
              <div className="flex items-center text-amber-400 gap-1 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {featuredProduct.rating} ({featuredProduct.reviewsCount})
              </div>
            </div>
            <h3 className="text-lg font-bold text-white line-clamp-1">{featuredProduct.name}</h3>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">${featuredProduct.price}</span>
                <span className="text-sm line-through text-slate-500 ml-2">${featuredProduct.originalPrice}</span>
              </div>
              <button
                onClick={() => addToCart(featuredProduct)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}