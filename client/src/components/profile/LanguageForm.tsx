import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/types';

interface LanguageFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (language: Language) => void;
  initialData?: Language;
}

export default function LanguageForm({ open, onClose, onSubmit, initialData }: LanguageFormProps) {
  const t = useTranslation();
  const [formData, setFormData] = useState<Language>(
    initialData || {
      name: '',
      level: 'basic',
      certificate: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? t('profile.editLanguage') : t('profile.addLanguage')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t('profile.languageName')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="level">{t('profile.languageLevel')}</Label>
            <Select
              value={formData.level}
              onValueChange={(value: 'basic' | 'intermediate' | 'advanced' | 'native') =>
                setFormData({ ...formData, level: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t('profile.selectLevel')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">{t('profile.basic')}</SelectItem>
                <SelectItem value="intermediate">{t('profile.intermediate')}</SelectItem>
                <SelectItem value="advanced">{t('profile.advanced')}</SelectItem>
                <SelectItem value="native">{t('profile.native')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="certificate">{t('profile.certificate')}</Label>
            <Input
              id="certificate"
              value={formData.certificate}
              onChange={(e) => setFormData({ ...formData, certificate: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {initialData ? t('common.save') : t('common.add')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 