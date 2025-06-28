import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/users/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/users/login', data),
  
  getProfile: () =>
    api.get('/users/profile'),
  
  updateProfile: (data: { name: string }) =>
    api.put('/users/profile', data),
  
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/users/change-password', data),
};

// Products API
export const productsAPI = {
  getUserProducts: () =>
    api.get('/products/my-products'),
  
  getProduct: (id: string) =>
    api.get(`/products/${id}`),
  
  // Admin only
  addProduct: (data: any) =>
    api.post('/products', data),
  
  updateProduct: (id: string, data: any) =>
    api.put(`/products/${id}`, data),
  
  deleteProduct: (id: string) =>
    api.delete(`/products/${id}`),
  
  getAllProducts: (page = 1, limit = 10) =>
    api.get(`/products?page=${page}&limit=${limit}`),
  
  getProductsByUser: (userId: string) =>
    api.get(`/products/user/${userId}`),
};

// Services API
export const servicesAPI = {
  getUserServices: () =>
    api.get('/services/my-services'),
  
  getServicesDueSoon: () =>
    api.get('/services/due-soon'),
  
  completeService: (id: string, data: { serviceNotes?: string; nextServiceDays?: number }) =>
    api.put(`/services/${id}/complete`, data),
  
  // Admin only
  getAllServices: (page = 1, limit = 10) =>
    api.get(`/services?page=${page}&limit=${limit}`),
  
  updateService: (id: string, data: any) =>
    api.put(`/services/${id}`, data),
  
  getServicesByUser: (userId: string) =>
    api.get(`/services/user/${userId}`),
  
  getOverdueServices: () =>
    api.get('/services/overdue'),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () =>
    api.get('/admin/dashboard-stats'),
  
  getPendingApprovals: () =>
    api.get('/admin/pending-approvals'),
  
  approveProduct: (id: string) =>
    api.put(`/admin/approve-product/${id}`),
  
  getProductTemplates: () =>
    api.get('/admin/product-templates'),
  
  createProductTemplate: (data: any) =>
    api.post('/admin/product-templates', data),
  
  updateProductTemplate: (id: string, data: any) =>
    api.put(`/admin/product-templates/${id}`, data),
  
  deleteProductTemplate: (id: string) =>
    api.delete(`/admin/product-templates/${id}`),
  
  getAllUsers: (page = 1, limit = 10) =>
    api.get(`/users/all?page=${page}&limit=${limit}`),
};

export default api;