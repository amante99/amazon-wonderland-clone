
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, clearWishlist, itemCount } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {itemCount === 0 
                  ? "Your wishlist is empty" 
                  : `${itemCount} item${itemCount !== 1 ? 's' : ''} in your wishlist`}
              </p>
            </div>
            
            {itemCount > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="mt-4 md:mt-0"
              >
                Clear Wishlist
              </Button>
            )}
          </div>

          {/* Content */}
          {itemCount === 0 ? (
            <div className="text-center py-16 bg-secondary/30 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-secondary flex items-center justify-center rounded-full mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Items added to your wishlist will appear here. Start shopping and save items for later!
              </p>
              <Link to="/">
                <Button>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Stock Warning */}
          {itemCount > 0 && (
            <div className="flex items-center text-sm mt-8 p-4 border border-amber-200 bg-amber-50 text-amber-700 rounded-md">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              <p>Items in your wishlist are not reserved. Add them to your cart to ensure availability.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
