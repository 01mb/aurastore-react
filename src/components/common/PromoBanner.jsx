import React from 'react';
import { Percent } from 'lucide-react';

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-800 text-white text-xs font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
      <Percent className="w-3.5 h-3.5 text-yellow-300" />
      <span>Use code <span className="font-bold underline tracking-wider">SAVE20</span> for 20% off all orders over $100! Free shipping on orders $150+</span>
    </div>
  );
}