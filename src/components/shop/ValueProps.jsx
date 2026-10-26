import React from 'react';
import { Truck, ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';

export default function ValueProps() {
  return (
    <section className="bg-white border-y border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Complimentary Shipping</p>
            <p className="text-xs text-slate-500">Free delivery on orders over $150</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">2-Year Warranty</p>
            <p className="text-xs text-slate-500">Standard on all electronics</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">30-Day Free Returns</p>
            <p className="text-xs text-slate-500">Hassle-free pickups guaranteed</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Secure Checkout</p>
            <p className="text-xs text-slate-500">256-bit encrypted transactions</p>
          </div>
        </div>
      </div>
    </section>
  );
}