'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartCount } = useCart();
  const [email, setEmail] = useState('');
  const [activeStep, setActiveStep] = useState(1);

  // Shipping state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [showApt, setShowApt] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.07; // 7% mock tax
  const total = subtotal + tax;

  const isEmailValid = email.includes('@') && email.includes('.');
  const isShippingValid = firstName && lastName && address && zip && city && state && phone;

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-6">

        {/* Left Column: Progressive Checkout Accordion */}
        <div className="w-full lg:w-[70%]">

          {/* Promo Banner */}
          <div className="bg-[#eaf1f8] border border-[#a8c6e2] rounded-md p-4 flex items-center justify-between mb-6 shadow-sm">
            <div className="text-sm text-gray-800 font-semibold tracking-wide">
              Sign in for fast checkout or continue as a guest.
            </div>
            <button className="bg-brand-blue text-white px-6 py-2 rounded font-bold text-sm hover:bg-blue-800 transition-colors">
              Sign In
            </button>
          </div>

          <div className="space-y-4">
            {/* STEP 1: Contact Information */}
            <div className={`bg-white rounded border ${activeStep === 1 ? 'border-brand-blue shadow-md' : 'border-gray-200'}`}>
              <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/50 rounded-t">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">1. Contact Information</h2>
                {activeStep > 1 && (
                  <button onClick={() => setActiveStep(1)} className="text-sm text-brand-blue font-bold hover:underline">Edit</button>
                )}
              </div>

              {activeStep === 1 ? (
                <div className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full lg:w-1/2 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      disabled={!isEmailValid}
                      className="bg-brand-blue hover:bg-blue-800 disabled:bg-[#7a9bc2] disabled:cursor-not-allowed text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 text-gray-800 font-medium">{email}</div>
              )}
            </div>

            {/* STEP 2: Shipping Information */}
            <div className={`bg-white rounded border ${activeStep === 2 ? 'border-brand-blue shadow-md' : 'border-gray-200'}`}>
              <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/50 rounded-t">
                <h2 className={`text-xl font-bold tracking-tight ${activeStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>2. Shipping Information</h2>
              </div>

              {activeStep === 2 ? (
                <div className="p-6">
                  <div className="text-sm font-bold text-gray-600 mb-6 italic">
                    (If using Freight Forwarder, click Freight Forwarder Box below)
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">First Name *</label>
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Last Name *</label>
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Address *</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                  </div>

                  {!showApt && (
                    <button onClick={() => setShowApt(true)} className="text-sm font-bold text-brand-blue hover:underline mb-6 block">
                      + Add Apartment, Suite, Building etc
                    </button>
                  )}
                  {showApt && (
                    <div className="mb-6">
                      <input type="text" placeholder="Apt, Suite, Unit, etc." className="w-full border border-gray-300 rounded px-3 py-2.5 mt-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Zip Code *</label>
                      <input type="text" value={zip} onChange={e => setZip(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">City *</label>
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">State *</label>
                      <input type="text" value={state} onChange={e => setState(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 text-xs font-bold text-gray-500 mb-1">
                        Phone No. *
                        <span className="w-3 h-3 rounded-full bg-gray-300 text-white text-[8px] flex items-center justify-center font-bold">i</span>
                      </label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2.5" />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 mb-8 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue" />
                    <span className="text-sm font-bold text-gray-700">Freight Forwarder</span>
                  </label>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <button onClick={() => setActiveStep(1)} className="text-brand-blue border border-brand-blue bg-white hover:bg-gray-50 px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      disabled={!isShippingValid}
                      className="bg-brand-blue hover:bg-blue-800 disabled:bg-[#7a9bc2] disabled:cursor-not-allowed text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : activeStep < 2 ? (
                <div className="p-6 text-sm text-gray-400 font-semibold bg-gray-50">Finish the above step</div>
              ) : (
                <div className="p-5 text-gray-800 font-medium text-sm leading-relaxed">
                  {firstName} {lastName}<br />
                  {address}<br />
                  {city}, {state} {zip}<br />
                  {phone}
                </div>
              )}
            </div>

            {/* STEP 3 & 4: Mocked Locked Steps */}
            <div className="bg-white rounded border border-gray-200">
              <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/50 rounded-t">
                <h2 className={`text-xl font-bold tracking-tight ${activeStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>3. Fulfillment Options</h2>
              </div>
              {activeStep < 3 && <div className="p-6 text-sm text-gray-400 font-semibold bg-gray-50">Finish the above step</div>}
            </div>

            <div className="bg-white rounded border border-gray-200">
              <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-gray-50/50 rounded-t">
                <h2 className={`text-xl font-bold tracking-tight ${activeStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>4. Payment Options</h2>
              </div>
              {activeStep < 4 && <div className="p-6 text-sm text-gray-400 font-semibold bg-gray-50">Finish the above step</div>}
            </div>

          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[30%]">
          <div className="bg-white border border-gray-200 p-6 sticky top-8">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-wide mb-2">Order Summary</h2>
            <div className="text-sm font-semibold text-gray-500 mb-4">{cartCount} Item{cartCount !== 1 && 's'}</div>

            <div className="bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 mb-4 uppercase tracking-widest">
              Shipping Items
            </div>

            <div className="space-y-4 mb-6">
              {cart.slice(0, 3).map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 shrink-0 bg-gray-50 border border-gray-200 p-1 flex items-center justify-center">
                    <img src={item.image || '/images/bm-logo.svg'} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-gray-900 line-clamp-2 leading-tight">{item.title}</div>
                    <div className="text-gray-500 mt-1">Qty: {item.quantity}</div>
                    <div className="font-extrabold mt-1 text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              {cart.length > 3 && (
                <div className="text-xs font-bold text-brand-blue hover:underline cursor-pointer">VIEW MORE</div>
              )}
            </div>

            <hr className="border-gray-200 mb-4" />

            <div className="space-y-3 mb-6 text-sm font-semibold text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-black text-white p-4 -mx-6 mb-6 flex justify-between items-center">
              <span className="text-lg font-bold tracking-wide">Total</span>
              <span className="text-2xl font-extrabold">${total.toFixed(2)}</span>
            </div>

            <div className="bg-[#E6F4EA] text-[#2E8540] p-3 rounded font-bold text-sm mb-6 border border-[#A8DAB5] flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              You're saving ${(subtotal * 0.1).toFixed(2)} today!
            </div>

            <div className="text-center font-bold text-gray-700 text-xs mb-4">
              Please review billing and shipping information before placing your order
            </div>

            <button
              disabled={activeStep < 4}
              className="w-full bg-[#E21836] hover:bg-[#c0142d] disabled:bg-[#f3a4b0] disabled:cursor-not-allowed text-white font-extrabold py-4 text-sm tracking-widest uppercase transition-colors rounded shadow-sm"
            >
              Place Order
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
