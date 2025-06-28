import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Usage & Benefits", path: "/usage-benefits" },
    { name: "Subscription Model", path: "/subscription-model" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/adc708a3-75ca-4634-8eaa-778c22587ac5.png" 
                alt="Zoss Water Logo" 
                className="h-12 w-auto group-hover:shadow-xl transition-shadow"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-zoss-green relative group ${
                  isActive(item.path)
                    ? "text-zoss-green"
                    : "text-zoss-gray"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-zoss-green to-blue-500 transition-all duration-300 group-hover:w-full ${
                  isActive(item.path) ? "w-full" : ""
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-zoss-green via-green-500 to-blue-500 hover:from-zoss-green/90 hover:via-green-500/90 hover:to-blue-500/90 text-white font-semibold tracking-wider px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 border border-white/20">
                  LOGIN / SIGNUP
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-zoss-gray" />
            ) : (
              <Menu className="h-6 w-6 text-zoss-gray" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-3 text-base font-medium transition-colors rounded-lg ${
                    isActive(item.path)
                      ? "text-zoss-green bg-zoss-green/10"
                      : "text-zoss-gray hover:text-zoss-green hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Button 
                      onClick={() => {
                        navigate('/dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-zoss-green hover:bg-zoss-green/90 text-white"
                    >
                      Dashboard
                    </Button>
                    {isAdmin && (
                      <Button 
                        onClick={() => {
                          navigate('/admin-dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-zoss-blue hover:bg-zoss-blue/90 text-white"
                      >
                        Admin Panel
                      </Button>
                    )}
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth">
                    <Button className="w-full bg-gradient-to-r from-zoss-green to-blue-500 hover:from-zoss-green/90 hover:to-blue-500/90 text-white font-medium tracking-wider">
                      LOGIN / SIGNUP
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;