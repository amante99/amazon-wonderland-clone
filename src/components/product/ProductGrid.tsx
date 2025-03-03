
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  featuredIndex?: number;
}

export const ProductGrid = ({
  products,
  title,
  subtitle,
  columns = 4,
  featuredIndex = -1,
}: ProductGridProps) => {
  // Default column configuration based on the columns prop
  let gridCols;
  switch (columns) {
    case 2:
      gridCols = "grid-cols-1 sm:grid-cols-2";
      break;
    case 3:
      gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      break;
    case 4:
    default:
      gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      break;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header (optional) */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        
        {/* Products Grid */}
        <div className={`grid ${gridCols} gap-6`}>
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              featured={index === featuredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
