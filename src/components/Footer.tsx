import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full font-sans mt-10">
      
      {/* Top section: Cards Background */}
      <div className="w-full bg-gradient-to-b from-white to-[#DEE7F0] pt-12 pb-[250px] px-4 md:px-8 xl:px-[162px]">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Footer Card 1 */}
          <div className="flex flex-col items-center text-center h-full justify-between">
            <div className="w-[160px] h-[160px] border-[6px] border-[#DEE7F0] rounded-full flex justify-center items-center bg-white mb-6 shadow-sm overflow-hidden p-4">
              <img src="/images/footer/icons-1.png" alt="Lowest Price Guaranteed" className="w-full h-full object-contain" />
            </div>
            <h6 className="text-[18px] md:text-[22px] font-bold text-[#080808] mb-2">Lowest Price Guaranteed</h6>
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-[#080808] max-w-xs flex-1">
              Find a lower price and we will beat it! Shop with confidence knowing you're getting the best price.
            </p>
            <Link href="https://www.brandsmartusa.com/lowest-price-guarantee" className="mt-6 text-[#1a4b89] font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">Learn More</Link>
          </div>

          {/* Footer Card 2 */}
          <div className="flex flex-col items-center text-center h-full justify-between">
            <div className="w-[160px] h-[160px] border-[6px] border-[#DEE7F0] rounded-full flex justify-center items-center bg-white mb-6 shadow-sm overflow-hidden p-4">
              <img src="/images/footer/icons-2.png" alt="Special Financing" className="w-full h-full object-contain" />
            </div>
            <h6 className="text-[18px] md:text-[22px] font-bold text-[#080808] mb-2">Special Financing</h6>
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-[#080808] max-w-xs flex-1">
              Get special financing for up to 60 months on select purchases with your BrandsMart USA Credit Card.
            </p>
            <Link href="https://www.brandsmartusa.com/financing" className="mt-6 text-[#1a4b89] font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">Apply Now</Link>
          </div>

          {/* Footer Card 3 */}
          <div className="flex flex-col items-center text-center h-full justify-between">
            <div className="w-[160px] h-[160px] border-[6px] border-[#DEE7F0] rounded-full flex justify-center items-center bg-white mb-6 shadow-sm overflow-hidden p-4">
              <img src="/images/footer/icons-3.png" alt="BrandsMart Pro Club" className="w-full h-full object-contain" />
            </div>
            <h6 className="text-[18px] md:text-[22px] font-bold text-[#080808] mb-2">BrandsMart Pro Club</h6>
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-[#080808] max-w-xs flex-1">
              Join the Pro Club for exclusive benefits, extended returns, and free delivery on most items.
            </p>
            <Link href="https://www.brandsmartusa.com/pro-club" className="mt-6 text-[#1a4b89] font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">Join Today</Link>
          </div>

          {/* Footer Card 4 */}
          <div className="flex flex-col items-center text-center h-full justify-between">
            <div className="w-[160px] h-[160px] border-[6px] border-[#DEE7F0] rounded-full flex justify-center items-center bg-white mb-6 shadow-sm overflow-hidden p-4">
              <img src="/images/footer/icons-4.png" alt="Same-Day Pickup" className="w-full h-full object-contain" />
            </div>
            <h6 className="text-[18px] md:text-[22px] font-bold text-[#080808] mb-2">Same-Day Pickup</h6>
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-[#080808] max-w-xs flex-1">
              Shop online and pick up at your local store the same day—fast, free, and easy!
            </p>
            <Link href="https://www.brandsmartusa.com/convenient-pickup" className="mt-6 text-[#1a4b89] font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">Learn More</Link>
          </div>

        </div>
      </div>

      {/* Bottom section: Gradient Footer */}
      <div className="w-full bg-gradient-to-r from-[#1A4B89] to-[#1471EB] pt-[200px] relative">
        
        {/* Overlapping Join Email List Wrapper */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px]">
          <div className="bg-white rounded-[20px] shadow-lg flex flex-col md:flex-row items-center mt-[-330px] pr-0 xl:pr-[60px] relative z-10 overflow-hidden">
             
             {/* Left Image - Actual Live Site Asset */}
             <div className="w-full md:w-1/3 h-[263px] relative overflow-hidden bg-[#EFF3F8]">
               <img 
                 src="/images/footer/footer-email-list-bg.webp" 
                 alt="Sign up for savings" 
                 className="w-full h-full object-cover"
               />
             </div>
             
             {/* Middle Text Tag */}
             <div className="w-full md:w-[35%] xl:mr-[50px] xl:-ml-[60px] px-8 md:px-0 text-center md:text-left py-8 md:py-0">
               <h5 className="text-[#1a4b89] font-sans text-[30px] xl:text-[32px] leading-[32px] font-bold mb-3 mt-5">
                 Sign up for Savings!
               </h5>
               <p className="font-semibold text-[22px] text-[#080808] m-0">
                 Join Our Email List
               </p>
             </div>

             {/* Right Form Holder */}
             <div className="w-full md:w-[35%] py-8 px-6 md:px-0 flex flex-col items-center md:items-start">
               <div className="flex w-full bg-[#EFF3F8] rounded-[36px] overflow-hidden mb-4">
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="flex-1 bg-transparent border-none outline-none pl-6 py-3 h-[50px] text-gray-700 placeholder:text-gray-500 text-[14px]"
                 />
                 <button className="bg-[#cb0c2f] text-white font-bold h-[50px] px-8 hover:bg-[#a60824] transition-colors rounded-r-[36px] text-[14px]">
                   SIGN UP
                 </button>
               </div>
               <div className="w-[80%] text-[11px] font-medium text-gray-600 leading-tight">
                 By signing up you agree to our <Link href="#" className="text-[#005cff] underline">Privacy Policy</Link> and <Link href="#" className="text-[#005cff] underline">Terms of Use</Link>.
               </div>
             </div>

          </div>
        </div>

        {/* Footer Links Columns */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px] pt-[80px] pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             
             <div className="text-white">
               <p className="font-bold text-[16px] mb-[30px] uppercase tracking-wider">Our Company</p>
               <ul className="space-y-3">
                 <li><Link href="https://www.brandsmartusa.com/about-us" className="text-white font-normal text-[14px] hover:underline">About Us</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/careers" className="text-white font-normal text-[14px] hover:underline">Careers</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/store-locator" className="text-white font-normal text-[14px] hover:underline">Store Locator</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/policies" className="text-white font-normal text-[14px] hover:underline">Policies</Link></li>
               </ul>
             </div>

             <div className="text-white">
               <p className="font-bold text-[16px] mb-[30px] uppercase tracking-wider">Customer Service</p>
               <ul className="space-y-3">
                 <li><Link href="https://www.brandsmartusa.com/contact-us" className="text-white font-normal text-[14px] hover:underline">Contact Us</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/track-order" className="text-white font-normal text-[14px] hover:underline">Track Order</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/returns" className="text-white font-normal text-[14px] hover:underline">Returns & Exchanges</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/shipping" className="text-white font-normal text-[14px] hover:underline">Shipping & Delivery</Link></li>
               </ul>
             </div>

             <div className="text-white">
               <p className="font-bold text-[16px] mb-[30px] uppercase tracking-wider">Resources</p>
               <ul className="space-y-3">
                 <li><Link href="https://www.brandsmartusa.com/financing" className="text-white font-normal text-[14px] hover:underline">Financing Options</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/gift-cards" className="text-white font-normal text-[14px] hover:underline">Gift Cards</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/rebates" className="text-white font-normal text-[14px] hover:underline">Rebate Center</Link></li>
                 <li><Link href="https://www.brandsmartusa.com/pro-club" className="text-white font-normal text-[14px] hover:underline">BrandsMart Pro Club</Link></li>
               </ul>
             </div>

             <div className="text-white">
               {/* Footer Logo & Socials */}
               <div className="mb-[30px]">
                 <img 
                   src="/images/footer/bm-footer-logo.png" 
                   alt="BrandsMart USA" 
                   className="h-12 w-auto object-contain" 
                 />
               </div>
               <p className="font-bold text-[16px] mt-[30px] mb-[20px]">Follow Us</p>
               <ul className="flex items-center gap-4">
                 <li>
                   <a href="#" className="hover:opacity-80 transition-opacity">
                     <img src="/images/social/meta.png" alt="Facebook" className="w-8 h-8 object-contain" />
                   </a>
                 </li>
                 <li>
                   <a href="#" className="hover:opacity-80 transition-opacity">
                     <img src="/images/social/pinterest.png" alt="Pinterest" className="w-8 h-8 object-contain" />
                   </a>
                 </li>
                 <li>
                   <a href="#" className="hover:opacity-80 transition-opacity">
                     <img src="/images/social/tiktok.png" alt="TikTok" className="w-8 h-8 object-contain" />
                   </a>
                 </li>
               </ul>
             </div>

          </div>
        </div>

        {/* Copy Right Bar */}
        <div className="bg-black/10 w-full py-[25px] mt-[20px]">
          <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-[162px]">
            <div className="flex flex-col md:flex-row justify-between items-center text-[#dee7f0] text-[12px]">
              <p className="mb-[18px] md:mb-0 text-white font-medium">
                &copy; {new Date().getFullYear()} BrandsMart USA. All rights reserved.
              </p>
              <ul className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-2">
                <li><Link href="https://www.brandsmartusa.com/privacy" className="text-[#dee7f0] text-[14px] hover:underline">Privacy Policy</Link></li>
                <li><Link href="https://www.brandsmartusa.com/terms" className="text-[#dee7f0] text-[14px] hover:underline">Terms of Use</Link></li>
                <li><Link href="https://www.brandsmartusa.com/accessibility" className="text-[#dee7f0] text-[14px] hover:underline">Accessibility Statement</Link></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
