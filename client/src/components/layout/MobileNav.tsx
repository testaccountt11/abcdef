import { useLocation } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-10">
      <a 
        href="/dashboard" 
        className={`flex-1 py-3 flex flex-col items-center justify-center ${
          location === "/dashboard" || location === "/" ? 'text-primary-600' : 'text-gray-500'
        }`}
      >
        <i className="ri-dashboard-line text-xl"></i>
        <span className="text-xs mt-1">Dashboard</span>
      </a>
      <a 
        href="/courses" 
        className={`flex-1 py-3 flex flex-col items-center justify-center ${
          location === "/courses" ? 'text-primary-600' : 'text-gray-500'
        }`}
      >
        <i className="ri-book-open-line text-xl"></i>
        <span className="text-xs mt-1">Courses</span>
      </a>
      <a 
        href="/opportunities" 
        className={`flex-1 py-3 flex flex-col items-center justify-center ${
          location === "/opportunities" ? 'text-primary-600' : 'text-gray-500'
        }`}
      >
        <i className="ri-briefcase-line text-xl"></i>
        <span className="text-xs mt-1">Opportunities</span>
      </a>
      <a 
        href="/mentors" 
        className={`flex-1 py-3 flex flex-col items-center justify-center ${
          location === "/mentors" ? 'text-primary-600' : 'text-gray-500'
        }`}
      >
        <i className="ri-user-star-line text-xl"></i>
        <span className="text-xs mt-1">Mentors</span>
      </a>
    </nav>
  );
}
