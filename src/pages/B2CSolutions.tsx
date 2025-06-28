import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Zap, Wrench, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const B2CSolutions = () => {
  const products = [
    {
      name: "Zoss Countertop Ionizer",
      image: "/lovable-uploads/622f2f9b-d2f1-4f0c-ac4f-656dca514723.png",
      features: ["pH Range: 8.5-11.0", "Compact Design", "Easy Installation"],
      price: "₹25,000"
    },
    {
      name: "Zoss Under-Sink Ionizer", 
      image: "/lovable-uploads/e2461f2f-96be-4a69-ad60-df4433dd50ce.png",
      features: ["pH Range: 8.0-11.5", "Hidden Installation", "High Flow Rate"],
      price: "₹45,000"
    },
    {
      name: "Zoss Atlanta",
      image: "/lovable-uploads/91d71d34-d5aa-44bb-8185-e5698d380783.png", 
      features: ["Premium Quality", "Advanced Ionization", "Professional Grade"],
      price: "₹1,59,000"
    }
  ];

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Zoss at Home
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transform your home hydration with our premium alkaline ionizer solutions
          </p>
        </div>
      </section>

      {/* Product Showcase */}
            {/* Water Ionizer Collection - Modified for individual product pages */}
            <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
              Water Ionizer Collection
            </h3>
            <p className="text-xl text-zoss-gray max-w-3xl mx-auto">Discover our premium range of alkaline water ionizers designed for every need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "countertop-ionizer",
                name: "Zoss Countertop Ionizer",
                image: "/lovable-uploads/622f2f9b-d2f1-4f0c-ac4f-656dca514723.png",
                price: "₹25,000",
                features: ["pH Range: 8.5-11.0", "Compact Design", "Easy Installation"],
                description: "Perfect for kitchens and small spaces"
              },
              {
                id: "under-sink-ionizer",
                name: "Zoss Under-Sink Ionizer",
                image: "/lovable-uploads/e2461f2f-96be-4a69-ad60-df4433dd50ce.png",
                price: "₹45,000",
                features: ["pH Range: 8.0-11.5", "Hidden Installation", "High Flow Rate"],
                description: "Seamless integration for modern kitchens"
              },
              {
                id: "zoss-atlanta",
                name: "Zoss Atlanta",
                image: "/lovable-uploads/91d71d34-d5aa-44bb-8185-e5698d380783.png",
                price: "₹1,59,000",
                features: ["Premium Quality", "Advanced Ionization", "Professional Grade"],
                description: "Commercial-grade solution for businesses"
              }
            ].map((product, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden group">
                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-zoss-blue group-hover:text-zoss-green transition-colors">
                    {product.name}
                  </CardTitle>
                  <div className="text-2xl font-bold text-zoss-green">{product.price}</div>
                  <p className="text-sm text-zoss-gray">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-zoss-gray flex items-center">
                        <CheckCircle className="w-4 h-4 text-zoss-green mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/product/${product.id}`}>
                    <Button className="w-full bg-zoss-green hover:bg-zoss-green/90 text-white font-semibold group-hover:bg-gradient-to-r group-hover:from-zoss-green group-hover:to-green-600 transition-all">
                      View Details & Get Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Wrench className="h-8 w-8" />, title: "Connect to Tap", description: "Simple connection to your existing tap" },
              { icon: <Zap className="h-8 w-8" />, title: "Turn on Electrolysis", description: "Activate the ionization process" },
              { icon: <Star className="h-8 w-8" />, title: "Select pH Level", description: "Choose your desired alkalinity" },
              { icon: <Droplets className="h-8 w-8" />, title: "Enjoy Ionized Water", description: "Pure, healthy water instantly" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-zoss-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-zoss-green">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-zoss-blue mb-2">{step.title}</h3>
                <p className="text-sm text-zoss-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Why Choose Zoss Water Systems?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/e0fc6371-a120-4061-bfd3-2b221d37135c.png" 
                  alt="Purity Assured"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-zoss-blue mb-3">Purity Assured</h3>
              <p className="text-zoss-gray">Advanced filtration technology ensures the highest quality alkaline water for your family.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/775ee836-c62f-4b14-9303-6dda3ffa7328.png" 
                  alt="Ayurvedic Balance"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-zoss-blue mb-3">Ayurvedic Balance</h3>
              <p className="text-zoss-gray">Inspired by ancient wisdom, our systems create perfectly balanced alkaline water for optimal health.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <Droplets className="w-16 h-16 text-zoss-green" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-zoss-blue mb-3">Antioxidant Rich</h3>
              <p className="text-zoss-gray">Rich in antioxidants and minerals, our ionized water supports your body's natural detoxification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-zoss-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Shop Now and Elevate Your Home Hydration
          </h2>
          <p className="text-xl mb-8">
            Join thousands of families who have transformed their health with Zoss Water
          </p>
          <Button size="lg" className="bg-white text-zoss-green hover:bg-gray-100">
            Browse All Products
          </Button>
        </div>
      </section>
    </div>
  );
};

export default B2CSolutions;
