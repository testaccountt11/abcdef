import { Button } from "@/components/ui/button";
import { Opportunity } from "@shared/schema";
import { BookmarkIcon, MapPinIcon, ClockIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { getTranslation } from "@/lib/translations";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [saved, setSaved] = useState(false);
  const { title, description, company, logoUrl, type, location, duration, deadline } = opportunity;
  const { language } = useTheme();
  
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'internship':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'volunteer':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'competition':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getBadgeColor(type)} mb-2`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <Link href={`/opportunities/${opportunity.id}`}>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">{title}</h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>
          </div>
          {logoUrl && (
            <img src={logoUrl} alt={company} className="h-8 w-8 object-contain" />
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          {location && (
            <>
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </>
          )}
          
          {(location && (duration || deadline)) && (
            <span className="mx-2">•</span>
          )}
          
          {duration ? (
            <>
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </>
          ) : deadline ? (
            <>
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Deadline: {deadline}</span>
            </>
          ) : null}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        
        <div className="flex space-x-2">
          <Link href={`/opportunities/${opportunity.id}`} className="flex-1">
            <Button className="w-full">
              {type === 'competition' ? 'Learn More' : 'Apply Now'}
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setSaved(!saved)}
            className={saved ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"}
          >
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
