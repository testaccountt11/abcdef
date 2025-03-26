import { Button } from "@/components/ui/button";
import { Mentor } from "@shared/schema";

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const { name, title, company, profileImage, skills, contactInfo } = mentor;
  
  const getSkillBadgeColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="p-4 text-center">
        <img 
          src={profileImage} 
          alt={name} 
          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover" 
        />
        <h3 className="font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{title} at {company}</p>
        
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {skills.slice(0, 3).map((skill, index) => (
            <span key={index} className={`${getSkillBadgeColor(index)} text-xs px-2 py-1 rounded-full`}>
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              +{skills.length - 3}
            </span>
          )}
        </div>
        
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </div>
    </div>
  );
}
