
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail,
  CreditCard, 
  Shield, 
  Truck,
  HelpCircle
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Benefits Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <Truck size={24} className="text-primary" />
            </div>
            <h3 className="font-medium mb-1">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders over $50</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <CreditCard size={24} className="text-primary" />
            </div>
            <h3 className="font-medium mb-1">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">100% secure payments</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <HelpCircle size={24} className="text-primary" />
            </div>
            <h3 className="font-medium mb-1">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Dedicated support</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <Shield size={24} className="text-primary" />
            </div>
            <h3 className="font-medium mb-1">Money-Back Guarantee</h3>
            <p className="text-sm text-muted-foreground">30-day return policy</p>
          </div>
        </div>
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/deals" className="text-muted-foreground hover:text-foreground transition-colors">Today's Deals</Link></li>
              <li><Link to="/category/electronics" className="text-muted-foreground hover:text-foreground transition-colors">Electronics</Link></li>
              <li><Link to="/category/clothing" className="text-muted-foreground hover:text-foreground transition-colors">Clothing</Link></li>
              <li><Link to="/category/home" className="text-muted-foreground hover:text-foreground transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/category/books" className="text-muted-foreground hover:text-foreground transition-colors">Books</Link></li>
              <li><Link to="/gift-cards" className="text-muted-foreground hover:text-foreground transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Information</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">Product Feedback</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">About Us</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">Press Center</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">Sustainability</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for updates, offers and more.</p>
            
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90 transition-colors">
                <Mail size={18} />
              </button>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center">
                <span className="font-bold text-xl">
                  <span className="text-primary">Modern</span>
                  <span>Shop</span>
                </span>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link>
              <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Preferences</Link>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-6">
            &copy; {new Date().getFullYear()} ModernShop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
