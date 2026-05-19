'use client';

import { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ZipCodeModal() {
  const { isZipModalOpen, setIsZipModalOpen, zipCode, setZipCode } = useCart();
  const [inputZip, setInputZip] = useState(zipCode);

  if (!isZipModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputZip.trim().length >= 5) {
      setZipCode(inputZip.trim());
      setIsZipModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsZipModalOpen(false)}
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative z-10 animate-bounce-in overflow-hidden border border-gray-200">
        <button 
          onClick={() => setIsZipModalOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="p-8">
          <div className="flex justify-center mb-4 text-brand-blue">
            <MapPin size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Update Location</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Enter your zip code to see accurate shipping and pickup times for your area.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Zip Code</label>
              <input 
                type="text" 
                value={inputZip}
                onChange={(e) => setInputZip(e.target.value)}
                placeholder="e.g. 33101"
                className="w-full border-2 border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-brand-blue text-lg font-medium transition-colors"
                maxLength={10}
                autoFocus
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-brand-red text-white py-3 rounded font-bold uppercase tracking-wide hover:bg-red-700 transition-colors"
            >
              Update Location
            </button>
          </form>
        </div>
        <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
          <p className="text-xs text-gray-500 font-semibold">
            BrandsMart USA values your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
