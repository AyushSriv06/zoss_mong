
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Phone, Mail, Wrench, Badge, Star, CheckCircle } from "lucide-react";
import SubscribePopup from "@/components/SubscribePopup";

const SubscriptionModel = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);

  const plans = [
    {
      name: "Starter",
      subtitle: "1-5 employees",
      monthlyPrice: 3900,
      annualPrice: 42000, // 10% discount
      features: [
        "1 Zoss Dispenser",
        "4 Filter Replacements/year",
        "Basic Maintenance",
        "Phone Support",
        "Installation Included"
      ],
      popular: false
    },
    {
      name: "Business",
      subtitle: "6-15 employees",
      monthlyPrice: 7500,
      annualPrice: 81000, // 10% discount
      features: [
        "2 Zoss Dispensers",
        "8 Filter Replacements/year",
        "Priority Support",
        "Monthly Health Check",
        "Installation & Training"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      subtitle: "16-50 employees",
      monthlyPrice: 15000,
      annualPrice: 162000, // 10% discount
      features: [
        "On-Site Installation",
        "Unlimited Filters",
        "Dedicated Account Manager",
        "24/7 Support",
        "Custom Maintenance Schedule"
      ],
      popular: false
    },
    {
      name: "Custom",
      subtitle: "50+ employees",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Tailored Solutions",
        "Volume Discounts",
        "Enterprise Integration",
        "SLA Guarantees",
        "On-site Technical Team"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How do I change my plan?",
      answer: "You can upgrade or downgrade your plan at any time through your customer portal or by contacting our support team. Changes take effect from the next billing cycle."
    },
    {
      question: "What is included in maintenance?",
      answer: "Our maintenance includes regular filter replacements, system health checks, cleaning services, and technical support. Higher-tier plans include more frequent maintenance visits."
    },
    {
      question: "How do filter replacements work?",
      answer: "We monitor your system usage and automatically schedule filter replacements. Our technicians will visit your office with new filters and install them without any downtime."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, installation and setup are included in all our plans. Our certified technicians will install your system and provide training to your team at no additional cost."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel with 30 days notice. Annual subscribers receive a prorated refund for unused months. Equipment pickup is included in the cancellation process."
    }
  ];

  const getPrice = (plan: any) => {
    if (plan.monthlyPrice === null) return "Contact Us";
    return isAnnual 
      ? `₹${(plan.annualPrice / 12).toLocaleString()}`
      : `₹${plan.monthlyPrice.toLocaleString()}`;
  };

  const getSavings = (plan: any) => {
    if (plan.monthlyPrice === null) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    return Math.round((savings / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Customize Your Plan
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Choose the perfect Zoss Water solution for your office size and needs
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <Label htmlFor="billing-toggle" className="text-lg font-medium text-zoss-gray">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-zoss-green"
            />
            <Label htmlFor="billing-toggle" className="text-lg font-medium text-zoss-gray">
              Annual
            </Label>
            {isAnnual && (
              <span className="bg-zoss-green text-white px-3 py-1 rounded-full text-sm font-medium">
                Save 10%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
              Subscription Plans
            </h3>
            <p className="text-xl text-zoss-gray max-w-3xl mx-auto">Choose the perfect plan for your hydration needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Starter Plan",
                subtitle: "3-5 employees",
                price: "₹3,900",
                popular: false,
                features: ["1 Zoss Dispenser", "Weekly filter change", "Basic maintenance", "Phone support"]
              },
              {
                name: "Business Plan",
                subtitle: "6-15 employees", 
                price: "₹7,500",
                popular: true,
                features: ["2 Zoss Dispensers", "Monthly maintenance", "Priority support", "On-site training"]
              },
              {
                name: "Enterprise Plan",
                subtitle: "16-50 employees",
                price: "₹15,000",
                popular: false,
                features: ["Custom package", "On-site servicing", "Dedicated manager", "24/7 support"]
              },
              {
                name: "Custom Plan",
                subtitle: "50+ employees",
                price: "Contact Us",
                popular: false,
                features: ["Tailored solutions", "Volume discounts", "Custom maintenance", "Enterprise support"]
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-2xl transition-all duration-300 border-2 ${plan.popular ? 'border-zoss-green scale-105' : 'border-gray-200 hover:border-zoss-green/50'} bg-white/80 backdrop-blur-sm`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-zoss-green to-green-600 text-white px-4 py-1 text-sm font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold text-zoss-blue">{plan.name}</CardTitle>
                  <p className="text-sm text-zoss-gray mb-4">{plan.subtitle}</p>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-zoss-green">{plan.price}</div>
                    {plan.price !== "Contact Us" && <span className="text-sm text-zoss-gray">/month</span>}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-zoss-gray flex items-center">
                        <CheckCircle className="w-4 h-4 text-zoss-green mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => setShowSubscribePopup(true)}
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-zoss-green to-green-600 hover:from-zoss-green/90 hover:to-green-600/90' : 'bg-zoss-green hover:bg-zoss-green/90'} text-white py-3 font-semibold`}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            What's Included in Each Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <Wrench className="h-8 w-8 text-zoss-green mb-2" />
                <CardTitle className="text-zoss-blue">Installation & Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zoss-gray">
                  Professional installation by certified technicians, complete system setup, and staff training included in all plans.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardHeader>
                <Phone className="h-8 w-8 text-zoss-green mb-2" />
                <CardTitle className="text-zoss-blue">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zoss-gray">
                  Round-the-clock technical support via phone, email, and chat. Priority support for Business and Enterprise plans.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardHeader>
                <Mail className="h-8 w-8 text-zoss-green mb-2" />
                <CardTitle className="text-zoss-blue">Regular Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zoss-gray">
                  Scheduled filter replacements, system health checks, and preventive maintenance to ensure optimal performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-zoss-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-medium text-zoss-blue text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <p className="text-zoss-gray leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Volume Discounts Note */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zoss-gray">
            <strong>Volume discounts available.</strong> Contact us for pricing on larger offices or multiple locations.
          </p>
        </div>
      </section>
      <SubscribePopup isOpen={showSubscribePopup} onClose={() => setShowSubscribePopup(false)} />
    </div>
  );
};

export default SubscriptionModel;
