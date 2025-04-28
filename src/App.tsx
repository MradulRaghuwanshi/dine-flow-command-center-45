
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory";
import MenuManagement from "./pages/MenuManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import OnlineMenu from "./pages/OnlineMenu";
import TableSelection from "./pages/TableSelection";
import PaymentPage from "./pages/PaymentPage";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is authenticated
  const authData = localStorage.getItem("dineflow-auth");
  const isAuthenticated = authData ? JSON.parse(authData).isAuthenticated : false;
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Check for expiration of auth token (24 hours)
    const authData = localStorage.getItem("dineflow-auth");
    if (authData) {
      const auth = JSON.parse(authData);
      const timestamp = new Date(auth.timestamp).getTime();
      const now = new Date().getTime();
      const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        // Clear expired token
        localStorage.removeItem("dineflow-auth");
      }
    }
    setInitialized(true);
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/online-menu" element={<OnlineMenu />} />
            <Route path="/online-menu/table-selection" element={<TableSelection />} />
            <Route path="/online-menu/payment" element={<PaymentPage />} />
            
            {/* Protected admin routes */}
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/menu" element={<MenuManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
