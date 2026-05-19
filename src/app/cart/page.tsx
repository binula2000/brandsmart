'use client';

import Link from 'next/link';
import { Trash2, Heart, ChevronDown, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, cartCount, updateQuantity, removeFromCart, toggleWishlist, wishlist } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const estimatedShipping = 0; // Free shipping mock
  const total = subtotal + estimatedShipping;

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-6">
          SHOPPING CART ({cartCount})
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Item List */}
          <div className="w-full lg:w-[70%]">
            {cart.length === 0 ? (
              <div className="bg-white p-8 rounded border border-gray-200 text-center">
                <h2 className="text-xl font-bold mb-4">Your cart is empty.</h2>
                <Link href="/tvs" className="bg-brand-blue text-white px-6 py-3 rounded font-bold hover:bg-blue-800 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded p-6 pb-14 flex flex-col sm:flex-row gap-6 relative">
                    {/* Item Image */}
                    <div className="w-32 h-32 shrink-0 bg-gray-50 flex items-center justify-center p-2 rounded">
                      <img src={item.image || '/images/bm-logo.svg'} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <Link href={`/tvs/${item.id}`} className="text-lg font-bold text-brand-blue hover:underline leading-tight block mb-1">
                        {item.title}
                      </Link>
                      <div className="text-xs text-gray-500 font-semibold mb-3">
                        Model: {item.id} | Sku: SKU-{item.id}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-700 uppercase tracking-wide border border-gray-200">
                          <CreditCard size={12} /> 48 Months Promotional Financing
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-extrabold text-brand-red uppercase tracking-wide border border-brand-red/20 bg-red-50">
                          Free Shipping
                        </span>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                        <button 
                          onClick={() => toggleWishlist(item.id)} 
                          className="flex items-center gap-1 hover:text-brand-red transition-colors"
                        >
                          <Heart size={14} fill={wishlist.includes(item.id) ? 'currentColor' : 'none'} className={wishlist.includes(item.id) ? 'text-brand-red' : ''} /> 
                          {wishlist.includes(item.id) ? 'Saved' : 'Add to Wishlist'}
                        </button>
                      </div>
                    </div>

                    {/* Pricing & Controls */}
                    <div className="w-full sm:w-48 flex flex-col items-end justify-between">
                      <div className="flex justify-between w-full sm:w-auto items-start">
                         <div className="text-xl font-extrabold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                         <button 
                           onClick={() => removeFromCart(item.id)}
                           className="text-gray-400 hover:text-red-500 transition-colors ml-4 sm:absolute sm:top-6 sm:right-6"
                         >
                           <Trash2 size={20} />
                         </button>
                      </div>

                      {/* Quantity Adjuster */}
                      <div className="flex items-center border border-gray-300 rounded mt-4 sm:mt-0">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-red font-bold hover:bg-gray-50 transition-colors"
                        >
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-x border-gray-300 font-bold text-sm">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-red font-bold hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Fulfillment Dropdown Segment */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-gray-50 px-6 py-2 rounded-b flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                       <span className="text-xs font-bold text-gray-700">Choose Delivery or Pickup:</span>
                       <span className="text-xs font-bold text-brand-blue flex items-center gap-1">Delivered to you <ChevronDown size={14} /></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[30%]">
            <div className="bg-white border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-extrabold text-gray-900 tracking-wide mb-4">ORDER SUMMARY</h2>
              <hr className="border-gray-200 mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-semibold text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-gray-600">
                  <span>Estimated Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-extrabold text-gray-900">Estimated Total</span>
                <span className="text-xl font-extrabold text-brand-red">${total.toFixed(2)}</span>
              </div>

              <div className="bg-[#E6F4EA] text-[#2E8540] p-3 rounded font-bold text-sm mb-4 border border-[#A8DAB5] flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                You&apos;re saving ${(subtotal * 0.1).toFixed(2)} on your order today!
              </div>

              <div className="text-[11px] text-gray-500 font-semibold mb-6 flex items-start gap-1">
                 <span className="text-brand-red text-sm leading-none">*</span> Sales tax will be calculated at checkout
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                disabled={cart.length === 0}
                className="w-full bg-[#E21836] hover:bg-[#c0142d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-extrabold py-4 text-sm tracking-widest uppercase transition-colors rounded mb-4"
              >
                Start Secured Checkout
              </button>

              <div className="text-center text-xs font-semibold text-gray-600 mb-6">
                From ${(total / 24).toFixed(0)}/month with Klarna. <a href="#" className="text-brand-blue hover:underline">Check purchase power</a>
              </div>

              <div className="text-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">We Accept</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {/* Generic Payment Badges */}
                  <div className="bg-gray-100 border border-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">VISA</div>
                  <div className="bg-gray-100 border border-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">MASTERCARD</div>
                  <div className="bg-gray-100 border border-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">AMEX</div>
                  <div className="bg-gray-100 border border-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">PAYPAL</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
