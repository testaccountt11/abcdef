import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Education } from "@/types";
import { format } from "date-fns";

export interface EducationCardProps {
  education: Education;
  onEdit: () => void;
  onDelete: () => void;
  isOwner: boolean;
}

export default function EducationCard({ education, onEdit, onDelete, isOwner }: EducationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{education.institution}</CardTitle>
          <CardDescription>{education.degree} in {education.fieldOfStudy}</CardDescription>
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
          <span className="text-sm text-muted-foreground">
            {format(new Date(education.startDate), 'MMM yyyy')} - 
            {education.endDate ? format(new Date(education.endDate), 'MMM yyyy') : 'Present'}
          </span>
          {education.gpa && (
            <span className="text-sm text-muted-foreground">GPA: {education.gpa}</span>
          )}
        </div>
        {education.activities && (
          <p className="mt-2 text-sm text-muted-foreground">{education.activities}</p>
        )}
      </CardContent>
    </Card>
  );
} 