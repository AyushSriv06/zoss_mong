```typescript
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
  X
} from 'lucide-react';
import { format, parseISO, isBefore, addDays } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';


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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [productTemplates, setProductTemplates] = useState<ProductTemplate[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [userServices, setUserServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [pendingServiceRequests, setPendingServiceRequests] = useState<Service[]>([]); // New state for pending services
  const [overdueServices, setOverdueServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false);
  const [showCompleteServiceDialog, setShowCompleteServiceDialog] = useState(false);
  const [showApproveServiceDialog, setShowApproveServiceDialog] = useState(false); // New state for approve dialog
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [servicePage, setServicePage] = useState(1);
  const [serviceTotal, setServiceTotal] = useState(0);
  const serviceLimit = 10;

  const [newProduct, setNewProduct] = useState({
    customerEmail: '',
    productName: '',
    modelNumber: '',
    purchaseDate: '',
    imageUrl: '',
    customWarrantyMonths: '',
    customAmcMonths: '',
    customServiceFrequency: ''
  });

  const [newTemplate, setNewTemplate] = useState({
    modelNumber: '',
    productName: '',
    description: '',
    defaultWarrantyMonths: 12,
    defaultAmcMonths: 12,
    serviceFrequencyDays: 90
  });

  const [serviceForm, setServiceForm] = useState({
    serviceNotes: '',
    nextServiceDays: 90
  });

  const [approveServiceForm, setApproveServiceForm] = useState({ // New state for approve form
    technicianName: '',
    technicianContact: '',
    scheduledDate: undefined as Date | undefined,
    scheduledTime: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (servicePage > 1) {
      fetchAllServices();
    }
  }, [servicePage]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, productsRes, pendingRes, templatesRes, overdueRes, pendingServicesRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers(),
        productsAPI.getAllProducts(),
        adminAPI.getPendingApprovals(),
        adminAPI.getProductTemplates(),
        servicesAPI.getOverdueServices(),
        servicesAPI.getPendingServiceRequests() // Fetch pending service requests
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data.users);
      setProducts(productsRes.data.data.products);
      setPendingProducts(pendingRes.data.data.pendingProducts);
      setProductTemplates(templatesRes.data.data.adminUpdates);
      setOverdueServices(overdueRes.data.data.services);
      setPendingServiceRequests(pendingServicesRes.data.data.services); // Set pending service requests
      
      // Fetch first page of services
      const servicesRes = await servicesAPI.getAllServices(1, serviceLimit);
      setAllServices(servicesRes.data.data.services);
      setServiceTotal(servicesRes.data.data.pagination.total);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Admin dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllServices = async () => {
    try {
      const response = await servicesAPI.getAllServices(servicePage, serviceLimit);
      setAllServices(response.data.data.services);
      setServiceTotal(response.data.data.pagination.total);
    } catch (error) {
      toast.error('Failed to load services');
    }
  };

  const handleUserClick = async (user: User) => {
    try {
      setSelectedUser(user);
      const [productsRes, servicesRes] = await Promise.all([
        productsAPI.getProductsByUser(user.userId),
        servicesAPI.getServicesByUser(user.userId)
      ]);
      setUserProducts(productsRes.data.data.products);
      setUserServices(servicesRes.data.data.services);
    } catch (error) {
      toast.error('Failed to load user data');
    }
  };

  const handleApproveProduct = async (productId: string) => {
    try {
      await adminAPI.approveProduct(productId);
      toast.success('Product approved successfully');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to approve product');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        customerEmail: selectedUser?.email || ''
      };
      
      await productsAPI.addProduct(productData);
      toast.success('Product added successfully');
      setShowAddProductDialog(false);
      setNewProduct({
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
      if (selectedUser) {
        handleUserClick(selectedUser);
      }
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminAPI.createProductTemplate(newTemplate);
      toast.success('Product template created successfully');
      setShowAddTemplateDialog(false);
      setNewTemplate({
        modelNumber: '',
        productName: '',
        description: '',
        defaultWarrantyMonths: 12,
        defaultAmcMonths: 12,
        serviceFrequencyDays: 90
      });
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to create product template');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.deleteProduct(productId);
        toast.success('Product deleted successfully');
        fetchDashboardData();
        if (selectedUser) {
          handleUserClick(selectedUser);
        }
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleCompleteService = async (service: Service) => {
    setSelectedService(service);
    setServiceForm({
      serviceNotes: '',
      nextServiceDays: 90
    });
    setShowCompleteServiceDialog(true);
  };

  const submitCompleteService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedService) return;
      
      await servicesAPI.completeService(selectedService._id, {
        serviceNotes: serviceForm.serviceNotes,
        nextServiceDays: serviceForm.nextServiceDays
      });
      
      toast.success('Service marked as completed');
      setShowCompleteServiceDialog(false);
      fetchDashboardData();
      if (selectedUser) {
        handleUserClick(selectedUser);
      }
    } catch (error) {
      toast.error('Failed to complete service');
    }
  };

  const handleApproveService = (service: Service) => { // New function to handle approval
    setSelectedService(service);
    setApproveServiceForm({
      technicianName: '',
      technicianContact: '',
      scheduledDate: service.requestedDate ? parseISO(service.requestedDate) : undefined,
      scheduledTime: service.requestedTime || ''
    });
    setShowApproveServiceDialog(true);
  };

  const submitApproveService = async (e: React.FormEvent) => { // New function to submit approval
    e.preventDefault();
    try {
      if (!selectedService || !approveServiceForm.scheduledDate) return;

      await servicesAPI.approveServiceRequest(selectedService._id, {
        technicianName: approveServiceForm.technicianName,
        technicianContact: approveServiceForm.technicianContact,
        scheduledDate: approveServiceForm.scheduledDate.toISOString(),
        scheduledTime: approveServiceForm.scheduledTime
      });

      toast.success('Service approved and scheduled successfully!');
      setShowApproveServiceDialog(false);
      fetchDashboardData();
      if (selectedUser) {
        handleUserClick(selectedUser);
      }
    } catch (error) {
      toast.error('Failed to approve service');
    }
  };

  const handleUpdateService = async (serviceId: string, updates: Partial<Service>) => {
    try {
      await servicesAPI.updateService(serviceId, updates);
      toast.success('Service updated successfully');
      fetchDashboardData();
      if (selectedUser) {
        handleUserClick(selectedUser);
      }
    } catch (error) {
      toast.error('Failed to update service');
    }
  };

  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="default"><Check className="h-3 w-3 mr-1" /> Completed</Badge>;
      case 'Due Soon':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Due Soon</Badge>;
      case 'Overdue':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" /> Overdue</Badge>;
      case 'Pending Approval':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending Approval</Badge>;
      case 'Approved & Scheduled':
        return <Badge variant="default" className="bg-purple-500"><Check className="h-3 w-3 mr-1" /> Approved & Scheduled</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const isServiceOverdue = (serviceDate: string) => {
    return isBefore(parseISO(serviceDate), new Date());
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
          <p className="text-zoss-gray">Manage users, products, and services across the platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Total Users</p>
                  <p className="text-2xl font-bold text-zoss-blue">{stats?.totalUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-zoss-green" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Total Products</p>
                  <p className="text-2xl font-bold text-zoss-blue">{stats?.totalProducts || 0}</p>
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
                  <p className="text-2xl font-bold text-zoss-blue">{stats?.pendingApprovals || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">Overdue Services</p>
                  <p className="text-2xl font-bold text-zoss-blue">{stats?.overdueServices || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-zoss-gray">New Users (30d)</p>
                  <p className="text-2xl font-bold text-zoss-blue">{stats?.recentUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users & Products</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="templates">Product Templates</TabsTrigger>
            <TabsTrigger value="services">Service Requests</TabsTrigger> {/* Changed tab name */}
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {users.map((user) => (
                      <div 
                        key={user._id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedUser?._id === user._id 
                            ? 'bg-zoss-green/10 border-zoss-green' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => handleUserClick(user)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-zoss-blue">{user.name}</p>
                            <p className="text-sm text-zoss-gray">{user.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-zoss-gray">
                              Joined {format(new Date(user.createdAt), 'MMM yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Products and Services */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {selectedUser ? `${selectedUser.name}'s Products` : 'Select a user to view products'}
                      </CardTitle>
                      {selectedUser && (
                        <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-zoss-green hover:bg-zoss-green/90">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Product
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Add Product for {selectedUser.name}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddProduct} className="space-y-4">
                              <div>
                                <Label htmlFor="productName">Product Name</Label>
                                <Input
                                  id="productName"
                                  value={newProduct.productName}
                                  onChange={(e) => setNewProduct({...newProduct, productName: e.target.value})}
                                  required
                                />
                              </div>

                              <div>
                                <Label htmlFor="modelNumber">Model Number</Label>
                                <Select value={newProduct.modelNumber} onValueChange={(value) => setNewProduct({...newProduct, modelNumber: value})}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select model" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {productTemplates.map((template) => (
                                      <SelectItem key={template._id} value={template.modelNumber}>
                                        {template.modelNumber} - {template.productName}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="purchaseDate">Purchase Date</Label>
                                <Input
                                  id="purchaseDate"
                                  type="date"
                                  value={newProduct.purchaseDate}
                                  onChange={(e) => setNewProduct({...newProduct, purchaseDate: e.target.value})}
                                  required
                                />
                              </div>

                              <div>
                                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                                <Input
                                  id="imageUrl"
                                  value={newProduct.imageUrl}
                                  onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="warrantyMonths">Warranty (months)</Label>
                                  <Input
                                    id="warrantyMonths"
                                    type="number"
                                    value={newProduct.customWarrantyMonths}
                                    onChange={(e) => setNewProduct({...newProduct, customWarrantyMonths: e.target.value})}
                                    placeholder="12"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="amcMonths">AMC (months)</Label>
                                  <Input
                                    id="amcMonths"
                                    type="number"
                                    value={newProduct.customAmcMonths}
                                    onChange={(e) => setNewProduct({...newProduct, customAmcMonths: e.target.value})}
                                    placeholder="12"
                                  />
                                </div>
                              </div>

                              <Button type="submit" className="w-full bg-zoss-green hover:bg-zoss-green/90">
                                Add Product
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedUser ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {userProducts.length === 0 ? (
                          <p className="text-center text-zoss-gray py-8">No products found for this user.</p>
                        ) : (
                          userProducts.map((product) => (
                            <div key={product._id} className="p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-zoss-blue">{product.productName}</p>
                                  <p className="text-sm text-zoss-gray">Model: {product.modelNumber}</p>
                                  <p className="text-xs text-zoss-gray">
                                    Purchased: {format(new Date(product.purchaseDate), 'MMM dd, yyyy')}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={product.isApprovedByAdmin ? "default" : "secondary"}>
                                    {product.isApprovedByAdmin ? "Approved" : "Pending"}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteProduct(product._id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-zoss-gray py-8">Select a user from the left to view their products.</p>
                    )}
                  </CardContent>
                </Card>

                {selectedUser && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedUser.name}'s Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {userServices.length === 0 ? (
                          <p className="text-center text-zoss-gray py-8">No services found for this user.</p>
                        ) : (
                          userServices.map((service) => (
                            <div key={service._id} className="p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-zoss-blue">
                                    {service.productId?.productName} ({service.productId?.modelNumber})
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    {getServiceStatusBadge(service.status)}
                                    <p className="text-sm text-zoss-gray">
                                      {service.lastServiceDate ? (
                                        <>
                                          Last: {format(new Date(service.lastServiceDate), 'MMM dd, yyyy')} • 
                                          Next: {format(new Date(service.nextServiceDate!), 'MMM dd, yyyy')}
                                        </>
                                      ) : (
                                        `Due: ${format(new Date(service.nextServiceDate!), 'MMM dd, yyyy')}`
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {service.status !== 'Completed' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleCompleteService(service)}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Products Pending Approval</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingProducts.length === 0 ? (
                  <p className="text-center text-zoss-gray py-8">No products pending approval.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingProducts.map((product) => (
                      <div key={product._id} className="p-4 bg-white rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-zoss-blue">{product.productName}</p>
                            <p className="text-sm text-zoss-gray">Model: {product.modelNumber}</p>
                            <p className="text-xs text-zoss-gray">User ID: {product.userId}</p>
                          </div>
                          <Button
                            onClick={() => handleApproveProduct(product._id)}
                            className="bg-zoss-green hover:bg-zoss-green/90"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Templates</CardTitle>
                  <Dialog open={showAddTemplateDialog} onOpenChange={setShowAddTemplateDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-zoss-green hover:bg-zoss-green/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Product Template</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddTemplate} className="space-y-4">
                        <div>
                          <Label htmlFor="templateModelNumber">Model Number</Label>
                          <Input
                            id="templateModelNumber"
                            value={newTemplate.modelNumber}
                            onChange={(e) => setNewTemplate({...newTemplate, modelNumber: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="templateProductName">Product Name</Label>
                          <Input
                            id="templateProductName"
                            value={newTemplate.productName}
                            onChange={(e) => setNewTemplate({...newTemplate, productName: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="templateDescription">Description</Label>
                          <Input
                            id="templateDescription"
                            value={newTemplate.description}
                            onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="templateWarranty">Warranty (months)</Label>
                            <Input
                              id="templateWarranty"
                              type="number"
                              value={newTemplate.defaultWarrantyMonths}
                              onChange={(e) => setNewTemplate({...newTemplate, defaultWarrantyMonths: parseInt(e.target.value)})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="templateAmc">AMC (months)</Label>
                            <Input
                              id="templateAmc"
                              type="number"
                              value={newTemplate.defaultAmcMonths}
                              onChange={(e) => setNewTemplate({...newTemplate, defaultAmcMonths: parseInt(e.target.value)})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="templateService">Service Frequency (days)</Label>
                            <Input
                              id="templateService"
                              type="number"
                              value={newTemplate.serviceFrequencyDays}
                              onChange={(e) => setNewTemplate({...newTemplate, serviceFrequencyDays: parseInt(e.target.value)})}
                              required
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-zoss-green hover:bg-zoss-green/90">
                          Create Template
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productTemplates.map((template) => (
                    <Card key={template._id}>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-zoss-blue">{template.productName}</h3>
                        <p className="text-sm text-zoss-gray mb-2">Model: {template.modelNumber}</p>
                        {template.description && (
                          <p className="text-xs text-zoss-gray mb-3">{template.description}</p>
                        )}
                        <div className="space-y-1 text-xs">
                          <p>Warranty: {template.defaultWarrantyMonths} months</p>
                          <p>AMC: {template.defaultAmcMonths} months</p>
                          <p>Service: Every {template.serviceFrequencyDays} days</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Service Requests */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Service Requests</CardTitle> {/* Changed title */}
                </CardHeader>
                <CardContent>
                  {pendingServiceRequests.length === 0 ? (
                    <p className="text-center text-zoss-gray py-8">No pending service requests.</p>
                  ) : (
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Requested Date/Time</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingServiceRequests.map((service) => (
                            <TableRow key={service._id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{service.productId?.productName}</p>
                                  <p className="text-sm text-zoss-gray">{service.productId?.modelNumber}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm text-zoss-gray line-clamp-2">{service.issueDescription}</p>
                              </TableCell>
                              <TableCell>
                                {service.requestedDate && format(new Date(service.requestedDate), 'MMM dd, yyyy')}
                                {service.requestedTime && ` at ${service.requestedTime}`}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  className="bg-zoss-green hover:bg-zoss-green/90"
                                  onClick={() => handleApproveService(service)} // New action
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve & Schedule
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Overdue Services (remains as is) */}
              <Card>
                <CardHeader>
                  <CardTitle>Overdue Services</CardTitle>
                </CardHeader>
                <CardContent>
                  {overdueServices.length === 0 ? (
                    <p className="text-center text-zoss-gray py-8">No overdue services.</p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {overdueServices.map((service) => (
                        <div key={service._id} className="p-3 bg-white rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-zoss-blue">
                                {service.productId?.productName} ({service.productId?.modelNumber})
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {getServiceStatusBadge(service.status)}
                                <p className="text-sm text-zoss-gray">
                                  Due: {format(new Date(service.nextServiceDate!), 'MMM dd, yyyy')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCompleteService(service)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            {/* All Services (Optional - can be added back if needed, perhaps in a separate tab or section) */}
            {/* <Card>
              <CardHeader>
                <CardTitle>All Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allServices.map((service) => (
                        <TableRow key={service._id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.productId?.productName}</p>
                              <p className="text-sm text-zoss-gray">{service.productId?.modelNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getServiceStatusBadge(service.status)}
                          </TableCell>
                          <TableCell>
                            {service.nextServiceDate && format(new Date(service.nextServiceDate), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCompleteService(service)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zoss-gray">
                      Showing {(servicePage - 1) * serviceLimit + 1} to {Math.min(servicePage * serviceLimit, serviceTotal)} of {serviceTotal} services
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        disabled={servicePage === 1}
                        onClick={() => setServicePage(servicePage - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        disabled={servicePage * serviceLimit >= serviceTotal}
                        onClick={() => setServicePage(servicePage + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </TabsContent>
        </Tabs>

        {/* Complete Service Dialog */}
        <Dialog open={showCompleteServiceDialog} onOpenChange={setShowCompleteServiceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitCompleteService} className="space-y-4">
              <div>
                <Label>Product</Label>
                <p className="font-medium">
                  {selectedService?.productId.productName} ({selectedService?.productId.modelNumber})
                </p>
              </div>

              <div>
                <Label htmlFor="serviceNotes">Service Notes</Label>
                <Input
                  id="serviceNotes"
                  value={serviceForm.serviceNotes}
                  onChange={(e) => setServiceForm({...serviceForm, serviceNotes: e.target.value})}
                  placeholder="Describe the service performed..."
                />
              </div>

              <div>
                <Label htmlFor="nextServiceDays">Next Service In (days)</Label>
                <Input
                  id="nextServiceDays"
                  type="number"
                  value={serviceForm.nextServiceDays}
                  onChange={(e) => setServiceForm({...serviceForm, nextServiceDays: parseInt(e.target.value)})}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-zoss-green hover:bg-zoss-green/90">
                Mark as Completed
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Approve Service Dialog (New) */}
        <Dialog open={showApproveServiceDialog} onOpenChange={setShowApproveServiceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve & Schedule Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitApproveService} className="space-y-4">
              <div>
                <Label>Product</Label>
                <p className="font-medium">
                  {selectedService?.productId.productName} ({selectedService?.productId.modelNumber})
                </p>
              </div>
              <div>
                <Label>Issue Description</Label>
                <p className="text-sm text-zoss-gray">{selectedService?.issueDescription}</p>
              </div>
              <div>
                <Label>Requested Date & Time</Label>
                <p className="text-sm text-zoss-gray">
                  {selectedService?.requestedDate && format(new Date(selectedService.requestedDate), 'MMM dd, yyyy')}
                  {selectedService?.requestedTime && ` at ${selectedService.requestedTime}`}
                </p>
              </div>

              <hr className="my-4" />

              <div>
                <Label htmlFor="technicianName">Technician Name</Label>
                <Input
                  id="technicianName"
                  value={approveServiceForm.technicianName}
                  onChange={(e) => setApproveServiceForm({...approveServiceForm, technicianName: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="technicianContact">Technician Contact</Label>
                <Input
                  id="technicianContact"
                  value={approveServiceForm.technicianContact}
                  onChange={(e) => setApproveServiceForm({...approveServiceForm, technicianContact: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Scheduled Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {approveServiceForm.scheduledDate ? format(approveServiceForm.scheduledDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={approveServiceForm.scheduledDate}
                        onSelect={(date) => setApproveServiceForm({...approveServiceForm, scheduledDate: date || undefined})}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="scheduledTime">Scheduled Time</Label>
                  <Select value={approveServiceForm.scheduledTime} onValueChange={(value) => setApproveServiceForm({...approveServiceForm, scheduledTime: value})}>
                    <SelectTrigger>
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

              <Button type="submit" className="w-full bg-zoss-green hover:bg-zoss-green/90">
                Approve & Schedule Service
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
```