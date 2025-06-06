
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/playground" element={<NotFound />} />
          <Route path="/challenges" element={<NotFound />} />
          <Route path="/community" element={<NotFound />} />
          <Route path="/login" element={<NotFound />} />
          <Route path="/signup" element={<NotFound />} />
          <Route path="/lessons/:id" element={<NotFound />} />
          <Route path="/demo" element={<NotFound />} />
          <Route path="/profile/achievements" element={<NotFound />} />
          <Route path="/profile" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          <Route path="/logout" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
