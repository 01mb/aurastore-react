import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Toast({ message, type = 'success' }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl bg-slate-900 text-white border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}