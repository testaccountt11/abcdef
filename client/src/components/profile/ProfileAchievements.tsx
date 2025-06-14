import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Star } from "lucide-react";
import { getTranslation } from "@/lib/translations";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

interface Achievement {
  id: number;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  icon: 'trophy' | 'medal' | 'star';
  unlockedAt?: string;
}

interface ProfileAchievementsProps {
  achievements: Achievement[];
  language: string;
}

export default function ProfileAchievements({ achievements, language }: ProfileAchievementsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="h-4 w-4" />;
      case 'medal':
        return <Medal className="h-4 w-4" />;
      case 'star':
        return <Star className="h-4 w-4" />;
      default:
        return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {getTranslation('profile.achievements.title', language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${
                achievement.progress >= achievement.maxProgress
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {getIcon(achievement.icon)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{achievement.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {achievement.description}
                </p>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100} 
                  className="h-1.5"
                />
                {achievement.unlockedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {getTranslation('profile.achievements.unlockedAt', language)}: {format(new Date(achievement.unlockedAt), 'PPP')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 