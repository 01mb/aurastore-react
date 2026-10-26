import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function QuickViewModal({ product, isWishlisted, onToggleWishlist, onClose }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{product.category}</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{product.name}</h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{product.description}</p>

            {/* Colors */}
            <div className="mt-6">
              <span className="text-xs font-bold text-slate-700 block mb-2">Available Colors</span>
              <div className="flex items-center gap-2">
                {product.colors?.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === color ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110' : 'border-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <span className="text-xs font-bold text-slate-700 block mb-2">Size / Variant</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  addToCart(product, selectedColor, selectedSize);
                  onClose();
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Cart
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-3 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}