
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../ui/SearchBar";
import { CartButton } from "../ui/CartButton";
import { Menu, X, User, Heart, ShoppingBag } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <span className="font-bold text-xl">
              <span className="text-primary">Modern</span>
              <span>Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/category/electronics" className="nav-link">Electronics</Link>
            <Link to="/category/clothing" className="nav-link">Clothing</Link>
            <Link to="/category/home" className="nav-link">Home</Link>
            <Link to="/category/books" className="nav-link">Books</Link>
            <Link to="/deals" className="nav-link">Today's Deals</Link>
          </nav>

          {/* Search (Desktop) */}
          <div className="hidden md:block w-full max-w-md mx-6">
            <SearchBar />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="icon-button hidden md:flex">
              <User size={20} />
              <span className="ml-1 text-sm hidden lg:inline">Account</span>
            </Link>
            <Link to="/wishlist" className="icon-button hidden md:flex">
              <Heart size={20} />
              <span className="ml-1 text-sm hidden lg:inline">Wishlist</span>
            </Link>
            <CartButton />

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search (appears below header) */}
        <div className={`pb-4 md:hidden transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none h-0"
        }`}>
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-10 pointer-events-none h-0"
        }`}
      >
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/category/electronics" className="mobile-nav-link">Electronics</Link>
              <Link to="/category/clothing" className="mobile-nav-link">Clothing</Link>
              <Link to="/category/home" className="mobile-nav-link">Home</Link>
              <Link to="/category/books" className="mobile-nav-link">Books</Link>
              <Link to="/deals" className="mobile-nav-link">Today's Deals</Link>
              <div className="h-px bg-gray-200 my-2"></div>
              <Link to="/account" className="mobile-nav-link flex items-center">
                <User size={18} className="mr-2" />
                Account
              </Link>
              <Link to="/wishlist" className="mobile-nav-link flex items-center">
                <Heart size={18} className="mr-2" />
                Wishlist
              </Link>
              <Link to="/orders" className="mobile-nav-link flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Orders
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
