import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Check, Clock } from 'lucide-react';
import { getTranslation } from '@/lib/translations';
import { useTheme } from '@/contexts/ThemeContext';

interface AchievementProps {
  achievement: {
    id: number;
    name: string;
    description: string;
    category: string;
    target: number;
    icon?: string;
  };
  progress: number;
  isCompleted: boolean;
  completedAt?: string | null;
}

const AchievementCard: React.FC<AchievementProps> = ({ 
  achievement, 
  progress, 
  isCompleted,
  completedAt
}) => {
  const { language } = useTheme();
  
  const formattedDate = completedAt 
    ? new Date(completedAt).toLocaleDateString() 
    : null;
  
  const categoryColors: Record<string, string> = {
    'course': 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20',
    'learning': 'bg-green-500/10 text-green-500 dark:bg-green-500/20',
    'social': 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20',
    'career': 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20',
    'special': 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20',
    'default': 'bg-slate-500/10 text-slate-500 dark:bg-slate-500/20'
  };
  
  const categoryColor = categoryColors[achievement.category?.toLowerCase()] || categoryColors.default;
  
  return (
    <Card className={`${isCompleted ? 'border-primary/40' : ''} transition-all`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <Award className="h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              
              <Badge className={`${categoryColor} whitespace-nowrap ml-2`}>
                {achievement.category}
              </Badge>
            </div>
            
            <div className="mt-4">
              {isCompleted ? (
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-primary font-medium">
                    <Check className="h-4 w-4 mr-1" />
                    {getTranslation('achievement.completed', language)}
                  </span>
                  
                  {formattedDate && (
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formattedDate}
                    </span>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{getTranslation('achievement.progress', language)}</span>
                    <span>{Math.min(progress, 100)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;