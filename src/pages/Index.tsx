
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { CategorySection } from "@/components/ui/CategorySection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getBestSellers } from "@/lib/data";

const Index = () => {
  // Get best sellers for the featured products section
  const bestSellers = getBestSellers();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Slider */}
        <Hero />
        
        {/* Categories Section */}
        <CategorySection />
        
        {/* Featured Products */}
        <ProductGrid 
          products={bestSellers} 
          title="Best Sellers" 
          subtitle="Our most popular products based on sales" 
          featuredIndex={0}
        />
        
        {/* Promotional Banner */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Special Offer" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
              
              {/* Content */}
              <div className="relative py-16 px-6 md:py-24 md:px-12 flex flex-col items-center text-center text-white">
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Summer Sale</h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
                  Up to 50% off on selected items. Don't miss out on these amazing deals!
                </p>
                <a 
                  href="/deals" 
                  className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Authentic Products</h3>
                <p className="text-muted-foreground">100% authentic products, sourced directly from manufacturers.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">Quick and reliable shipping to your doorstep.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">Multiple secure payment options for your convenience.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">Hassle-free return policy for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
