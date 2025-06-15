import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, GraduationCap, Languages, ExternalLink, ArrowRight } from "lucide-react";
import { MentorResume } from "@/types/mentor";

interface MentorResumeCardProps {
  resume: MentorResume;
  language?: string;
  onClick?: () => void;
}

export const MentorResumeCard: React.FC<MentorResumeCardProps> = ({
  resume,
  language = 'ru',
  onClick
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (resume.url) {
      window.open(resume.url, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="bg-white dark:bg-white border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group hover:shadow-lg flex flex-col h-[550px] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header with photo */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={resume.photo?.medium || 'https://placehold.co/400x300'} 
          alt={`${resume.first_name} ${resume.last_name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Experience badge */}
        <Badge className="absolute top-4 left-4 z-20 bg-primary text-white border-none">
          {resume.total_experience} {language === 'ru' ? 'лет опыта' : 
                                   language === 'kz' ? 'жыл тәжірибе' : 
                                   'years of experience'}
        </Badge>

        {/* Name in bottom corner */}
        <div className="absolute bottom-4 left-4 z-20 text-white text-sm font-medium">
          <Badge variant="outline" className="bg-black/70 text-white border-white/30">
            {resume.first_name} {resume.last_name}
          </Badge>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <div className="h-14 mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
            {resume.title}
          </h3>
        </div>

        {/* Location and Education */}
        <div className="mb-3">
          <div className="flex items-center text-gray-600 dark:text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{resume.area.name}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2" />
            <span>{resume.education.level}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="h-8 mb-5 flex flex-wrap gap-2">
          {resume.skills.slice(0, 3).map((skill: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal bg-blue-100 dark:bg-blue-100 text-blue-700 dark:text-blue-700 border-none">
              {skill}
            </Badge>
          ))}
          {resume.skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-blue-400 dark:border-blue-400 text-blue-600 dark:text-blue-600">
              +{resume.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Languages */}
        <div className="mb-6">
          <div className="flex items-center text-gray-600 dark:text-gray-600 mb-2">
            <Languages className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {resume.language.map((lang) => `${lang.name} (${lang.level})`).join(', ')}
            </span>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4 h-6">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {new Date(resume.updated_at).toLocaleDateString(
                  language === 'ru' ? 'ru-RU' : 
                  language === 'kz' ? 'kk-KZ' : 
                  'en-US',
                  { month: 'short', day: 'numeric' }
                )}
              </span>
            </div>
            {resume.salary && (
              <Badge variant="outline" className="text-xs border-green-400 dark:border-green-400 text-green-600 dark:text-green-600">
                {resume.salary.amount} {resume.salary.currency}
              </Badge>
            )}
          </div>

          {/* Button */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300"
            onClick={handleButtonClick}
          >
            {language === 'ru' ? 'Посмотреть резюме' : 
             language === 'kz' ? 'Резюмені қарау' : 
             'View Resume'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 