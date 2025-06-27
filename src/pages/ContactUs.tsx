
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            We'd Love to Hear from You
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with our team for any questions, support, or partnership opportunities
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-zoss-blue">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Enter your full name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter your company name (optional)" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      rows={5}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing-emails" />
                    <Label htmlFor="marketing-emails" className="text-sm text-zoss-gray">
                      I agree to receive marketing emails from Zoss Water
                    </Label>
                  </div>
                  
                  <Button className="w-full bg-zoss-green hover:bg-zoss-green/90 text-white py-3">
                    Submit Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-zoss-green mt-1" />
                      <div>
                        <h3 className="font-semibold text-zoss-blue mb-1">Office Address</h3>
                        <p className="text-zoss-gray">
                          123 Water Technology Park<br />
                          Bandra Kurla Complex<br />
                          Mumbai, Maharashtra 400051
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-zoss-green mt-1" />
                      <div>
                        <h3 className="font-semibold text-zoss-blue mb-1">Phone</h3>
                        <p className="text-zoss-gray">+91 98765 43210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-zoss-green mt-1" />
                      <div>
                        <h3 className="font-semibold text-zoss-blue mb-1">Email</h3>
                        <p className="text-zoss-gray">contact@zosswater.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-zoss-green mt-1" />
                      <div>
                        <h3 className="font-semibold text-zoss-blue mb-1">Business Hours</h3>
                        <p className="text-zoss-gray">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Placeholder */}
              <Card className="p-6">
                <CardContent>
                  <h3 className="font-semibold text-zoss-blue mb-4">Find Us</h3>
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Google Maps Embed Placeholder</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Need Immediate Assistance?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Phone className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <h3 className="font-semibold text-zoss-blue mb-2">Sales Inquiries</h3>
                <p className="text-zoss-gray mb-4">Speak with our sales team about pricing and solutions</p>
                <Button className="bg-zoss-green hover:bg-zoss-green/90">
                  Call Sales
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Mail className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <h3 className="font-semibold text-zoss-blue mb-2">Technical Support</h3>
                <p className="text-zoss-gray mb-4">Get help with installation and maintenance</p>
                <Button className="bg-zoss-green hover:bg-zoss-green/90">
                  Email Support
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <MapPin className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <h3 className="font-semibold text-zoss-blue mb-2">Schedule Visit</h3>
                <p className="text-zoss-gray mb-4">Book a free consultation at your office</p>
                <Button className="bg-zoss-green hover:bg-zoss-green/90">
                  Book Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
