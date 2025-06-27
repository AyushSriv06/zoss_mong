
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Usage & Benefits", path: "/usage-benefits" },
    { name: "Subscription Model", path: "/subscription-model" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const isActive = (path: string) => location.pathname === path;

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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-gradient-to-r from-zoss-green via-green-500 to-blue-500 hover:from-zoss-green/90 hover:via-green-500/90 hover:to-blue-500/90 text-white font-semibold tracking-wider px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 border border-white/20">
              REQUEST A DEMO
            </Button>
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
                <Button className="w-full bg-gradient-to-r from-zoss-green to-blue-500 hover:from-zoss-green/90 hover:to-blue-500/90 text-white font-medium tracking-wider">
                  REQUEST A DEMO
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
