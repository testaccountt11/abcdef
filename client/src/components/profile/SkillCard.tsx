import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Pencil, ArrowLeft } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  yearsOfExperience?: number;
}

interface SkillCardProps {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{skill.name}</CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{skill.category}</div>
        <Progress value={skill.level * 20} className="mt-2" />
        {skill.yearsOfExperience && (
          <div className="mt-2 text-xs text-muted-foreground">
            {skill.yearsOfExperience} years of experience
          </div>
        )}
      </CardContent>
    </Card>
  );
} 