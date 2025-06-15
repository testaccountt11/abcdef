import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/use-translations';
import { BookOpen, Award, Users, Bookmark } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
}

interface ProfileStatsProps {
  stats: {
    coursesInProgress: number;
    certificatesEarned: number;
    mentorSessions: number;
    opportunitiesSaved: number;
  };
}

function StatItem({ icon, label, value, description }: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const { t } = useTranslations();

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{t('profile.stats.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatItem
            icon={<BookOpen className="w-5 h-5 text-primary" />}
            label={t('profile.stats.courses')}
            value={stats.coursesInProgress}
            description={t('profile.stats.coursesDesc')}
          />
          <StatItem
            icon={<Award className="w-5 h-5 text-primary" />}
            label={t('profile.stats.certificates')}
            value={stats.certificatesEarned}
            description={t('profile.stats.certificatesDesc')}
          />
          <StatItem
            icon={<Users className="w-5 h-5 text-primary" />}
            label={t('profile.stats.mentoring')}
            value={stats.mentorSessions}
            description={t('profile.stats.mentoringDesc')}
          />
          <StatItem
            icon={<Bookmark className="w-5 h-5 text-primary" />}
            label={t('profile.stats.opportunities')}
            value={stats.opportunitiesSaved}
            description={t('profile.stats.opportunitiesDesc')}
          />
        </div>
      </CardContent>
    </Card>
  );
} 