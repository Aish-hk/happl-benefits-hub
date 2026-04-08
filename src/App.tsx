import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/layout/AppLayout";
import BenefitsHome from "./pages/BenefitsHome";
import Marketplace from "./pages/Marketplace";
import BenefitDetail from "./pages/BenefitDetail";
import EnrollmentFlow from "./pages/EnrollmentFlow";
import Spend from "./pages/Spend";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import IconsCollection from "./pages/IconsCollection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/icons" element={<IconsCollection />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<BenefitsHome />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/benefit/:benefitId" element={<BenefitDetail />} />
            <Route path="/enroll/:benefitId" element={<EnrollmentFlow />} />
            <Route path="/spend" element={<Spend />} />
            <Route path="/rewards" element={<Rewards />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
