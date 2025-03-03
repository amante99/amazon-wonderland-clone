
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  CreditCard 
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, itemCount, subtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast("Order placed successfully!");
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center py-16">
          <div className="mb-6 flex justify-center">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-8 pb-4 border-b">Shopping Cart ({itemCount} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row gap-4 py-6 border-b"
            >
              {/* Product Image */}
              <div className="w-full sm:w-24 h-24 rounded overflow-hidden border bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-medium mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                
                {item.stock < 10 && (
                  <p className="text-xs text-red-600 mb-2">
                    Only {item.stock} left in stock
                  </p>
                )}
                
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-full overflow-hidden h-10">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-600 hover:underline flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                {item.quantity > 1 && (
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} each
                  </p>
                )}
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-6">
            <Link 
              to="/" 
              className="flex items-center text-primary hover:underline"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continue shopping
            </Link>
            
            <button 
              onClick={clearCart}
              className="text-red-600 hover:underline flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              Clear cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({itemCount} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${(subtotal * 0.07).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(subtotal + (subtotal * 0.07)).toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={`w-full py-3 rounded-full font-medium flex items-center justify-center transition-colors ${
              isCheckingOut 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isCheckingOut ? (
              <>Processing...</>
            ) : (
              <>
                <CreditCard size={18} className="mr-2" />
                Proceed to Checkout
              </>
            )}
          </button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
