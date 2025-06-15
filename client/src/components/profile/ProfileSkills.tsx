import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';
import { Code2, Brain, Wrench } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  yearsOfExperience?: number;
}

interface ProfileSkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  technical: <Code2 className="w-4 h-4" />,
  soft: <Brain className="w-4 h-4" />,
  other: <Wrench className="w-4 h-4" />,
};

const skillLevelColors: Record<string, string> = {
  beginner: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20',
  intermediate: 'bg-green-500/10 text-green-500 dark:bg-green-500/20',
  advanced: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20',
  expert: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20',
};

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  const { language } = useTheme();

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{getTranslation('profile.skills', language)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                {categoryIcons[category] || categoryIcons.other}
                <h3 className="font-medium capitalize">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className={`${skillLevelColors[skill.level.toLowerCase()] || skillLevelColors.beginner} flex items-center gap-1`}
                  >
                    {skill.name}
                    {skill.yearsOfExperience && (
                      <span className="text-xs opacity-75">
                        • {skill.yearsOfExperience}y
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        {skills.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            {getTranslation('profile.noSkills', language)}
          </p>
        )}
      </CardContent>
    </Card>
  );
} 