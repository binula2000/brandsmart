'use client';

import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function SignInDrawer() {
  const { isSignInDrawerOpen, setIsSignInDrawerOpen } = useCart();

  useEffect(() => {
    if (isSignInDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSignInDrawerOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 z-50 ${isSignInDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSignInDrawerOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isSignInDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-brand-blue text-white">
          <h2 className="font-bold text-xl">Sign In To Your Account</h2>
          <button 
            onClick={() => setIsSignInDrawerOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSignInDrawerOpen(false); }}>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
              <input 
                type="email" 
                required 
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password *</label>
              <input 
                type="password" 
                required 
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue" />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-brand-blue font-bold hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded text-lg transition-colors shadow-md mt-4">
              Sign In Now
            </button>
            
          </form>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Don&apos;t Have an Account?</h3>
            <p className="text-sm text-gray-600 mb-6">Create a free account to checkout faster, track your orders, and save products to your wishlist.</p>
            <button className="w-full bg-white text-brand-blue border-2 border-brand-blue hover:bg-blue-50 font-bold py-3 rounded transition-colors">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
