import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onOpenCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    couponCode,
    setCouponCode,
    discountPercent,
    setDiscountPercent,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    totalCartUnits,
    freeShippingThreshold
  } = useCart();

  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SAVE20') {
      setDiscountPercent(20);
      setCouponMsg({ text: '20% discount applied!', isError: false });
    } else if (couponCode.trim().toUpperCase() === 'FIRST10') {
      setDiscountPercent(10);
      setCouponMsg({ text: '10% discount applied!', isError: false });
    } else {
      setCouponMsg({ text: 'Invalid code. Try "SAVE20"', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in" />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                {totalCartUnits} items
              </span>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Meter */}
          <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100">
            <div className="flex justify-between text-xs font-semibold text-indigo-900 mb-1.5">
              <span>
                {cartSubtotal >= freeShippingThreshold ? '🎉 Free Delivery Unlocked!' : `Add $${(freeShippingThreshold - cartSubtotal).toFixed(2)} more for Free Shipping`}
              </span>
              <span>{Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%</span>
            </div>
            <div className="w-full h-1.5 bg-indigo-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }} />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.cartKey} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.cartKey)} className="text-slate-400 hover:text-rose-500 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          Color: <span className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300" style={{ backgroundColor: item.selectedColor }} />
                        </span>
                        <span>•</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button onClick={() => updateQuantity(item.cartKey, -1)} className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-lg">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartKey, 1)} className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-lg">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700">Your bag is empty</p>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50/50">
              <form onSubmit={handleApplyCoupon} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon: SAVE20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs uppercase font-semibold outline-none focus:border-indigo-500"
                  />
                  <button type="submit" className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
                    Apply
                  </button>
                </div>
                {couponMsg.text && (
                  <p className={`text-[11px] mt-1 font-semibold ${couponMsg.isError ? 'text-rose-500' : 'text-emerald-600'}`}>{couponMsg.text}</p>
                )}
              </form>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}