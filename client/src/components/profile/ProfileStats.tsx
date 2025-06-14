import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, BookOpen, Award, Star } from "lucide-react";
import { getTranslation } from "@/lib/translations";

interface ProfileStatsProps {
  stats: {
    coursesInProgress: number;
    certificatesEarned: number;
    mentorSessions: number;
    opportunitiesSaved: number;
  };
  language: string;
}

export default function ProfileStats({ stats, language }: ProfileStatsProps) {
  const statItems = [
    {
      title: 'profile.stats.courses',
      value: stats.coursesInProgress,
      icon: BookOpen,
      description: 'profile.stats.coursesDesc'
    },
    {
      title: 'profile.stats.certificates',
      value: stats.certificatesEarned,
      icon: Award,
      description: 'profile.stats.certificatesDesc'
    },
    {
      title: 'profile.stats.mentoring',
      value: stats.mentorSessions,
      icon: Star,
      description: 'profile.stats.mentoringDesc'
    },
    {
      title: 'profile.stats.opportunities',
      value: stats.opportunitiesSaved,
      icon: Trophy,
      description: 'profile.stats.opportunitiesDesc'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {getTranslation('profile.stats.title', language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">
                  {getTranslation(item.title, language)}
                </span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold tracking-tight">{item.value}</span>
                <span className="text-xs text-muted-foreground">
                  {getTranslation(item.description, language)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 