import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { adminAPI, productsAPI, servicesAPI } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Clock,
  Check,
  X,
  CalendarIcon
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  pendingApprovals: number;
  overdueServices: number;
  recentUsers: number;
}

interface User {
  _id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Product {
  _id: string;
  userId: string;
  customerName?: string;
  customerEmail?: string;
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
  isApprovedByAdmin: boolean;
}

interface ProductTemplate {
  _id: string;
  modelNumber: string;
  productName: string;
  description?: string;
  defaultWarrantyMonths: number;
  defaultAmcMonths: number;
  serviceFrequencyDays: number;
}

interface Service {
  _id: string;
  userId: string;
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

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    pendingApprovals: 0,
    overdueServices: 0,
    recentUsers: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [pendingServiceRequests, setPendingServiceRequests] = useState<Service[]>([]);
  const [overdueServices, setOverdueServices] = useState<Service[]>([]);
  const [productTemplates, setProductTemplates] = useState<ProductTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showCompleteServiceDialog, setShowCompleteServiceDialog] = useState(false);
  const [showApproveServiceDialog, setShowApproveServiceDialog] = useState(false);
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedServiceToApprove, setSelectedServiceToApprove] = useState<Service | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);
  
  // Form states
  const [productForm, setProductForm] = useState({
    customerEmail: '',
    productName: '',
    modelNumber: '',
    purchaseDate: '',
    imageUrl: '',
    customWarrantyMonths: '',
    customAmcMonths: '',
    customServiceFrequency: ''
  });
  
  const [serviceForm, setServiceForm] = useState({
    serviceNotes: '',
    nextServiceDays: '90'
  });

  const [approveServiceForm, setApproveServiceForm] = useState({
    technicianName: '',
    technicianContact: '',
    scheduledDate: undefined as Date | undefined,
    scheduledTime: ''
  });
  
  const [templateForm, setTemplateForm] = useState({
    modelNumber: '',
    productName: '',
    description: '',
    defaultWarrantyMonths: 12,
    defaultAmcMonths: 12,
    serviceFrequencyDays: 90
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        statsRes,
        usersRes,
        productsRes,
        servicesRes,
        pendingServicesRes,
        overdueServicesRes,
        templatesRes
      ] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers(),
        productsAPI.getAllProducts(),
        servicesAPI.getAllServices(),
        servicesAPI.getPendingServiceRequests(),
        servicesAPI.getOverdueServices(),
        adminAPI.getProductTemplates()
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data.users);
      setProducts(productsRes.data.data.products);
      setAllServices(servicesRes.data.data.services);
      setPendingServiceRequests(pendingServicesRes.data.data.services);
      setOverdueServices(overdueServicesRes.data.data.services);
      setProductTemplates(templatesRes.data.data.adminUpdates);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteService = (service: Service) => {
    setSelectedService(service);
    setShowCompleteServiceDialog(true);
  };

  const handleApproveService = (service: Service) => {
    setSelectedServiceToApprove(service);
    setShowApproveServiceDialog(true);
  };

  const submitCompleteService = async () => {
    if (!selectedService) return;
    
    try {
      await servicesAPI.completeService(selectedService._id, serviceForm);
      toast.success('Service marked as completed');
      setShowCompleteServiceDialog(false);
      setServiceForm({ serviceNotes: '', nextServiceDays: '90' });
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to complete service');
    }
  };

  const submitApproveService = async () => {
    if (!selectedServiceToApprove || !approveServiceForm.scheduledDate) return;
    
    try {
      await servicesAPI.approveServiceRequest(selectedServiceToApprove._id, {
        technicianName: approveServiceForm.technicianName,
        technicianContact: approveServiceForm.technicianContact,
        scheduledDate: approveServiceForm.scheduledDate.toISOString(),
        scheduledTime: approveServiceForm.scheduledTime
      });
      toast.success('Service request approved and scheduled');
      setShowApproveServiceDialog(false);
      setApproveServiceForm({
        technicianName: '',
        technicianContact: '',
        scheduledDate: undefined,
        scheduledTime: ''
      });
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to approve service request');
    }
  };

  const addProduct = async () => {
    try {
      await productsAPI.addProduct(productForm);
      toast.success('Product added successfully');
      setShowAddProductDialog(false);
      setProductForm({
        customerEmail: '',
        productName: '',
        modelNumber: '',
        purchaseDate: '',
        imageUrl: '',
        customWarrantyMonths: '',
        customAmcMonths: '',
        customServiceFrequency: ''
      });
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  };

  const addProductTemplate = async () => {
    try {
      await adminAPI.createProductTemplate(templateForm);
      toast.success('Product template added successfully');
      setShowAddTemplateDialog(false);
      setTemplateForm({
        modelNumber: '',
        productName: '',
        description: '',
        defaultWarrantyMonths: 12,
        defaultAmcMonths: 12,
        serviceFrequencyDays: 90
      });
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add product template');
    }
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zoss-blue mb-2">Admin Dashboard</h1>
          <p className="text-zoss-gray">Manage users, products, and services</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="services">Service Requests</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zoss-gray">Total Users</p>
                      <p className="text-2xl font-bold text-zoss-blue">{stats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zoss-gray">Total Products</p>
                      <p className="text-2xl font-bold text-zoss-blue">{stats.totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zoss-gray">Pending Approvals</p>
                      <p className="text-2xl font-bold text-zoss-blue">{stats.pendingApprovals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-red-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zoss-gray">Overdue Services</p>
                      <p className="text-2xl font-bold text-zoss-blue">{stats.overdueServices}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zoss-gray">Recent Users</p>
                      <p className="text-2xl font-bold text-zoss-blue">{stats.recentUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>All Users</span>
                  <Badge variant="secondary">{users.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="font-mono text-sm">{user.userId}</TableCell>
                        <TableCell>{format(new Date(user.createdAt), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>All Products</span>
                  <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-zoss-green hover:bg-zoss-green/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="customer-email">Customer Email</Label>
                          <Input
                            id="customer-email"
                            value={productForm.customerEmail}
                            onChange={(e) => setProductForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                            placeholder="Enter customer email"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input
                              id="product-name"
                              value={productForm.productName}
                              onChange={(e) => setProductForm(prev => ({ ...prev, productName: e.target.value }))}
                              placeholder="Enter product name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="model-number">Model Number</Label>
                            <Input
                              id="model-number"
                              value={productForm.modelNumber}
                              onChange={(e) => setProductForm(prev => ({ ...prev, modelNumber: e.target.value }))}
                              placeholder="Enter model number"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="purchase-date">Purchase Date</Label>
                          <Input
                            id="purchase-date"
                            type="date"
                            value={productForm.purchaseDate}
                            onChange={(e) => setProductForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                          />
                        </div>
                        <div className="flex space-x-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddProductDialog(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={addProduct}
                            className="flex-1 bg-zoss-green hover:bg-zoss-green/90"
                          >
                            Add Product
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.customerName || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{product.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.productName}</TableCell>
                        <TableCell>{product.modelNumber}</TableCell>
                        <TableCell>{format(new Date(product.purchaseDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant={product.isApprovedByAdmin ? "default" : "secondary"}>
                            {product.isApprovedByAdmin ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Requests Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Pending Service Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>Pending Service Requests</span>
                  <Badge variant="secondary">{pendingServiceRequests.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingServiceRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending service requests</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Requested Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingServiceRequests.map((service) => (
                        <TableRow key={service._id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">Customer Info</p>
                              <p className="text-sm text-gray-500">ID: {service.userId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.productId.productName}</p>
                              <p className="text-sm text-gray-500">{service.productId.modelNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="max-w-xs truncate" title={service.issueDescription}>
                              {service.issueDescription}
                            </p>
                          </TableCell>
                          <TableCell>
                            {service.requestedDate && (
                              <div>
                                <p>{format(new Date(service.requestedDate), 'MMM dd, yyyy')}</p>
                                <p className="text-sm text-gray-500">{service.requestedTime}</p>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-orange-100 text-orange-800">
                              {service.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => handleApproveService(service)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve & Schedule
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Overdue Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Overdue Services</span>
                  <Badge variant="destructive">{overdueServices.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {overdueServices.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No overdue services</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueServices.map((service) => (
                        <TableRow key={service._id}>
                          <TableCell>Customer Info</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.productId.productName}</p>
                              <p className="text-sm text-gray-500">{service.productId.modelNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {service.nextServiceDate && format(new Date(service.nextServiceDate), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive">{service.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => handleCompleteService(service)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Mark Complete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Product Templates</span>
                  <Dialog open={showAddTemplateDialog} onOpenChange={setShowAddTemplateDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-zoss-green hover:bg-zoss-green/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Product Template</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="template-model">Model Number</Label>
                            <Input
                              id="template-model"
                              value={templateForm.modelNumber}
                              onChange={(e) => setTemplateForm(prev => ({ ...prev, modelNumber: e.target.value }))}
                              placeholder="Enter model number"
                            />
                          </div>
                          <div>
                            <Label htmlFor="template-name">Product Name</Label>
                            <Input
                              id="template-name"
                              value={templateForm.productName}
                              onChange={(e) => setTemplateForm(prev => ({ ...prev, productName: e.target.value }))}
                              placeholder="Enter product name"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="template-description">Description</Label>
                          <Input
                            id="template-description"
                            value={templateForm.description}
                            onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter description"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="template-warranty">Warranty (Months)</Label>
                            <Input
                              id="template-warranty"
                              type="number"
                              value={templateForm.defaultWarrantyMonths}
                              onChange={(e) => setTemplateForm(prev => ({ ...prev, defaultWarrantyMonths: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="template-amc">AMC (Months)</Label>
                            <Input
                              id="template-amc"
                              type="number"
                              value={templateForm.defaultAmcMonths}
                              onChange={(e) => setTemplateForm(prev => ({ ...prev, defaultAmcMonths: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="template-service">Service Frequency (Days)</Label>
                            <Input
                              id="template-service"
                              type="number"
                              value={templateForm.serviceFrequencyDays}
                              onChange={(e) => setTemplateForm(prev => ({ ...prev, serviceFrequencyDays: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddTemplateDialog(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={addProductTemplate}
                            className="flex-1 bg-zoss-green hover:bg-zoss-green/90"
                          >
                            Add Template
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model Number</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Warranty</TableHead>
                      <TableHead>AMC</TableHead>
                      <TableHead>Service Frequency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productTemplates.map((template) => (
                      <TableRow key={template._id}>
                        <TableCell className="font-mono">{template.modelNumber}</TableCell>
                        <TableCell className="font-medium">{template.productName}</TableCell>
                        <TableCell>{template.defaultWarrantyMonths} months</TableCell>
                        <TableCell>{template.defaultAmcMonths} months</TableCell>
                        <TableCell>{template.serviceFrequencyDays} days</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Complete Service Dialog */}
        <Dialog open={showCompleteServiceDialog} onOpenChange={setShowCompleteServiceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-notes">Service Notes</Label>
                <Input
                  id="service-notes"
                  value={serviceForm.serviceNotes}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, serviceNotes: e.target.value }))}
                  placeholder="Enter service notes"
                />
              </div>
              <div>
                <Label htmlFor="next-service-days">Next Service (Days)</Label>
                <Input
                  id="next-service-days"
                  type="number"
                  value={serviceForm.nextServiceDays}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, nextServiceDays: e.target.value }))}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCompleteServiceDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitCompleteService}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Complete Service
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Approve Service Dialog */}
        <Dialog open={showApproveServiceDialog} onOpenChange={setShowApproveServiceDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Approve & Schedule Service Request</DialogTitle>
            </DialogHeader>
            
            {selectedServiceToApprove && (
              <div className="space-y-6">
                {/* Service Request Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Service Request Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Product:</span> {selectedServiceToApprove.productId.productName}</p>
                      <p><span className="font-medium">Model:</span> {selectedServiceToApprove.productId.modelNumber}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Customer ID:</span> {selectedServiceToApprove.userId}</p>
                      <p><span className="font-medium">Requested Date:</span> {selectedServiceToApprove.requestedDate && format(new Date(selectedServiceToApprove.requestedDate), 'PPP')}</p>
                    </div>
                  </div>
                  {selectedServiceToApprove.issueDescription && (
                    <div className="mt-3">
                      <p className="font-medium">Issue Description:</p>
                      <p className="text-gray-700 bg-white p-2 rounded border mt-1">
                        {selectedServiceToApprove.issueDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Technician Assignment Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="technician-name">Technician Name *</Label>
                    <Input
                      id="technician-name"
                      value={approveServiceForm.technicianName}
                      onChange={(e) => setApproveServiceForm(prev => ({ ...prev, technicianName: e.target.value }))}
                      placeholder="Enter technician name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="technician-contact">Technician Contact *</Label>
                    <Input
                      id="technician-contact"
                      value={approveServiceForm.technicianContact}
                      onChange={(e) => setApproveServiceForm(prev => ({ ...prev, technicianContact: e.target.value }))}
                      placeholder="Enter contact number"
                      required
                    />
                  </div>
                </div>

                {/* Schedule Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Scheduled Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-2"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {approveServiceForm.scheduledDate ? format(approveServiceForm.scheduledDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={approveServiceForm.scheduledDate}
                          onSelect={(date) => setApproveServiceForm(prev => ({ ...prev, scheduledDate: date }))}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="scheduled-time">Scheduled Time *</Label>
                    <Select 
                      value={approveServiceForm.scheduledTime} 
                      onValueChange={(value) => setApproveServiceForm(prev => ({ ...prev, scheduledTime: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowApproveServiceDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitApproveService}
                    disabled={!approveServiceForm.technicianName || !approveServiceForm.technicianContact || !approveServiceForm.scheduledDate || !approveServiceForm.scheduledTime}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Schedule Service
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;