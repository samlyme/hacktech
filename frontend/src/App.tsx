import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./context/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } />
            <Route path="/analysis/:id" element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            } />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>

  </AuthProvider>
);

export default App;
