
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
