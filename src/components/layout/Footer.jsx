import React from 'react';

export default function Footer({ onCategorySelect }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onCategorySelect('Electronics')} className="hover:text-white transition">Electronics</button></li>
              <li><button onClick={() => onCategorySelect('Wearables')} className="hover:text-white transition">Wearables</button></li>
              <li><button onClick={() => onCategorySelect('Footwear')} className="hover:text-white transition">Footwear</button></li>
              <li><button onClick={() => onCategorySelect('Accessories')} className="hover:text-white transition">Accessories</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">Track Your Package</a></li>
              <li><a href="#" className="hover:text-white transition">30-Day Return Portal</a></li>
              <li><a href="#" className="hover:text-white transition">Warranty Coverage</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center & FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">About Aura</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-3">Subscribe for secret drops and sales.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-800 border border-slate-700 text-xs px-3 py-2 rounded-lg text-white outline-none w-full focus:border-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AuraStore Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}