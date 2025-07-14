
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Droplets, Zap, Shield, CheckCircle } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

const ProductDetail = () => {
  const { productId } = useParams();

  const products = {
    "countertop-ionizer": {
      name: "Zoss Countertop Ionizer",
      image: "/lovable-uploads/622f2f9b-d2f1-4f0c-ac4f-656dca514723.png",
      price: "₹25,000",
      description: "Compact and powerful alkaline water ionizer perfect for kitchens and small spaces",
      specifications: {
        "pH Range": "8.5 - 11.0",
        "ORP Range": "-400mV to -800mV",
        "Flow Rate": "1.5 - 4.0 L/min",
        "Power Consumption": "120W",
        "Dimensions": "32cm x 15cm x 35cm",
        "Weight": "4.5 kg",
        "Warranty": "5 Years",
        "Installation": "Countertop"
      },
      features: [
        "7 platinum-coated titanium electrodes",
        "Advanced filtration system",
        "Digital pH display",
        "Self-cleaning function",
        "Voice prompts",
        "Compact design"
      ],
      brochureUrl: "#"
    },
    "under-sink-ionizer": {
      name: "Zoss Under-Sink Ionizer",
      image: "/lovable-uploads/e2461f2f-96be-4a69-ad60-df4433dd50ce.png",
      price: "₹45,000",
      description: "Hidden installation ionizer with high flow rate for seamless kitchen integration",
      specifications: {
        "pH Range": "8.0 - 11.5",
        "ORP Range": "-500mV to -900mV",
        "Flow Rate": "2.0 - 6.0 L/min",
        "Power Consumption": "150W",
        "Dimensions": "38cm x 20cm x 40cm",
        "Weight": "6.8 kg",
        "Warranty": "7 Years",
        "Installation": "Under-Sink"
      },
      features: [
        "9 platinum-coated titanium electrodes",
        "Professional-grade filtration",
        "LCD control panel",
        "Automatic cleaning cycle",
        "High flow rate",
        "Hidden installation"
      ],
      brochureUrl: "#"
    },
    "zoss-atlanta": {
      name: "Zoss Atlanta",
      image: "/lovable-uploads/91d71d34-d5aa-44bb-8185-e5698d380783.png",
      price: "₹1,59,000",
      description: "Premium commercial-grade ionizer for professional and high-volume applications",
      specifications: {
        "pH Range": "7.5 - 12.0",
        "ORP Range": "-600mV to -1000mV",
        "Flow Rate": "3.0 - 8.0 L/min",
        "Power Consumption": "200W",
        "Dimensions": "45cm x 25cm x 50cm",
        "Weight": "12.5 kg",
        "Warranty": "10 Years",
        "Installation": "Professional"
      },
      features: [
        "11 platinum-coated titanium electrodes",
        "Commercial-grade components",
        "Touch screen interface",
        "Smart diagnostics",
        "High-volume capacity",
        "Professional installation"
      ],
      brochureUrl: "#"
    }
  };

  const product = products[productId as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen bg-zoss-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zoss-blue mb-4">Product Not Found</h1>
          <Link to="/">
            <Button className="bg-zoss-green hover:bg-zoss-green/90">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-zoss-green hover:text-zoss-green/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative">
              <Card className="overflow-hidden shadow-2xl border-0">
                <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </Card>
              <div className="absolute top-4 right-4">
                <Badge className="bg-zoss-green text-white">Premium Quality</Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
                  {product.name}
                </h1>
                <div className="text-3xl font-bold text-zoss-green mb-6">
                  {product.price}
                </div>
                <p className="text-lg text-zoss-gray leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl font-semibold text-zoss-blue mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-zoss-green flex-shrink-0" />
                      <span className="text-zoss-gray">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-zoss-green hover:bg-zoss-green/90 flex-1"
                  onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Quote for This Product
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-zoss-green text-zoss-green hover:bg-zoss-green/10"
                  onClick={() => window.open(product.brochureUrl, '_blank')}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Zap className="h-6 w-6 text-zoss-green" />
                    <span>Technical Specifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-zoss-blue">{key}:</span>
                        <span className="text-zoss-gray">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-zoss-green/5 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-zoss-green">
                    <Shield className="h-6 w-6" />
                    <span>Quality Assurance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">ISO 9001:2015 Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">AYUSH Endorsed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">NABL Accredited</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">Professional Installation</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-zoss-green/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-zoss-blue">
                    <Droplets className="h-6 w-6" />
                    <span>Water Benefits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">Alkaline pH Balance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">Antioxidant Rich</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">Micro-clustered Water</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-sm">Enhanced Hydration</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quote Form */}
          {/* <div id="quote-form">
            <QuoteForm productName={product.name} />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
