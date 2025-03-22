
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  // Calculate total item count
  const itemCount = wishlistItems.length;

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      // Check if item already exists in wishlist
      if (prev.some(item => item.id === product.id)) {
        toast(`${product.name} is already in your wishlist`);
        return prev;
      } else {
        // Add new item to wishlist
        toast(`${product.name} added to wishlist`);
        return [...prev, product];
      }
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => {
      const itemToRemove = prev.find(item => item.id === productId);
      if (itemToRemove) {
        toast(`${itemToRemove.name} removed from wishlist`);
      }
      return prev.filter(item => item.id !== productId);
    });
  };
  
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    toast("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        itemCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
