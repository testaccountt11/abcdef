import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';

interface Education {
  id?: number;
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

interface EducationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (education: Education) => void;
  initialData?: Education;
}

export default function EducationForm({ open, onClose, onSubmit, initialData }: EducationFormProps) {
  const t = useTranslation();
  const [education, setEducation] = useState<Education>(
    initialData || {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      gpa: '',
      activities: '',
      description: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(education);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? t('profile.editEducation') : t('profile.addEducation')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">{t('profile.institution')}</Label>
            <Input
              id="institution"
              value={education.institution}
              onChange={(e) => setEducation({ ...education, institution: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">{t('profile.degree')}</Label>
            <Input
              id="degree"
              value={education.degree}
              onChange={(e) => setEducation({ ...education, degree: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldOfStudy">{t('profile.fieldOfStudy')}</Label>
            <Input
              id="fieldOfStudy"
              value={education.fieldOfStudy}
              onChange={(e) => setEducation({ ...education, fieldOfStudy: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">{t('profile.startDate')}</Label>
              <Input
                id="startDate"
                type="date"
                value={education.startDate}
                onChange={(e) => setEducation({ ...education, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">{t('profile.endDate')}</Label>
              <Input
                id="endDate"
                type="date"
                value={education.endDate}
                onChange={(e) => setEducation({ ...education, endDate: e.target.value })}
                disabled={education.isPresent}
                required={!education.isPresent}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPresent"
              checked={education.isPresent}
              onCheckedChange={(checked) => {
                setEducation({
                  ...education,
                  isPresent: checked as boolean,
                  endDate: checked ? undefined : education.endDate,
                });
              }}
            />
            <Label htmlFor="isPresent">{t('profile.present')}</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa">{t('profile.gpa')}</Label>
            <Input
              id="gpa"
              value={education.gpa || ''}
              onChange={(e) => setEducation({ ...education, gpa: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">{t('profile.activities')}</Label>
            <Textarea
              id="activities"
              value={education.activities || ''}
              onChange={(e) => setEducation({ ...education, activities: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('profile.description')}</Label>
            <Textarea
              id="description"
              value={education.description || ''}
              onChange={(e) => setEducation({ ...education, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
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