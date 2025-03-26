import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  showEnrollButton?: boolean;
}

export default function CourseCard({ course, onEnroll, showEnrollButton = false }: CourseCardProps) {
  const { title, description, imageUrl, progress, isPartnerCourse } = course;
  
  return (
    <div className="course-card bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="relative h-40">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover" 
          alt={title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4">
          {progress > 0 ? (
            <Badge className="bg-primary-600">In Progress</Badge>
          ) : (
            <Badge className={isPartnerCourse ? "bg-secondary-600" : "bg-primary-600"}>
              {isPartnerCourse ? "Partner Course" : "Available"}
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        
        {progress > 0 && (
          <div className="flex items-center mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">{progress}%</span>
          </div>
        )}
        
        {progress > 0 ? (
          <Button className="w-full">
            Continue Learning
          </Button>
        ) : showEnrollButton ? (
          <Button className="w-full" onClick={onEnroll}>
            Enroll Now
          </Button>
        ) : (
          <Button className="w-full">View Details</Button>
        )}
      </div>
    </div>
  );
}
