
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Usage & Benefits", path: "/usage-benefits" },
    { name: "Subscription Model", path: "/subscription-model" },
    { name: "B2C Solutions", path: "/b2c-solutions" },
    { name: "Commercial/B2B", path: "/commercial-b2b" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <footer className="bg-gradient-to-br from-zoss-blue to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/adc708a3-75ca-4634-8eaa-778c22587ac5.png" 
                  alt="Zoss Water Logo" 
                  className="h-12 w-auto shadow-lg"
                />
              </div>
            </div>
            <p className="text-sm text-blue-200 mb-6 leading-relaxed">
              Inspired by Ayurvedic Wisdom, Perfected by Science. Alkaline, Antioxidant-Rich water for healthier living and sustainable wellness.
            </p>
          </div>

          {/* Sitemap */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-semibold mb-6 text-lg text-white">Sitemap</h3>
            <div className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm text-blue-200 hover:text-zoss-green transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-heading font-semibold mb-6 text-lg text-white">Stay Updated</h3>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-zoss-green focus:bg-white/15 transition-all"
              />
              <Button className="w-full bg-gradient-to-r from-zoss-green to-green-600 hover:from-zoss-green/90 hover:to-green-600/90 text-white font-semibold shadow-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links and Legal */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-8 mb-6 md:mb-0">
            <a href="#" className="text-blue-200 hover:text-zoss-green transition-colors duration-200 font-medium">
              LinkedIn
            </a>
            <a href="#" className="text-blue-200 hover:text-zoss-green transition-colors duration-200 font-medium">
              Instagram
            </a>
            <a href="#" className="text-blue-200 hover:text-zoss-green transition-colors duration-200 font-medium">
              Facebook
            </a>
          </div>
          <div className="text-sm text-blue-200 text-center md:text-left">
            <p>© 2025 Zoss Water Pvt. Ltd. | 
              <Link to="#" className="hover:text-zoss-green ml-2 transition-colors">Privacy Policy</Link> | 
              <Link to="#" className="hover:text-zoss-green ml-2 transition-colors">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
