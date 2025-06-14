import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Edit, Trash } from 'lucide-react';
import { Skill } from '@/types';

export interface SkillCardProps {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
  isOwner: boolean;
}

export default function SkillCard({ skill, onEdit, onDelete, isOwner }: SkillCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{skill.name}</CardTitle>
          <CardDescription>{skill.category}</CardDescription>
        </div>
        {isOwner && (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Level: {skill.level}</span>
          <span className="text-sm text-muted-foreground">{skill.yearsOfExperience} years</span>
        </div>
        <Progress value={skill.level * 20} className="mt-2" />
      </CardContent>
    </Card>
  );
} 