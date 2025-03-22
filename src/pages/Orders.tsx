
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getUserOrders } from "@/lib/data";
import { Package, ShoppingBag, Check, Truck, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = getUserOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">
              View and track your orders
            </p>
          </div>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-secondary/30 p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <span className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Placed on {order.date}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="p-4 md:p-6">
                    <ul className="divide-y">
                      {order.items.map((item, index) => (
                        <li key={index} className="py-4 flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center" 
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <Link to={`/product/${item.product.id}`} className="text-sm font-medium hover:text-primary">
                              {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/30 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-secondary flex items-center justify-center rounded-full mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You haven't placed any orders yet. Start shopping and your orders will appear here.
              </p>
              <Link to="/">
                <Button>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
