
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchBar } from "../ui/SearchBar";
import { CartButton } from "../ui/CartButton";
import { Menu, X, User, Heart, ShoppingBag, LogIn } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount: wishlistCount } = useWishlist();

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

  // Check if user is logged in
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, [location.pathname]);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/account");
    }
  };

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
            <button 
              onClick={handleAccountClick} 
              className="icon-button hidden md:flex"
            >
              {isLoggedIn ? (
                <>
                  <User size={20} />
                  <span className="ml-1 text-sm hidden lg:inline">Account</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span className="ml-1 text-sm hidden lg:inline">Sign In</span>
                </>
              )}
            </button>
            <Link to="/wishlist" className="icon-button hidden md:flex relative">
              <Heart size={20} />
              <span className="ml-1 text-sm hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
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
              <button 
                onClick={handleAccountClick}
                className="mobile-nav-link flex items-center"
              >
                {isLoggedIn ? (
                  <>
                    <User size={18} className="mr-2" />
                    Account
                  </>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
              <Link to="/wishlist" className="mobile-nav-link flex items-center">
                <Heart size={18} className="mr-2" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
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
