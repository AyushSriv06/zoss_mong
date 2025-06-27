
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Mail, User, Phone, Building } from "lucide-react";

interface SubscribePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribePopup = ({ isOpen, onClose }: SubscribePopupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Subscribe form submitted:", formData);
      setIsSubmitting(false);
      onClose();
      // Reset form
      setFormData({ name: "", email: "", phone: "", company: "" });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-2xl font-bold text-zoss-blue text-center">
            Subscribe Now
          </CardTitle>
          <p className="text-zoss-gray text-center">
            Get in touch with our water wellness experts
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                  Company Name
                </Label>
                <div className="relative mt-2">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Enter your company name (optional)"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="pl-10 border-2 focus:border-zoss-green"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-zoss-green to-green-600 hover:from-zoss-green/90 hover:to-green-600/90 text-white py-3 text-lg font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Subscribe & Get In Touch"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By subscribing, you agree to receive updates about Zoss Water solutions and services.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscribePopup;
