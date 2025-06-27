
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Building2, Home, Users, Utensils } from "lucide-react";

const UseCasesSection = () => {
  const [activeTab, setActiveTab] = useState("office");

  const useCases = [
    {
      id: "office",
      title: "Office Solutions",
      icon: <Building2 className="h-6 w-6" />,
      description: "Premium alkaline water for corporate environments",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
      benefits: [
        "Improved employee hydration and wellness",
        "Reduced plastic waste from bottled water",
        "Cost-effective solution for large teams",
        "Professional installation and maintenance"
      ],
      image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png"
    },
    {
      id: "home",
      title: "Residential Use",
      icon: <Home className="h-6 w-6" />,
      description: "Transform your home's water quality with Ayurvedic principles",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
      benefits: [
        "Family health and wellness improvement",
        "Dosha-specific pH customization",
        "Easy installation and maintenance",
        "Long-term cost savings"
      ],
      image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png"
    },
    {
      id: "hospitality",
      title: "Hospitality & Hotels",
      icon: <Users className="h-6 w-6" />,
      description: "Enhance guest experience with premium water solutions",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
      benefits: [
        "Premium guest experience",
        "Eco-friendly hotel operations",
        "Reduced operational costs",
        "Health-conscious amenities"
      ],
      image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png"
    },
    {
      id: "restaurants",
      title: "Restaurants & Cafes",
      icon: <Utensils className="h-6 w-6" />,
      description: "Enhance food quality and customer satisfaction",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
      benefits: [
        "Better taste in food preparation",
        "Customer health consciousness",
        "Sustainable business practices",
        "Premium dining experience"
      ],
      image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/30 to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
            Use Cases & Applications
          </h2>
          <p className="text-xl text-zoss-gray max-w-3xl mx-auto">
            Discover how Zoss Water transforms different environments with our premium ionization solutions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-white/80 backdrop-blur-sm border border-gray-200">
            {useCases.map((useCase) => (
              <TabsTrigger 
                key={useCase.id} 
                value={useCase.id}
                className="flex items-center space-x-2 data-[state=active]:bg-zoss-green data-[state=active]:text-white"
              >
                {useCase.icon}
                <span className="hidden sm:inline">{useCase.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {useCases.map((useCase) => (
            <TabsContent key={useCase.id} value={useCase.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-zoss-green/10 rounded-2xl flex items-center justify-center text-zoss-green">
                      {useCase.icon}
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-zoss-blue">{useCase.title}</h3>
                  </div>
                  
                  <p className="text-lg text-zoss-gray leading-relaxed">
                    {useCase.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-zoss-blue text-lg">Key Benefits:</h4>
                    <ul className="space-y-3">
                      {useCase.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-zoss-green rounded-full"></div>
                          <span className="text-zoss-gray">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Video Player */}
                  <Card className="overflow-hidden shadow-2xl border-0">
                    <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                      <iframe
                        src={useCase.videoUrl}
                        title={`${useCase.title} Video`}
                        className="w-full h-full rounded-t-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-zoss-blue mb-2">
                        See {useCase.title} in Action
                      </h4>
                      <p className="text-sm text-zoss-gray">
                        Watch how Zoss Water solutions transform {useCase.title.toLowerCase()} environments
                      </p>
                    </CardContent>
                  </Card>

                  {/* Image showcase */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UseCasesSection;
