'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Store, Heart, User, ShoppingCart, ChevronDown, X, ShieldCheck, CreditCard, Award, Truck } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const router = useRouter();
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const { cartCount, wishlistCount, setIsSignInDrawerOpen, setIsCartDrawerOpen } = useCart();
  const [isSignInHovered, setIsSignInHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tvs?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full flex flex-col font-sans">
      {/* Row 1: Promo Stripe */}
      {isPromoVisible && (
        <div className="bg-[#034784] text-white flex justify-center items-center min-h-[40px] px-4 relative text-sm font-semibold tracking-wide">
          <Link href="https://www.brandsmartusa.com" className="hover:underline underline-offset-2">
            Memorial Day Sale is Going On Now! Save Up to 70% off Your Favorite Brands.
          </Link>
          <button 
            onClick={() => setIsPromoVisible(false)}
            className="absolute right-4 hover:opacity-75 transition-opacity"
            aria-label="Close promo banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Blue Header Area */}
      <div className="bg-brand-blue text-white">
        
        {/* Row 2: Top Utility & Logo */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] pt-4 pb-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left: Location Info */}
            <div className="flex items-center gap-4 text-[13px] font-semibold tracking-wide whitespace-nowrap">
              <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <MapPin size={16} />
                <span>Ship To 37201</span>
              </button>
              <span className="w-px h-4 bg-white/50"></span>
              <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <Store size={16} />
                <span>Kennesaw</span>
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center -ml-8 md:-ml-0">
              <Link href="/">
                <img 
                  src="/images/bm-logo.svg" 
                  alt="BrandsMart USA" 
                  className="h-10 md:h-[50px] w-auto brightness-0 invert" 
                />
              </Link>
            </div>

            {/* Right: Top Links */}
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-semibold whitespace-nowrap">
              <Link href="https://www.brandsmartusa.com/store-locator" className="hover:underline">Store Locator</Link>
              <Link href="https://www.brandsmartusa.com/appliance-repair" className="hover:underline">Appliance Repair</Link>
              <Link href="https://www.brandsmartusa.com/pro-club" className="hover:underline">BrandsMart Pro Club</Link>
            </div>
            
          </div>
        </div>

        {/* Row 3: Main Nav & Search */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] pb-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Left: Dropdown Navs */}
            <nav className="flex items-center gap-6 text-sm font-semibold tracking-wide">
              {/* Shop Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  Shop <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-72 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-100 hidden group-hover:block z-50 overflow-hidden transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                  <div className="py-2">
                    <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Local Route</div>
                    <Link href="/tvs" className="block px-4 py-2 text-[14px] hover:bg-blue-50 hover:text-brand-blue font-bold transition-colors">
                      📺 TVs & Home Theater
                    </Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Live Site Routes</div>
                    <Link href="https://www.brandsmartusa.com/appliances/_/N-1841914220" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      🧺 Appliances
                    </Link>
                    <Link href="https://www.brandsmartusa.com/electronics/computers-tablets-and-home-office/_/N-AI608203" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      💻 Computers & Office
                    </Link>
                    <Link href="https://www.brandsmartusa.com/furniture/_/N-103601" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      🛋️ Furniture
                    </Link>
                    <Link href="https://www.brandsmartusa.com/housewares/_/N-AI608460" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      🍳 Housewares
                    </Link>
                  </div>
                </div>
              </div>

              {/* SALE Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  SALE <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-100 hidden group-hover:block z-50 overflow-hidden transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                  <div className="py-2">
                    <Link href="https://www.brandsmartusa.com/deals-of-the-day" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors font-bold text-brand-red">
                      🔥 Deals of the Day
                    </Link>
                    <Link href="https://www.brandsmartusa.com/weekly-ad" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      📅 Weekly Ad
                    </Link>
                    <Link href="https://www.brandsmartusa.com/clearance" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      🏷️ Clearance
                    </Link>
                  </div>
                </div>
              </div>

              {/* Brands Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  Brands <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-100 hidden group-hover:block z-50 overflow-hidden transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                  <div className="py-2">
                    <Link href="https://www.brandsmartusa.com/samsung" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      Samsung
                    </Link>
                    <Link href="https://www.brandsmartusa.com/lg" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      LG
                    </Link>
                    <Link href="https://www.brandsmartusa.com/sony" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      Sony
                    </Link>
                    <Link href="https://www.brandsmartusa.com/whirlpool" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      Whirlpool
                    </Link>
                    <Link href="https://www.brandsmartusa.com/ge-appliances" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      GE Appliances
                    </Link>
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-100 hidden group-hover:block z-50 overflow-hidden transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                  <div className="py-2">
                    <Link href="https://www.brandsmartusa.com/appliance-repair" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      🛠️ Appliance Repair
                    </Link>
                    <Link href="https://www.brandsmartusa.com/pro-club" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      🛡️ BrandsMart Pro Club
                    </Link>
                    <Link href="https://www.brandsmartusa.com/store-locator" className="block px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors">
                      📍 Store Locator
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-3xl w-full">
              <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-full overflow-hidden shadow-inner h-[42px]">
                {/* Blue Search Button on the Left */}
                <div className="h-full px-1 py-1 flex items-center justify-center">
                   <button type="submit" className="h-[34px] w-[34px] bg-[#1a73e8] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                     <Search size={18} strokeWidth={2.5} />
                   </button>
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What can we help you find today?" 
                  className="flex-1 h-full pl-3 pr-4 text-[14px] text-gray-800 focus:outline-none placeholder:text-gray-500 font-medium bg-transparent"
                />
              </form>
            </div>

            <div className="flex items-center gap-8 pl-4">
              <Link href="https://www.brandsmartusa.com/wishlist" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity relative">
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-blue">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-[12px] font-semibold leading-none">Wishlist</span>
              </Link>
              {/* Sign In Popover & Trigger */}
              <div 
                className="relative flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() => setIsSignInHovered(true)}
                onMouseLeave={() => setIsSignInHovered(false)}
              >
                <div className="flex flex-col items-center" onClick={() => setIsSignInDrawerOpen(true)}>
                  <User size={22} />
                  <span className="text-[12px] font-semibold leading-none">Sign In</span>
                </div>
                
                {/* Popover */}
                {isSignInHovered && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-100 z-50 p-4">
                    <h3 className="font-bold text-lg mb-2">Welcome!</h3>
                    <button 
                      onClick={() => {
                        setIsSignInHovered(false);
                        setIsSignInDrawerOpen(true);
                      }}
                      className="w-full bg-brand-red text-white font-bold py-2 rounded mb-3 hover:bg-red-700 transition-colors"
                    >
                      Sign In
                    </button>
                    <div className="text-xs text-gray-500 mb-3 text-center">New here? <a href="#" className="text-brand-blue font-bold hover:underline">Create an Account</a></div>
                    <div className="border-t border-gray-100 pt-3 text-xs font-semibold text-gray-700 space-y-2">
                      <div className="flex items-center gap-2"><Heart size={14} className="text-brand-red" /> Wishlist & Registry</div>
                      <div className="flex items-center gap-2"><Truck size={14} className="text-brand-blue" /> Order Status</div>
                      <div className="flex items-center gap-2"><CreditCard size={14} className="text-green-600" /> BrandsMart Card</div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/cart" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity relative">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-blue">
                    {cartCount}
                  </span>
                )}
                <span className="text-[12px] font-semibold leading-none">Cart</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Row 4: Value Props */}
      <div className="bg-[#f5f6f7] border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] py-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex justify-between items-center min-w-max gap-8 text-[#1a4b89] text-[13px] font-bold">
            <div className="flex items-center gap-2">
              <img src="/images/icons/low-price.png" alt="Low Price" className="w-[18px] h-[18px] object-contain" />
              <span>Lowest Price Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icons/financing.png" alt="Financing" className="w-[18px] h-[18px] object-contain" />
              <span>Special Financing Available</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icons/verified-user.png" alt="Membership" className="w-[18px] h-[18px] object-contain" />
              <span>Free Membership - Exclusive Benefits</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icons/location-outline.png" alt="Pickup" className="w-[18px] h-[18px] object-contain" />
              <span>Convenient Same-day Store Pickup</span>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
