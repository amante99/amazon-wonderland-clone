
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductById, getProductsByCategory, Product } from "@/lib/data";
import { 
  Star, 
  Truck, 
  Shield, 
  RefreshCcw, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Check, 
  Minus, 
  Plus,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    // Scroll to top when navigating to product detail
    window.scrollTo(0, 0);
    
    if (id) {
      const productData = getProductById(id);
      if (productData) {
        setProduct(productData);
        setSelectedImage(productData.image);
        
        // Get related products from same category
        const related = getProductsByCategory(productData.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Add to cart
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAddingToCart(false);
    }, 600);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/" 
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center flex-wrap">
              <li className="flex items-center">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} className="mx-2 text-muted-foreground" />
              </li>
              <li className="flex items-center">
                <Link 
                  to={`/category/${product.category}`} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
                <ChevronRight size={14} className="mx-2 text-muted-foreground" />
              </li>
              <li className="text-foreground font-medium truncate">
                {product.name}
              </li>
            </ol>
          </nav>
          
          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column: Product Images */}
            <div>
              {/* Main Image */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-4 aspect-square">
                <img 
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-full object-contain animate-fade-in"
                />
              </div>
              
              {/* Image Gallery (in a real app, a product would have multiple images) */}
              <div className="grid grid-cols-5 gap-2">
                <button 
                  className={`rounded-lg overflow-hidden border-2 aspect-square transition-all ${
                    selectedImage === product.image ? "border-primary" : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(product.image)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {/* These would be actual additional product images in a real app */}
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index}
                    className="rounded-lg overflow-hidden border-2 border-transparent aspect-square bg-gray-100"
                  />
                ))}
              </div>
            </div>
            
            {/* Right Column: Product Info */}
            <div>
              {/* Product Title & Category */}
              <div className="mb-4">
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="ml-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>
              
              {/* Availability */}
              <div className={`flex items-center text-sm mb-6 ${
                product.stock < 10 ? "text-red-600" : "text-green-600"
              }`}>
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  product.stock < 10 ? "bg-red-600" : "bg-green-600"
                }`}></div>
                {product.stock > 0 
                  ? product.stock < 10 
                    ? `Only ${product.stock} left in stock - order soon` 
                    : "In Stock"
                  : "Out of Stock"
                }
              </div>
              
              {/* Quick Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Truck size={18} className="text-muted-foreground mr-2" />
                  <span className="text-sm">{product.freeShipping ? "Free Shipping" : "Fast Delivery"}</span>
                </div>
                <div className="flex items-center">
                  <Shield size={18} className="text-muted-foreground mr-2" />
                  <span className="text-sm">Secure Transaction</span>
                </div>
                <div className="flex items-center">
                  <RefreshCcw size={18} className="text-muted-foreground mr-2" />
                  <span className="text-sm">30-Day Returns</span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={product.stock} 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-y border-gray-300 py-2 focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                  className={`flex-1 py-3 px-4 rounded-full font-medium transition-all flex items-center justify-center ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : isAddingToCart 
                        ? "bg-green-500 text-white" 
                        : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Cart
                    </>
                  ) : product.stock === 0 ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleToggleWishlist}
                  className={`py-3 px-4 rounded-full font-medium border transition-all flex items-center justify-center ${
                    isProductInWishlist 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={`mr-2 ${isProductInWishlist ? "fill-red-500" : ""}`} 
                  />
                  Wishlist
                </button>
                
                <button
                  className="py-3 px-4 rounded-full font-medium border border-gray-300 hover:border-gray-400 transition-all flex items-center justify-center"
                >
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
              </div>
              
              {/* Product Tabs */}
              <div>
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-3 px-4 font-medium text-sm transition-colors ${
                      activeTab === "description" 
                        ? "border-b-2 border-primary text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specifications")}
                    className={`py-3 px-4 font-medium text-sm transition-colors ${
                      activeTab === "specifications" 
                        ? "border-b-2 border-primary text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`py-3 px-4 font-medium text-sm transition-colors ${
                      activeTab === "reviews" 
                        ? "border-b-2 border-primary text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Reviews
                  </button>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  {activeTab === "description" && (
                    <div>
                      <p className="mb-4">
                        {product.description}
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                      </p>
                    </div>
                  )}
                  
                  {activeTab === "specifications" && (
                    <div>
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Brand</td>
                            <td className="py-2">ModernShop</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Model</td>
                            <td className="py-2">MS-{product.id}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Category</td>
                            <td className="py-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Weight</td>
                            <td className="py-2">1.5 kg</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Dimensions</td>
                            <td className="py-2">25 × 15 × 5 cm</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Color</td>
                            <td className="py-2">Black</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-medium">Warranty</td>
                            <td className="py-2">1 Year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="text-4xl font-bold mr-4">{product.rating.toFixed(1)}</div>
                        <div>
                          <div className="flex mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                size={20}
                                className={i < Math.floor(product.rating) 
                                  ? "fill-amber-400 text-amber-400" 
                                  : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Based on {product.reviewCount.toLocaleString()} reviews
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {/* This would be dynamically populated in a real app */}
                        <div className="border-b border-gray-200 pb-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                            <div>
                              <div className="font-medium">John D.</div>
                              <div className="text-xs text-muted-foreground">Verified Purchase</div>
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                size={14}
                                className={i < 5
                                  ? "fill-amber-400 text-amber-400" 
                                  : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">June 12, 2023</span>
                          </div>
                          <h3 className="font-medium mb-2">Excellent product!</h3>
                          <p className="text-sm">
                            This product exceeded my expectations. The quality is outstanding and it works perfectly. Highly recommended!
                          </p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                            <div>
                              <div className="font-medium">Sarah M.</div>
                              <div className="text-xs text-muted-foreground">Verified Purchase</div>
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                size={14}
                                className={i < 4
                                  ? "fill-amber-400 text-amber-400" 
                                  : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">May 29, 2023</span>
                          </div>
                          <h3 className="font-medium mb-2">Good value for money</h3>
                          <p className="text-sm">
                            I'm quite happy with this purchase. It's well-made and performs as advertised. The shipping was also very fast.
                          </p>
                        </div>
                      </div>
                      
                      <button className="mt-6 text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
                        See all {product.reviewCount.toLocaleString()} reviews
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <ProductGrid 
              products={relatedProducts} 
              title="You May Also Like" 
              subtitle="Similar products you might be interested in"
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
