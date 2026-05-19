import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center pb-20 font-sans">
      
      {/* Top Main Memorial Day Banner */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] mt-6">
        <Link 
          href="/tvs" 
          className="block w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:opacity-95 transition-opacity"
        >
          <img 
            src="/images/promo/md-deals-going-on-now-overarching-banner_768x250.webp" 
            alt="Memorial Day Sale - Going On Now" 
            className="w-full h-auto object-cover object-center"
          />
        </Link>
      </div>

      {/* Grid Banners */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: 0% Interest Promo */}
        <Link 
          href="https://www.brandsmartusa.com/furniture/_/N-103601" 
          className="block border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:opacity-95 transition-opacity bg-white"
        >
          <img 
            src="/images/promo/mds-promo-card-1.webp" 
            alt="0% Interest Promo Card" 
            className="w-full h-auto object-cover"
          />
        </Link>

        {/* Card 2: Kitchen Package Promo */}
        <Link 
          href="https://www.brandsmartusa.com/appliances/_/N-1841914220" 
          className="block border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:opacity-95 transition-opacity bg-white"
        >
          <img 
            src="/images/promo/mds-promo-card-2.webp" 
            alt="New Kitchen Appliance Package Promo Card" 
            className="w-full h-auto object-cover"
          />
        </Link>

        {/* Card 3: sMart Deal Exclusive Savings */}
        <Link 
          href="/tvs" 
          className="block border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:opacity-95 transition-opacity bg-white"
        >
          <img 
            src="/images/promo/mds-promo-card-3.webp" 
            alt="sMart Deal Exclusive Savings Card" 
            className="w-full h-auto object-cover"
          />
        </Link>

      </div>

      {/* Bottom Horizontal Banner */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] mt-6">
        <Link 
          href="https://www.brandsmartusa.com/appliances/_/N-1841914220" 
          className="block w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:opacity-95 transition-opacity"
        >
          <img 
            src="/images/promo/memorial-day-appliances-financing-hp-banner-2_768x250.webp" 
            alt="0% Interest for 18 Months on Select Appliances" 
            className="w-full h-auto object-cover object-center"
          />
        </Link>
      </div>

    </div>
  );
}
