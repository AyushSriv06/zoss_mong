import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  TrendingUp
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

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [productTemplates, setProductTemplates] = useState<ProductTemplate[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false);

  const [newProduct, setNewProduct] = useState({
    userId: '',
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, productsRes, pendingRes, templatesRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers(),
        productsAPI.getAllProducts(),
        adminAPI.getPendingApprovals(),
        adminAPI.getProductTemplates(),
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data.users);
      setProducts(productsRes.data.data.products);
      setPendingProducts(pendingRes.data.data.pendingProducts);
      setProductTemplates(templatesRes.data.data.adminUpdates);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Admin dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (user: User) => {
    try {
      setSelectedUser(user);
      const response = await productsAPI.getProductsByUser(user.userId);
      setUserProducts(response.data.data.products);
    } catch (error) {
      toast.error('Failed to load user products');
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
      await productsAPI.addProduct(newProduct);
      toast.success('Product added successfully');
      setShowAddProductDialog(false);
      setNewProduct({
        userId: '',
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
            <TabsTrigger value="services">Services</TabsTrigger>
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

              {/* User Products */}
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
                            <input type="hidden" value={selectedUser.userId} onChange={(e) => setNewProduct({...newProduct, userId: e.target.value})} />
                            
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
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-zoss-gray py-8">Service management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;