import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "./components/home/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CultureManagement from "./pages/CultureManagement";
import LivestockManagement from "./pages/LivestockManagement";
import IrrigationIoT from "./pages/IrrigationIoT";
import Analytics from "./pages/Analytics";
import Marketplace from "./pages/Marketplace";
import AIAssistant from "./pages/AIAssistant";
import Training from "./pages/Training";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import HarvestManagement from "./pages/HarvestManagement";
import SaleManagement from "./pages/SaleManagement";
import FieldManagement from "./pages/FieldManagement";
import AdminPanel from "./pages/AdminPanel";
import VeterinaryConsultations from "./pages/VeterinaryConsultations";

// Créer un client pour React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Styles CSS personnalisés pour les popups et dropdowns
const injectGlobalStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    /* Fix pour dropdowns et popups */
    [data-radix-popper-content-wrapper] > div {
      background-color: white !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
      border: 1px solid rgba(129, 199, 132, 0.3) !important;
      color: #333 !important;
    }
    
    /* Améliorer l'accessibilité des inputs et boutons */
    .select-trigger,
    .select-content,
    [role="menuitem"] {
      color: #444 !important;
    }
    
    /* Fix pour le mode mobile */
    @media (max-width: 768px) {
      [data-radix-popper-content-wrapper] {
        width: 95vw !important;
        left: 2.5vw !important;
        transform: none !important;
      }
    }
  `;
  document.head.appendChild(style);
};

const App = () => {
  // Injection des styles au chargement de l'app
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="bg-background text-foreground min-h-screen">
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Routes protégées */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/fields" element={
                  <ProtectedRoute>
                    <FieldManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/cultures" element={
                  <ProtectedRoute>
                    <CultureManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/harvests" element={
                  <ProtectedRoute>
                    <HarvestManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/sales" element={
                  <ProtectedRoute>
                    <SaleManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/livestock" element={
                  <ProtectedRoute>
                    <LivestockManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/irrigation" element={
                  <ProtectedRoute>
                    <IrrigationIoT />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/marketplace" element={
                  <ProtectedRoute>
                    <Marketplace />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/veterinary" element={
                  <ProtectedRoute>
                    <VeterinaryConsultations />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/ai" element={
                  <ProtectedRoute>
                    <AIAssistant />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/training" element={
                  <ProtectedRoute>
                    <Training />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
