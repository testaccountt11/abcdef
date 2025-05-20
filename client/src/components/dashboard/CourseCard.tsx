import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { BookOpen, Star, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTranslations } from "@/hooks/use-translations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    provider: string;
    rating?: number;
    studentsCount?: number;
    isPartnerCourse?: boolean;
  };
  progress?: number;
}

export default function CourseCard({ course, progress }: CourseCardProps) {
  const { language } = useTranslations();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: enrollCourse, isPending: isEnrolling } = useMutation({
    mutationFn: async () => {
      console.log('Attempting to enroll in course:', course.id);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(api.courses.enroll(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId: course.id }),
      });
      
      if (!response.ok) {
        let errorMessage = "Failed to enroll in course";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, try to get text
          const text = await response.text();
          console.error('Server response:', text);
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Enrollment successful:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Enrollment mutation succeeded:', data);
      
      // Show success toast
      toast({
        title: language === 'ru' ? 'Успешно!' : 'Success!',
        description: language === 'ru' 
          ? 'Вы успешно записались на курс'
          : 'You have successfully enrolled in the course',
      });
      
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      
      // Update the courses cache
      queryClient.setQueryData(["courses"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((c: any) => 
          c.id === course.id 
            ? { ...c, isEnrolled: true, progress: 0 }
            : c
        );
      });

      // Force refetch the courses data
      queryClient.refetchQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      console.error("Enrollment mutation failed:", error);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: error.message === 'Not authenticated'
          ? (language === 'ru' ? 'Пожалуйста, войдите в систему' : 'Please log in')
          : (language === 'ru' ? 'Не удалось записаться на курс' : 'Failed to enroll in course'),
      });
    }
  });
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative">
          <img 
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
          />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {course.category}
              </Badge>
            </div>
            {course.isPartnerCourse && (
              <div className="absolute top-2 left-2">
                <Badge variant="default" className="bg-primary/80 backdrop-blur-sm">
                  {language === 'ru' ? 'Партнерский курс' : 'Partner Course'}
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{course.provider}</span>
          </div>
          {course.rating && (
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>{course.rating.toFixed(1)}</span>
              {course.studentsCount && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.studentsCount}</span>
                  </div>
                </>
              )}
            </div>
          )}
          {typeof progress === 'number' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {language === 'ru' ? 'Прогресс' : 'Progress'}
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {progress !== undefined ? (
            <Button 
              className="w-full" 
              variant="default"
              asChild
            >
              <Link href={`/courses/${course.id}`}>
                {language === 'ru' ? 'Продолжить обучение' : 'Continue Learning'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button 
              className="w-full cursor-pointer" 
              variant="default"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked');
                console.log('Course:', course);
                
                const token = localStorage.getItem('token');
                if (!token) {
                  toast({
                    variant: "destructive",
                    title: language === 'ru' ? 'Требуется авторизация' : 'Authentication required',
                    description: language === 'ru' 
                      ? 'Пожалуйста, войдите в систему для записи на курсы' 
                      : 'Please log in to enroll in courses',
                  });
                  return;
                }
                
                console.log('Token:', token);
                enrollCourse();
              }}
              disabled={isEnrolling}
              type="button"
            >
              {isEnrolling 
                ? (language === 'ru' ? 'Запись...' : 'Enrolling...')
                : (language === 'ru' ? 'Начать обучение' : 'Start Learning')
              }
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
