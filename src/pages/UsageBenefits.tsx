
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Droplets, Shield, Zap, Heart, Leaf, RotateCcw } from "lucide-react";

const UsageBenefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-zoss-green" />,
      title: "Antioxidant Rich",
      description: "Neutralizes free radicals for better health and longevity"
    },
    {
      icon: <Droplets className="h-8 w-8 text-zoss-green" />,
      title: "pH Balanced",
      description: "Helps maintain optimal body pH for improved metabolism"
    },
    {
      icon: <Zap className="h-8 w-8 text-zoss-green" />,
      title: "Hydration Efficiency",
      description: "Micro-clustered water for faster cellular absorption"
    },
    {
      icon: <Heart className="h-8 w-8 text-zoss-green" />,
      title: "Digestive Support",
      description: "Soothes acid reflux and supports gut health naturally"
    },
    {
      icon: <Leaf className="h-8 w-8 text-zoss-green" />,
      title: "Sustainability",
      description: "Reduces single-use plastic & carbon footprint significantly"
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-zoss-green" />,
      title: "Dosha Harmony",
      description: "Balances Vata, Pitta, Kapha via optimal water quality"
    }
  ];

  const useCases = [
    {
      title: "Home Use",
      content: "Perfect for family hydration, baby formula preparation, cooking enhancement, and daily wellness routines. Our home solutions ensure every family member gets the purest, most beneficial water for their health needs."
    },
    {
      title: "Office & Corporate",
      content: "Boost employee productivity and wellness with high-performance hydration solutions. Reduce sick days, increase energy levels, and demonstrate corporate social responsibility through sustainable water practices."
    },
    {
      title: "Healthcare & Wellness Centers",
      content: "Provide the purest water for patients, support Ayurvedic treatments, and enhance spa experiences. Our medical-grade ionization ensures the highest safety and therapeutic standards."
    },
    {
      title: "Hospitality & F&B",
      content: "Elevate your establishment with premium water for cafés, restaurants, and hotels. Improve beverage quality, support healthy dining experiences, and showcase commitment to guest wellness."
    }
  ];

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Why Choose Alkaline Ionized Water?
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the science-backed benefits of Zoss Water and how it transforms your health from the inside out
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Health & Wellness Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl text-zoss-blue">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zoss-gray leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Use Cases & Applications
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {useCases.map((useCase, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-zoss-green rounded-full"></div>
                    <span className="font-heading text-lg font-semibold text-zoss-blue">{useCase.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <p className="text-zoss-gray leading-relaxed">{useCase.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Scientific Backing */}
      <section className="py-16 bg-zoss-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            The Science Behind Zoss Water
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-zoss-blue mb-6">
                Electrolysis Technology
              </h3>
              <div className="space-y-4 text-zoss-gray">
                <p>
                  Our advanced electrolysis process splits water molecules to create alkaline water with optimal pH levels ranging from 8.5 to 11.0. This process increases the concentration of hydroxide ions while reducing acidic components.
                </p>
                <p>
                  The ionization process creates micro-clustered water molecules that are smaller and more easily absorbed by cells, leading to superior hydration compared to regular water.
                </p>
                <p>
                  Rich in antioxidant properties, our ionized water helps neutralize harmful free radicals in the body, supporting overall health and longevity.
                </p>
              </div>
            </div>
            
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Scientific Diagram Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ayurvedic Connection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Ayurvedic Elements Placeholder</span>
            </div>
            
            <div>
              <h3 className="font-heading text-2xl font-semibold text-zoss-blue mb-6">
                Ayurvedic Principles & Modern Science
              </h3>
              <div className="space-y-4 text-zoss-gray">
                <p>
                  Ancient Ayurvedic texts emphasize the importance of proper hydration for maintaining dosha balance. Our ionized water aligns with these principles by providing structured water that supports digestive fire (Agni) and eliminates toxins (Ama).
                </p>
                <p>
                  <strong>Vata Constitution:</strong> Benefits from gentle alkalinity (pH 8.5-9.0) to calm the nervous system and improve hydration.
                </p>
                <p>
                  <strong>Pitta Constitution:</strong> Requires cooling alkaline water (pH 9.0-9.5) to balance excess heat and acidity.
                </p>
                <p>
                  <strong>Kapha Constitution:</strong> Thrives with strong alkaline water (pH 9.5+) to stimulate metabolism and reduce sluggishness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Studies */}
      <section className="py-16 bg-zoss-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Research & Clinical Studies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent>
                <div className="text-3xl font-bold text-zoss-green mb-2">85%</div>
                <p className="text-sm text-zoss-gray mb-2">Improvement in hydration efficiency</p>
                <p className="text-xs text-zoss-gray">Study conducted with 200 participants over 8 weeks</p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent>
                <div className="text-3xl font-bold text-zoss-green mb-2">72%</div>
                <p className="text-sm text-zoss-gray mb-2">Reduction in acid reflux symptoms</p>
                <p className="text-xs text-zoss-gray">Clinical trial with 150 participants</p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent>
                <div className="text-3xl font-bold text-zoss-green mb-2">90%</div>
                <p className="text-sm text-zoss-gray mb-2">User satisfaction rate</p>
                <p className="text-xs text-zoss-gray">Based on 500+ customer surveys</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsageBenefits;
