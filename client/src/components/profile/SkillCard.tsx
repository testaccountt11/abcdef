import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

export interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    level: string;
    yearsOfExperience?: number;
  };
  onEdit: () => void;
  onDelete: () => void;
  isOwner?: boolean;
}

export default function SkillCard({ skill, onEdit, onDelete, isOwner = false }: SkillCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{skill.name}</h3>
          <div className="text-sm text-muted-foreground">
            <p>Level: {skill.level}</p>
            {skill.yearsOfExperience && (
              <p>Experience: {skill.yearsOfExperience} years</p>
            )}
          </div>
        </div>
        
        {isOwner && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 