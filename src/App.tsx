import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import UsageBenefits from "./pages/UsageBenefits";
import SubscriptionModel from "./pages/SubscriptionModel";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetail";
import AuthPage from "./pages/AuthPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import B2CSolutions from "./pages/B2CSolutions";
import CommercialB2B from "./pages/CommercialB2B";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/usage-benefits" element={<UsageBenefits />} />
                <Route path="/subscription-model" element={<SubscriptionModel />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/b2c-solutions" element={<B2CSolutions />} />
                <Route path="/commercial-b2b" element={<CommercialB2B />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;