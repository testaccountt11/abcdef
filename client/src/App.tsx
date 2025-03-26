import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Opportunities from "@/pages/Opportunities";
import Mentors from "@/pages/Mentors";
import Advice from "@/pages/Advice";
import MyCertificates from "@/pages/MyCertificates";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Landing from "@/pages/Landing"; // Import the Landing component


function Router() {
  const [location, setLocation] = useLocation();

  // Redirect to login if not on login or register page
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');

        if (!response.ok && 
            !location.startsWith('/login') && 
            !location.startsWith('/register') &&
            !location.startsWith('/')) { //Added check for landing page
          setLocation('/login');
        }
      } catch (error) {
        if (!location.startsWith('/login') && 
            !location.startsWith('/register') &&
            !location.startsWith('/')) { //Added check for landing page
          setLocation('/login');
        }
      }
    };

    checkAuth();
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Landing} /> {/*Added route for landing page*/}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/courses" component={Courses} />
      <Route path="/opportunities" component={Opportunities} />
      <Route path="/mentors" component={Mentors} />
      <Route path="/advice" component={Advice} />
      <Route path="/certificates" component={MyCertificates} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;