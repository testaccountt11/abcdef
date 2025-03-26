import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import CourseCard from "@/components/dashboard/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Courses() {
  const { toast } = useToast();
  const { user } = useAuthContext();

  // Fetch all courses
  const { data: allCourses, isLoading: isLoadingAllCourses } = useQuery({
    queryKey: ['/api/courses'],
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load courses",
        variant: "destructive",
      });
    },
  });

  // Fetch user enrolled courses
  const { data: userCourses, isLoading: isLoadingUserCourses } = useQuery({
    queryKey: ['/api/user/courses'],
    enabled: !!user,
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to load your courses",
        variant: "destructive",
      });
    },
  });

  // Handle course enrollment
  const handleEnroll = async (courseId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in courses",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest('POST', '/api/enrollments', { courseId });
      
      toast({
        title: "Success",
        description: "Successfully enrolled in course",
      });
      
      // Invalidate queries to refresh data
      // This will be handled by the queryClient in a real app
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to enroll in course",
        variant: "destructive",
      });
    }
  };

  // Filter platform and partner courses
  const platformCourses = allCourses?.filter(course => !course.isPartnerCourse) || [];
  const partnerCourses = allCourses?.filter(course => course.isPartnerCourse) || [];

  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Courses</h1>
          <p className="text-gray-600">Discover courses to enhance your skills and build your portfolio</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="platform">Platform Courses</TabsTrigger>
            <TabsTrigger value="partner">Partner Courses</TabsTrigger>
            {user && <TabsTrigger value="my">My Courses</TabsTrigger>}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingAllCourses ? (
                Array(6).fill(0).map((_, i) => (
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
              ) : allCourses && allCourses.length > 0 ? (
                allCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onEnroll={() => handleEnroll(course.id)}
                    showEnrollButton={!userCourses?.some(c => c.id === course.id)}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No courses available</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="platform" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingAllCourses ? (
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
              ) : platformCourses.length > 0 ? (
                platformCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onEnroll={() => handleEnroll(course.id)}
                    showEnrollButton={!userCourses?.some(c => c.id === course.id)}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No platform courses available</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="partner" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingAllCourses ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                ))
              ) : partnerCourses.length > 0 ? (
                partnerCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={course.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt={course.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge className="bg-secondary-600">Partner Course</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Provider:</span> {course.provider}
                      </p>
                      {course.contactInfo && (
                        <p className="text-sm text-gray-600 mb-4">
                          <span className="font-medium">Contact:</span> {course.contactInfo}
                        </p>
                      )}
                      <a 
                        href="#" 
                        className="w-full inline-block text-center bg-secondary-600 hover:bg-secondary-700 text-white py-2 rounded-md"
                        onClick={(e) => e.preventDefault()}
                      >
                        Contact Provider
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No partner courses available</p>
                </div>
              )}
            </div>
          </TabsContent>

          {user && (
            <TabsContent value="my" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingUserCourses ? (
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
                ) : userCourses && userCourses.length > 0 ? (
                  userCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">You're not enrolled in any courses yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
}
