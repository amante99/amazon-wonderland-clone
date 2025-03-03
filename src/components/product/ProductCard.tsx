
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/lib/data";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    toast(
      isWishlisted 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist`
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Add to cart with animation
    setTimeout(() => {
      addToCart(product, 1);
      setIsAddingToCart(false);
    }, 600);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col h-full hover:-translate-y-1 ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Product Image */}
      <div className={`relative overflow-hidden ${
        featured ? 'md:w-1/2 aspect-square md:aspect-auto' : 'aspect-square'
      }`}>
        <div className="image-blur-wrapper h-full">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              isImageLoaded ? '' : 'image-blur loading'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"} 
          />
        </button>
        
        {/* Discount Tag */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        
        {/* Best Seller Badge */}
        {product.bestSeller && !discount && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Best Seller
          </div>
        )}
        
        {/* Free Shipping Badge */}
        {product.freeShipping && (
          <div className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            Free Shipping
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className={`p-4 flex flex-col flex-grow ${featured ? 'md:w-1/2 md:p-6' : ''}`}>
        {/* Category */}
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
        
        {/* Product Name */}
        <h3 className={`font-medium text-foreground mb-2 line-clamp-2 ${featured ? 'text-lg md:text-xl' : ''}`}>
          {product.name}
        </h3>
        
        {/* Description (only for featured) */}
        {featured && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3 hidden md:block">
            {product.description}
          </p>
        )}
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={14}
                className={i < Math.floor(product.rating) 
                  ? "fill-amber-400 text-amber-400" 
                  : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline mb-3 mt-auto">
          <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className={`text-xs mb-3 ${
          product.stock < 10 ? "text-red-600" : "text-green-600"
        }`}>
          {product.stock < 10 
            ? `Only ${product.stock} left in stock` 
            : "In stock"
          }
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full mt-auto py-2.5 rounded-full font-medium transition-all ${
            isAddingToCart 
              ? "bg-green-500 text-white" 
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isAddingToCart ? (
            <span className="flex items-center justify-center">
              <Check size={18} className="mr-1" />
              Added
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <ShoppingCart size={18} className="mr-1" />
              Add to Cart
            </span>
          )}
        </button>
      </div>
    </Link>
  );
};
