import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Shield, Users, Award, Calculator, Car, TreePine, Smartphone, ArrowRight, Sparkles, CheckCircle, Star } from "lucide-react";
import DoshaQuestionnaire from "@/components/DoshaQuestionnaire";

import SubscribePopup from "@/components/SubscribePopup";


const Index = () => {
  const [selectedDosha, setSelectedDosha] = useState("");
  const [employees, setEmployees] = useState("10");
  const [workingDays, setWorkingDays] = useState("22");
  const [litersPerDay, setLitersPerDay] = useState("2");
  const [waterResults, setWaterResults] = useState<any>(null);
  const [carbonResults, setCarbonResults] = useState<any>(null);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);

  const calculateWaterRequirement = () => {
    const emp = parseInt(employees) || 0;
    const days = parseInt(workingDays) || 0;
    const liters = parseInt(litersPerDay) || 0;
    
    const monthlyLiters = emp * days * liters;
    const waterJars = Math.ceil(monthlyLiters / 20);
    
    setWaterResults({
      monthlyLiters,
      waterJars,
      employees: emp
    });
  };

  const calculateCarbonFootprint = () => {
    const emp = parseInt(employees) || 0;
    const days = parseInt(workingDays) || 0;
    const liters = parseInt(litersPerDay) || 0;
    
    const monthlyLiters = emp * days * liters;
    const monthlyCO2 = monthlyLiters * 0.114; // kg CO2 per liter
    const yearlyCO2 = monthlyCO2 * 12;
    const plasticBottles = monthlyLiters * 2; // 0.5L bottles
    const waterJars = Math.ceil(monthlyLiters / 20);
    
    setCarbonResults({
      monthlyCO2: Number(monthlyCO2.toFixed(1)),
      yearlyCO2: Number(yearlyCO2.toFixed(1)),
      plasticBottles,
      waterJars,
      kmByCar: Math.round(yearlyCO2 * 4.4),
      treesSaved: Math.round(yearlyCO2 / 25),
      smartphones: Math.round(yearlyCO2 * 890)
    });
  };

  const getDoshaRecommendation = (dosha: string) => {
    const recommendations = {
      vata: "pH 8.5-9.0 Water - Gentle alkalinity for Vata balance",
      pitta: "pH 9.0-9.5 Water - Cooling alkaline water for Pitta harmony",
      kapha: "pH 9.5+ Strong Alkaline Water - Energizing for Kapha constitution",
      "not-sure": "pH 8.5-9.0 Water - Balanced alkalinity for overall wellness"
    };
    return recommendations[dosha as keyof typeof recommendations] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zoss-cream">
      {/* Hero Section - Modified to show only B2B button */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png"
            alt="Zoss Water - Where Glacier Streams Meet Your Kitchen Sink"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-2xl tracking-tight">
                Ionizing Modern Purity with Ancient Wisdom
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-white/95 drop-shadow-lg tracking-wide">
                Engineered for wellness. Inspired by tradition.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-start items-start pt-4">
              <Link to="/commercial-b2b">
                <Button size="lg" className="group bg-gradient-to-r from-zoss-copper via-orange-500 to-amber-500 hover:from-zoss-copper/90 hover:via-orange-500/90 hover:to-amber-500/90 text-white px-12 py-6 text-lg font-semibold tracking-wider rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                  <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  EXPLORE B2B SOLUTIONS
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Zoss Water Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-zoss-green to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-4xl font-bold text-zoss-blue">What Is Zoss Water?</h3>
              </div>
              
              <div className="space-y-6 text-lg text-zoss-gray leading-relaxed">
                <p className="text-xl">
                  Zoss Water represents the perfect fusion of cutting-edge electrolysis technology and time-honored Ayurvedic principles. Our advanced ionization systems transform ordinary tap water into alkaline, antioxidant-rich water that supports your body's natural balance and vitality.
                </p>
                
                <p>
                  Drawing from thousands of years of Ayurvedic wisdom about water's role in health and wellness, we've engineered our ionizers to create water that not only tastes pure but actively contributes to your well-being. Each drop is infused with negative ions and optimized pH levels to enhance hydration at the cellular level.
                </p>
                
                <p>
                  Whether you're seeking to balance your dosha, support digestive health, or simply enjoy the purest water possible, Zoss Water delivers a premium hydration experience that honors both ancient tradition and modern scientific excellence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-base">99.9% Pure Filtration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-base">Alkaline pH Balance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-base">Antioxidant Rich</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-zoss-green" />
                    <span className="text-base">Dosha Optimized</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-zoss-green/10 to-zoss-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="h-10 w-10 text-zoss-green" />
                  </div>
                  <h4 className="font-semibold text-zoss-blue mb-2 text-lg">Purity Assured</h4>
                  <p className="text-sm text-zoss-gray leading-relaxed">Advanced multi-stage filtration removes impurities while preserving essential minerals</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Leaf className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-zoss-blue mb-2 text-lg">Ayurvedic Balance</h4>
                  <p className="text-sm text-zoss-gray leading-relaxed">pH levels scientifically optimized for dosha harmony and digestive wellness</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-zoss-copper/10 to-zoss-copper/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-10 w-10 text-zoss-copper" />
                  </div>
                  <h4 className="font-semibold text-zoss-blue mb-2 text-lg">Antioxidant Rich</h4>
                  <p className="text-sm text-zoss-gray leading-relaxed">Negative ions neutralize free radicals for enhanced vitality and cellular health</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl flex items-center justify-center shadow-2xl border border-gray-100 overflow-hidden">
                <img 
                  src="/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png"
                  alt="Premium Zoss Water Ionizer"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-zoss-copper to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-r from-zoss-green to-blue-500 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Know Your Dosha Section */}
      <DoshaQuestionnaire />

      {/* Use Cases & Applications Section - New Tabbed Layout */}
      {/* <UseCasesSection /> */}

      {/* B2B Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl font-bold text-zoss-blue mb-4">Smart Water & Carbon Calculators</h3>
            <p className="text-xl text-zoss-gray max-w-3xl mx-auto">Calculate your office's water needs and environmental impact with our intelligent tools</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Office Water Calculator */}
            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <span>Office Water Calculator</span>
                </CardTitle>
                <p className="text-zoss-gray leading-relaxed">
                  Calculate how much drinking water your office needs each month based on the number of employees.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employees" className="text-sm font-medium text-zoss-blue">Number of employees</Label>
                    <Input
                      id="employees"
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="mt-2 border-2 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="working-days" className="text-sm font-medium text-zoss-blue">Working days per month</Label>
                    <Input
                      id="working-days"
                      type="number"
                      value={workingDays}
                      onChange={(e) => setWorkingDays(e.target.value)}
                      className="mt-2 border-2 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="liters-per-day" className="text-sm font-medium text-zoss-blue">Liters per employee per day</Label>
                    <Input
                      id="liters-per-day"
                      type="number"
                      value={litersPerDay}
                      onChange={(e) => setLitersPerDay(e.target.value)}
                      className="mt-2 border-2 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={calculateWaterRequirement}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold"
                >
                  Calculate Water Needs
                </Button>
                
                {waterResults && (
                  <div className="space-y-6 mt-8">
                    <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800 mb-3">Monthly Water Requirement</h4>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{waterResults.monthlyLiters} L</div>
                      <p className="text-sm text-blue-700">
                        Approximately {waterResults.waterJars} × 20L water jars
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-zoss-blue mb-4">Annual Water Consumption</h4>
                      <div className="h-40 bg-gradient-to-t from-gray-100 to-gray-50 rounded-xl flex items-end justify-center p-4">
                        <div className="flex items-end space-x-1 h-24">
                          {Array.from({length: 12}, (_, i) => (
                            <div 
                              key={i} 
                              className="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                              style={{height: `${Math.random() * 60 + 20}px`}}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                          <span key={month}>{month}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-zoss-green/10 to-green-100 rounded-2xl border border-green-200">
                      <h4 className="text-sm font-medium text-green-800 mb-2">Recommended Zoss Water Plan</h4>
                      <p className="text-sm text-green-700 leading-relaxed">
                        For small offices (up to {waterResults.employees} employees), we recommend the Zoss Dispenser 
                        (For soft water) starting at ₹3,900/month.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Carbon Footprint Calculator */}
            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <span>Carbon Footprint Calculator</span>
                </CardTitle>
                <p className="text-zoss-gray leading-relaxed">
                  Calculate how much carbon emissions and plastic waste your office can save by switching to Zoss Water.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employees-carbon" className="text-sm font-medium text-zoss-blue">Number of employees</Label>
                    <Input
                      id="employees-carbon"
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="mt-2 border-2 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="working-days-carbon" className="text-sm font-medium text-zoss-blue">Working days per month</Label>
                    <Input
                      id="working-days-carbon"
                      type="number"
                      value={workingDays}
                      onChange={(e) => setWorkingDays(e.target.value)}
                      className="mt-2 border-2 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="liters-per-day-carbon" className="text-sm font-medium text-zoss-blue">Liters per employee per day</Label>
                    <Input
                      id="liters-per-day-carbon"
                      type="number"
                      value={litersPerDay}
                      onChange={(e) => setLitersPerDay(e.target.value)}
                      className="mt-2 border-2 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={calculateCarbonFootprint}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-semibold"
                >
                  Calculate Environmental Impact
                </Button>
                
                {carbonResults && (
                  <div className="space-y-6 mt-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                        <h4 className="text-xs font-medium text-green-800 mb-2">Carbon Saved (Monthly)</h4>
                        <div className="text-2xl font-bold text-green-600 mb-1">{carbonResults.monthlyCO2} kg</div>
                        <p className="text-xs text-green-700">CO₂ equivalent</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                        <h4 className="text-xs font-medium text-green-800 mb-2">Carbon Saved (Yearly)</h4>
                        <div className="text-2xl font-bold text-green-600 mb-1">{carbonResults.yearlyCO2} kg</div>
                        <p className="text-xs text-green-700">CO₂ equivalent</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-xl border">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">Plastic Bottles Saved</h4>
                        <div className="text-lg font-bold text-gray-800 mb-1">{carbonResults.plasticBottles}</div>
                        <p className="text-xs text-gray-600">0.5L bottles per month</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl border">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">Water Jars Saved</h4>
                        <div className="text-lg font-bold text-gray-800 mb-1">{carbonResults.waterJars}</div>
                        <p className="text-xs text-gray-600">20L jars per month</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-zoss-blue mb-4">Environmental Impact Visualization</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-4 bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-colors">
                          <Car className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="text-sm font-bold text-blue-800">{carbonResults.kmByCar} km</div>
                          <p className="text-xs text-blue-600 leading-tight">driving distance avoided</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border-2 border-green-100 hover:border-green-300 transition-colors">
                          <TreePine className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="text-sm font-bold text-green-800">{carbonResults.treesSaved} trees</div>
                          <p className="text-xs text-green-600 leading-tight">equivalent trees planted</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-colors">
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-sm font-bold text-purple-800">{carbonResults.smartphones.toLocaleString()}</div>
                          <p className="text-xs text-purple-600 leading-tight">smartphone charges saved</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200">
                      <h4 className="text-sm font-medium text-green-800 mb-2">Annual Environmental Impact</h4>
                      <p className="text-sm text-green-700 leading-relaxed">
                        By switching to Zoss Water, your office can save approximately <span className="font-bold">{carbonResults.yearlyCO2} kg of CO₂</span> & <span className="font-bold">{(carbonResults.plasticBottles * 12).toLocaleString()} plastic bottles</span> per year.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscription Plans Preview - Modified Subscribe Button */}
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

      {/* Certifications & Recognition */}
      <section className="py-20 bg-gradient-to-br from-zoss-cream to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
              Certifications & Recognition
            </h3>
            <p className="text-xl text-zoss-gray max-w-3xl mx-auto">Trusted by leading organizations and certified by industry standards</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: "ISO 9001:2015 Certified", icon: Award, color: "text-blue-600" },
              { name: "AYUSH Endorsed", icon: Leaf, color: "text-green-600" },
              { name: "NABL Accredited", icon: Shield, color: "text-purple-600" },
              { name: "Best Startup 2024", icon: Star, color: "text-yellow-600" },
              { name: "Green Technology Award", icon: TreePine, color: "text-emerald-600" }
            ].map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform">
                  <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-100 group-hover:shadow-xl transition-shadow">
                    <IconComponent className={`h-10 w-10 ${cert.color}`} />
                  </div>
                  <p className="text-sm text-zoss-gray font-medium leading-tight">{cert.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
              What Experts & Customers Say
            </h3>
            <p className="text-xl text-zoss-gray max-w-3xl mx-auto">Real stories from satisfied customers and industry experts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                type: "Customer",
                name: "Priya Sharma",
                title: "Founder, FitLife Gym",
                quote: "Zoss Water transformed our gym's hydration standards. Members feel more energized, and we've reduced plastic waste by 80%!",
                image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png",
                rating: 5
              },
              {
                type: "Expert",
                name: "Dr. A. Kumar",
                title: "Ayurveda Specialist",
                quote: "Alkaline ionized water supports healthy digestion and dosha balance. Zoss Water is a game-changer for wellness.",
                image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png",
                rating: 5
              },
              {
                type: "Corporate",
                name: "Rajesh Patel",
                title: "Office Manager, TechCorp",
                quote: "Seamless installation, zero downtime, and immediate positive feedback—our entire team loves Zoss.",
                image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zoss-blue text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-zoss-gray">{testimonial.title}</p>
                      <div className="flex space-x-1 mt-1">
                        {Array.from({length: testimonial.rating}, (_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-zoss-gray italic text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <Badge variant="outline" className="text-zoss-green border-zoss-green bg-zoss-green/10">
                    {testimonial.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from Blog */}
      <section className="py-20 bg-gradient-to-br from-zoss-cream to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl font-bold text-zoss-blue mb-4">
              Knowledge Hub & Articles
            </h3>
            <p className="text-xl text-zoss-gray max-w-3xl mx-auto">Stay informed with the latest insights on water wellness and Ayurvedic health</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ayurvedic Hydration: The Science Behind Alkaline Water",
                excerpt: "Discover how alkaline water aligns with ancient Ayurvedic principles for optimal health and wellness.",
                image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png",
                readTime: "5 min read"
              },
              {
                title: "How to Calculate Your Office's Carbon Savings with Zoss Water",
                excerpt: "Learn the environmental impact of switching to ionized water in your workplace and reduce your carbon footprint.",
                image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png",
                readTime: "7 min read"
              },
              {
                title: "Dosha-Specific Hydration Tips for Mumbai Summers",
                excerpt: "Beat the heat with personalized hydration strategies based on your Ayurvedic constitution.",
                image: "/lovable-uploads/2564214d-1d06-4966-bb14-ae684ab3e3f5.png",
                readTime: "4 min read"
              }
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden group">
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline" className="text-zoss-gray border-zoss-gray text-xs">
                      {article.readTime}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-zoss-blue mb-4 leading-tight text-xl group-hover:text-zoss-green transition-colors">{article.title}</h4>
                  <p className="text-zoss-gray mb-6 leading-relaxed">{article.excerpt}</p>
                  <Link to="/blogs" className="inline-flex items-center text-zoss-green hover:text-zoss-green/80 font-medium group-hover:translate-x-1 transition-all">
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/blogs">
              <Button className="bg-gradient-to-r from-zoss-green to-green-600 hover:from-zoss-green/90 hover:to-green-600/90 text-white px-8 py-3 text-lg font-semibold">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Custom Quote Form */}
      {/* <QuoteForm /> */}

      {/* Subscribe Popup */}
      <SubscribePopup 
        isOpen={showSubscribePopup} 
        onClose={() => setShowSubscribePopup(false)} 
      />
    </div>
  );
};

export default Index;
