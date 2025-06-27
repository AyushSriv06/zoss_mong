
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Leaf, Heart, Building, Users, TrendingUp } from "lucide-react";

const CommercialB2B = () => {
  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Corporate & Commercial Solutions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transform your workplace hydration while reducing costs and environmental impact
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <CardTitle className="text-xl text-zoss-blue">Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zoss-gray">Reduce 80% of your plastic bottle expenses while providing premium hydration to your team.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8">
              <CardHeader>
                <Leaf className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <CardTitle className="text-xl text-zoss-blue">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zoss-gray">Cut CO₂ emissions by thousands of kg annually and eliminate plastic waste from your office.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8">
              <CardHeader>
                <Heart className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <CardTitle className="text-xl text-zoss-blue">Health & Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zoss-gray">Boost employee productivity and well-being with alkaline, antioxidant-rich water.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-zoss-green mb-2">500+</div>
              <p className="text-zoss-gray">Offices Powered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-zoss-green mb-2">1M+</div>
              <p className="text-zoss-gray">Bottles Saved</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-zoss-green mb-2">200+</div>
              <p className="text-zoss-gray">Corporate Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-zoss-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Trusted by Leading Organizations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {["FitLife Gyms", "TechCorp", "Wellness Spa", "Green Hotels", "HealthFirst"].map((client, index) => (
              <div key={index} className="h-20 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-zoss-gray font-medium">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Get a Custom Quote
          </h2>
          
          <Card className="p-8">
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Enter company name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="business-type">Type of Business</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your requirements..." rows={4} />
                </div>
                
                <Button className="w-full bg-zoss-green hover:bg-zoss-green/90 text-white py-3">
                  Get Custom Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CommercialB2B;
