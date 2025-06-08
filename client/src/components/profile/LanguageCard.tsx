import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Language {
  id: number;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  certificate?: string;
}

interface LanguageCardProps {
  language: Language;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LanguageCard({ language, onEdit, onDelete }: LanguageCardProps) {
  const t = useTranslation();

  const getLevelColor = (level: Language['level']) => {
    switch (level) {
      case 'native':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'advanced':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'basic':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="font-semibold">{language.name}</div>
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
          <Badge variant="secondary" className={getLevelColor(language.level)}>
            {t(`profile.${language.level}`)}
          </Badge>
          {language.certificate && (
            <div className="text-sm mt-2">
              <span className="font-medium">{t('profile.certificate')}:</span>{' '}
              {language.certificate}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 