import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import CourseCard from "@/components/dashboard/CourseCard";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import MentorCard from "@/components/dashboard/MentorCard";
import ArticleCard from "@/components/dashboard/ArticleCard";
import { ArrowRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";
import { Course, Opportunity, Mentor, Article } from "@shared/schema";
import { ApiError } from "@/lib/queryClient";

// Define Stats interface to match the API response
interface Stats {
  id: number;
  userId: number;
  coursesInProgress: number | null;
  certificatesEarned: number | null;
  mentorSessions: number | null;
  opportunitiesSaved: number | null;
}

export default function Dashboard() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const { t } = useTranslations();

  // Fetch user stats
  const { data: stats, isLoading: isLoadingStats } = useQuery<Stats>({
    queryKey: ['/api/stats'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      return response.json();
    },
    retry: 1
  });

  // Fetch user courses
  const { data: courses, isLoading: isLoadingCourses } = useQuery<Course[]>({
    queryKey: ['/api/user/courses'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return response.json();
    },
  });

  // Fetch opportunities
  const { data: opportunities, isLoading: isLoadingOpportunities } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string);
      if (!response.ok) {
        throw new Error('Failed to fetch opportunities');
      }
      return response.json();
    },
  });

  // Fetch mentors
  const { data: mentors, isLoading: isLoadingMentors } = useQuery<Mentor[]>({
    queryKey: ['/api/mentors'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string);
      if (!response.ok) {
        throw new Error('Failed to fetch mentors');
      }
      return response.json();
    },
  });

  // Fetch articles
  const { data: articles, isLoading: isLoadingArticles } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    },
  });

  return (
    <AppLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('dashboard.welcome')}, {user?.firstName || user?.username || 'Student'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t('dashboard.portfolioDesc')}</p>
        </div>
        
        {/* Announcements Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('dashboard.announcement.title')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {t('dashboard.announcement.details')}
            </p>
            
            <div className="space-y-3">
              {/* New Course Announcement */}
              <div 
                className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                onClick={() => window.location.href = '/courses'}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1 text-blue-500 dark:text-blue-400">
                    <i className="ri-book-open-line text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t('dashboard.announcement.newCourse')}
                    </p>
                    <button 
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = '/courses/new';
                      }}
                    >
                      {t('dashboard.announcement.viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Competition Announcement */}
              <div 
                className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-md cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                onClick={() => window.location.href = '/opportunities'}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1 text-purple-500 dark:text-purple-400">
                    <i className="ri-trophy-line text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t('dashboard.announcement.competition')}
                    </p>
                    <button 
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = '/opportunities/competition';
                      }}
                    >
                      {t('dashboard.announcement.viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Scholarship Announcement */}
              <div 
                className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                onClick={() => window.location.href = '/opportunities'}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1 text-green-500 dark:text-green-400">
                    <i className="ri-graduation-cap-line text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t('dashboard.announcement.scholarship')}
                    </p>
                    <button 
                      className="text-xs text-green-600 dark:text-green-400 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = '/opportunities/scholarship';
                      }}
                    >
                      {t('dashboard.announcement.viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoadingStats ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <Skeleton className="h-8 w-8 rounded-md mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))
          ) : (
            <>
              <StatCard 
                title={t('dashboard.coursesInProgress')} 
                value={stats?.coursesInProgress || 0} 
                icon="book-mark-line" 
                color="primary" 
              />
              <StatCard 
                title={t('dashboard.certificatesEarned')} 
                value={stats?.certificatesEarned || 0} 
                icon="award-line" 
                color="secondary" 
              />
              <StatCard 
                title={t('dashboard.mentorSessions')} 
                value={stats?.mentorSessions || 0} 
                icon="group-line" 
                color="accent" 
              />
              <StatCard 
                title={t('dashboard.opportunitiesSaved')} 
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard.continueLearning')}</h2>
            <Link href="/courses" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center dark:text-primary-400 dark:hover:text-primary-300">
              {t('dashboard.viewAllCourses')} <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCourses ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
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
              courses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">{t('dashboard.noCourses')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Opportunities Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard.recommendedOpportunities')}</h2>
            <Link href="/opportunities" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center dark:text-primary-400 dark:hover:text-primary-300">
              {t('dashboard.viewAllOpportunities')} <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingOpportunities ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
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
              opportunities.slice(0, 3).map((opportunity: Opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">{t('dashboard.noOpportunities')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Mentors Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard.featuredMentors')}</h2>
            <Link href="/mentors" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center dark:text-primary-400 dark:hover:text-primary-300">
              {t('dashboard.viewAllMentors')} <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {isLoadingMentors ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
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
              mentors.map((mentor: Mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))
            ) : (
              <div className="col-span-4 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">{t('dashboard.noMentors')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Advice Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard.recentAdvice')}</h2>
            <Link href="/advice" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center dark:text-primary-400 dark:hover:text-primary-300">
              {t('dashboard.viewAllArticles')} <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoadingArticles ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
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
              articles.slice(0, 2).map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">{t('dashboard.noArticles')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
