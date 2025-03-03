
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export const CartButton = () => {
  const [itemCount, setItemCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // For demo purposes, we'll just simulate having items in cart
  // In a real app, this would come from a cart state/context

  return (
    <Link 
      to="/cart" 
      className="relative flex items-center p-2 rounded-full icon-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShoppingCart size={20} />
      <span className="ml-1 text-sm hidden lg:inline">Cart</span>
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      
      {/* Cart Preview (only shown on hover if there are items) */}
      {isHovered && itemCount > 0 && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-hover border border-gray-100 p-4 z-50 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Your Cart ({itemCount})</h4>
            <Link to="/cart" className="text-primary text-sm">View All</Link>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-auto">
            {/* This would be mapped from actual cart items */}
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded"></div>
              <div>
                <p className="text-sm font-medium line-clamp-1">Product Name</p>
                <p className="text-xs text-muted-foreground">1 × $99.99</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium">Subtotal:</span>
              <span className="text-sm font-medium">$99.99</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link 
                to="/cart" 
                className="w-full bg-primary text-white text-center py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                View Cart
              </Link>
              <Link 
                to="/checkout" 
                className="w-full bg-black text-white text-center py-2 rounded-full hover:bg-black/90 transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};
