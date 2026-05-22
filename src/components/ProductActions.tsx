'use client';

import { Heart, ShoppingCart, Phone, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductActionsProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

export default function ProductActions({ id, title, price, image }: ProductActionsProps) {
  const { addToCart, toggleWishlist, wishlist, setIsSignInDrawerOpen, setIsKlarnaModalOpen, zipCode, setIsZipModalOpen } = useCart();
  const isWishlisted = wishlist.includes(id);

  return (
    <>
      {/* Financing Box */}
      <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-6 text-sm">
        <span className="font-bold text-gray-800">OR From ${(price / 24).toFixed(0)}/month</span>, or 4 payments at 0% interest with Klarna. <button onClick={() => setIsKlarnaModalOpen(true)} className="text-brand-blue font-semibold hover:underline cursor-pointer">Check purchasing power</button>
      </div>

      {/* Sign In Banner */}
      <div className="border border-brand-blue bg-blue-50/30 rounded p-4 mb-6 flex items-center justify-between">
        <div className="text-sm font-bold text-gray-800">Get Exclusive Member Pricing!</div>
        <button 
          onClick={() => setIsSignInDrawerOpen(true)}
          className="text-xs font-bold bg-white border border-brand-blue text-brand-blue px-4 py-2 rounded hover:bg-brand-blue hover:text-white transition-colors"
        >
          Sign In / Join
        </button>
      </div>

      {/* Fulfillment Box */}
      <div className="flex border border-gray-300 rounded overflow-hidden mb-6 h-16 cursor-pointer">
        <div className="w-1/2 bg-gray-50 flex items-center justify-center border-r border-gray-300 hover:bg-gray-100 transition-colors" onClick={() => alert('Updating Fulfillment Location...')}>
          <div className="text-center">
            <div className="font-bold text-gray-900 text-sm">FREE - Ready in 1 hour</div>
            <div className="text-xs text-gray-500">Pickup at Store</div>
          </div>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors" onClick={() => setIsZipModalOpen(true)}>
          <div className="text-center">
            <div className="font-bold text-gray-900 text-sm flex items-center justify-center gap-1"><Truck size={14} /> Ship to {zipCode}</div>
            <div className="text-xs text-brand-blue hover:underline">Edit Location</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button 
          onClick={() => addToCart({ id, title, price, quantity: 1, image })}
          className="flex-1 bg-[#c0392b] hover:bg-[#a93226] text-white py-3.5 rounded font-extrabold text-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
        <button 
          onClick={() => alert('Connecting to a live agent...')}
          className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 rounded font-bold text-xs flex flex-col items-center justify-center transition-colors"
        >
          <Phone size={16} className="mb-0.5" />
          <span>FREE CONSULTATION</span>
          <span>888-802-6641</span>
        </button>
      </div>
      
      <button 
        onClick={() => toggleWishlist(id)}
        className={`flex items-center gap-2 text-sm font-semibold self-start transition-colors ${isWishlisted ? 'text-brand-red' : 'text-gray-500 hover:text-brand-blue'}`}
      >
        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} /> 
        {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </>
  );
}
