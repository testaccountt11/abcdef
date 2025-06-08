import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { AuthProvider, useAuthContext } from "@/contexts/AuthContext";
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
import Landing from "@/pages/Landing";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import PublicAboutUs from "@/pages/PublicAboutUs";
import PublicCourses from "@/pages/PublicCourses";
import PublicInternships from "@/pages/PublicInternships";
import PublicMentors from "@/pages/PublicMentors";
import PublicStudyTips from "@/pages/PublicStudyTips";
import PublicPrivacyPolicy from "@/pages/PublicPrivacyPolicy";
import PublicTermsOfUse from "@/pages/PublicTermsOfUse";
import BecomeMentor from "@/pages/BecomeMentor";
import PublicOpportunities from "@/pages/PublicOpportunities";
import { useEffect } from "react";

// List of public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register', '/publicaboutus', '/publiccourses', '/publicinternships', '/publicmentors', '/publicstudytips', '/publicprivacypolicy', '/publictermsofuse', '/become-mentor'];

// List of routes that should redirect to dashboard when logged in
const REDIRECT_ROUTES = ['/login', '/register'];

function AppContent() {
  const [location, setLocation] = useLocation();
  const { user, loading } = useAuthContext();

  // Handle authentication redirects
  useEffect(() => {
    if (!loading) {
      if (user && REDIRECT_ROUTES.includes(location)) {
        setLocation('/dashboard');
      } else if (!user && !PUBLIC_ROUTES.includes(location)) {
        setLocation('/login');
      }
    }
  }, [user, loading, location, setLocation]);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      {/* Public routes - accessible without authentication */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/publicaboutus" component={PublicAboutUs} />
      <Route path="/publiccourses" component={PublicCourses} />
      <Route path="/publicinternships" component={PublicInternships} />
      <Route path="/publicmentors" component={PublicMentors} />
      <Route path="/publicstudytips" component={PublicStudyTips} />
      <Route path="/publicprivacypolicy" component={PublicPrivacyPolicy} />
      <Route path="/publictermsofuse" component={PublicTermsOfUse} />
      <Route path="/become-mentor" component={BecomeMentor} />
      <Route path="/opportunities" component={PublicOpportunities} />

      {/* Protected routes - only accessible when authenticated */}
      {user && (
        <>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/opportunities" component={Opportunities} />
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
          <Route path="/profile" component={() => <Profile userId={user?.id} />} />
          <Route path="/settings" component={Settings} />
        </>
      )}

      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TranslationsProvider>
            <AppContent />
            <Toaster />
          </TranslationsProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;