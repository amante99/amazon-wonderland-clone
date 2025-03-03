
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFeaturedCategories, Category } from "@/lib/data";

interface CategorySectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export const CategorySection = ({
  title = "Shop by Category",
  subtitle = "Browse our featured categories",
  limit = 4
}: CategorySectionProps) => {
  const categories = getFeaturedCategories().slice(0, limit);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link 
            to="/categories" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Browse All Categories
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="group overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-subtle hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <span>Shop Now</span>
            <ArrowRight size={14} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};
