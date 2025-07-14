import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI, servicesAPI } from '@/lib/api';
import { toast } from 'sonner';
import ServiceBookingForm from '@/components/ServiceBookingForm';
import { 
  Droplets, 
  Calendar, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Package,
  Wrench,
  User,
  Phone,
  MapPin,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

interface Product {
  _id: string;
  productName: string;
  modelNumber: string;
  purchaseDate: string;
  imageUrl?: string;
  warranty: {
    start: string;
    end: string;
  };
  amcValidity: {
    start: string;
    end: string;
  };
}

interface Service {
  _id: string;
  productId: {
    _id: string;
    productName: string;
    modelNumber: string;
    imageUrl?: string;
  };
  issueDescription?: string;
  requestedDate?: string;
  requestedTime?: string;
  nextServiceDate?: string;
  status: 'Upcoming' | 'Due Soon' | 'Overdue' | 'Completed' | 'Pending Approval' | 'Approved & Scheduled';
  lastServiceDate?: string;
  serviceNotes?: string;
  technicianName?: string;
  technicianContact?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  createdAt: string;
}

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesDueSoon, setServicesDueSoon] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsRes, servicesRes, dueServicesRes] = await Promise.all([
        productsAPI.getUserProducts(),
        servicesAPI.getUserServices(),
        servicesAPI.getServicesDueSoon(),
      ]);

      setProducts(productsRes.data.data.products);
      setServices(servicesRes.data.data.services);
      setServicesDueSoon(dueServicesRes.data.data.services);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Due Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-orange-100 text-orange-800';
      case 'Approved & Scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return <Clock className="h-4 w-4" />;
      case 'Due Soon':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Overdue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending Approval':
        return <Clock className="h-4 w-4" />;
      case 'Approved & Scheduled':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const isWarrantyActive = (endDate: string) => {
    return new Date(endDate) > new Date();
  };

  const isAmcActive = (endDate: string) => {
    return new Date(endDate) > new Date();
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const getServiceRequests = () => {
    return services.filter(service => 
      service.status === 'Pending Approval' || 
      service.status === 'Approved & Scheduled' ||
      (service.issueDescription && service.requestedDate)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zoss-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-zoss-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zoss-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zoss-blue mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-zoss-gray">
            Manage your Zoss Water products and services from your personal dashboard.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-zoss-green" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Total Products</p>
                  <p className="text-2xl font-bold text-zoss-blue">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wrench className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Services Due</p>
                  <p className="text-2xl font-bold text-zoss-blue">{servicesDueSoon.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Active Warranties</p>
                  <p className="text-2xl font-bold text-zoss-blue">
                    {products.filter(p => isWarrantyActive(p.warranty.end)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Active AMCs</p>
                  <p className="text-2xl font-bold text-zoss-blue">
                    {products.filter(p => isAmcActive(p.amcValidity.end)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Due Soon Alert */}
        {servicesDueSoon.length > 0 && (
          <Card className="mb-8 border-l-4 border-l-yellow-500 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Services Due Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {servicesDueSoon.map((service) => (
                  <div key={service._id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Droplets className="h-6 w-6 text-zoss-green" />
                      </div>
                      <div>
                        <p className="font-medium text-zoss-blue">{service.productId.productName}</p>
                        <p className="text-sm text-zoss-gray">
                          Service due: {service.nextServiceDate && format(new Date(service.nextServiceDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowBookingForm(true)}
                      className="bg-zoss-green hover:bg-zoss-green/90"
                    >
                      <Wrench className="h-4 w-4 mr-2" />
                      Book Service
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zoss-blue">My Products</h2>
              <Button 
                onClick={() => setShowBookingForm(true)}
                className="bg-zoss-green hover:bg-zoss-green/90"
              >
                <Wrench className="h-4 w-4 mr-2" />
                Book Service
              </Button>
            </div>
            {products.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-zoss-gray">No products found. Contact admin to add your products.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {products.map((product) => (
                  <Card key={product._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          {product.imageUrl ? (
                            <img 
                              src={product.imageUrl} 
                              alt={product.productName}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Droplets className="h-8 w-8 text-zoss-green" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-zoss-blue">{product.productName}</h3>
                          <p className="text-sm text-zoss-gray mb-2">Model: {product.modelNumber}</p>
                          <p className="text-sm text-zoss-gray mb-3">
                            Purchased: {format(new Date(product.purchaseDate), 'MMM dd, yyyy')}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-zoss-gray">Warranty</p>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant={isWarrantyActive(product.warranty.end) ? "default" : "secondary"}
                                  className={isWarrantyActive(product.warranty.end) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                >
                                  {isWarrantyActive(product.warranty.end) ? "Active" : "Expired"}
                                </Badge>
                                <span className="text-xs text-zoss-gray">
                                  Until {format(new Date(product.warranty.end), 'MMM yyyy')}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-zoss-gray">AMC</p>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant={isAmcActive(product.amcValidity.end) ? "default" : "secondary"}
                                  className={isAmcActive(product.amcValidity.end) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                >
                                  {isAmcActive(product.amcValidity.end) ? "Active" : "Expired"}
                                </Badge>
                                <span className="text-xs text-zoss-gray">
                                  Until {format(new Date(product.amcValidity.end), 'MMM yyyy')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Service Requests Section */}
          <div>
            <h2 className="text-2xl font-bold text-zoss-blue mb-6">My Service Requests</h2>
            {getServiceRequests().length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-zoss-gray mb-4">No service requests found.</p>
                  <Button 
                    onClick={() => setShowBookingForm(true)}
                    className="bg-zoss-green hover:bg-zoss-green/90"
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Book Your First Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {getServiceRequests().map((service) => (
                  <Card key={service._id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleServiceClick(service)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Droplets className="h-5 w-5 text-zoss-green" />
                          </div>
                          <div>
                            <p className="font-medium text-zoss-blue">{service.productId.productName}</p>
                            {service.issueDescription && (
                              <p className="text-sm text-zoss-gray line-clamp-1">
                                {service.issueDescription.length > 50 
                                  ? `${service.issueDescription.substring(0, 50)}...` 
                                  : service.issueDescription}
                              </p>
                            )}
                            {service.requestedDate && (
                              <p className="text-xs text-zoss-gray">
                                Requested: {format(new Date(service.requestedDate), 'MMM dd, yyyy')} at {service.requestedTime}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(service.status)}>
                            {getStatusIcon(service.status)}
                            <span className="ml-1">{service.status}</span>
                          </Badge>
                          <Eye className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Service Booking Form */}
        <ServiceBookingForm
          isOpen={showBookingForm}
          onClose={() => setShowBookingForm(false)}
          onSuccess={fetchDashboardData}
        />

        {/* Service Details Modal */}
        <Dialog open={showServiceDetails} onOpenChange={setShowServiceDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-zoss-green" />
                <span>Service Request Details</span>
              </DialogTitle>
            </DialogHeader>
            
            {selectedService && (
              <div className="space-y-6">
                {/* Product Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-zoss-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zoss-blue">{selectedService.productId.productName}</h3>
                    <p className="text-sm text-zoss-gray">Model: {selectedService.productId.modelNumber}</p>
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-zoss-blue mb-2">Request Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={`ml-2 ${getStatusColor(selectedService.status)}`}>
                          {selectedService.status}
                        </Badge>
                      </p>
                      {selectedService.requestedDate && (
                        <p><span className="font-medium">Requested Date:</span> {format(new Date(selectedService.requestedDate), 'PPP')}</p>
                      )}
                      {selectedService.requestedTime && (
                        <p><span className="font-medium">Requested Time:</span> {selectedService.requestedTime}</p>
                      )}
                      <p><span className="font-medium">Submitted:</span> {format(new Date(selectedService.createdAt), 'PPP')}</p>
                    </div>
                  </div>

                  {selectedService.status === 'Approved & Scheduled' && (
                    <div>
                      <h4 className="font-medium text-zoss-blue mb-2">Scheduled Service</h4>
                      <div className="space-y-2 text-sm">
                        {selectedService.technicianName && (
                          <p className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            <span className="font-medium">Technician:</span> {selectedService.technicianName}
                          </p>
                        )}
                        {selectedService.technicianContact && (
                          <p className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span className="font-medium">Contact:</span> {selectedService.technicianContact}
                          </p>
                        )}
                        {selectedService.scheduledDate && (
                          <p><span className="font-medium">Scheduled Date:</span> {format(new Date(selectedService.scheduledDate), 'PPP')}</p>
                        )}
                        {selectedService.scheduledTime && (
                          <p><span className="font-medium">Scheduled Time:</span> {selectedService.scheduledTime}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Issue Description */}
                {selectedService.issueDescription && (
                  <div>
                    <h4 className="font-medium text-zoss-blue mb-2">Issue Description</h4>
                    <p className="text-sm text-zoss-gray bg-gray-50 p-3 rounded-lg">
                      {selectedService.issueDescription}
                    </p>
                  </div>
                )}

                {/* Service Notes */}
                {selectedService.serviceNotes && (
                  <div>
                    <h4 className="font-medium text-zoss-blue mb-2">Service Notes</h4>
                    <p className="text-sm text-zoss-gray bg-gray-50 p-3 rounded-lg">
                      {selectedService.serviceNotes}
                    </p>
                  </div>
                )}

                {/* Status Message */}
                {selectedService.status === 'Approved & Scheduled' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Your service has been scheduled. Please be available at the given time.
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerDashboard;