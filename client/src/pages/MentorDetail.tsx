import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Mentor } from "@shared/schema";
import { ApiError, apiRequest } from "@/lib/queryClient";
import { Calendar, Mail, PhoneCall, MapPin, Globe, Star, MessageCircle, Briefcase, ArrowLeft, Award } from "lucide-react";

export default function MentorDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslations();

  // Fetch mentor details
  const { data: mentor, isLoading } = useQuery<Mentor>({
    queryKey: [`/api/mentors/${id}`],
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof ApiError ? error.message : "Failed to load mentor details",
        variant: "destructive",
      });
    },
  });

  // Handle booking
  const handleBookSession = async () => {
    try {
      await apiRequest(`/api/mentors/${id}/book`, {
        method: "POST",
      });
      
      toast({
        title: t('mentor.booked'),
        description: t('mentor.bookingSuccess'),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: t('mentor.bookingFailed'),
        description: error instanceof Error ? error.message : "Failed to book session",
        variant: "destructive",
      });
    }
  };

  // Handle sending message
  const handleSendMessage = () => {
    toast({
      title: t('mentor.messageSent'),
      description: t('mentor.messageResponse'),
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
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <Skeleton className="h-64 w-64 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-10 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              </div>
              
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
            
            <div>
              <Skeleton className="h-64 w-full rounded-lg mb-6" />
              <Skeleton className="h-10 w-full rounded-md mb-4" />
              <Skeleton className="h-10 w-full rounded-md mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!mentor) {
    return (
      <AppLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('mentor.notFound')}</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">{t('mentor.notFoundDesc')}</p>
          <Button onClick={() => navigate('/mentors')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('mentor.backToMentors')}
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
          onClick={() => navigate('/mentors')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t('mentor.backToMentors')}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Mentor profile header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {mentor.profileImage ? (
                <img 
                  src={mentor.profileImage} 
                  alt={mentor.name} 
                  className="rounded-full w-48 h-48 object-cover shadow-md mx-auto md:mx-0" 
                />
              ) : (
                <div className="rounded-full w-48 h-48 bg-gradient-to-r from-primary-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-md mx-auto md:mx-0">
                  {mentor.name.charAt(0)}
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {mentor.name}
                </h1>
                <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                  {mentor.title} {mentor.company && `at ${mentor.company}`}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.skills && mentor.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>4.9 (124 {t('mentor.reviews')})</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span>98% {t('mentor.responseRate')}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Award className="h-4 w-4 text-purple-500 mr-1" />
                    <span>{t('mentor.topMentor')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs for different sections */}
            <Tabs defaultValue="about" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="about">{t('mentor.about')}</TabsTrigger>
                <TabsTrigger value="expertise">{t('mentor.expertise')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('mentor.reviews')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {t('mentor.aboutMe')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {mentor.title === "Data Scientist" ? 
                      `Passionate data scientist with 8+ years of experience in the tech industry. I specialize in machine learning, deep learning, and data visualization. I've helped over 50 students transition into data science roles and build compelling portfolios. I believe in practical, project-based learning that helps you build real-world skills.

My teaching philosophy focuses on building strong fundamentals while working on interesting real-world problems. I'm patient, detailed, and committed to helping you reach your goals, whether you're just starting out or looking to level up your career.` : 
                      `Experienced professional with expertise in ${mentor.title.toLowerCase()}. Working at ${mentor.company}, I've had the opportunity to mentor junior professionals and help them grow in their careers. I'm passionate about sharing knowledge and helping others succeed.

I believe in a hands-on approach to mentoring, focusing on practical skills and real-world applications. My goal is to help you build a strong foundation in ${mentor.title.toLowerCase()} and develop the confidence to tackle any challenge in this field.`}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {t('mentor.experience')}
                  </h3>
                  
                  <Card className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <h4 className="font-medium">{mentor.title}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {mentor.company} • 2020 - Present
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {mentor.title === "Data Scientist" ?
                              "Leading data science initiatives, developing machine learning models, and working with cross-functional teams to implement data-driven solutions." :
                              `Working on key projects as a ${mentor.title.toLowerCase()}, collaborating with team members and stakeholders to deliver successful outcomes.`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <h4 className="font-medium">{mentor.title === "Data Scientist" ? "Junior Data Analyst" : `Junior ${mentor.title}`}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {mentor.title === "Data Scientist" ? "TechCorp" : "Previous Company"} • 2017 - 2020
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {mentor.title === "Data Scientist" ?
                              "Performed data analysis, created reports and dashboards, and assisted with developing data pipelines." :
                              `Gained fundamental experience in ${mentor.title.toLowerCase()}, worked on various projects, and developed essential skills.`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="expertise" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {t('mentor.expertiseAreas')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentor.skills && mentor.skills.map((skill, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{skill}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {t('mentor.advanced')}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!mentor.skills || mentor.skills.length < 4) && (
                      <>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium">{mentor.title === "Data Scientist" ? "Python Programming" : "Project Management"}</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {t('mentor.expert')}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium">{mentor.title === "Data Scientist" ? "Machine Learning" : "Team Leadership"}</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {t('mentor.expert')}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {t('mentor.mentorshipStyle')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">{t('mentor.handsonLearning')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t('mentor.handsonDesc')}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">{t('mentor.goalOriented')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t('mentor.goalOrientedDesc')}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">{t('mentor.regularFeedback')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t('mentor.regularFeedbackDesc')}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">{t('mentor.individualApproach')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t('mentor.individualApproachDesc')}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {t('mentor.studentReviews')}
                  </h3>
                  
                  <div className="flex items-center">
                    <div className="text-2xl font-bold mr-2">4.9</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Review 1 */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium mr-3">
                          A
                        </div>
                        <div>
                          <div className="font-medium">{t('mentor.reviewerName1')}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">3 {t('mentor.monthsAgo')}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400" fill="#FBBF24" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {t('mentor.review1')}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Review 2 */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium mr-3">
                          M
                        </div>
                        <div>
                          <div className="font-medium">{t('mentor.reviewerName2')}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">1 {t('mentor.monthAgo')}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400" fill={i < 5 ? "#FBBF24" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {t('mentor.review2')}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Review 3 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium mr-3">
                          S
                        </div>
                        <div>
                          <div className="font-medium">{t('mentor.reviewerName3')}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">2 {t('mentor.weeksAgo')}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400" fill="#FBBF24" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {t('mentor.review3')}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {t('mentor.mentorshipServices')}
              </h3>
              
              <div className="space-y-6 mb-6">
                <div className="flex justify-between">
                  <div className="font-medium">{t('mentor.oneOnOneSession')}</div>
                  <div>₸ 12,000 / {t('mentor.hour')}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="font-medium">{t('mentor.resumeReview')}</div>
                  <div>₸ 8,000</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="font-medium">{t('mentor.portfolioReview')}</div>
                  <div>₸ 15,000</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="font-medium">{t('mentor.careerCoaching')}</div>
                  <div>₸ 20,000 / {t('mentor.session')}</div>
                </div>
              </div>
              
              <Button className="w-full mb-4" onClick={handleBookSession}>
                {t('mentor.bookSession')}
              </Button>
              
              <Button variant="outline" className="w-full mb-6" onClick={handleSendMessage}>
                {t('mentor.sendMessage')}
              </Button>
              
              {/* Contact info */}
              {mentor.contactInfo && (
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">{mentor.contactInfo}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">{mentor.company}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">www.{mentor.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}