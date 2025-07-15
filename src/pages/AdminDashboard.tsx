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
  //\ ... rest of the code remains unchanged ...

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* ... rest \of the JSX remains unchanged ... */}
    </div>
  );
};

export default AdminDashboard;
```