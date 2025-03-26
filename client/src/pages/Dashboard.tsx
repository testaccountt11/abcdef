import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import CourseCard from "@/components/dashboard/CourseCard";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import MentorCard from "@/components/dashboard/MentorCard";
import AdviceCard from "@/components/dashboard/AdviceCard";
import { ArrowRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiRequestError } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { toast } = useToast();

  // Fetch user stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['/api/stats'],
    onError: (error: ApiRequestError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load stats",
        variant: "destructive",
      });
    },
  });

  // Fetch user courses
  const { data: courses, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['/api/user/courses'],
    onError: (error: ApiRequestError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load courses",
        variant: "destructive",
      });
    },
  });

  // Fetch opportunities
  const { data: opportunities, isLoading: isLoadingOpportunities } = useQuery({
    queryKey: ['/api/opportunities'],
    onError: (error: ApiRequestError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load opportunities",
        variant: "destructive",
      });
    },
  });

  // Fetch mentors
  const { data: mentors, isLoading: isLoadingMentors } = useQuery({
    queryKey: ['/api/mentors'],
    onError: (error: ApiRequestError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load mentors",
        variant: "destructive",
      });
    },
  });

  // Fetch articles
  const { data: articles, isLoading: isLoadingArticles } = useQuery({
    queryKey: ['/api/articles'],
    onError: (error: ApiRequestError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load articles",
        variant: "destructive",
      });
    },
  });

  return (
    <AppLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {user?.firstName || user?.username || 'Student'}!
          </h1>
          <p className="text-gray-600">Build your educational portfolio and unlock new opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoadingStats ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <Skeleton className="h-8 w-8 rounded-md mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))
          ) : (
            <>
              <StatCard 
                title="Courses in progress" 
                value={stats?.coursesInProgress || 0} 
                icon="book-mark-line" 
                color="primary" 
              />
              <StatCard 
                title="Certificates earned" 
                value={stats?.certificatesEarned || 0} 
                icon="award-line" 
                color="secondary" 
              />
              <StatCard 
                title="Mentor sessions" 
                value={stats?.mentorSessions || 0} 
                icon="group-line" 
                color="accent" 
              />
              <StatCard 
                title="Opportunities saved" 
                value={stats?.opportunitiesSaved || 0} 
                icon="briefcase-line" 
                color="purple" 
              />
            </>
          )}
        </div>

        {/* Continue Learning Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
            <a href="/courses" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              View all courses <ArrowRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCourses ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-2 w-full mb-3" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              ))
            ) : courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No courses in progress</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Opportunities Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recommended Opportunities</h2>
            <a href="/opportunities" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              View all opportunities <ArrowRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingOpportunities ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-10 flex-1 rounded-md" />
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
            ) : opportunities && opportunities.length > 0 ? (
              opportunities.slice(0, 3).map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No opportunities available</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Mentors Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Featured Mentors</h2>
            <a href="/mentors" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              View all mentors <ArrowRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {isLoadingMentors ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                  <div className="p-4 text-center">
                    <Skeleton className="h-24 w-24 rounded-full mx-auto mb-3" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                    <div className="flex justify-center mb-3">
                      <Skeleton className="h-6 w-16 rounded-full mx-1" />
                      <Skeleton className="h-6 w-16 rounded-full mx-1" />
                      <Skeleton className="h-6 w-16 rounded-full mx-1" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              ))
            ) : mentors && mentors.length > 0 ? (
              mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))
            ) : (
              <div className="col-span-4 text-center py-8">
                <p className="text-gray-500">No mentors available</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Advice Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Advice</h2>
            <a href="/advice" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              View all articles <ArrowRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoadingArticles ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                  <div className="md:flex">
                    <Skeleton className="md:w-1/3 h-40" />
                    <div className="p-4 md:w-2/3">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <div className="flex items-center">
                        <Skeleton className="h-6 w-6 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : articles && articles.length > 0 ? (
              articles.slice(0, 2).map((article) => (
                <AdviceCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500">No articles available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
