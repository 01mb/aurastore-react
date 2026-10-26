import React, { useState } from 'react';
import { X, ChevronRight, CreditCard, Smartphone, Building2, Banknote, CheckCircle, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutModal({ onClose }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingForm, setShippingForm] = useState({ fullName: '', email: '', address: '', city: '', postalCode: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setOrderConfirmed({
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        shipping: shippingForm,
        total: cartTotal
      });
      clearCart();
      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>1</span>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>2</span>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>3</span>
        </div>

        {/* Step 1: Address */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Delivery Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required placeholder="Full Name" value={shippingForm.fullName} onChange={e => setShippingForm({ ...shippingForm, fullName: e.target.value })} className="bg-slate-50 border p-2.5 rounded-xl text-sm outline-none" />
              <input type="email" required placeholder="Email Address" value={shippingForm.email} onChange={e => setShippingForm({ ...shippingForm, email: e.target.value })} className="bg-slate-50 border p-2.5 rounded-xl text-sm outline-none" />
            </div>
            <input type="text" required placeholder="Street Address" value={shippingForm.address} onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })} className="w-full bg-slate-50 border p-2.5 rounded-xl text-sm outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="City" value={shippingForm.city} onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })} className="bg-slate-50 border p-2.5 rounded-xl text-sm outline-none" />
              <input type="text" required placeholder="Postal Code" value={shippingForm.postalCode} onChange={e => setShippingForm({ ...shippingForm, postalCode: e.target.value })} className="bg-slate-50 border p-2.5 rounded-xl text-sm outline-none" />
            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2">
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Select Payment</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'card', name: 'Card', icon: CreditCard },
                { id: 'upi', name: 'UPI', icon: Smartphone },
                { id: 'netbank', name: 'Net Banking', icon: Building2 },
                { id: 'cod', name: 'Cash on Delivery', icon: Banknote },
              ].map(m => {
                const Icon = m.icon;
                return (
                  <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)} className={`p-3 rounded-xl border flex flex-col items-center gap-2 ${paymentMethod === m.id ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-700' : 'border-slate-200'}`}>
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{m.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-slate-500">Back</button>
              <button type="submit" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2">
                Pay ${cartTotal.toFixed(2)} <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && orderConfirmed && (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-2xl font-black text-slate-900">Order Confirmed!</h3>
            <p className="text-xs text-slate-500 mt-1">Invoice sent to {orderConfirmed.shipping.email}</p>
            <div className="mt-4 bg-slate-50 p-4 rounded-xl text-left text-xs space-y-1">
              <p><strong>Order ID:</strong> {orderConfirmed.orderId}</p>
              <p><strong>Total:</strong> ${orderConfirmed.total.toFixed(2)}</p>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-slate-900 text-white font-bold py-3 rounded-xl">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}