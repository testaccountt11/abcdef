import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Course } from "@shared/schema";
import { ApiError, apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, Award, BookOpen, GraduationCap, Share2, Users, Check, ArrowLeft } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslations();

  // Fetch course details
  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
    retry: 1,
  });

  // Show error toast if query fails
  if (error) {
    toast({
      title: "Error",
      description: error instanceof ApiError ? error.message : "Failed to load course details",
      variant: "destructive",
    });
  }

  // Handle enrollment
  const handleEnrollment = async () => {
    try {
      await apiRequest("POST", `/api/courses/${id}/enroll`);
      
      toast({
        title: t('course.enrolled'),
        description: t('course.enrollmentSuccess'),
        variant: "default",
      });
      
      // Refresh page to show updated status
      window.location.reload();
    } catch (error) {
      toast({
        title: t('course.enrollmentFailed'),
        description: error instanceof Error ? error.message : "Failed to enroll in course",
        variant: "destructive",
      });
    }
  };

  // Handle continue learning / start course
  const handleStartCourse = () => {
    // In a real app, this would launch the course content
    toast({
      title: t('course.started'),
      description: t('course.startedDescription'),
    });
  };

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full rounded-lg mb-6" />
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </div>
            
            <div>
              <Skeleton className="h-64 w-full rounded-lg mb-6" />
              <Skeleton className="h-10 w-full rounded-md mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('course.notFound')}</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">{t('course.notFoundDesc')}</p>
          <Button onClick={() => navigate('/courses')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('course.backToCourses')}
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-transparent" 
          onClick={() => navigate('/courses')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t('course.backToCourses')}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {course.imageUrl && (
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mb-6" 
                />
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{course.title}</h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                  {course.provider}
                </span>
                {course.isPartnerCourse && (
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Check className="mr-1 h-3 w-3" /> {t('course.officialPartner')}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {course.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('course.whatYouWillLearn')}
              </h2>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('course.skill1')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('course.skill2')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('course.skill3')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('course.skill4')}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('course.courseContent')}
              </h2>
              
              <div className="space-y-4 mb-6">
                {/* Module 1 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">{t('course.module1Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {t('course.module1Desc')}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" /> 
                      <span>4 {t('course.lessons')} • 45 {t('course.minutes')}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Module 2 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">{t('course.module2Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {t('course.module2Desc')}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" /> 
                      <span>5 {t('course.lessons')} • 60 {t('course.minutes')}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Module 3 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">{t('course.module3Title')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {t('course.module3Desc')}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" /> 
                      <span>3 {t('course.lessons')} • 50 {t('course.minutes')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 sticky top-24">
              {/* Course Progress */}
              {course.progress !== null && course.progress > 0 ? (
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('course.progress')}</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ) : null}
              
              {/* Call to action */}
              {course.progress !== null && course.progress > 0 ? (
                <Button className="w-full mb-4" onClick={handleStartCourse}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t('course.continueLearning')}
                </Button>
              ) : (
                <Button className="w-full mb-4" onClick={handleEnrollment}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {t('course.enroll')}
                </Button>
              )}
              
              <Button variant="outline" className="w-full mb-6">
                <Share2 className="mr-2 h-4 w-4" />
                {t('course.share')}
              </Button>
              
              {/* Course info */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('course.startAnytime')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('course.selfPaced')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('course.duration')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">12 {t('course.hours')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('course.certificate')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('course.certificateDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('course.students')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1,254 {t('course.enrolled')}</p>
                  </div>
                </div>
              </div>
              
              {/* Contact info if available */}
              {course.contactInfo && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium mb-2">{t('course.contactInfo')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.contactInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}