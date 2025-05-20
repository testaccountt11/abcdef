import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import CourseCard from "@/components/dashboard/CourseCard";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import MentorCard from "@/components/dashboard/MentorCard";
import ArticleCard from "@/components/dashboard/ArticleCard";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  Trophy, 
  Sparkles,
  ChevronRight,
  Calendar,
  Clock
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { api } from "@/lib/api";

interface Stats {
  coursesInProgress: number;
  certificatesEarned: number;
  mentorSessions: number;
  opportunitiesSaved: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: {
      duration: 0.2
    }
  }
};

export default function Dashboard() {
  const { language } = useTranslations();
  const [activeTab, setActiveTab] = useState("courses");

  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: () => fetch(api.stats.get()).then((res) => res.json()),
  });

  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      console.log('Fetching courses and enrollments...');
      try {
        const [coursesResponse, enrollmentsResponse] = await Promise.all([
          fetch(api.courses.list()).then(async (res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch courses: ${res.statusText}`);
            }
            return res.json();
          }),
          fetch(api.courses.getEnrollments()).then(async (res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch enrollments: ${res.statusText}`);
            }
            return res.json();
          })
        ]);
        
        console.log('Courses response:', coursesResponse);
        console.log('Enrollments response:', enrollmentsResponse);
        
        // Merge courses with enrollment data
        const mergedCourses = coursesResponse.map((course: any) => {
          const enrollment = enrollmentsResponse.find((e: any) => String(e.course_id) === String(course.id));
          return {
            ...course,
            progress: enrollment?.progress || 0,
            isEnrolled: !!enrollment
          };
        });

        // Filter only enrolled courses for the dashboard
        const enrolledCourses = mergedCourses.filter((course: any) => course.isEnrolled);
        
        console.log('Merged courses:', mergedCourses);
        console.log('Enrolled courses:', enrolledCourses);
        
        return enrolledCourses;
      } catch (error) {
        console.error('Error fetching courses data:', error);
        throw error;
      }
    },
  });

  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => fetch(api.opportunities.list()).then((res) => res.json()),
  });

  const { data: mentors, isLoading: mentorsLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: () => fetch(api.mentors.list()).then((res) => res.json()),
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetch(api.articles.list()).then((res) => res.json()),
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
        {/* Welcome Section */}
          <motion.div 
            variants={itemVariants} 
            className="relative overflow-hidden space-y-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20"
          >
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="h-8 w-8 text-primary/50" />
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {language === 'ru' ? 'Добро пожаловать' : 
                 language === 'kz' ? 'Қош келдіңіз' : 
                 'Welcome'}
          </h1>
              <p className="text-muted-foreground text-lg mt-2">
                {language === 'ru' 
                  ? 'Ваш персональный дашборд для обучения и развития'
                  : language === 'kz'
                  ? 'Оқу және даму үшін жеке бақылау тақтаңыз'
                  : 'Your personal dashboard for learning and growth'}
              </p>
        </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants} 
            className="grid gap-4 md:grid-cols-3"
          >
            <StatCard
              title={language === 'ru' ? 'Полученные сертификаты' : 
                    language === 'kz' ? 'Алынған сертификаттар' : 
                    'Certificates Earned'}
              value={stats?.certificatesEarned || 0}
              icon={<Trophy className="h-5 w-5" />}
              isLoading={statsLoading}
            />
            <StatCard
              title={language === 'ru' ? 'Сессии с менторами' : 
                    language === 'kz' ? 'Менторлармен сессиялар' : 
                    'Mentor Sessions'}
              value={stats?.mentorSessions || 0}
              icon={<Users className="h-5 w-5" />}
              isLoading={statsLoading}
            />
            <StatCard
              title={language === 'ru' ? 'Сохраненные возможности' : 
                    language === 'kz' ? 'Сақталған мүмкіндіктер' : 
                    'Saved Opportunities'}
              value={stats?.opportunitiesSaved || 0}
              icon={<Briefcase className="h-5 w-5" />}
              isLoading={statsLoading}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={itemVariants}
            className="grid gap-4 md:grid-cols-3"
          >
            <Button 
              variant="outline" 
              className="h-auto p-4 flex items-center justify-between group hover:bg-primary/5"
              asChild
            >
              <Link href="/calendar">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    {language === 'ru' ? 'Расписание' : 
                     language === 'kz' ? 'Кесте' : 
                     'Schedule'}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex items-center justify-between group hover:bg-primary/5"
              asChild
            >
              <Link href="/progress">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>
                    {language === 'ru' ? 'Прогресс' : 
                     language === 'kz' ? 'Үрдіс' : 
                     'Progress'}
                  </span>
                  </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex items-center justify-between group hover:bg-primary/5"
              asChild
            >
              <Link href="/achievements">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>
                    {language === 'ru' ? 'Достижения' : 
                     language === 'kz' ? 'Жетістіктер' : 
                     'Achievements'}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
              <Tabs 
                defaultValue="courses" 
                className="w-full"
                onValueChange={setActiveTab}
              >
                <div className="border-b px-4">
                  <div className="flex items-center justify-between py-4">
                    <TabsList className="h-12">
                      <TabsTrigger 
                        value="courses"
                        className="h-10 px-4 data-[state=active]:bg-primary/10"
                      >
                        {language === 'ru' ? 'Курсы' : 
                         language === 'kz' ? 'Курстар' : 
                         'Courses'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="opportunities"
                        className="h-10 px-4 data-[state=active]:bg-primary/10"
                      >
                        {language === 'ru' ? 'Возможности' : 
                         language === 'kz' ? 'Мүмкіндіктер' : 
                         'Opportunities'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="mentors"
                        className="h-10 px-4 data-[state=active]:bg-primary/10"
                      >
                        {language === 'ru' ? 'Менторы' : 
                         language === 'kz' ? 'Менторлар' : 
                         'Mentors'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="articles"
                        className="h-10 px-4 data-[state=active]:bg-primary/10"
                      >
                        {language === 'ru' ? 'Статьи' : 
                         language === 'kz' ? 'Мақалалар' : 
                         'Articles'}
                      </TabsTrigger>
                    </TabsList>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 hover:bg-primary/10"
                      asChild
                    >
                      <Link href={`/${activeTab}`}>
                        {language === 'ru' ? 'Смотреть все' : 
                         language === 'kz' ? 'Барлығын көру' : 
                         'View All'} 
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
          </div>
          
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <TabsContent value="courses" className="mt-0">
            {isLoadingCourses ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
                            ))}
                  </div>
                        ) : courses?.length ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course: any) => (
                              <CourseCard 
                                key={course.id} 
                                course={course} 
                                progress={course.progress}
                              />
                            ))}
                </div>
                        ) : (
                          <div className="text-center py-12 text-muted-foreground">
                            {language === 'ru' 
                              ? 'У вас пока нет активных курсов' 
                              : language === 'kz'
                              ? 'Сізде әлі белсенді курстар жоқ'
                              : 'You have no active courses yet'}
              </div>
            )}
                      </TabsContent>

                      <TabsContent value="opportunities" className="mt-0">
                        {opportunitiesLoading ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
                            ))}
                  </div>
                        ) : opportunities?.length ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {opportunities.map((opportunity: any) => (
                              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                            ))}
                </div>
                        ) : (
                          <div className="text-center py-12 text-muted-foreground">
                            {language === 'ru' 
                              ? 'Нет доступных возможностей' 
                              : language === 'kz'
                              ? 'Қол жетімді мүмкіндіктер жоқ'
                              : 'No opportunities available'}
              </div>
            )}
                      </TabsContent>

                      <TabsContent value="mentors" className="mt-0">
                        {mentorsLoading ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
                            ))}
                    </div>
                        ) : mentors?.length ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {mentors.map((mentor: any) => (
                              <MentorCard key={mentor.id} mentor={mentor} />
                            ))}
                </div>
                        ) : (
                          <div className="text-center py-12 text-muted-foreground">
                            {language === 'ru' 
                              ? 'Нет доступных менторов' 
                              : language === 'kz'
                              ? 'Қол жетімді менторлар жоқ'
                              : 'No mentors available'}
              </div>
            )}
                      </TabsContent>

                      <TabsContent value="articles" className="mt-0">
                        {articlesLoading ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
                            ))}
                      </div>
                        ) : articles?.length ? (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article: any) => (
                              <ArticleCard key={article.id} article={article} />
                            ))}
                    </div>
                        ) : (
                          <div className="text-center py-12 text-muted-foreground">
                            {language === 'ru' 
                              ? 'Нет доступных статей' 
                              : language === 'kz'
                              ? 'Қол жетімді мақалалар жоқ'
                              : 'No articles available'}
                  </div>
                        )}
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Tabs>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
