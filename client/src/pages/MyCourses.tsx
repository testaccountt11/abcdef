import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import CourseCard from "@/components/dashboard/CourseCard";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "wouter";

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

export default function MyCourses() {
  const { t, language } = useTranslations();

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => fetch("/api/enrollments").then((res) => res.json()),
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
          {/* Header Section */}
          <motion.div 
            variants={itemVariants} 
            className="relative overflow-hidden space-y-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20"
          >
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <div className="relative">
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {language === 'ru' ? 'Мои курсы' : 'My Courses'}
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                {language === 'ru' 
                  ? 'Отслеживайте свой прогресс в обучении'
                  : 'Track your learning progress'}
              </p>
            </div>
          </motion.div>

          {/* Courses Grid */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
                ))}
              </div>
            ) : enrollments?.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrollments.map((enrollment: any) => (
                  <CourseCard 
                    key={enrollment.id} 
                    course={enrollment.course} 
                    progress={enrollment.progress}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="text-muted-foreground">
                  {language === 'ru' 
                    ? 'У вас пока нет активных курсов'
                    : 'You have no active courses'}
                </div>
                <Button asChild>
                  <Link href="/courses">
                    {language === 'ru' ? 'Найти курсы' : 'Find Courses'} 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
} 