import { Button } from "@/components/ui/button";
import { Opportunity } from "@shared/schema";
import { BookmarkIcon, MapPinIcon, ClockIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [saved, setSaved] = useState(false);
  const { title, description, company, logoUrl, type, location, duration, deadline } = opportunity;
  
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'internship':
        return 'bg-blue-100 text-blue-800';
      case 'volunteer':
        return 'bg-green-100 text-green-800';
      case 'competition':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getBadgeColor(type)} mb-2`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
          {logoUrl && (
            <img src={logoUrl} alt={company} className="h-8 w-8 object-contain" />
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-3">
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
        
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <div className="flex space-x-2">
          <Button className="flex-1">
            {type === 'competition' ? 'Learn More' : 'Apply Now'}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setSaved(!saved)}
            className={saved ? "text-primary-600" : "text-gray-700"}
          >
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
