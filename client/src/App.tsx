import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Opportunities from "@/pages/Opportunities";
import OpportunityDetail from "@/pages/OpportunityDetail";
import Mentors from "@/pages/Mentors";
import MentorDetail from "@/pages/MentorDetail";
import Advice from "@/pages/Advice";
import MyCertificates from "@/pages/MyCertificates";
import Achievements from "@/pages/Achievements";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import Landing from "@/pages/Landing";

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
            !location.startsWith('/')) {
          setLocation('/login');
        }
      } catch (error) {
        if (!location.startsWith('/login') && 
            !location.startsWith('/register') &&
            !location.startsWith('/')) {
          setLocation('/login');
        }
      }
    };

    checkAuth();
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/opportunities" component={Opportunities} />
      <Route path="/opportunities/:id" component={OpportunityDetail} />
      <Route path="/mentors" component={Mentors} />
      <Route path="/mentors/:id" component={MentorDetail} />
      <Route path="/advice" component={Advice} />
      <Route path="/certificates" component={MyCertificates} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;