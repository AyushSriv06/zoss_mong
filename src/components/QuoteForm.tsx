
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Users, Droplets, Building, Mail, Phone, User } from "lucide-react";

interface QuoteFormProps {
  productName?: string;
}

const QuoteForm = ({ productName }: QuoteFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    waterConsumption: "",
    businessType: "",
    currentWaterSolution: "",
    budget: "",
    timeline: "",
    specificProduct: productName || "",
    additionalRequirements: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Quote form submitted:", formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: "", email: "", phone: "", company: "", employees: "", 
        waterConsumption: "", businessType: "", currentWaterSolution: "", 
        budget: "", timeline: "", specificProduct: productName || "", 
        additionalRequirements: ""
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-3 text-3xl font-bold text-zoss-blue">
              <Calculator className="h-8 w-8 text-zoss-green" />
              <span>Get a Custom Quote</span>
            </CardTitle>
            <p className="text-lg text-zoss-gray max-w-2xl mx-auto">
              Provide us with your requirements and we'll create a personalized solution for your business
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-zoss-blue">
                    Full Name *
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 border-2 focus:border-zoss-green"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-zoss-blue">
                    Email Address *
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 border-2 focus:border-zoss-green"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-zoss-blue">
                    Phone Number *
                  </Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10 border-2 focus:border-zoss-green"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-zoss-blue">
                    Company Name *
                  </Label>
                  <div className="relative mt-2">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      type="text"
                      required
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="pl-10 border-2 focus:border-zoss-green"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="employees" className="text-sm font-medium text-zoss-blue flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Number of Employees *</span>
                  </Label>
                  <Select value={formData.employees} onValueChange={(value) => handleInputChange("employees", value)}>
                    <SelectTrigger className="mt-2 border-2 focus:border-zoss-green">
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="waterConsumption" className="text-sm font-medium text-zoss-blue flex items-center space-x-2">
                    <Droplets className="h-4 w-4" />
                    <span>Estimated Daily Water Consumption *</span>
                  </Label>
                  <Select value={formData.waterConsumption} onValueChange={(value) => handleInputChange("waterConsumption", value)}>
                    <SelectTrigger className="mt-2 border-2 focus:border-zoss-green">
                      <SelectValue placeholder="Select consumption range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<100L">Less than 100 Liters</SelectItem>
                      <SelectItem value="100-500L">100-500 Liters</SelectItem>
                      <SelectItem value="500-1000L">500-1000 Liters</SelectItem>
                      <SelectItem value="1000-2000L">1000-2000 Liters</SelectItem>
                      <SelectItem value="2000L+">2000+ Liters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="businessType" className="text-sm font-medium text-zoss-blue">
                    Business Type *
                  </Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger className="mt-2 border-2 focus:border-zoss-green">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Corporate Office</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                      <SelectItem value="education">Educational Institution</SelectItem>
                      <SelectItem value="hospitality">Hotel/Restaurant</SelectItem>
                      <SelectItem value="retail">Retail/Commercial</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentWaterSolution" className="text-sm font-medium text-zoss-blue">
                    Current Water Solution
                  </Label>
                  <Select value={formData.currentWaterSolution} onValueChange={(value) => handleInputChange("currentWaterSolution", value)}>
                    <SelectTrigger className="mt-2 border-2 focus:border-zoss-green">
                      <SelectValue placeholder="Select current solution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottled-water">Bottled Water</SelectItem>
                      <SelectItem value="water-jars">Water Jars/Dispensers</SelectItem>
                      <SelectItem value="ro-system">RO System</SelectItem>
                      <SelectItem value="tap-water">Tap Water</SelectItem>
                      <SelectItem value="none">No Current Solution</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-sm font-medium text-zoss-blue">
                    Budget Range (Monthly)
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger className="mt-2 border-2 focus:border-zoss-green">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<5000">Less than ₹5,000</SelectItem>
                      <SelectItem value="5000-15000">₹5,000 - ₹15,000</SelectItem>
                      <SelectItem value="15000-30000">₹15,000 - ₹30,000</SelectItem>
                      <SelectItem value="30000-50000">₹30,000 - ₹50,000</SelectItem>
                      <SelectItem value="50000+">₹50,000+</SelectItem>
                      <SelectItem value="discuss">Prefer to Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeline" className="text-sm font-medium text-zoss-blue">
                    Implementation Timeline
                  </Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger className="mt-2 border-2 focus:border-zoss-green">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (Within 1 week)</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-months+">6+ months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Specific Product Interest */}
              {productName && (
                <div>
                  <Label htmlFor="specificProduct" className="text-sm font-medium text-zoss-blue">
                    Product of Interest
                  </Label>
                  <Input
                    id="specificProduct"
                    type="text"
                    value={formData.specificProduct}
                    onChange={(e) => handleInputChange("specificProduct", e.target.value)}
                    className="mt-2 border-2 focus:border-zoss-green bg-gray-50"
                    readOnly
                  />
                </div>
              )}

              {/* Additional Requirements */}
              <div>
                <Label htmlFor="additionalRequirements" className="text-sm font-medium text-zoss-blue">
                  Additional Requirements or Questions
                </Label>
                <Textarea
                  id="additionalRequirements"
                  placeholder="Please share any specific requirements, questions, or additional information that would help us provide a better quote..."
                  value={formData.additionalRequirements}
                  onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                  className="mt-2 border-2 focus:border-zoss-green min-h-[100px]"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-zoss-green to-green-600 hover:from-zoss-green/90 hover:to-green-600/90 text-white py-4 text-lg font-semibold"
              >
                {isSubmitting ? "Submitting Quote Request..." : "Get Custom Quote"}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Our team will review your requirements and provide a detailed quote within 24 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteForm;
