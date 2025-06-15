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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/enrollments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId: course.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to enroll in course');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'ru' ? 'Успешно!' : 'Success!',
        description: language === 'ru' 
          ? 'Вы успешно записались на курс'
          : 'You have successfully enrolled in the course',
      });
      
      // Обновляем кэш
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
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
              className="w-full" 
              variant="default"
              onClick={() => enrollCourse()}
              disabled={isEnrolling}
            >
              {isEnrolling 
                ? (language === 'ru' ? 'Запись...' : 'Enrolling...')
                : (language === 'ru' ? 'Начать обучение' : 'Start Learning')
              }
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
