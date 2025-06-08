import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { Project } from '@/types';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
  initialData?: Project;
}

export default function ProjectForm({ open, onClose, onSubmit, initialData }: ProjectFormProps) {
  const t = useTranslation();
  const [formData, setFormData] = useState<Project>(
    initialData || {
      title: '',
      description: '',
      url: '',
      technologies: [],
      startDate: '',
      endDate: '',
      isPresent: false,
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
            {initialData ? t('profile.editProject') : t('profile.addProject')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">{t('profile.projectTitle')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">{t('profile.projectDesc')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="url">{t('profile.projectUrl')}</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="technologies">{t('profile.projectTech')}</Label>
            <Input
              id="technologies"
              value={formData.technologies.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  technologies: e.target.value.split(',').map((t) => t.trim()),
                })
              }
              placeholder="React, TypeScript, Node.js"
              required
            />
          </div>
          <div>
            <Label htmlFor="startDate">{t('profile.startDate')}</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPresent"
              checked={formData.isPresent}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPresent: checked as boolean })
              }
            />
            <Label htmlFor="isPresent">{t('profile.present')}</Label>
          </div>
          {!formData.isPresent && (
            <div>
              <Label htmlFor="endDate">{t('profile.endDate')}</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          )}
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