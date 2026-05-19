'use client';

import { X, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function KlarnaModal() {
  const { isKlarnaModalOpen, setIsKlarnaModalOpen } = useCart();

  useEffect(() => {
    if (isKlarnaModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isKlarnaModalOpen]);

  if (!isKlarnaModalOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
        onClick={() => setIsKlarnaModalOpen(false)}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-xl shadow-2xl z-50 animate-bounce-in overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-pink-50">
          <div className="flex items-center gap-3">
             <span className="font-extrabold text-xl tracking-tight text-gray-900">Klarna.</span>
             <span className="text-sm font-semibold text-gray-600 border-l border-gray-300 pl-3">Purchasing Power</span>
          </div>
          <button 
            onClick={() => setIsKlarnaModalOpen(false)}
            className="text-gray-500 hover:text-gray-900 transition-colors bg-white rounded-full p-1 shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Shop now, pay later.</h3>
          <p className="text-gray-600 mb-8">
            Split your purchase into 4 interest-free payments or choose flexible financing options up to 24 months. No hidden fees.
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-5 flex items-start gap-4 hover:border-pink-300 hover:bg-pink-50/30 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-pink-600">4</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Pay in 4 interest-free payments</h4>
                <p className="text-sm text-gray-500 mt-1">Split your total into 4 easy payments, charged every 2 weeks. 0% APR.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 flex items-start gap-4 hover:border-pink-300 hover:bg-pink-50/30 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">24</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Flexible Financing</h4>
                <p className="text-sm text-gray-500 mt-1">Pay over 6, 12, 18, or 24 months. Subject to credit approval.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
             <Info size={20} className="text-gray-400 shrink-0 mt-0.5" />
             <p className="text-xs text-gray-500">
               *CA resident loans made or arranged pursuant to a California Financing Law license. Monthly financing through Klarna issued by WebBank, member FDIC.
             </p>
          </div>
        </div>
      </div>
    </>
  );
}
