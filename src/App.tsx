import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserEnvironment from "./pages/UserEnvironment";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Analytics } from "@vercel/analytics/next"
const queryClient = new QueryClient();

// Create a component to handle the initial redirect
const InitialRedirect = () => {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  
  useEffect(() => {
    // Access the initialRedirectPath set in index.html
    const path = (window as any).initialRedirectPath;
    if (path) {
      setRedirectPath(path);
      // Clear it to prevent future redirects
      (window as any).initialRedirectPath = undefined;
    }
  }, []);
  
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Analytics/>
          <InitialRedirect />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/user-environment" 
              element={
              <ProtectedRoute>
                <UserEnvironment />
              </ProtectedRoute>} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
