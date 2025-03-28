import { Button } from "@/components/ui/button";
import { Mentor } from "@shared/schema";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { getTranslation } from "@/lib/translations";

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const { name, title, company, profileImage, skills, contactInfo } = mentor;
  const { language } = useTheme();
  
  const mentorSkills = skills || [];
  const mentorImage = profileImage || '/assets/default-mentor.jpg';
  
  const getSkillBadgeColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
      'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
      'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
      'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 text-center">
        <Link href={`/mentors/${mentor.id}`}>
          <div className="cursor-pointer">
            <img 
              src={mentorImage} 
              alt={name} 
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-primary-100 dark:border-primary-900" 
            />
          </div>
        </Link>
        <Link href={`/mentors/${mentor.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title} at {company}</p>
        
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {mentorSkills.slice(0, 3).map((skill, index) => (
            <span key={index} className={`${getSkillBadgeColor(index)} text-xs px-2 py-1 rounded-full`}>
              {skill}
            </span>
          ))}
          {mentorSkills.length > 3 && (
            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
              +{mentorSkills.length - 3}
            </span>
          )}
        </div>
        
        <Link href={`/mentors/${mentor.id}`}>
          <Button variant="outline" className="w-full dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            {getTranslation('dashboard.profile', language)}
          </Button>
        </Link>
      </div>
    </div>
  );
}
