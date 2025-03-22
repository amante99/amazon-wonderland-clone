
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Bell, 
  LogOut 
} from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getBestSellers, getRecommendedProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    
    if (!isLoggedIn) {
      navigate("/account");
      return;
    }
    
    if (email) {
      setUserEmail(email);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    toast.success("Successfully logged out");
    navigate("/");
  };
  
  // Get product data
  const bestSellers = getBestSellers();
  const recommendedProducts = getRecommendedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User size={32} className="text-primary" />
                  </div>
                  <h2 className="font-medium">{userEmail}</h2>
                  <p className="text-sm text-muted-foreground">Customer since 2023</p>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "home" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <User size={18} className="mr-2" />
                    Account Home
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "orders" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Package size={18} className="mr-2" />
                    Orders
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "wishlist" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Heart size={18} className="mr-2" />
                    Wishlist
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("payments")}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "payments" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Payment Methods
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "addresses" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <MapPin size={18} className="mr-2" />
                    Addresses
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "notifications" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Bell size={18} className="mr-2" />
                    Notifications
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="flex-grow bg-white rounded-xl shadow-soft p-6">
              {activeTab === "home" && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Account Dashboard</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Recent Orders</h3>
                      <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Browse Products
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Wishlist</h3>
                      <p className="text-sm text-muted-foreground">Your wishlist is empty.</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Browse Products
                      </Button>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mt-8">Recommended For You</h2>
                  <ProductGrid 
                    products={recommendedProducts.slice(0, 4)} 
                    title="" 
                    subtitle="" 
                  />
                </div>
              )}
              
              {activeTab === "orders" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">No orders yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      When you place orders, they will appear here
                    </p>
                    <Button onClick={() => navigate("/")}>
                      Browse Products
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === "wishlist" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Save items you're interested in by clicking the heart icon
                    </p>
                    <Button onClick={() => navigate("/")}>
                      Browse Products
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === "payments" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">No payment methods</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven't added any payment methods yet
                    </p>
                    <Button variant="outline">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === "addresses" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Your Addresses</h1>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">No addresses saved</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add addresses for faster checkout
                    </p>
                    <Button variant="outline">
                      Add Address
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === "notifications" && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Notification Preferences</h1>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Receive updates about your orders, account, and recommendations
                      </p>
                      <Button variant="outline" size="sm">
                        Manage Preferences
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get real-time updates on your mobile device
                      </p>
                      <Button variant="outline" size="sm">
                        Manage Preferences
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
