
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllCategoryProducts, categories } from "@/lib/data";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryName, setCategoryName] = useState("Products");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Get products for this category
  const products = id ? getAllCategoryProducts(id) : [];

  // Find category name 
  useEffect(() => {
    if (id) {
      const category = categories.find(cat => cat.id === id);
      setCategoryName(category?.name || "Products");
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground mt-1">
                {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
          {/* Filter Panel - could be expanded in future */}
          {filterOpen && (
            <div className="mb-8 p-6 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Filter className="h-5 w-5" />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">Filtering options will be available soon.</p>
              </div>
            </div>
          )}
          
          {/* Products Display */}
          {products.length > 0 ? (
            <ProductGrid 
              products={products} 
              columns={4}
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
