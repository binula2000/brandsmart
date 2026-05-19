'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  wishlistCount: number;
  
  // UI States
  isCartDrawerOpen: boolean;
  activeCartItem: CartItem | null;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  isSignInDrawerOpen: boolean;
  setIsSignInDrawerOpen: (open: boolean) => void;
  
  isKlarnaModalOpen: boolean;
  setIsKlarnaModalOpen: (open: boolean) => void;
  
  zipCode: string;
  setZipCode: (zip: string) => void;
  isZipModalOpen: boolean;
  setIsZipModalOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [activeCartItem, setActiveCartItem] = useState<CartItem | null>(null);
  const [isSignInDrawerOpen, setIsSignInDrawerOpen] = useState(false);
  const [isKlarnaModalOpen, setIsKlarnaModalOpen] = useState(false);
  const [zipCode, setZipCode] = useState('33101');
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    // Open the Cart Drawer instead of Toast
    setActiveCartItem(item);
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      return [...prev, id];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        cartCount,
        wishlistCount,
        
        isCartDrawerOpen,
        activeCartItem,
        setIsCartDrawerOpen,
        
        isSignInDrawerOpen,
        setIsSignInDrawerOpen,
        
        isKlarnaModalOpen,
        setIsKlarnaModalOpen,
        
        zipCode,
        setZipCode,
        isZipModalOpen,
        setIsZipModalOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
