import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { productsAPI, servicesAPI, authAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { CalendarIcon, Clock, Wrench, MapPin, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface Product {
  _id: string;
  productName: string;
  modelNumber: string;
  imageUrl?: string;
}

interface ServiceBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user, updateUser } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [useSavedInfo, setUseSavedInfo] = useState(true);
  
  const [formData, setFormData] = useState({
    productId: '',
    issueDescription: '',
    requestedTime: '',
    address: '',
    phoneNumber: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      // Pre-fill address and phone if available
      if (user?.address && user?.phoneNumber) {
        setFormData(prev => ({
          ...prev,
          address: user.address || '',
          phoneNumber: user.phoneNumber || ''
        }));
      } else {
        setUseSavedInfo(false);
      }
    }
  }, [isOpen, user]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getUserProducts();
      setProducts(response.data.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      // Update user profile with address and phone if they're new or changed
      if (!useSavedInfo || formData.address !== user?.address || formData.phoneNumber !== user?.phoneNumber) {
        await authAPI.updateProfile({
          address: formData.address,
          phoneNumber: formData.phoneNumber
        });
        updateUser({
          address: formData.address,
          phoneNumber: formData.phoneNumber
        });
      }

      // Create service request
      await servicesAPI.createServiceRequest({
        productId: formData.productId,
        issueDescription: formData.issueDescription,
        requestedDate: selectedDate.toISOString(),
        requestedTime: formData.requestedTime
      });

      toast.success('Service request submitted successfully!');
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        productId: '',
        issueDescription: '',
        requestedTime: '',
        address: '',
        phoneNumber: ''
      });
      setSelectedDate(undefined);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit service request');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const hasExistingInfo = user?.address && user?.phoneNumber;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-zoss-green" />
            <span>Book Service Request</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Selection */}
          <div>
            <Label htmlFor="product">Which Zoss product do you need service for? *</Label>
            <Select value={formData.productId} onValueChange={(value) => handleInputChange('productId', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product._id} value={product._id}>
                    <div className="flex items-center space-x-2">
                      <span>{product.productName}</span>
                      <span className="text-sm text-gray-500">({product.modelNumber})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Issue Description */}
          <div>
            <Label htmlFor="issue">Briefly describe the issue you're facing *</Label>
            <Textarea
              id="issue"
              placeholder="Please describe the problem with your water ionizer..."
              value={formData.issueDescription}
              onChange={(e) => handleInputChange('issueDescription', e.target.value)}
              className="mt-2 min-h-[100px]"
              required
            />
          </div>

          {/* Address & Phone Number */}
          <Card className="p-4 bg-gray-50">
            <div className="space-y-4">
              {hasExistingInfo && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-saved-info"
                    checked={useSavedInfo}
                    onCheckedChange={(checked) => {
                      setUseSavedInfo(checked as boolean);
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          address: user?.address || '',
                          phoneNumber: user?.phoneNumber || ''
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="use-saved-info" className="text-sm">
                    Use previously saved address and phone number?
                  </Label>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address" className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Address *</span>
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2"
                    disabled={useSavedInfo && hasExistingInfo}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number *</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleInputChange('phoneNumber', value);
                    }}
                    className="mt-2"
                    disabled={useSavedInfo && hasExistingInfo}
                    required
                  />
                  {formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber) && (
                    <p className="text-sm text-red-500 mt-1">Please enter a valid 10-digit phone number</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Preferred Date *</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Preferred Time *</span>
              </Label>
              <Select value={formData.requestedTime} onValueChange={(value) => handleInputChange('requestedTime', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.productId || !formData.issueDescription || !selectedDate || !formData.requestedTime || !formData.address || !formData.phoneNumber}
              className="flex-1 bg-zoss-green hover:bg-zoss-green/90"
            >
              {loading ? 'Booking...' : 'Book Service'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingForm;