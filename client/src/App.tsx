import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import CourseCatalog from "@/pages/CourseCatalog";
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
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

// Import public pages
import PublicAboutUs from "@/pages/publicaboutus";
import PublicCourses from "@/pages/publiccourses";
import PublicInternships from "@/pages/publicinternships";
import PublicMentors from "@/pages/publicmentors";

// List of public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register', '/publicaboutus', '/publiccourses', '/publicinternships', '/publicmentors'];

function Router() {
  const [location, setLocation] = useLocation();

  // Redirect to login if not on public routes and not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');
        
        // If not authenticated and not on a public route, redirect to login
        if (!response.ok && !PUBLIC_ROUTES.some(route => location.startsWith(route))) {
          setLocation('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Only redirect if not on a public route
        if (!PUBLIC_ROUTES.some(route => location.startsWith(route))) {
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
      <Route path="/catalog" component={CourseCatalog} />
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
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      
      {/* Public pages */}
      <Route path="/publicaboutus" component={PublicAboutUs} />
      <Route path="/publiccourses" component={PublicCourses} />
      <Route path="/publicinternships" component={PublicInternships} />
      <Route path="/publicmentors" component={PublicMentors} />
      
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