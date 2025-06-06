import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

interface Skill {
  id?: number;
  name: string;
  category: string;
  level: number;
  yearsOfExperience?: number;
}

interface SkillFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (skill: Skill) => void;
  initialData?: Skill;
}

export default function SkillForm({ open, onClose, onSubmit, initialData }: SkillFormProps) {
  const t = useTranslation();
  const [skill, setSkill] = useState<Skill>(
    initialData || {
      name: '',
      category: '',
      level: 1,
      yearsOfExperience: undefined,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(skill);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? t('profile.editSkill') : t('profile.addSkill')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('profile.skillName')}</Label>
            <Input
              id="name"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">{t('profile.skillCategory')}</Label>
            <Input
              id="category"
              value={skill.category}
              onChange={(e) => setSkill({ ...skill, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">{t('profile.skillLevel')}</Label>
            <Select
              value={skill.level.toString()}
              onValueChange={(value) => setSkill({ ...skill, level: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('profile.selectLevel')} />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">{t('profile.yearsOfExperience')}</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              step="0.5"
              value={skill.yearsOfExperience || ''}
              onChange={(e) =>
                setSkill({
                  ...skill,
                  yearsOfExperience: e.target.value ? parseFloat(e.target.value) : undefined,
                })
              }
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