
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, just simulate successful login without authentication
    if (isLogin) {
      // Store user info in localStorage to persist the login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } else {
      // For signup, simulate account creation
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-soft">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {isLogin ? "Sign in to your account" : "Create an account"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isLogin 
                ? "Enter your details to access your account" 
                : "Enter your details to create a new account"}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              {isLogin ? "Sign in" : "Create account"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>{" "}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
