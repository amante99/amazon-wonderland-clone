
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Home, 
  LogOut, 
  Package, 
  CreditCard, 
  Map, 
  MapPin, 
  Calendar, 
  TruckIcon,
  Check
} from "lucide-react";
import { getRecommendedProducts, getUserOrders, Order } from "@/lib/data";
import { useWishlist } from "@/contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type DashboardTab = "home" | "orders" | "wishlist" | "settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("home");
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist();
  const recommendedProducts = getRecommendedProducts();
  const orders = getUserOrders();
  
  const handleLogout = () => {
    // In a real app, this would clear authentication state
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/account");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* User Info */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <User className="text-primary" />
                    </div>
                    <div>
                      <h2 className="font-medium">John Doe</h2>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="p-2">
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "home" 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-gray-50"
                    }`}
                  >
                    <Home size={18} className="mr-3" />
                    <span>Dashboard</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "orders" 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-gray-50"
                    }`}
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    <span>My Orders</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "wishlist" 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-gray-50"
                    }`}
                  >
                    <Heart size={18} className="mr-3" />
                    <span>Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="ml-auto bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "settings" 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-gray-50"
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    <span>Account Settings</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-gray-50 transition-colors"
                  >
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Home Tab */}
              {activeTab === "home" && (
                <div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h1 className="text-2xl font-bold mb-6">Welcome back, John!</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Package className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Active Orders</p>
                            <p className="text-xl font-bold">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Heart className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Wishlist Items</p>
                            <p className="text-xl font-bold">{wishlistItems.length}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <CreditCard className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Spent</p>
                            <p className="text-xl font-bold">${orders.reduce((total, order) => total + order.total, 0).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Latest Order */}
                  {orders.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Latest Order</h2>
                        <button 
                          onClick={() => setActiveTab("orders")}
                          className="text-primary text-sm hover:underline"
                        >
                          View All
                        </button>
                      </div>
                      
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="mb-2 md:mb-0">
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-medium">{orders[0].id}</p>
                          </div>
                          <div className="mb-2 md:mb-0">
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{orders[0].date}</p>
                          </div>
                          <div className="mb-2 md:mb-0">
                            <p className="text-sm text-muted-foreground">Items</p>
                            <p className="font-medium">{orders[0].items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                          </div>
                          <div className="mb-2 md:mb-0">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-medium">${orders[0].total.toFixed(2)}</p>
                          </div>
                          <div className="mb-2 md:mb-0">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                              orders[0].status === 'delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : orders[0].status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {orders[0].status.charAt(0).toUpperCase() + orders[0].status.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Recommended Products */}
                  {recommendedProducts.length > 0 && (
                    <ProductGrid
                      products={recommendedProducts.slice(0, 4)} 
                      title="Recommended For You"
                      subtitle="Based on your browsing history"
                      columns={4}
                    />
                  )}
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                    
                    {orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">When you place orders, they will appear here.</p>
                        <button 
                          onClick={() => navigate("/")}
                          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Start Shopping
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
                    
                    {wishlistItems.length > 0 ? (
                      <ProductGrid
                        products={wishlistItems} 
                        columns={3}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-4">Save items you like by clicking the heart icon on any product.</p>
                        <button 
                          onClick={() => navigate("/")}
                          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Browse Products
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="firstName">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          defaultValue="John" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="lastName">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          defaultValue="Doe" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          defaultValue="john.doe@example.com" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className="w-full p-2 border border-gray-300 rounded-md" 
                          defaultValue="(123) 456-7890" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="font-medium text-lg mb-4">Default Address</h2>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2" htmlFor="address">Street Address</label>
                          <input 
                            type="text" 
                            id="address" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            defaultValue="123 Main St" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="city">City</label>
                          <input 
                            type="text" 
                            id="city" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            defaultValue="Austin" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="state">State</label>
                          <input 
                            type="text" 
                            id="state" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            defaultValue="Texas" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="zip">ZIP Code</label>
                          <input 
                            type="text" 
                            id="zip" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            defaultValue="78701" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="country">Country</label>
                          <input 
                            type="text" 
                            id="country" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            defaultValue="United States" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order }: { order: Order }) => {
  const statusColors = {
    pending: "bg-blue-100 text-blue-800",
    processing: "bg-amber-100 text-amber-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  
  const statusIcons = {
    pending: <CreditCard size={16} className="mr-1" />,
    processing: <Package size={16} className="mr-1" />,
    shipped: <TruckIcon size={16} className="mr-1" />,
    delivered: <Check size={16} className="mr-1" />,
    cancelled: <Map size={16} className="mr-1" />
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Order Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Order ID and Date */}
          <div>
            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
            <div className="flex items-center">
              <Calendar size={16} className="text-muted-foreground mr-1" />
              <span className="text-sm">{order.date}</span>
            </div>
          </div>
          
          {/* Status */}
          <div className={`text-sm px-3 py-1 rounded-full font-medium flex items-center ${statusColors[order.status]}`}>
            {statusIcons[order.status]}
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
          
          {/* Total */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="p-4">
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-start justify-between">
        {/* Shipping Address */}
        <div>
          <p className="text-sm font-medium mb-1">Shipping Address</p>
          <div className="flex items-start">
            <MapPin size={16} className="text-muted-foreground mr-1 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full bg-primary text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">
            Track Order
          </button>
          <button className="w-full border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
