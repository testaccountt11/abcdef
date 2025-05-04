import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@shared/schema";
import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  showEnrollButton?: boolean;
  showProgress?: boolean;
}

export default function CourseCard({ course, onEnroll, showEnrollButton = false, showProgress = false }: CourseCardProps) {
  const { title, description, imageUrl, progress, isPartnerCourse } = course;
  const { t } = useTranslations();
  
  const courseProgress = progress || 0;
  const courseImage = imageUrl || '/assets/default-course.jpg';
  const isPartner = isPartnerCourse || false;
  
  return (
    <div className="course-card bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/courses/${course.id}`}>
        <div className="relative h-40 cursor-pointer">
          <img 
            src={courseImage} 
            className="w-full h-full object-cover" 
            alt={title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-4">
            {courseProgress > 0 ? (
              <Badge className="bg-primary-600">{t('dashboard.inProgress')}</Badge>
            ) : (
              <Badge className={isPartner ? "bg-secondary-600" : "bg-primary-600"}>
                {isPartner ? t('dashboard.partnerCourse') : t('dashboard.available')}
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/courses/${course.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
        
        {(courseProgress > 0 || showProgress) && (
          <div className="flex items-center mb-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{courseProgress}%</span>
          </div>
        )}
        
        {courseProgress > 0 ? (
          <Link href={`/courses/${course.id}`}>
            <Button className="w-full">
              {t('dashboard.continueLearning')}
            </Button>
          </Link>
        ) : showEnrollButton ? (
          <Button className="w-full" onClick={onEnroll}>
            {t('dashboard.enrollNow')}
          </Button>
        ) : (
          <Link href={`/courses/${course.id}`}>
            <Button className="w-full">
              {t('dashboard.viewDetails')}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
