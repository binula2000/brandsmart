'use client';

import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const { isCartDrawerOpen, setIsCartDrawerOpen, activeCartItem } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSelectedPlan(null); // Reset selection on close
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartDrawerOpen]);

  if (!activeCartItem) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 z-50 ${isCartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
            <CheckCircle size={24} />
            <span>Added to Cart</span>
          </div>
          <button 
            onClick={() => setIsCartDrawerOpen(false)}
            className="text-gray-400 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          
          {/* Product Summary */}
          <div className="flex gap-4 bg-white p-4 rounded border border-gray-200 mb-6 shadow-sm">
            {activeCartItem.image && (
              <img src={activeCartItem.image} alt={activeCartItem.title} className="w-20 h-20 object-contain mix-blend-multiply" />
            )}
            <div>
              <div className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-2">{activeCartItem.title}</div>
              <div className="font-extrabold text-brand-red text-xl">${activeCartItem.price.toFixed(2)}</div>
            </div>
          </div>

          {/* Protection Plan */}
          <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
              <ShieldCheck className="text-brand-blue" size={20} />
              Protect Your Purchase
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Get peace of mind with a BrandsMart Protection Plan. Covers mechanical and electrical failures after the manufacturer warranty expires.
            </p>

            <div className="space-y-3">
              {[
                { years: 5, price: (activeCartItem.price * 0.15).toFixed(2) },
                { years: 3, price: (activeCartItem.price * 0.10).toFixed(2) },
                { years: 2, price: (activeCartItem.price * 0.05).toFixed(2) },
              ].map((plan) => (
                <label 
                  key={plan.years}
                  className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${selectedPlan === plan.years ? 'border-brand-blue bg-blue-50 ring-1 ring-brand-blue' : 'border-gray-200 hover:border-brand-blue'}`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="protection" 
                      className="w-4 h-4 text-brand-blue focus:ring-brand-blue"
                      checked={selectedPlan === plan.years}
                      onChange={() => setSelectedPlan(plan.years)}
                    />
                    <span className="font-bold text-sm text-gray-800">{plan.years} Year Protection Plan</span>
                  </div>
                  <span className="font-bold text-gray-900">${plan.price}</span>
                </label>
              ))}

              <label 
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-all ${selectedPlan === 0 ? 'border-brand-blue bg-blue-50 ring-1 ring-brand-blue' : 'border-gray-200 hover:border-brand-blue'}`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="protection" 
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue"
                    checked={selectedPlan === 0}
                    onChange={() => setSelectedPlan(0)}
                  />
                  <span className="font-bold text-sm text-gray-800">Decline Coverage</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <button 
            onClick={() => setIsCartDrawerOpen(false)}
            className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded text-lg transition-colors shadow-md mb-3"
          >
            Save & Continue
          </button>
          <button 
            onClick={() => setIsCartDrawerOpen(false)}
            className="w-full bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 font-bold py-3 rounded transition-colors"
          >
            No Thanks
          </button>
        </div>
      </div>
    </>
  );
}
