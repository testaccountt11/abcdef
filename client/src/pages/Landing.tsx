
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <nav className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md bg-primary-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M16 6H3v12h13V6z" />
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <path d="M8 12h4" />
              <rect x="16" y="6" width="5" height="5" />
              <rect x="16" y="16" width="5" height="2" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900 ml-2">Portfol.IO</span>
        </div>
        <div className="space-x-4">
          <Button variant="ghost" onClick={() => setLocation("/login")}>Login</Button>
          <Button onClick={() => setLocation("/register")}>Get Started</Button>
        </div>
      </nav>
      
      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Build Your Educational Portfolio
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Track your courses, showcase certificates, connect with mentors, and discover new opportunities - all in one place.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" onClick={() => setLocation("/register")}>
            Start Your Journey
          </Button>
          <Button size="lg" variant="outline" onClick={() => setLocation("/courses")}>
            Browse Courses
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Your Learning</h3>
            <p className="text-gray-600">Keep all your courses and progress in one organized space</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Showcase Achievements</h3>
            <p className="text-gray-600">Display your certificates and accomplishments professionally</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect with Mentors</h3>
            <p className="text-gray-600">Get guidance from industry experts and professionals</p>
          </div>
        </div>
      </main>
    </div>
  );
}
