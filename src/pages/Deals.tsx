
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/lib/data";
import { Percent } from "lucide-react";

const Deals = () => {
  // Filter products that have an originalPrice (which indicates they're on sale)
  const dealsProducts = products.filter(product => product.originalPrice !== undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-full mb-4">
              <Percent className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Today's Deals</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Limited-time offers and special discounts on a wide range of products. 
              Don't miss these amazing deals!
            </p>
          </div>
          
          {/* Deals Banner */}
          <div className="mb-12 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-red-800/80" />
            <img 
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Special Deals" 
              className="w-full h-64 object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Up to 50% Off</h2>
              <p className="text-xl mb-6">Limited time only. While supplies last.</p>
            </div>
          </div>
          
          {/* Deals Grid */}
          {dealsProducts.length > 0 ? (
            <ProductGrid 
              products={dealsProducts} 
              columns={4}
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No deals available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
