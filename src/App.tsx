import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import WatsonxChat from "./components/WatsonxChat";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Fulfillment from "./pages/Fulfillment";

const queryClient = new QueryClient();

// Component to handle route-based chatbot rendering
function ChatbotWrapper() {
  const location = useLocation();

  // Orders page uses Placing_Orders_Agent
  if (location.pathname === "/") {
    return (
      <WatsonxChat
        agentId="1f37ccc3-06ab-4567-a4f6-9ab9b7fd74f0"
        agentEnvironmentId="1790bb0a-9025-4477-907d-fa086b379fe0"
      />
    );
  }

  // All other pages use Sales_Chatgoat agent
  return (
    <WatsonxChat
      agentId="69e6d33d-9326-442f-a870-bce64c94adeb"
      agentEnvironmentId="f997ce1f-ce83-4532-aff5-4e1c670fe810"
    />
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/fulfillment" element={<Fulfillment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
