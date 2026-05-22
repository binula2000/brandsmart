'use client';

import { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductGalleryProps {
  id: string;
  images: string[];
  title: string;
  isSale: boolean;
}

export default function ProductGallery({ id, images, title, isSale }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const { wishlist } = useCart();
  const activeImage = images[activeIdx] || images[0];
  const isWishlisted = wishlist.includes(id);

  return (
    <div className="w-full lg:w-7/12 flex gap-4 h-[600px]">
      {/* Vertical Thumbnails */}
      <div className="w-24 shrink-0 flex flex-col gap-2 overflow-y-auto no-scrollbar pr-1">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveIdx(idx)}
            className={`w-20 h-20 border ${activeIdx === idx ? 'border-brand-blue shadow-sm' : 'border-gray-200'} rounded p-1 cursor-pointer hover:border-brand-blue transition-all bg-white`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
      
      {/* Main Image with CSS MagicZoom */}
      <div className="flex-1 border border-gray-200 rounded p-4 relative group bg-white flex flex-col items-center justify-center overflow-hidden cursor-crosshair">
        
        {/* Inline Wishlist Success Banner */}
        {isWishlisted && (
          <div className="absolute top-0 left-0 w-full bg-green-50 border-b border-green-200 py-2 px-4 flex items-center justify-center gap-2 z-20 shadow-sm animate-fade-in">
            <Heart size={16} className="text-green-600 fill-green-600" />
            <span className="text-xs font-bold text-green-800">Product added to Wishlist</span>
          </div>
        )}


        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img src={activeImage} alt={title} className="max-w-full max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-[1.8] group-hover:origin-center mix-blend-multiply" />
        </div>
        <div className="text-xs text-gray-500 mt-4 flex items-center gap-1 font-semibold">
            <Search size={14} /> Hover over image to zoom
        </div>
      </div>
    </div>
  );
}
