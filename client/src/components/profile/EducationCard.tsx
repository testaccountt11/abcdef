import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isPresent: boolean;
  gpa?: string;
  activities?: string;
  description?: string;
}

interface EducationCardProps {
  education: Education;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EducationCard({ education, onEdit, onDelete }: EducationCardProps) {
  const t = useTranslation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="font-semibold">{education.institution}</div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
            title={t('common.edit')}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive"
            title={t('common.delete')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <div className="font-medium">{education.degree}</div>
            <div className="text-sm text-muted-foreground">{education.fieldOfStudy}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(education.startDate)} -{' '}
            {education.isPresent ? t('profile.present') : education.endDate && formatDate(education.endDate)}
          </div>
          {education.gpa && (
            <div className="text-sm">
              <span className="font-medium">{t('profile.gpa')}:</span> {education.gpa}
            </div>
          )}
          {education.activities && (
            <div className="text-sm">
              <span className="font-medium">{t('profile.activities')}:</span>{' '}
              {education.activities}
            </div>
          )}
          {education.description && (
            <div className="text-sm mt-2">{education.description}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 