'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface TV {
  id: string;
  brand: string;
  title: string;
  model: string;
  images?: string[];
  image?: string;
  price: number;
  originalPrice?: number;
  rating?: number | string;
  reviews?: number;
  specifications?: Record<string, string>;
}

interface TVCatalogProps {
  initialTvs: TV[];
}

export default function TVCatalog({ initialTvs }: TVCatalogProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // If search query changes, simulate the filtering overlay
  useEffect(() => {
    if (searchQuery) {
      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 600);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Extract unique brands for the filter sidebar dynamically from the data
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    initialTvs.forEach(tv => {
      if (tv.brand && tv.brand !== 'Unknown') brands.add(tv.brand);
    });
    return Array.from(brands).sort();
  }, [initialTvs]);

  const sizes = ["80\" and Larger", "70\" to 79\"", "50\" to 59\"", "49\" and Smaller"];
  const priceRanges = ["Under $500", "$500 - $1,000", "$1,000 - $1,500", "$3,000 & Above"];

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setIsFiltering(true);
    setState(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    setTimeout(() => setIsFiltering(false), 600); // Simulate network/filtering delay for visual feedback
  };

  const filteredTvs = useMemo(() => {
    return initialTvs.filter(tv => {
      // Filter by Search Query
      if (searchQuery && !tv.title.toLowerCase().includes(searchQuery) && !tv.brand.toLowerCase().includes(searchQuery)) {
        return false;
      }

      // Filter by Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(tv.brand)) {
        return false;
      }

      // Filter by Screen Size
      if (selectedSizes.length > 0) {
        // Extract numeric size from title or specs
        const sizeMatch = tv.title.match(/(\d+)/);
        const sizeNum = sizeMatch ? parseInt(sizeMatch[1]) : 0;
        
        const sizeMatched = selectedSizes.some(sizeFilter => {
          if (sizeFilter === "80\" and Larger" && sizeNum >= 80) return true;
          if (sizeFilter === "70\" to 79\"" && sizeNum >= 70 && sizeNum <= 79) return true;
          if (sizeFilter === "50\" to 59\"" && sizeNum >= 50 && sizeNum <= 59) return true;
          if (sizeFilter === "49\" and Smaller" && sizeNum <= 49) return true;
          return false;
        });

        if (!sizeMatched) return false;
      }

      // Filter by Price
      if (selectedPrices.length > 0) {
        const priceMatched = selectedPrices.some(priceFilter => {
          if (priceFilter === "Under $500" && tv.price < 500) return true;
          if (priceFilter === "$500 - $1,000" && tv.price >= 500 && tv.price <= 1000) return true;
          if (priceFilter === "$1,000 - $1,500" && tv.price >= 1000 && tv.price <= 1500) return true;
          if (priceFilter === "$3,000 & Above" && tv.price >= 3000) return true;
          return false;
        });

        if (!priceMatched) return false;
      }

      return true;
    });
  }, [initialTvs, selectedBrands, selectedSizes, selectedPrices, searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="flex items-center justify-between lg:hidden mb-4 border-b pb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          <button className="flex items-center gap-2 border px-3 py-1 rounded">
            <SlidersHorizontal size={16} /> Filter
          </button>
        </div>
        
        <div className="hidden lg:block">
          <h2 className="font-bold text-xl mb-6 border-b pb-2">Filter Results</h2>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3">Brands</h3>
            <ul className="space-y-2">
              {availableBrands.map(brand => (
                <li key={brand} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={`brand-${brand}`} 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleFilter(setSelectedBrands, brand)}
                    className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue" 
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer select-none">{brand}</label>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3">Screen Size</h3>
            <ul className="space-y-2">
              {sizes.map(size => (
                <li key={size} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={`size-${size}`} 
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleFilter(setSelectedSizes, size)}
                    className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue" 
                  />
                  <label htmlFor={`size-${size}`} className="text-sm text-gray-700 cursor-pointer select-none">{size}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-3">Price</h3>
            <ul className="space-y-2">
              {priceRanges.map(price => (
                <li key={price} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={`price-${price}`} 
                    checked={selectedPrices.includes(price)}
                    onChange={() => toggleFilter(setSelectedPrices, price)}
                    className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue" 
                  />
                  <label htmlFor={`price-${price}`} className="text-sm text-gray-700 cursor-pointer select-none">{price}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Product Grid Area */}
      <div className="flex-1 relative min-h-[500px]">
        {/* Pulsing Loading Overlay */}
        {isFiltering && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center backdrop-blur-[1px] rounded transition-opacity duration-300">
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold">
            {searchQuery ? `Search Results for "${searchParams.get('q')}"` : 'Shop All TVs'}
          </h1>
          <div className="text-sm text-gray-500">
            Showing {filteredTvs.length} Results
          </div>
        </div>

        {filteredTvs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            <button 
              onClick={() => { setSelectedBrands([]); setSelectedSizes([]); setSelectedPrices([]); }}
              className="mt-4 text-brand-blue font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTvs.map(tv => (
              <ProductCard key={tv.id} product={tv} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
