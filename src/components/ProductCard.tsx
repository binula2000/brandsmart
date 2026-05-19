'use client';

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  brand: string;
  title: string;
  model: string;
  images?: string[];
  image?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isSale = product.originalPrice && product.price < product.originalPrice;
  const savings = isSale ? product.originalPrice! - product.price : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow relative">
      {isSale && (
        <div className="absolute top-2 left-2 z-10 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
          SAVE ${savings.toFixed(2)}
        </div>
      )}
      
      <Link href={`/tvs/${product.id}`} className="block relative aspect-square mb-4">
        {/* Using a standard img tag here since we don't have configured next/image domains, but ideally use next/image */}
        <img 
          src={product.images?.[0] || product.image || ""} 
          alt={product.title}
          className="object-contain w-full h-full"
        />
      </Link>
      
      <div className="flex-1 flex flex-col">
        <span className="text-sm font-bold text-gray-500 mb-1">{product.brand}</span>
        
        <Link href={`/tvs/${product.id}`} className="hover:text-brand-blue transition-colors">
          <h3 className="font-medium text-sm md:text-base line-clamp-3 mb-2">{product.title}</h3>
        </Link>
        
        <div className="text-xs text-gray-500 mb-2">Model: {product.model}</div>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating!) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-xs text-brand-blue hover:underline cursor-pointer">({product.reviews})</span>
          </div>
        )}
        
        <div className="mt-auto">
          {isSale && (
            <div className="text-sm text-gray-500 line-through mb-1">
              ${product.originalPrice?.toFixed(2)}
            </div>
          )}
          <div className="text-2xl font-bold text-brand-red mb-4">
            ${product.price.toFixed(2)}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, image: product.images?.[0] || product.image });
            }}
            className="w-full bg-brand-blue text-white py-2 rounded font-bold hover:bg-brand-blue-dark transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
