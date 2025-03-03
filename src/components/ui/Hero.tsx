
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Premium Electronics",
    subtitle: "Discover the latest tech with exclusive deals",
    cta: "Shop Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/category/electronics",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "Refresh your wardrobe with our new arrivals",
    cta: "Shop Clothing",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/category/clothing",
    color: "from-amber-500/20 to-red-500/20",
  },
  {
    id: 3,
    title: "Home Essentials",
    subtitle: "Transform your space with quality home products",
    cta: "Shop Home",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/category/home",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    goToSlide(nextSlide);
  };

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden mt-16">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Content */}
          <div className="relative z-20 flex h-full">
            <div className="container mx-auto px-4 md:px-6 flex flex-col justify-center">
              <div className="max-w-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">{slide.subtitle}</p>
                <Link 
                  to={slide.link}
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  {slide.cta}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative gradient */}
          <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${slide.color} opacity-30`} />
        </div>
      ))}
      
      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
