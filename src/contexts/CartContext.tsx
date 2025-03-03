
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { toast } from "sonner";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Calculate total item count
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        toast(`${product.name} quantity updated in cart`);
        return updatedItems;
      } else {
        // Add new item to cart
        toast(`${product.name} added to cart`);
        return [...prev, { ...product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const itemToRemove = prev.find(item => item.id === productId);
      if (itemToRemove) {
        toast(`${itemToRemove.name} removed from cart`);
      }
      return prev.filter(item => item.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
    toast("Cart updated");
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
